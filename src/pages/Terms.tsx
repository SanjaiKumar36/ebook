import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, FileText, ChevronRight, Zap, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="section-container pt-32 pb-32">
       {/* Header */}
       <div className="mb-16 animate-fade-in text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-brand-purple/5 px-4 py-1.5 rounded-full mb-6 border border-brand-purple/10">
            <Info size={14} className="text-brand-purple" />
            <span className="text-[11px] font-bold uppercase tracking-tight text-brand-purple">Operational Governance v1.4</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-brand-dark leading-[0.9] mb-4">
            Terms of <span className="text-brand-purple">Service.</span>
          </h1>
          <p className="text-brand-dark/40 max-w-xl font-medium">Clear, enforceable protocols for a high-integrity network.</p>
       </div>

       <div className="max-w-4xl mx-auto">
          <div className="glass-card !p-10 md:!p-20 border-brand-purple/5 shadow-premium">
             <div className="space-y-20">
                {[
                  {
                    icon: <FileText className="text-brand-purple" />,
                    title: 'Acceptance Protocol',
                    content: 'By accessing the ZippyBooks node (The "Platform"), you cryptographically agree to be bound by these Terms of Service. If you do not agree to all terms, you must terminate your session immediately.'
                  },
                  {
                    icon: <Lock className="text-brand-purple" />,
                    title: 'Intellectual Allocation',
                    content: 'All "Blueprints" and "Assets" acquired through the Platform are licensed, not sold. Users are granted a non-transferable node access for personal cognitive development. Redistribution, decryption, or unauthorized synchronization is strictly prohibited.'
                  },
                  {
                    icon: <Shield className="text-brand-gold" />,
                    title: 'Author Responsibility',
                    content: 'Authors are responsible for the integrity of their deployed manuscripts. ZippyBooks acts as a decentralized repository and does not assume liability for specific operational results from applying the knowledge assets.'
                  },
                  {
                    icon: <Zap className="text-brand-purple" />,
                    title: 'Refund Handshake',
                    content: 'Due to the instantaneous nature of digital allocation, all transactions finalized with the treasury node are irrevocable. In case of damaged data packets (corrupt files), support nodes will resynchronize the asset at no cost.'
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

                <div className="pt-12 border-t border-brand-purple/5 flex flex-col sm:flex-row items-center justify-between gap-10">
                   <p className="text-[10px] font-bold text-brand-dark/20 uppercase tracking-[0.3em]">Last Synced: April 15, 2026</p>
                   <button 
                    onClick={() => navigate('/browse')}
                    className="premium-button-purple h-14 px-8 text-xs"
                   >
                     Agree & Access <ChevronRight size={14} className="ml-1" />
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Terms;
