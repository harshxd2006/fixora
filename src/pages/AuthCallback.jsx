import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import LoadingSpinner from '../components/LoadingSpinner'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if there is an error in URL (e.g. user cancelled)
    const hash = window.location.hash;
    const searchParams = new URLSearchParams(window.location.search);
    if (hash.includes('error') || searchParams.has('error')) {
      navigate('/login?error=auth_failed', { replace: true });
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          navigate('/dashboard', { replace: true })
        } else if (event === 'SIGNED_OUT') {
          navigate('/login', { replace: true })
        }
      }
    )
    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <div className="min-h-screen bg-dark-base flex items-center justify-center flex-col gap-4">
      <LoadingSpinner />
      <p className="text-slate-400 text-sm animate-pulse">
        Signing you in...
      </p>
    </div>
  )
}
