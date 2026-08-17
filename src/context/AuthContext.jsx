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

    // Initial session hydration check (non-blocking profile fetch)
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        
        if (session?.user) {
          setUser(session.user);
          setLoading(false);
          // Fetch profile asynchronously without blocking initial render
          fetchProfile(session.user.id).then(userProfile => {
            if (mounted) setProfile(userProfile);
          }).catch(console.error);
        } else {
          setUser(null);
          setProfile(null);
          setLoading(false);
        }
      } catch (err) {
        console.error('Session initialization error:', err);
        if (mounted) setLoading(false);
      }
    };

    initAuth();

    // Listen for auth state changes (non-blocking profile fetch/upsert)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        if (session?.user) {
          setUser(session.user);
          setLoading(false);
          
          // Non-blocking profile fetch and creation
          fetchProfile(session.user.id).then(async (userProfile) => {
            if (!mounted) return;
            if (!userProfile && (event === 'SIGNED_IN' || event === 'USER_UPDATED')) {
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
                
              if (!createError && newProfile && mounted) {
                setProfile(newProfile);
              }
            } else if (mounted) {
              setProfile(userProfile);
            }
          }).catch(console.error);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setLoading(false);
        }
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
          prompt: 'select_account'
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

  const uploadAvatar = async (file) => {
    if (!user || !user.id) return { error: new Error('Please sign in before uploading a profile picture.') };
    if (!file) return { error: new Error('No file selected') };

    // 1. Validate File Type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      return { error: new Error('Invalid file format. Please upload an image (JPEG, PNG, WEBP, GIF, SVG).') };
    }

    // 2. Validate Maximum File Size (5MB)
    const MAX_SIZE_BYTES = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      return { error: new Error('File size exceeds the 5MB limit. Please choose a smaller image.') };
    }

    try {
      // Standardized storage path: USER_ID/profile.webp
      const filePath = `${user.id}/profile.webp`;

      // 3. Upload to Supabase Storage bucket 'avatars' with explicit contentType
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { 
          upsert: true,
          contentType: file.type || 'image/webp',
          cacheControl: '3600' 
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        if (uploadError.message?.includes('not found') || uploadError.error === 'Bucket not found') {
          return { error: new Error('Storage bucket "avatars" is not created in Supabase yet. Please set up the bucket in Supabase Dashboard.') };
        }
        return { error: uploadError };
      }

      // 4. Get Public URL with cache-busting timestamp
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const cacheBustedUrl = `${publicUrl}?t=${Date.now()}`;

      // 5. Update user profile database table
      const { error: dbError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          avatar_url: cacheBustedUrl,
          full_name: profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || '',
          created_at: profile?.created_at || new Date().toISOString()
        });

      if (dbError) {
        console.error('Database update error:', dbError);
        return { error: dbError };
      }

      // 6. Update local state
      setProfile(prev => ({
        ...(prev || {}),
        id: user.id,
        email: user.email,
        avatar_url: cacheBustedUrl
      }));

      return { avatarUrl: cacheBustedUrl, error: null };
    } catch (err) {
      console.error('Unexpected avatar upload error:', err);
      return { error: err };
    }
  };

  const removeAvatar = async () => {
    if (!user || !user.id) return { error: new Error('Please sign in before removing a profile picture.') };

    try {
      // 1. Remove files from storage
      const filePaths = [
        `${user.id}/profile.webp`,
        `${user.id}/profile.jpg`,
        `${user.id}/profile.png`,
        `${user.id}/avatar.webp`,
        `${user.id}/avatar.png`
      ];
      
      await supabase.storage.from('avatars').remove(filePaths);

      // 2. Clear avatar_url in profiles table
      const { error: dbError } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', user.id);

      if (dbError) throw dbError;

      // 3. Update local state
      setProfile(prev => ({
        ...(prev || {}),
        avatar_url: null
      }));

      return { error: null };
    } catch (err) {
      console.error('Error removing avatar:', err);
      return { error: err };
    }
  };

  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      avatarUrl,
      loading, 
      isAuthenticated: !!user,
      signUp, 
      signIn, 
      signInWithGoogle,
      signOut,
      updateProfile,
      uploadAvatar,
      removeAvatar,
      getProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
