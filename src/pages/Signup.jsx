import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, UserPlus, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import CTAButton from '../components/CTAButton';
import { handleSupabaseError } from '../utils/errorHandler';

const schema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Signup = () => {
  const [error, setError] = useState('');
  const [successEmail, setSuccessEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const { signUp, signInWithGoogle } = useAuth();
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema)
  });

  const watchPassword = watch("password", "");
  
  const calculatePasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strengthScore = calculatePasswordStrength(watchPassword);
  
  const getStrengthBarProps = () => {
    if (watchPassword.length === 0) return { width: '0%', color: 'bg-transparent', text: '' };
    if (strengthScore <= 1) return { width: '33%', color: 'bg-red-500', text: 'Weak' };
    if (strengthScore === 2 || strengthScore === 3) return { width: '66%', color: 'bg-yellow-500', text: 'Medium' };
    return { width: '100%', color: 'bg-[#16A34A]', text: 'Strong' };
  };

  const barProps = getStrengthBarProps();

  const onSubmit = async (data) => {
    setError('');
    const { error: signUpError } = await signUp(data.email, data.password, data.fullName);
    
    if (signUpError) {
      setError(handleSupabaseError(signUpError));
    } else {
      setSuccessEmail(data.email);
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    setError('');
    const { error: googleError } = await signInWithGoogle();
    if (googleError) {
      setError(handleSupabaseError(googleError));
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row-reverse">
      {/* LEFT PANEL - Hidden on mobile */}
      <div className="hidden lg:flex w-1/2 bg-ink relative flex-col p-12 overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)] opacity-30"></div>
        
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            <Link to="/" className="text-[28px] font-extrabold text-white tracking-tight block w-fit">
              Fixora.
            </Link>
            <p className="text-[#a0a0a0] mt-4 max-w-md leading-relaxed">
              Stop suffering today. Join thousands of others who have optimized their workspace, health, and daily routines with Fixora.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12 mb-auto max-w-lg">
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[20px] p-6"
            >
              <div className="w-10 h-10 bg-white/10 rounded-xl mb-4"></div>
              <div className="h-3 bg-white/20 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-white/10 rounded w-1/2"></div>
            </motion.div>
            <motion.div 
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[20px] p-6 mt-8"
            >
              <div className="w-10 h-10 bg-white/10 rounded-xl mb-4"></div>
              <div className="h-3 bg-white/20 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-white/10 rounded w-1/2"></div>
            </motion.div>
          </div>

          <p className="text-[13px] text-[#6B6B6B]">
            © {new Date().getFullYear()} Fixora Inc.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - Form */}
      <div className="w-full lg:w-1/2 bg-warm-white flex items-center justify-center p-6 sm:p-12 min-h-screen">
        <div className="w-full max-w-[420px]">
          
          <Link to="/" className="lg:hidden text-[24px] font-extrabold text-ink tracking-tight block w-fit mb-8">
            Fixora.
          </Link>

          <div className="bg-white border border-border-light rounded-[24px] p-8 sm:p-10 shadow-card my-8">
            {successEmail ? (
              <div className="text-center py-8">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: "spring" }}
                  className="w-20 h-20 bg-soft-white border border-border-light text-ink rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm"
                >
                  <Mail size={32} />
                </motion.div>
                <h2 className="text-[28px] font-bold text-ink tracking-tight mb-2">Check your email!</h2>
                <p className="text-slate-muted mb-8 leading-relaxed text-[15px]">
                  We sent a confirmation link to <span className="text-ink font-semibold">{successEmail}</span>.
                  <br/>Click the link to activate your account.
                </p>
                <Link to="/login">
                  <CTAButton variant="black" className="w-full">
                    Return to Login
                  </CTAButton>
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-[28px] font-bold text-ink tracking-tight mb-2">Create an account</h1>
                  <p className="text-[14px] text-slate-muted">Start fixing your daily problems.</p>
                </div>

                <button 
                  type="button" 
                  onClick={handleGoogleSignup}
                  disabled={isGoogleLoading || isSubmitting}
                  className="w-full h-12 bg-white border border-border-light hover:bg-soft-white rounded-full flex items-center justify-center gap-3 text-[14px] font-medium text-ink transition-colors shadow-sm mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGoogleLoading ? (
                    <Loader2 size={18} className="animate-spin text-ink" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  Sign up with Google
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-border-light"></div>
                  <span className="text-[12px] text-[#9E9E98] uppercase tracking-wider">or continue with email</span>
                  <div className="flex-1 h-px bg-border-light"></div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 overflow-hidden"
                    >
                      <div className="bg-red-50 text-red-600 text-[13px] p-3 rounded-xl font-medium border border-red-100 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></span>
                        {error}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-ink">Full Name</label>
                    <input 
                      type="text"
                      {...register("fullName")}
                      className={`w-full h-12 bg-warm-white border ${errors.fullName ? 'border-red-500' : 'border-border-light focus:border-ink'} focus:bg-white rounded-xl px-4 text-[15px] outline-none transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-[12px]">{errors.fullName.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-ink">Email Address</label>
                    <input 
                      type="email"
                      {...register("email")}
                      className={`w-full h-12 bg-warm-white border ${errors.email ? 'border-red-500' : 'border-border-light focus:border-ink'} focus:bg-white rounded-xl px-4 text-[15px] outline-none transition-all`}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-[12px]">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-ink">Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className={`w-full h-12 bg-warm-white border ${errors.password ? 'border-red-500' : 'border-border-light focus:border-ink'} focus:bg-white rounded-xl px-4 pr-12 text-[15px] outline-none transition-all`}
                        placeholder="••••••••"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-muted hover:text-ink transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    {watchPassword.length > 0 && (
                      <div className="pt-1">
                        <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden bg-muted-white">
                          <motion.div 
                            className={`h-full ${barProps.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: barProps.width }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <div className={`text-[11px] text-right mt-1 font-medium ${
                          strengthScore <= 1 ? 'text-red-500' : 
                          strengthScore < 4 ? 'text-yellow-600' : 'text-[#16A34A]'
                        }`}>
                          {barProps.text}
                        </div>
                      </div>
                    )}
                    {errors.password && <p className="text-red-500 text-[12px]">{errors.password.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-ink">Confirm Password</label>
                    <div className="relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        className={`w-full h-12 bg-warm-white border ${errors.confirmPassword ? 'border-red-500' : 'border-border-light focus:border-ink'} focus:bg-white rounded-xl px-4 pr-12 text-[15px] outline-none transition-all`}
                        placeholder="••••••••"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-muted hover:text-ink transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-[12px]">{errors.confirmPassword.message}</p>}
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="terms"
                      {...register("terms")}
                      className="mt-1 w-4 h-4 rounded border-border-light text-ink focus:ring-ink"
                    />
                    <label htmlFor="terms" className="text-[13px] text-slate-muted">
                      I agree to the <a href="#" className="text-ink font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-ink font-semibold hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.terms && <p className="text-red-500 text-[12px] -mt-2">{errors.terms.message}</p>}

                  <button 
                    type="submit" 
                    disabled={isSubmitting || isGoogleLoading}
                    className="w-full h-12 bg-ink text-white rounded-full font-semibold text-[15px] hover:bg-[#1a1a1a] transition-colors mt-6 flex items-center justify-center disabled:opacity-70"
                  >
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Create Account"}
                  </button>
                </form>

                <p className="text-center text-[14px] text-slate-muted mt-8">
                  Already have an account?{' '}
                  <Link to="/login" className="text-ink font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
