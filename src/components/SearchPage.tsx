import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Camera, Mic, SlidersHorizontal, Sparkles, ArrowRight, History, TrendingUp } from 'lucide-react';
import ProductCard, { Product } from './ProductCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const placeholders = [
    "I need a quiet keyboard for working late...",
    "Show me minimalist desk lamps under $100...",
    "Find noise-canceling headphones for travel...",
    "Looking for an ergonomic chair for back pain..."
  ];

  const recentSearches = [
    "wireless mechanical keyboard",
    "standing desk converter",
    "ultrawide monitor"
  ];

  const trendingSearches = [
    "noise-canceling headphones",
    "ergonomic office chair",
    "smart home lighting"
  ];

  const suggestions = [
    "quiet keyboard for office",
    "quiet mechanical keyboard",
    "quiet keyboard and mouse combo"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const products: Product[] = [
    { id: 1, name: 'Sony WH-1000XM5', price: 398, rating: 4.8, reviews: 1245, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400', aiReason: 'Industry-leading noise cancellation, perfect for travel.', category: 'Audio' },
    { id: 2, name: 'Minimalist Desk Lamp', price: 89, rating: 4.5, reviews: 320, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400', category: 'Home' },
    { id: 3, name: 'Ergonomic Chair', price: 450, rating: 4.9, reviews: 890, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=400', aiReason: 'Highly rated for back support during long working hours.', category: 'Furniture' },
    { id: 4, name: 'Mechanical Keyboard', price: 150, rating: 4.7, reviews: 540, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400', category: 'Tech' },
    { id: 9, name: 'Ultrawide Curved Monitor', price: 799, rating: 4.6, reviews: 412, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400', aiReason: 'Great for productivity and immersive gaming.', category: 'Tech' },
    { id: 10, name: 'Wireless Charging Pad', price: 35, rating: 4.3, reviews: 890, image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&q=80&w=400', category: 'Tech' },
    { id: 11, name: 'Smart Home Speaker', price: 129, rating: 4.8, reviews: 2100, image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=400', aiReason: 'Seamlessly integrates with your existing smart home setup.', category: 'Audio' },
    { id: 12, name: 'Standing Desk Converter', price: 199, rating: 4.5, reviews: 345, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400', category: 'Furniture' },
  ];

  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery) return;
    setQuery(searchQuery);
    setIsSearching(true);
    setIsFocused(false);
    setTimeout(() => setIsSearching(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">AI Product Search</h1>
          <p className="text-[var(--text-secondary)]">Describe what you're looking for in natural language.</p>
        </div>
      </div>

      <div className="relative group z-50" ref={searchContainerRef}>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
        <div className={`relative flex flex-col glass rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ${isFocused ? 'ring-2 ring-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)]' : ''}`}>
          <div className="flex items-center p-2">
            <Search className="w-6 h-6 text-[var(--text-secondary)] ml-4 shrink-0" />
            <div className="relative flex-1 h-14 flex items-center">
              <AnimatePresence mode="wait">
                {!query && !isFocused && (
                  <motion.div
                    key={placeholderIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-4 text-[var(--text-secondary)]/70 text-lg pointer-events-none whitespace-nowrap overflow-hidden text-ellipsis right-0"
                  >
                    {placeholders[placeholderIndex]}
                  </motion.div>
                )}
              </AnimatePresence>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={isFocused ? "Ask anything..." : ""}
                className="w-full h-full bg-transparent border-none outline-none px-4 text-lg relative z-10 placeholder-[var(--text-secondary)]/50"
              />
            </div>
            <div className="flex items-center gap-2 pr-2 shrink-0">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-secondary)] transition-colors">
                <Mic className="w-5 h-5" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-secondary)] transition-colors">
                <Camera className="w-5 h-5" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => handleSearch()}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors relative overflow-hidden"
              >
                {isSearching ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ) : (
                  "Search"
                )}
              </motion.button>
            </div>
          </div>

          {/* Autocomplete & Suggestions Dropdown */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-black/5 dark:border-white/5 overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-md"
              >
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {query ? (
                    <div className="space-y-4 col-span-full">
                      <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Suggestions</h3>
                      <ul className="space-y-2">
                        {suggestions.map((suggestion, idx) => (
                          <li key={idx}>
                            <button 
                              onClick={() => handleSearch(suggestion)}
                              className="w-full text-left px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-3 transition-colors"
                            >
                              <Search className="w-4 h-4 text-[var(--text-secondary)]" />
                              <span>
                                <span className="font-semibold">{query}</span>
                                {suggestion.replace(query.toLowerCase(), '')}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                          <History className="w-4 h-4" /> Recent
                        </h3>
                        <ul className="space-y-2">
                          {recentSearches.map((search, idx) => (
                            <li key={idx}>
                              <button 
                                onClick={() => handleSearch(search)}
                                className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-between group transition-colors"
                              >
                                <span>{search}</span>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" /> Trending
                        </h3>
                        <ul className="space-y-2">
                          {trendingSearches.map((search, idx) => (
                            <li key={idx}>
                              <button 
                                onClick={() => handleSearch(search)}
                                className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-3 transition-colors"
                              >
                                <Search className="w-4 h-4 text-[var(--text-secondary)]" />
                                <span>{search}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full sm:w-auto">
          {['All', 'Tech', 'Home', 'Audio', 'Furniture'].map((tag) => (
            <motion.button 
              key={tag} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(tag)}
              className={`px-4 py-2 rounded-full glass text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === tag 
                  ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30' 
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </motion.button>
      </div>

      {/* AI Recommendation Panel */}
      {!isSearching && query && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-indigo-500 text-white shrink-0 shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2">AI Assistant Analysis</h3>
              <p className="text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed">
                Based on your search for "{query}", I recommend prioritizing noise cancellation and battery life. The Sony WH-1000XM5 is currently the top-rated option in this category, but if you're looking for something more budget-friendly, I've included some excellent alternatives below.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isSearching ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass rounded-3xl overflow-hidden animate-shimmer h-[320px]" />
          ))
        ) : (
          products
            .filter(product => activeCategory === 'All' || product.category === activeCategory)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        )}
      </div>
    </div>
  );
}
