import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Zap, ShieldCheck, MessageSquare, Star, Search, BookOpen, ChevronRight, Globe, Layers } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../constants/categories';

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [topPicks, setTopPicks] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setTopPicks(data.slice(0, 4)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-purple/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold/10 blur-[100px] rounded-full" />
        </div>

        <div className="section-container relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-brand-purple/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-purple animate-ping" />
            <span className="text-[11px] font-bold tracking-tight text-brand-purple uppercase">v2.0 Now Live — 1000+ Verified eBooks</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-display font-extrabold tracking-tight text-brand-dark leading-[0.9] mb-8"
          >
            Read Smarter. <br/>
            <span className="text-gradient">Learn Faster.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-brand-dark/60 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          >
            The premium digital library for high-speed learning, technical guides, and curated Tamil & English eBooks.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button onClick={() => navigate('/browse')} className="premium-button-purple w-full sm:w-auto h-16 px-10 group">
              Explore Books <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => navigate('/about')} className="secondary-button w-full sm:w-auto h-16 px-10">
              Our Vision
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="mt-12 text-brand-dark/20 font-display font-medium text-lg italic tracking-widest max-w-2xl mx-auto"
          >
            "கற்க கசடற கற்பவை கற்பின் நிற்க அதற்குத் தக."
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 pt-10 border-t border-brand-purple/5 max-w-4xl mx-auto flex items-center justify-center gap-12 text-center"
          >
             <div>
                <p className="text-3xl font-display font-black tracking-tighter text-brand-dark">1000+</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-brand-dark/30">eBooks</p>
             </div>
             <div>
                <p className="text-3xl font-display font-black tracking-tighter text-brand-dark">500+</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-brand-dark/30">Readers</p>
             </div>
             <div>
                <p className="text-3xl font-display font-black tracking-tighter text-brand-dark">50+</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-brand-dark/30">Authors</p>
             </div>
             <div>
                <p className="text-3xl font-display font-black tracking-tighter text-brand-dark">4.8</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-brand-dark/30">Rating</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Domain Grid */}
      <section className="section-container py-24">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">Browse by Category.</h2>
          <p className="text-brand-dark/40 max-w-xl font-medium">Curated learning paths designed for students and life-long learners seeking deep knowledge.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {CATEGORIES.slice(0, 6).map((cat, i) => (
            <motion.button 
              key={i}
              whileHover={{ y: -8, backgroundColor: '#fdf7ff' }}
              onClick={() => navigate(`/browse?cat=${cat.name}`)} 
              className="bg-white border border-brand-purple/5 p-8 rounded-[32px] transition-all group flex flex-col items-center gap-6 shadow-sm hover:shadow-premium"
            >
              <div className="w-14 h-14 bg-brand-purple/5 rounded-2xl flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-500">
                <cat.icon size={26} />
              </div>
              <span className="font-bold text-xs tracking-tight text-brand-dark/80">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Feature Showcase - Split View */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-8">
              <Zap size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-8 tracking-tight leading-[1.1]">
              Instant access <br/> to premium <br/> <span className="text-brand-purple">Knowledge.</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Instant Digital Delivery', text: 'Proprietary delivery engine ensures your eBooks are ready to read immediately after purchase.', icon: <Globe size={20} /> },
                { title: 'Verified Expert Authors', text: 'Every book is reviewed by our editorial team to ensure accuracy and high-quality learning content.', icon: <ShieldCheck size={20} /> },
                { title: 'Cross-Device Reading', text: 'Access your library on any device, anywhere. Optimized for both smartphones and tablets.', icon: <Layers size={20} /> }
              ].map((feature, i) => (
                <div key={i} className="flex gap-6">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center text-brand-purple">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark text-lg mb-1 tracking-tight">{feature.title}</h4>
                    <p className="text-brand-dark/60 leading-relaxed font-medium text-sm">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-brand-purple/20 blur-[120px] rounded-full scale-150 animate-pulse" />
            <motion.div 
               whileHover={{ rotateY: -10, rotateX: 10 }}
               transition={{ type: 'spring', stiffness: 100 }}
               className="relative glass-card p-4 rounded-[40px] border-brand-purple/10 aspect-square flex flex-col shadow-premium"
            >
              <div className="w-full h-full rounded-[30px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1074" className="w-full h-full object-cover" alt="Reading interface" />
              </div>
              <div className="absolute -bottom-8 -left-8 glass-card p-6 rounded-3xl border-brand-purple/10 flex items-center gap-4">
                 <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-brand-dark/40 uppercase tracking-wider mb-1">Status</p>
                    <p className="font-extrabold text-brand-dark">Quality Verified</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Elite Selection Slider (Simplified Grid) */}
      <section className="py-24 bg-brand-bg/50">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">Featured eBooks.</h2>
              <p className="text-brand-dark/40 font-medium">Bestselling books and new releases curated for your growth.</p>
            </div>
            <button onClick={() => navigate('/browse')} className="secondary-button !h-12 !px-7 group">
              View All Books <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topPicks.map((book) => (
              <motion.div 
                key={book.id}
                whileHover={{ y: -12 }}
                className="bg-white group cursor-pointer p-5 rounded-[40px] shadow-sm hover:shadow-premium transition-all border border-brand-purple/5"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-[32px]">
                  <img src={book.coverUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={book.title} />
                  <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 backdrop-blur-sm">
                    <div className="px-6 py-3 bg-white text-brand-dark font-display font-bold rounded-2xl shadow-xl flex items-center gap-2">
                       Read More <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-lg font-bold text-brand-dark tracking-tight truncate mb-1">{book.title}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-brand-purple font-extrabold text-xl font-display">₹{book.price}</span>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">4.8</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container py-32">
        <div className="bg-brand-purple p-12 md:p-24 rounded-[64px] text-center relative overflow-hidden shadow-2xl shadow-brand-purple/20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/20 blur-[80px] rounded-full -ml-32 -mb-32" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-white mb-10 border border-white/20">
              <Sparkles size={32} />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-6 tracking-tight leading-tight">
              Ready to start your <br/> learning journey?
            </h2>
            <p className="text-white/70 text-lg mb-12 font-medium">Join 500+ readers and expand your knowledge with ZippyBooks.</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
               <button onClick={() => navigate('/login')} className="premium-button-gold h-16 px-12 text-base">
                 Start Reading
               </button>
               <button onClick={() => navigate('/become-author')} className="h-16 px-12 bg-white/10 text-white rounded-2xl font-bold tracking-tight hover:bg-white/20 transition-all border border-white/20">
                 Become an Author
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-brand-purple/5 bg-white">
        <div className="section-container text-center">
          <div className="flex items-center justify-center gap-3 mb-8 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100">
            <BookOpen className="text-brand-purple" size={24} />
            <span className="font-display font-extrabold text-2xl tracking-tighter text-brand-dark">ZippyBooks</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-brand-dark/40 mb-10">
            <Link to="/about" className="hover:text-brand-purple transition-colors">About Us</Link>
            <Link to="/terms" className="hover:text-brand-purple transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-brand-purple transition-colors">Privacy Policy</Link>
          </div>
          <p className="text-[11px] font-bold text-brand-dark/20 uppercase tracking-[0.4em]">© 2026 ZippyBooks. Read Smarter. Learn Faster.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
