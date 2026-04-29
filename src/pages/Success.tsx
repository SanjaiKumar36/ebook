import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="section-container min-h-screen flex items-center justify-center pt-32 pb-32">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />
       
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="w-full max-w-3xl glass-card !p-12 md:!p-24 border-brand-purple/5 shadow-premium text-center relative overflow-hidden"
       >
         {/* Success Ornament */}
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-purple via-brand-gold to-brand-purple opacity-50" />
         
         <div className="relative mb-12">
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              className="w-24 h-24 md:w-32 md:h-32 bg-brand-gold rounded-[40px] flex items-center justify-center mx-auto shadow-xl shadow-brand-gold/20"
            >
               <CheckCircle size={48} className="text-brand-dark" />
            </motion.div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 -m-4 border-2 border-dashed border-brand-gold/20 rounded-[64px]"
            />
         </div>

         <div className="space-y-6 mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-brand-dark leading-[0.9]">
               Order <span className="text-brand-purple">Confirmed.</span>
            </h1>
            <p className="text-xl text-brand-dark/40 font-medium italic">Your eBooks have been added to your library and are ready to read.</p>
         </div>

         <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-lg mx-auto">
            <div className="bg-brand-purple/5 p-6 rounded-3xl border border-brand-purple/5 text-center">
               <p className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.2em] mb-1">Order ID</p>
               <p className="text-sm font-display font-bold text-brand-dark">ZB-TXN-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
            <div className="bg-brand-gold/5 p-6 rounded-3xl border border-brand-gold/5 text-center">
               <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-1">Status</p>
               <p className="text-sm font-display font-bold text-brand-dark">Payment Verified</p>
            </div>
         </div>

         <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button 
              onClick={() => navigate('/library')} 
              className="premium-button-purple h-20 px-10 text-lg shadow-premium w-full sm:w-auto"
            >
              Go to Library <BookOpen size={20} className="ml-2" />
            </button>
            <button 
              onClick={() => navigate('/browse')} 
              className="h-20 px-10 rounded-3xl border border-brand-purple/10 text-brand-dark font-bold hover:bg-brand-purple/5 transition-all text-lg w-full sm:w-auto"
            >
              Browse More Books
            </button>
         </div>

         <div className="pt-12 border-t border-brand-purple/5 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-brand-dark/20 uppercase tracking-[0.3em]">
               <ShieldCheck size={14} className="text-green-500/50" /> 100% Secure Transaction
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-brand-dark/20 uppercase tracking-[0.3em]">
               <Sparkles size={14} className="text-brand-purple/30" /> Instant Access
            </div>
         </div>
       </motion.div>
    </div>
  );
};

export default Success;
