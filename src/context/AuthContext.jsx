import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services/supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to fetch profile
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getProfile = async (userId) => {
    return await fetchProfile(userId);
  };

  useEffect(() => {
    let mounted = true;

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
          if (session?.user) {
            setUser(session.user);
            
            // Try to fetch profile
            let userProfile = await fetchProfile(session.user.id);
            
            // If profile doesn't exist yet (e.g. Google first login), create it
            if (!userProfile && event === 'SIGNED_IN') {
              const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .upsert({
                  id: session.user.id,
                  email: session.user.email,
                  full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
                  avatar_url: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || '',
                  created_at: new Date().toISOString(),
                })
                .select()
                .single();
                
              if (!createError && newProfile) {
                userProfile = newProfile;
              }
            }
            
            setProfile(userProfile);
            
            // Note: Wishlist sync is handled in WishlistContext which listens to AuthContext
          } else {
            setUser(null);
            setProfile(null);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    // Auto-create profile is typically handled by Supabase trigger, 
    // or we can handle it via the SIGNED_IN listener above for OAuth
    
    return { user: data?.user, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    return { user: data?.user, error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setProfile(null);
    }
    return { error };
  };

  const updateProfile = async (updates) => {
    if (!user) return { error: new Error('No user logged in') };
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
      
    if (!error && data) {
      setProfile(data);
    }
    
    return { data, error };
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      loading, 
      isAuthenticated: !!user,
      signUp, 
      signIn, 
      signInWithGoogle,
      signOut,
      updateProfile,
      getProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
