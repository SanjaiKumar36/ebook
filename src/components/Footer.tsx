import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Twitter, Github, Instagram, ArrowUpRight } from 'lucide-react';
import Admin from '../pages/Admin';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white pt-32 pb-16 border-t border-brand-purple/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full -mr-48 -mt-48" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-24">
          <div className="lg:col-span-2">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-purple rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-purple/20">
                  <img src="/zippy_logo.png" alt="Logo" className="w-7 h-7" />
                </div>
                <span className="text-3xl font-display font-extrabold tracking-tighter text-brand-dark uppercase">ZIPPY<span className="text-brand-purple">BOOKS.</span></span>
             </div>
             <p className="text-xl text-brand-dark/40 font-medium max-w-sm mb-10 leading-relaxed italic">
                Affordable Tamil & English eBooks for students and learners. Read Smarter. Learn Faster.
             </p>
             <div className="flex gap-4">
                {[
                  { icon: <Twitter size={18} />, label: 'Twitter' },
                  { icon: <Github size={18} />, label: 'Github' },
                  { icon: <Instagram size={18} />, label: 'Instagram' }
                ].map((social, i) => (
                  <button key={i} className="w-12 h-12 rounded-xl bg-brand-purple/[0.03] border border-brand-purple/5 flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-all shadow-sm">
                    {social.icon}
                  </button>
                ))}
             </div>
          </div>

          <div>
             <h4 className="text-[11px] font-bold text-brand-purple uppercase tracking-[0.3em] mb-10">Navigation</h4>
             <ul className="space-y-4">
                {[
                  { label: 'Browse Books', path: '/browse' },
                  { label: 'About Us', path: '/about' },
                  { label: 'Publish with Us', path: '/become-author' },
                  { label: 'Our Mission', path: '/about' },
                  {label:'Admin panel', path:'/admin'}
                ].map((link, i) => (
                  <li key={i}>
                    <Link to={link.path} className="text-sm font-bold text-brand-dark/60 hover:text-brand-purple transition-colors flex items-center gap-1 group">
                      {link.label} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
             </ul>
          </div>

          <div>
             <h4 className="text-[11px] font-bold text-brand-purple uppercase tracking-[0.3em] mb-10">Trust & Quality</h4>
             <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm font-bold text-brand-dark/60 uppercase tracking-tight">
                  <ShieldCheck size={18} className="text-green-500/50" /> 1000+ Verified Books
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-brand-dark/60 uppercase tracking-tight">
                  <Lock size={18} className="text-brand-purple/50" /> Secure Payments
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-brand-dark/60 uppercase tracking-tight">
                  <div className="w-4 h-4 bg-brand-gold/20 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  </div> Instant Access
                </li>
             </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-purple/5 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
              <p className="text-[10px] font-bold text-brand-dark/20 uppercase tracking-[0.3em]">
                © 2026 ZippyBooks. Read Smarter. Learn Faster.
              </p>
              <p className="text-[10px] font-medium text-brand-dark/10 italic">
                "கற்க கசடற கற்பவை கற்பின் நிற்க அதற்குத் தக."
              </p>
           </div>
           <div className="flex gap-8 text-[10px] font-bold text-brand-dark/20 uppercase tracking-[0.3em]">
              <Link to="/privacy" className="hover:text-brand-purple transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-brand-purple transition-colors">Terms of Service</Link>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
