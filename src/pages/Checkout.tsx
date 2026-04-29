/// <reference types="vite/client" />
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ArrowRight,
  CreditCard,
  Lock,
  Zap,
  ChevronLeft,
  Globe,
  Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    try {
      // ✅ DEMO PAYMENT (NO BACKEND)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Payment Successful ✅");

      clearCart();
      navigate('/success');

    } catch (err: any) {
      console.error(err);
      alert(`Checkout failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ EMPTY CART FIX
  if (cart.length === 0) {
    return (
      <div className="section-container flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="w-16 h-16 bg-brand-purple/5 rounded-full flex items-center justify-center text-brand-purple/20 mb-8">
          <Database size={32} />
        </div>
        <h2 className="text-2xl font-display font-extrabold text-brand-dark mb-2">
          Cart is Empty.
        </h2>
        <p className="text-brand-dark/40 font-medium mb-10">
          Your shopping cart is currently empty.
        </p>
        <button
          onClick={() => navigate('/browse')}
          className="premium-button-purple h-16 px-10"
        >
          Explore Books
        </button>
      </div>
    );
  }

  return (
    <div className="section-container pt-32 pb-32">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate('/cart')}
        className="mb-12 flex items-center gap-2 text-brand-dark/40 hover:text-brand-dark transition-colors font-bold text-xs uppercase tracking-widest group"
      >
        <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to Cart
      </button>

      <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

        {/* LEFT SIDE */}
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-display font-extrabold text-brand-dark mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 mb-10">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.authorName}</p>
                </div>
                <div className="font-bold text-purple-600">
                  ₹{item.price}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-7">
          <div className="glass-card p-10">

            <div className="flex items-center gap-4 mb-10">
              <Lock size={28} className="text-purple-600" />
              <h3 className="text-2xl font-bold">Secure Payment</h3>
            </div>

            <form onSubmit={handlePayment} className="space-y-8">

              <div className="flex items-center gap-4 p-6 bg-purple-50 rounded-xl">
                <Globe size={20} />
                <span>Razorpay Gateway (Demo Mode)</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full h-16 bg-purple-600 text-white text-lg rounded-xl flex items-center justify-center gap-2"
              >
                {isProcessing ? "Processing..." : `Pay ₹${cartTotal}`}
                <ArrowRight />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck size={14} />
                <span>Secure Payment</span>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;