import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, LogOut, User as UserIcon, Menu, X, BookOpen, Layers, Search, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { googleProvider, signInWithPopup, auth } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

const Navbar: React.FC = () => {
  const { user, profile, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        alert('Authentication window was closed. Please ensure popups are encouraged.');
      } else {
        alert(`Login failed: ${err.message || 'Unknown error'}`);
      }
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = user ? [
    { name: 'Home', path: '/home' },
    { name: 'Explore', path: '/browse' },
    { name: 'Library', path: '/library' },
    { name: 'Wishlist', path: '/wishlist' },
  ] : [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/browse' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-brand-purple/5 shadow-sm' : 'py-6 bg-transparent'
    }`}>
      <div className="section-container flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to={user ? "/home" : "/"} className="flex items-center gap-3 active:scale-95 transition-transform">
            <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center shadow-lg shadow-brand-purple/20">
              <BookOpen className="text-white" size={20} />
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tight text-brand-dark">
              Zippy<span className="text-brand-purple">Books</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'nav-link-active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            {user && profile?.role === 'author' && (
              <Link to="/author/dashboard" className={`nav-link ${isActive('/author/dashboard') ? 'nav-link-active' : ''}`}>
                Author Dashboard
              </Link>
            )}
            {user && profile?.role === 'admin' && (
              <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'nav-link-active' : ''} text-brand-purple flex items-center gap-2`}>
                <ShieldCheck size={14} /> Admin
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/cart"
            className="relative p-3 rounded-2xl text-brand-dark hover:bg-brand-purple hover:text-white transition-all duration-300 group"
          >
            <ShoppingCart size={20} />
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-brand-dark text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                >
                  {cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          
          <div className="hidden sm:flex items-center gap-4 ml-2">
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-brand-purple/10">
                <div className="text-right hidden md:block">
                  <p className="text-[11px] font-bold text-brand-dark/40 uppercase tracking-wider leading-none mb-1">Reader Account</p>
                  <p className="text-sm font-semibold text-brand-dark leading-none truncate max-w-[120px]">{user.displayName}</p>
                </div>
                <button 
                  onClick={logout}
                  className="w-11 h-11 bg-white border border-brand-purple/10 rounded-xl hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all shadow-sm flex items-center justify-center"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="premium-button-purple !h-12 !px-7 !text-sm transition-all"
              >
                Get Started
              </button>
            )}
          </div>

          <button 
            className="lg:hidden p-3 rounded-2xl text-brand-dark hover:bg-brand-purple/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-brand-purple/5 overflow-hidden"
          >
            <div className="section-container py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`text-xl font-bold ${isActive(link.path) ? 'text-brand-purple' : 'text-brand-dark'}`}
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <button 
                  onClick={handleLogin}
                  className="premium-button-purple w-full mt-4"
                >
                  Get Started
                </button>
              )}
              {user && (
                <button 
                  onClick={logout}
                  className="secondary-button w-full mt-4 text-red-500 border-red-100"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
