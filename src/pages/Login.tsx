import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Mail, Lock, User, AlertCircle, Zap, ShieldCheck, ChevronLeft } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (isSignup && !name.trim()) return 'Name identifier is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return 'Valid email coordinate is required';
    if (!password.trim() || password.length < 6) return 'Pass-phrase must be at least 6 characters';
    return null;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/home');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Node authentication failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      await signInWithPopup(auth, googleProvider);
      navigate('/home');
    } catch (err: any) {
      console.error(err);
      setError('Third-party authentication failed.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full -ml-48 -mb-48" />
      
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
        {/* Left: Branding & Message */}
        <div className="hidden lg:block animate-fade-in">
           <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-brand-purple/5 px-4 py-1.5 rounded-full mb-8 border border-brand-purple/10"
           >
              <Zap size={14} className="text-brand-purple" />
              <span className="text-[11px] font-bold uppercase tracking-tight text-brand-purple">Intelligence Network v4.0</span>
           </motion.div>
           <h1 className="text-6xl xl:text-8xl font-display font-extrabold tracking-tight text-brand-dark leading-[0.9] mb-10">
             Unlock the <br/> <span className="text-brand-purple">Knowledge</span> <br/> Economy.
           </h1>
           <p className="text-xl text-brand-dark/40 font-medium max-w-md leading-relaxed mb-12">
             Access thousands of curated technical blueprints and intellectual assets verified by global nodes.
           </p>
           
           <div className="grid grid-cols-2 gap-8">
              <div>
                 <p className="text-4xl font-display font-extrabold text-brand-dark tracking-tighter">250K+</p>
                 <p className="text-[11px] font-bold uppercase tracking-widest text-brand-dark/30">Verified Assets</p>
              </div>
              <div>
                 <p className="text-4xl font-display font-extrabold text-brand-dark tracking-tighter">0ms</p>
                 <p className="text-[11px] font-bold uppercase tracking-widest text-brand-dark/30">Sync Latency</p>
              </div>
           </div>
        </div>

        {/* Right: Auth Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto lg:mx-0 glass-card bg-white/70 backdrop-blur-3xl !p-10 md:!p-16 border-white shadow-premium relative"
        >
          <div className="text-center mb-10">
            <div 
              onClick={() => navigate('/')}
              className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-purple/20 cursor-pointer hover:scale-110 transition-transform"
            >
              <img src="/zippy_logo.png" className="w-10 h-10" alt="Logo" />
            </div>
            <h2 className="text-3xl font-display font-extrabold text-brand-dark tracking-tight mb-2">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm font-medium text-brand-dark/40 italic">Enter your credentials to synchronize node access.</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-xs font-bold"
              >
                <AlertCircle size={16} /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleEmailAuth} className="space-y-6">
            {isSignup && (
              <div>
                <label className="block text-[11px] font-bold text-brand-dark/40 uppercase tracking-widest mb-2 ml-4">Full Name</label>
                <div className="relative group">
                  <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-dark/20 group-focus-within:text-brand-purple transition-colors" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alpha User"
                    className="w-full h-16 bg-brand-purple/[0.03] border border-brand-purple/5 focus:bg-white rounded-2xl pl-16 pr-6 text-brand-dark font-medium placeholder:text-brand-dark/20 focus:outline-none focus:ring-4 focus:ring-brand-purple/5 transition-all shadow-sm"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-brand-dark/40 uppercase tracking-widest mb-2 ml-4">Email Coordinates</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-dark/20 group-focus-within:text-brand-purple transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@node.io"
                  className="w-full h-16 bg-brand-purple/[0.03] border border-brand-purple/5 focus:bg-white rounded-2xl pl-16 pr-6 text-brand-dark font-medium placeholder:text-brand-dark/20 focus:outline-none focus:ring-4 focus:ring-brand-purple/5 transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-brand-dark/40 uppercase tracking-widest mb-2 ml-4">Secure Phrase</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-dark/20 group-focus-within:text-brand-purple transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-16 bg-brand-purple/[0.03] border border-brand-purple/5 focus:bg-white rounded-2xl pl-16 pr-6 text-brand-dark font-medium placeholder:text-brand-dark/20 focus:outline-none focus:ring-4 focus:ring-brand-purple/5 transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="premium-button-purple w-full !h-16 text-sm"
            >
              {loading ? 'Processing...' : (isSignup ? 'Authorize Account' : 'Request Access')}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 flex items-center gap-4 text-brand-dark/10">
            <div className="grow h-px bg-current"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">or</span>
            <div className="grow h-px bg-current"></div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            type="button"
            className="mt-8 w-full h-16 bg-white border border-brand-purple/10 text-brand-dark rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-purple hover:text-white transition-all shadow-sm group active:scale-95"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5 group-hover:brightness-0 group-hover:invert transition-all" alt="" />
            Continue with Google
          </button>

          <div className="mt-12 text-center">
            <button 
              onClick={() => { setIsSignup(!isSignup); setError(''); }}
              className="text-xs font-bold text-brand-dark/40 hover:text-brand-purple transition-colors"
            >
              {isSignup ? 'Detected existing node? Sign In' : 'New to coordinate network? Sign Up'}
            </button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-brand-purple/5 flex items-center justify-center gap-2 text-[10px] font-bold text-brand-dark/20 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-green-500/50" /> End-to-End Secure Channel
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
