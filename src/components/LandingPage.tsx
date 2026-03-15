import React from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, ArrowRight, ShoppingBag, Zap, Shield, TrendingUp, Star } from 'lucide-react';

interface Props {
  onNavigate: (page: any) => void;
}

export default function LandingPage({ onNavigate }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center relative">
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden lg:block">
        <motion.div 
          className="absolute top-[10%] left-[5%] glass-panel p-4 rounded-3xl animate-float"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="text-left">
              <p className="text-xs text-[var(--text-secondary)]">AI Match</p>
              <p className="text-sm font-bold">99.8% Accuracy</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute top-[20%] right-[5%] glass-panel p-4 rounded-3xl animate-float-delayed"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-left">
              <p className="text-xs text-[var(--text-secondary)]">Sales Prediction</p>
              <p className="text-sm font-bold text-emerald-500">+42% Revenue</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-[20%] left-[10%] glass-panel p-3 rounded-2xl animate-float-delayed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 mb-8 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-semibold tracking-wide uppercase">The Future of Retail is Here</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-6 leading-[1.1]"
        >
          Shop smarter with <br />
          <span className="animate-text-shimmer">AI-Powered Retail</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mb-12 leading-relaxed"
        >
          Experience hyper-personalized shopping, intelligent search, and predictive inventory management all in one seamless platform.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px -10px rgba(99,102,241,0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('search')}
            className="px-10 py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-500/30 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <Search className="w-6 h-6" />
            Try AI Search
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('retailer')}
            className="px-10 py-5 rounded-2xl glass-panel font-bold text-lg flex items-center justify-center gap-3 transition-all"
          >
            Retailer Dashboard
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full relative z-10"
      >
        {[
          { icon: Zap, title: 'Lightning Fast', desc: 'Semantic search finds exactly what you mean, not just what you type.' },
          { icon: ShoppingBag, title: 'Smart Cart', desc: 'AI suggests complementary items you actually need in real-time.' },
          { icon: Shield, title: 'Predictive Stock', desc: 'Never run out of bestsellers with ML-driven inventory forecasting.' }
        ].map((feature, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -12, scale: 1.03, rotateX: 5, rotateY: 5 }}
            className="p-8 rounded-[2rem] glass-panel text-left transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 border border-[var(--glass-border)] hover:border-indigo-500/30 group"
            style={{ transformPerspective: 1000 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <feature.icon className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3">{feature.title}</h3>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
