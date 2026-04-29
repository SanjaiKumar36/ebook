import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-32">

      {/* HERO */}
      <section className="section-container mb-32 text-center lg:text-left">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-1.5 rounded-full mb-6">
              <Sparkles size={14} className="text-purple-600" />
              <span className="text-xs font-semibold text-purple-600">
                Since 2024
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              Redefining <br />
              <span className="text-purple-600">Learning</span>
            </h1>

            <p className="text-gray-500 text-lg max-w-xl">
              ZippyBooks helps you learn faster, publish smarter, and grow your knowledge with modern digital books.
            </p>
          </div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-purple-600 text-white p-6 rounded-2xl">
              <Zap />
              <h2 className="text-3xl font-bold mt-2">Fast</h2>
              <p className="text-xs opacity-70">Instant Access</p>
            </div>

            <div className="bg-yellow-400 p-6 rounded-2xl">
              <Users />
              <h2 className="text-3xl font-bold mt-2">Users</h2>
              <p className="text-xs opacity-70">Growing Daily</p>
            </div>

            <div className="col-span-2 bg-black text-white p-6 rounded-2xl flex justify-between">
              <div>
                <h2 className="text-3xl font-bold">Secure</h2>
                <p className="text-xs opacity-70">Safe Platform</p>
              </div>
              <ShieldCheck />
            </div>
          </motion.div>

        </div>
      </section>

      {/* STORY */}
      <section className="bg-white py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why ZippyBooks?
          </h2>

          <p className="text-gray-500 text-lg leading-relaxed">
            Learning today is slow, expensive, and confusing.  
            ZippyBooks changes that by making knowledge simple, fast, and accessible.
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section-container my-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <div>
            <p className="text-sm text-purple-600 font-semibold mb-2">
              Founder
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Sanjai Kumar
            </h2>

            <p className="text-gray-500 text-lg mb-6">
              Founder & CEO of ZippyBooks. Building a platform where knowledge becomes powerful, accessible, and affordable.
            </p>

            <div className="flex gap-8">
              <div>
                <h3 className="text-xl font-bold">2024</h3>
                <p className="text-xs text-gray-400">Started</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Growing</h3>
                <p className="text-xs text-gray-400">Startup</p>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-3 bg-purple-200 blur-xl rounded-3xl opacity-30 group-hover:opacity-60 transition" />

              <img
                src="/founder.jpg"
                alt="Founder"
                className="w-72 h-96 object-cover rounded-3xl shadow-xl transition group-hover:scale-105"
              />
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          Ready to Start?
        </h2>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/browse')}
            className="bg-purple-600 text-white px-8 py-3 rounded-xl flex items-center gap-2"
          >
            Explore Books <ArrowRight size={16} />
          </button>

          <button
            onClick={() => navigate('/become-author')}
            className="border px-8 py-3 rounded-xl"
          >
            Become Author
          </button>
        </div>
      </section>

    </div>
  );
};

export default About;