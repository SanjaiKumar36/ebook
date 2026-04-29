import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Trash2, ShieldCheck, CreditCard, ArrowRight, Clock, Zap, Lock, ChevronRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { auth, googleProvider, signInWithPopup } from '../lib/firebase';

const Cart: React.FC = () => {
  const { cart, cartTotal, removeFromCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      handleLogin();
      return;
    }
    if (cart.length === 0) return;
    navigate('/checkout');
  };

  return (
    <div className="section-container pt-32 pb-32">
      {/* Header */}
      <div className="mb-16 animate-fade-in text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-brand-purple/5 px-4 py-1.5 rounded-full mb-6 border border-brand-purple/10">
          <Zap size={14} className="text-brand-purple" />
          <span className="text-[11px] font-bold uppercase tracking-tight text-brand-purple">Secure Shopping Cart</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-brand-dark leading-[0.9] mb-4">
          Your <span className="text-brand-purple">Cart</span> Summary.
        </h1>
        <p className="text-brand-dark/40 max-w-xl font-medium">Review your selected eBooks before completing your purchase.</p>
      </div>

      {cart.length === 0 ? (
        <div className="py-32 flex flex-col items-center justify-center border-4 border-dashed border-brand-purple/5 rounded-[64px] bg-brand-purple/[0.02] animate-fade-in">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-brand-purple/20 mb-8 shadow-sm">
            <ShoppingCart size={40} />
          </div>
          <h3 className="text-2xl font-display font-extrabold text-brand-dark mb-2 tracking-tight">Cart is Empty.</h3>
          <p className="text-brand-dark/40 max-w-xs text-center font-medium mb-10">Your shopping cart is empty. Explore our collection to add eBooks.</p>
          <button onClick={() => navigate('/browse')} className="premium-button-purple h-16 px-10">
            Browse Books
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item, index) => (
                <motion.div 
                  layout 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={item.id} 
                  className="glass-card border-brand-purple/5 !p-6 flex flex-col md:flex-row items-center gap-8 group hover:bg-white hover:shadow-premium"
                >
                  <div className="w-24 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 shadow-lg border border-brand-purple/5 group-hover:scale-105 transition-transform duration-500">
                    <img src={item.coverUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="grow text-center md:text-left">
                    <h4 className="font-display font-extrabold text-2xl text-brand-dark tracking-tight mb-3 group-hover:text-brand-purple transition-colors">{item.title}</h4>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                      <p className="text-xs font-bold text-brand-dark/40 uppercase tracking-widest">{item.authorName}</p>
                      <span className="w-1 h-1 bg-brand-purple/10 rounded-full" />
                      <span className="text-[10px] font-bold text-brand-purple tracking-widest uppercase bg-brand-purple/5 px-2 py-0.5 rounded-md border border-brand-purple/10">Official Edition</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-end gap-3">
                     <p className="text-2xl font-display font-bold text-brand-dark">₹{item.price}</p>
                     <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="w-12 h-12 rounded-xl bg-white border border-brand-purple/5 text-brand-dark/20 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center"
                     >
                       <Trash2 size={18} />
                     </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="glass-card !p-8 border-brand-purple/5 bg-white/80 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 blur-[50px] rounded-full" />
               <h3 className="text-2xl font-display font-extrabold text-brand-dark mb-8 tracking-tight">Order Summary</h3>
                              <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-brand-dark/40">Subtotal</span>
                    <span className="text-brand-dark">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-brand-dark/40">Delivery</span>
                    <span className="text-green-500">FREE</span>
                  </div>
                  <div className="h-px bg-brand-purple/5" />
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-brand-dark font-bold">Total Amount</span>
                    <span className="text-4xl font-display font-extrabold text-brand-purple tracking-tighter">₹{cartTotal}</span>
                  </div>
               </div>

               <button 
                onClick={handleCheckout}
                className="premium-button-purple w-full !h-16 shadow-premium group"
               >
                 Proceed to Checkout <ChevronRight className="transition-transform group-hover:translate-x-1" />
               </button>

               <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-medium text-brand-dark/40">
                     <ShieldCheck size={14} className="text-green-500" />
                     <span>SECURE CHECKOUT ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-brand-dark/30 italic">
                     <Clock size={14} />
                     <span>EST. DELIVERY: INSTANT</span>
                  </div>
               </div>
               
               <div className="mt-10 pt-10 border-t border-brand-purple/5 text-center">
                  <p className="text-[9px] font-bold text-brand-dark/20 uppercase tracking-[0.3em]">ENCRYPTED_FLOW_V4.0</p>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
