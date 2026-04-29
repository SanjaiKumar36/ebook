import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Download, ShieldCheck, Lock, Sparkles, Database, ChevronRight, Zap, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Book } from '../types';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchPurchases();
  }, [user]);

  const fetchPurchases = async () => {
    if (!user) return;
    try {
      const q = collection(db, 'users', user.uid, 'library');
      const snap = await getDocs(q);
      const bks: Book[] = [];
      snap.forEach(d => {
        bks.push({ id: d.id, ...d.data() } as Book);
      });
      setPurchases(bks);
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, `users/${user.uid}/library`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (bookId: string) => {
    if (!user) return;
    try {
      const response = await fetch(`/api/download/${bookId}?userId=${user.uid}`);
      const data = await response.json();
      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
      } else {
        alert(data.error || 'Failed to get download link');
      }
    } catch (err) {
      alert('Download error');
    }
  };

  return (
    <div className="section-container pt-32 pb-32">
       {/* Header */}
       <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16 animate-fade-in">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-brand-purple/5 px-4 py-1.5 rounded-full mb-6 border border-brand-purple/10">
              <Database size={14} className="text-brand-purple" />
              <span className="text-[11px] font-bold uppercase tracking-tight text-brand-purple">Personal Library Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-brand-dark leading-[0.9] mb-4">
              My <span className="text-brand-purple">Library.</span>
            </h1>
            <p className="text-brand-dark/40 max-w-xl font-medium">Your collection of purchased eBooks and learning materials.</p>
          </div>
          
          <div className="flex items-center gap-6 bg-white/50 p-6 rounded-[32px] border border-brand-purple/5 shadow-sm">
             <div className="flex flex-col items-center border-r border-brand-purple/5 pr-6">
                <span className="text-2xl font-display font-extrabold text-brand-purple">{purchases.length}</span>
                <span className="text-[10px] font-bold text-brand-dark/20 uppercase tracking-widest">Books</span>
             </div>
             <div className="flex items-center gap-2 text-brand-gold bg-brand-gold/5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-brand-gold/10">
                <ShieldCheck size={14} /> Purchased
             </div>
          </div>
       </div>

       {/* Search in Library */}
       <div className="mb-16 relative group max-w-2xl mx-auto md:mx-0">
          <div className="absolute inset-0 bg-brand-purple/5 blur-2xl group-focus-within:bg-brand-purple/10 transition-all" />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-dark/20 group-focus-within:text-brand-purple transition-all" size={20} />
          <input 
            type="text" 
            placeholder="Search your library..."
            className="w-full h-16 bg-white border border-brand-purple/5 rounded-2xl pl-16 pr-6 text-brand-dark font-medium placeholder:text-brand-dark/20 focus:outline-none focus:ring-4 focus:ring-brand-purple/5 transition-all shadow-sm relative z-10"
          />
       </div>

       {/* Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-48 bg-brand-purple/5 rounded-[40px] animate-pulse" />
              ))
            ) : purchases.length > 0 ? purchases.map((book, i) => (
              <motion.div 
                layout 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                key={book.id} 
                className="glass-card border-brand-purple/5 !p-6 flex items-center gap-6 group hover:bg-white hover:shadow-premium"
              >
                  <div className="w-24 aspect-[3/4.2] rounded-2xl overflow-hidden shrink-0 shadow-lg border border-brand-purple/5 group-hover:scale-105 transition-transform duration-500 relative">
                    <img src={book.coverUrl} className="w-full h-full object-cover" alt={book.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                  </div>
                  <div className="grow min-w-0">
                    <h4 className="font-display font-extrabold text-xl text-brand-dark leading-tight mb-2 truncate group-hover:text-brand-purple transition-colors">{book.title}</h4>
                    <p className="text-[11px] font-bold text-brand-dark/40 uppercase tracking-widest mb-6 truncate">{book.authorName}</p>
                    
                    <div className="flex gap-2">
                       <button 
                        onClick={() => navigate(`/reader/${book.id}`)}
                        className="h-11 px-5 bg-brand-purple text-white rounded-xl font-bold text-[11px] shadow-lg shadow-brand-purple/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-2"
                       >
                         <BookOpen size={14} /> Open
                       </button>
                       <button 
                        onClick={() => handleDownload(book.id)}
                        className="w-11 h-11 bg-brand-purple/5 text-brand-purple border border-brand-purple/5 rounded-xl flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all active:scale-95"
                       >
                         <Download size={18} />
                       </button>
                    </div>
                  </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-40 border-4 border-dashed border-brand-purple/5 rounded-[64px] bg-brand-purple/[0.02] flex flex-col items-center justify-center text-center animate-fade-in">
                 <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-brand-purple/20 mb-8 shadow-sm">
                   <Lock size={40} />
                 </div>
                 <h3 className="text-2xl font-display font-extrabold text-brand-dark mb-2 tracking-tight">Library is Empty.</h3>
                 <p className="text-brand-dark/40 max-w-xs mx-auto font-medium mb-10">You haven't purchased any eBooks yet. Explore our collection to get started.</p>
                 <button 
                  onClick={() => navigate('/browse')} 
                  className="premium-button-purple h-16 px-10"
                 >
                   Browse Books <ChevronRight size={18} className="ml-1" />
                 </button>
              </div>
            )}
          </AnimatePresence>
       </div>
       
       {/* Support Section */}
       <div className="mt-32 p-12 glass-card border-brand-purple/5 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold">
                <Sparkles size={24} />
             </div>
             <div>
                <h4 className="font-display font-extrabold text-xl">Need help with your library?</h4>
                <p className="text-sm font-medium text-brand-dark/40">Our support team is here to assist you with any reading or access issues.</p>
             </div>
          </div>
          <button className="h-14 px-8 border border-brand-purple/10 rounded-2xl font-bold text-sm text-brand-dark hover:bg-brand-purple/5 transition-all">Contact Support</button>
       </div>
    </div>
  );
};

export default Orders;
