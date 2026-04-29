import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, Plus, Filter, SlidersHorizontal, Grid, List, Sparkles } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../constants/categories';
import { Book } from '../types';

const Browse: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'All');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    setActiveCategory(searchParams.get('cat') || 'All');
  }, [searchParams]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (!response.ok) {
        const text = await response.text();
        console.error(`API error (${response.status}):`, text.slice(0, 500));
        return;
      }
      const data = await response.json();
      if (Array.isArray(data)) setBooks(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(b => {
    const matchesSearch = (b.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const matchesCat = activeCategory === 'All' || (b.category?.toLowerCase() === activeCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="section-container pt-32 pb-32">
      {/* Header */}
      <div className="mb-12 md:mb-20 animate-fade-in text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-brand-purple/5 px-4 py-1.5 rounded-full mb-6 border border-brand-purple/10">
          <Sparkles size={14} className="text-brand-purple" />
          <span className="text-[11px] font-bold uppercase tracking-tight text-brand-purple">Library Catalog Active</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold tracking-tight text-brand-dark leading-[0.9] mb-4">
          Browse our <span className="text-brand-purple">Books</span>.
        </h1>
        <p className="text-brand-dark/40 max-w-xl font-medium mx-auto md:mx-0">Explore over 1000+ Tamil and English eBooks curated for students and lifelong learners.</p>
      </div>

      {/* Control Bar */}
      <div className="space-y-10 mb-20 md:mb-24">
        <div className="max-w-2xl mx-auto md:mx-0 relative group">
          <div className="absolute inset-0 bg-brand-purple/5 blur-2xl group-focus-within:bg-brand-purple/10 transition-all" />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-dark/20 group-focus-within:text-brand-purple transition-all" size={20} />
          <input 
            type="text" 
            placeholder="Search books, authors, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-16 bg-white border border-brand-purple/5 rounded-2xl pl-16 pr-6 text-brand-dark font-medium placeholder:text-brand-dark/20 focus:outline-none focus:ring-4 focus:ring-brand-purple/5 transition-all shadow-sm relative z-10"
          />
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-[0.2em]">Filter by Category</h3>
            <div className="h-px bg-brand-purple/5 grow ml-4" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-3 rounded-xl text-[10px] font-bold transition-all truncate ${activeCategory === 'All' ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20' : 'bg-white border border-brand-purple/5 text-brand-dark/40 hover:text-brand-dark hover:border-brand-purple/20'}`}
            >
              All Categories
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-3 rounded-xl text-[10px] font-bold transition-all truncate ${activeCategory === cat.name ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20' : 'bg-white border border-brand-purple/5 text-brand-dark/40 hover:text-brand-dark hover:border-brand-purple/20'}`}
                title={cat.name}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse space-y-6">
                <div className="aspect-[3.2/4] bg-brand-purple/5 rounded-[32px]" />
                <div className="h-6 w-3/4 bg-brand-purple/5 rounded-full" />
                <div className="h-4 w-1/2 bg-brand-purple/5 rounded-full" />
              </div>
            ))
          ) : filteredBooks.length > 0 ? filteredBooks.map((book, index) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              key={book.id}
              className="group cursor-pointer flex flex-col"
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <div className="relative aspect-[3.1/4] overflow-hidden rounded-[32px] mb-6 shadow-sm group-hover:shadow-premium transition-all duration-500">
                <img 
                  src={book.coverUrl} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={book.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent transition-opacity group-hover:opacity-60" />
                
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(book); }}
                  className={`absolute top-5 right-5 w-12 h-12 rounded-xl transition-all flex items-center justify-center border border-white/20 backdrop-blur-md ${wishlist.includes(book.id) ? 'bg-brand-gold text-brand-dark border-brand-gold' : 'bg-white/10 text-white hover:bg-white hover:text-brand-purple'}`}
                >
                  <Heart size={20} fill={wishlist.includes(book.id) ? "currentColor" : "none"} />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-md backdrop-blur-md border border-brand-gold/20 mb-3 inline-block">
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
                  className="w-14 h-14 bg-white border border-brand-purple/10 text-brand-dark rounded-2xl flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all shadow-sm group/btn active:scale-95"
                >
                  <Plus size={24} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-40 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-24 h-24 bg-brand-purple/5 rounded-full flex items-center justify-center text-brand-purple/20 mb-8 border border-dashed border-brand-purple/20">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-display font-extrabold text-brand-dark mb-2 tracking-tight">No eBooks Found</h3>
              <p className="text-brand-dark/40 max-w-xs mx-auto font-medium">Try a different search term or category.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-8 text-sm font-bold text-brand-purple hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Browse;
