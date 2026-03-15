import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Heart, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import ProductCard, { Product } from './ProductCard';

export default function RecommendationsPage() {
  const [isCurating, setIsCurating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsCurating(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const recommendations = [
    {
      title: "Because you bought a MacBook Pro",
      items: [
        { id: 1, name: 'USB-C Hub Multiport', price: 49, rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1616410011236-7a42121dd981?auto=format&fit=crop&q=80&w=400', aiReason: 'Essential for connecting your legacy devices to your new MacBook.' },
        { id: 2, name: 'Laptop Sleeve 14"', price: 35, rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400', aiReason: 'Perfect fit for your 14" model, offering premium protection.' },
        { id: 3, name: 'Magic Mouse', price: 79, rating: 4.5, reviews: 432, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=400' },
        { id: 4, name: 'Pro Display Stand', price: 129, rating: 4.7, reviews: 56, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400' },
        { id: 13, name: 'Portable SSD 1TB', price: 119, rating: 4.8, reviews: 892, image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=400', aiReason: 'Fast external storage for your video editing projects.' },
        { id: 14, name: 'Screen Cleaning Kit', price: 15, rating: 4.6, reviews: 210, image: 'https://images.unsplash.com/photo-1585247226801-bc613c441316?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    {
      title: "Trending in Minimalist Workspace",
      items: [
        { id: 5, name: 'Monitor Light Bar', price: 59, rating: 4.6, reviews: 210, image: 'https://images.unsplash.com/photo-1517732306149-e8f829eb588a?auto=format&fit=crop&q=80&w=400', aiReason: 'Matches your preference for clean, well-lit desk setups.' },
        { id: 6, name: 'Desk Mat', price: 29, rating: 4.8, reviews: 340, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=400' },
        { id: 7, name: 'Wireless Charger', price: 45, rating: 4.4, reviews: 156, image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&q=80&w=400' },
        { id: 8, name: 'Ergonomic Wrist Rest', price: 25, rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400' },
        { id: 15, name: 'Cable Management Box', price: 22, rating: 4.5, reviews: 450, image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=400', aiReason: 'Keep your minimalist desk free of cable clutter.' },
        { id: 16, name: 'Aluminum Laptop Stand', price: 45, rating: 4.8, reviews: 670, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=400' },
      ]
    },
    {
      title: "Audio Enthusiast Picks",
      items: [
        { id: 17, name: 'Studio Monitor Speakers', price: 299, rating: 4.9, reviews: 120, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=400', aiReason: 'Flat response curve for accurate audio mixing.' },
        { id: 18, name: 'DAC/Amp Combo', price: 149, rating: 4.7, reviews: 340, image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400' },
        { id: 19, name: 'Acoustic Panels (6-Pack)', price: 45, rating: 4.5, reviews: 560, image: 'https://images.unsplash.com/photo-1516280440502-62f54260a17a?auto=format&fit=crop&q=80&w=400', aiReason: 'Improve your room acoustics for better sound quality.' },
        { id: 20, name: 'Over-Ear Open Back Headphones', price: 349, rating: 4.8, reviews: 890, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&q=80&w=400' },
      ]
    }
  ];

  if (isCurating) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/40 relative"
        >
          <div className="absolute inset-0 rounded-full border-2 border-indigo-400/50 animate-ping" />
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-3xl font-display font-bold mb-4 text-gradient bg-gradient-animate">AI is curating your boutique...</h2>
        <p className="text-[var(--text-secondary)] max-w-md">Analyzing your style preferences, past purchases, and current trends to find the perfect matches.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <div className="glass rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI Curated
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Your Personal Boutique</h1>
          <p className="text-[var(--text-secondary)] max-w-xl">
            We've analyzed your style preferences and recent purchases to curate these perfect matches just for you.
          </p>
        </div>
      </div>

      {recommendations.map((section, idx) => (
        <RecommendationSection key={idx} section={section} />
      ))}
    </motion.div>
  );
}

const RecommendationSection: React.FC<{ section: any }> = ({ section }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const scrollContainer = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 relative group">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{section.title}</h2>
        <div className="flex items-center gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => scrollContainer('left')}
            className="p-2 rounded-full glass hover:bg-black/5 dark:hover:bg-white/5 transition-colors hidden md:block"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => scrollContainer('right')}
            className="p-2 rounded-full glass hover:bg-black/5 dark:hover:bg-white/5 transition-colors hidden md:block"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar scroll-smooth"
      >
        {section.items.map((item: any) => (
          <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-start shrink-0">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
