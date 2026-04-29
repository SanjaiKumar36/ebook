import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingCart, Sparkles, Database, ChevronRight, Zap, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Book } from '../types';

const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [books, setBooks] = useState<Book[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      const data = await response.json();
      if (Array.isArray(data)) {
        setBooks(data.filter(b => wishlist.includes(b.id)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setBooks(prev => prev.filter(b => wishlist.includes(b.id)));
  }, [wishlist]);

  return (
    <div className="section-container pt-32 pb-32">
       {/* Header */}
       <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16 animate-fade-in text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-purple/5 px-4 py-1.5 rounded-full mb-6 border border-brand-purple/10">
              <Heart size={14} className="text-brand-purple" />
              <span className="text-[11px] font-bold uppercase tracking-tight text-brand-purple">Saved Assets Queue</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-brand-dark leading-[0.9] mb-4">
              Saved <span className="text-brand-purple">Assets.</span>
            </h1>
            <p className="text-brand-dark/40 max-w-xl font-medium">Curate your high-performance intellectual units for future node synchronization.</p>
          </div>
          
          <div className="bg-white/50 p-6 rounded-[32px] border border-brand-purple/5 shadow-sm inline-flex items-center gap-4">
             <span className="text-2xl font-display font-extrabold text-brand-purple">{wishlist.length}</span>
             <span className="text-[10px] font-bold text-brand-dark/20 uppercase tracking-widest leading-none">Bookmarked</span>
          </div>
       </div>

       {wishlist.length === 0 ? (
          <div className="py-40 border-4 border-dashed border-brand-purple/5 rounded-[64px] bg-brand-purple/[0.02] flex flex-col items-center justify-center text-center animate-fade-in">
             <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-brand-purple/20 mb-8 shadow-sm">
               <Heart size={40} />
             </div>
             <h3 className="text-2xl font-display font-extrabold text-brand-dark mb-2 tracking-tight">Wishlist Unavailable.</h3>
             <p className="text-brand-dark/40 max-w-xs mx-auto font-medium mb-10">No modules have been identified for future acquisition. Explore our pool.</p>
             <button 
              onClick={() => navigate('/browse')} 
              className="premium-button-purple h-16 px-10"
             >
               Explore Catalogue <ChevronRight size={18} className="ml-1" />
             </button>
          </div>
       ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {books.map((book, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={book.id} 
                  className="group flex flex-col cursor-pointer"
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                   <div className="relative aspect-[3.1/4] overflow-hidden rounded-[32px] mb-6 shadow-sm group-hover:shadow-premium transition-all duration-500">
                      <img src={book.coverUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={book.title} />
                      <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(book); }}
                        className="absolute top-5 right-5 w-12 h-12 rounded-xl transition-all flex items-center justify-center bg-brand-gold text-brand-dark border border-brand-gold shadow-lg shadow-brand-gold/20"
                      >
                        <Heart size={20} fill="currentColor" />
                      </button>

                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-[10px] font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-md border border-brand-gold/20 mb-3 inline-block">
                          {book.category}
                        </span>
                        <h3 className="font-display font-extrabold text-2xl text-white tracking-tight line-clamp-2 leading-tight">{book.title}</h3>
                      </div>
                   </div>

                   <div className="flex items-center justify-between px-2">
                      <div>
                        <p className="text-[11px] font-bold text-brand-dark/40 uppercase tracking-wider mb-0.5">{book.authorName}</p>
                        <p className="text-2xl font-display font-bold text-brand-purple italic">₹{book.price}</p>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(book); }}
                        className="w-14 h-14 bg-white border border-brand-purple/10 text-brand-dark rounded-2xl flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all shadow-sm active:scale-95 group/btn"
                      >
                        <Plus size={24} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                      </button>
                   </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
       )}
    </div>
  );
};

export default Wishlist;
