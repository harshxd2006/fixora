import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let isSubscribed = true;

    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    
    const errorParam = searchParams.get('error') || hashParams.get('error');
    const errorDesc = searchParams.get('error_description') || hashParams.get('error_description');

    if (errorParam || errorDesc) {
      const message = errorDesc || errorParam || 'Authentication failed';
      navigate(`/login?error=${encodeURIComponent(message)}`, { replace: true });
      return;
    }

    // 1. Instant check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && isSubscribed) {
        navigate('/dashboard', { replace: true });
      }
    });

    // 2. Listen for auth state change (Supabase's detectSessionInUrl handles code exchange automatically)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isSubscribed) return;
        if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') && session) {
          navigate('/dashboard', { replace: true });
        }
      }
    );

    return () => {
      isSubscribed = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center flex-col gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-white/70 text-sm animate-pulse">
        Signing you in with Google...
      </p>
    </div>
  );
}
