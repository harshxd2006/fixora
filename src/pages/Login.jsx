import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { handleSupabaseError } from '../utils/errorHandler';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { signIn, signInWithGoogle, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/dashboard";

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate, from]);

  // Read error parameter from URL if redirected back from AuthCallback
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlError = searchParams.get('error');
    if (urlError) {
      setError(decodeURIComponent(urlError));
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      navigate(from, { replace: true });
    } catch (err) {
      setError(handleSupabaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (err) {
      setError(handleSupabaseError(err));
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0A0A0A]">
      {/* LEFT PANEL - Desktop Workspace Visual */}
      <div className="hidden lg:flex w-[50%] xl:w-[54%] bg-[#0A0A0A] relative flex-col p-8 xl:p-12 overflow-hidden justify-between">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)] opacity-30"></div>
        
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            <Link to="/" className="text-[28px] font-extrabold text-white tracking-tight block w-fit">
              Fixora.
            </Link>
            <p className="text-[#a0a0a0] mt-3 max-w-md leading-relaxed text-sm sm:text-base">
              Sign in to manage your problem-solving solutions and track your smart bundles.
            </p>
          </div>

          {/* CINEMATIC WORKSPACE HERO VIGNETTE */}
          <div className="relative w-full my-4 xl:my-6 h-[250px] lg:h-[290px] xl:h-[330px] rounded-3xl overflow-hidden bg-black shadow-2xl">
            <img 
              src="/workspace-hero.png" 
              alt="Fixora Workspace" 
              className="w-full h-full object-cover object-[15%_35%] select-none pointer-events-none"
              loading="eager"
            />
            {/* Soft borderless multi-directional vignettes */}
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/65 to-transparent pointer-events-none"></div>
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0A0A0A]/50 to-transparent pointer-events-none"></div>
          </div>

          <p className="text-[13px] text-[#6B6B6B]">
            © {new Date().getFullYear()} Fixora Inc.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - Sign In Form (Viewport Fitted) */}
      <div className="w-full lg:w-[50%] xl:w-[46%] bg-transparent flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 text-white">
        <div className="w-full max-w-[420px] my-auto">
          
          {/* Mobile Header with Compact Workspace Visual */}
          <div className="lg:hidden mb-4">
            <Link to="/" className="text-[24px] font-extrabold text-white tracking-tight block w-fit mb-2">
              Fixora.
            </Link>
            <div className="relative w-full h-28 xs:h-36 rounded-2xl overflow-hidden bg-black my-2.5 shadow-md">
              <img 
                src="/workspace-hero.png" 
                alt="Fixora Workspace" 
                className="w-full h-full object-cover object-[15%_30%] select-none pointer-events-none"
                loading="eager"
              />
              <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none"></div>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none"></div>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-8 xl:p-10 shadow-2xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1.5">Welcome back</h1>
            <p className="text-[14px] text-white/70 mb-5">Please enter your details to sign in.</p>
            
            {error && (
              <div className="bg-red-500/20 text-red-300 text-[13px] p-3 rounded-xl mb-5 font-medium border border-red-500/30 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></span>
                {error}
              </div>
            )}

            <button 
              type="button" 
              onClick={handleGoogleLogin}
              className="w-full h-12 glass-card hover:border-[#E5B268] flex items-center justify-center gap-3 text-[14px] font-semibold text-white transition-colors mb-5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="flex-1 h-px bg-white/15"></div>
              <span className="text-[11px] text-white/50 uppercase tracking-wider">or continue with email</span>
              <div className="flex-1 h-px bg-white/15"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com"
                    className="w-full h-11 glass-input pl-10 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider">Password</label>
                  <a href="#" className="text-[12px] text-white/70 hover:text-[#E5B268] transition-colors">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full h-11 glass-input pl-10 text-sm"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full h-11 mt-5 flex items-center justify-center disabled:opacity-70 font-bold"
              >
                {loading ? <Loader2 size={18} className="animate-spin text-[#0A0A0A]" /> : "Sign In"}
              </button>
            </form>

            <p className="text-center text-[14px] text-white/70 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#E5B268] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
