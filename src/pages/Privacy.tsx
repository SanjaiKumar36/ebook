import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Eye, Server, RefreshCw, Lock, ShieldCheck, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="section-container pt-32 pb-32">
       {/* Header */}
       <div className="mb-16 animate-fade-in text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 px-4 py-1.5 rounded-full mb-6 border border-brand-gold/20">
            <Lock size={14} className="text-brand-gold" />
            <span className="text-[11px] font-bold uppercase tracking-tight text-brand-gold">Encryption Protocol v2.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-brand-dark leading-[0.9] mb-4">
            Security & <span className="text-brand-purple">Privacy.</span>
          </h1>
          <p className="text-brand-dark/40 max-w-xl font-medium">Protecting your intellectual signals with high-fidelity encryption.</p>
       </div>

       <div className="max-w-4xl mx-auto">
          <div className="glass-card !p-10 md:!p-20 border-brand-purple/5 shadow-premium">
             <div className="space-y-20">
                {[
                  {
                    icon: <Eye className="text-brand-purple" />,
                    title: 'Collection Node',
                    content: 'We only collect the fundamental identifiers necessary for node verification: Email, Name, and Authentication Tokens provided via the Google OAuth gateway. No surplus data is harvested.'
                  },
                  {
                    icon: <Server className="text-brand-gold" />,
                    title: 'Storage Encryption',
                    content: 'Your credentials and purchase history are stored in a secured environment with strict Attribute-Based Access Control (ABAC). We utilize military-grade encryption for all static and transit states.'
                  },
                  {
                    icon: <ShieldAlert className="text-brand-purple" />,
                    title: 'Zero-Traffic Sharing',
                    content: 'ZippyBooks does not lease, sell, or broadcast your user signal to third-party marketing entities. Your data remains isolated within our cognitive network context.'
                  },
                  {
                    icon: <RefreshCw className="text-brand-gold" />,
                    title: 'Data Purge Protocol',
                    content: 'You maintain the right to terminate your account and request a total cleanup of your data node. Such requests are processed within a standard 72-hour synchronization window.'
                  }
                ].map((section, i) => (
                  <motion.section 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-6"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-brand-purple/5 rounded-xl flex items-center justify-center">
                           {section.icon}
                        </div>
                        <h3 className="text-xl font-display font-extrabold tracking-tight text-brand-dark uppercase">
                          {i + 1}. {section.title}
                        </h3>
                     </div>
                     <p className="text-lg text-brand-dark/50 leading-relaxed italic font-medium ml-14">
                        {section.content}
                     </p>
                  </motion.section>
                ))}

                <div className="pt-12 border-t border-brand-purple/5">
                   <div className="flex flex-col items-center justify-center gap-4 text-brand-dark/20 text-[10px] font-bold uppercase tracking-[0.3em] text-center">
                      <ShieldCheck size={24} className="text-brand-purple/20 mb-2" />
                      Protocol Integrity Verified by ZippyBooks Security Node
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Privacy;
