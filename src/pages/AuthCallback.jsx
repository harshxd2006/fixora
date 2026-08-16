import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is an error in URL
    const hash = window.location.hash;
    const searchParams = new URLSearchParams(window.location.search);
    if (hash.includes('error') || searchParams.has('error')) {
      navigate('/login?error=auth_failed', { replace: true });
      return;
    }

    // Instant session check for zero-delay redirect
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard', { replace: true });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
          navigate('/dashboard', { replace: true });
        } else if (event === 'SIGNED_OUT') {
          navigate('/login', { replace: true });
        }
      }
    );

    return () => subscription.unsubscribe();
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
