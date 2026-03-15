import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingCart, Eye, Sparkles, X, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export interface Product {
  id: string | number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  aiReason?: string;
  description?: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <motion.div
        className="relative group rounded-3xl bg-white dark:bg-[#141414] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -12, scale: 1.02, rotateX: 2, rotateY: -2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ transformPerspective: 1000 }}
      >
        {/* AI Badge */}
        {product.aiReason && (
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Pick</span>
            </div>
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Hover Overlay Actions */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center gap-3 backdrop-blur-[2px]"
              >
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQuickView(true);
                  }}
                  className="w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-800/90 text-zinc-900 dark:text-white flex items-center justify-center hover:bg-white dark:hover:bg-zinc-700 hover:scale-110 transition-all shadow-lg"
                >
                  <Eye className="w-5 h-5" />
                </motion.button>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: 0.15 }}
                  onClick={handleAddToCart}
                  className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg ${
                    addedToCart 
                      ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
                      : 'bg-indigo-500 text-white shadow-indigo-500/30 hover:bg-indigo-600'
                  }`}
                >
                  {addedToCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-1 text-zinc-900 dark:text-white">
              {product.name}
            </h3>
            <span className="font-bold text-lg text-zinc-900 dark:text-white ml-3">
              ${product.price}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="mt-auto pt-2 space-y-2">
            {product.aiReason && (
              <div className="text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-2 rounded-xl line-clamp-2">
                <span className="font-medium">Why you'll love it:</span> {product.aiReason}
              </div>
            )}
            <button 
              onClick={handleAddToCart}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                addedToCart
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-4 h-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Quick Add
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuickView(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#141414] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowQuickView(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              </button>

              <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-zinc-100 dark:bg-zinc-800 relative shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.aiReason && (
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/30">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Recommended Match</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-display font-bold mb-2 text-zinc-900 dark:text-white">{product.name}</h2>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-2xl font-bold text-zinc-900 dark:text-white">${product.price}</span>
                  <div className="flex items-center gap-1 text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{product.rating}</span>
                    <span className="text-xs text-amber-600/70 dark:text-amber-400/70 ml-1">({product.reviews})</span>
                  </div>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                  {product.description || "Experience the perfect blend of style and functionality. This premium item has been specifically selected for you based on your unique preferences and past purchases."}
                </p>

                {product.aiReason && (
                  <div className="mb-8 p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-100 dark:border-indigo-500/20">
                    <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-semibold">
                      <Sparkles className="w-4 h-4" />
                      Why it's a match
                    </div>
                    <p className="text-sm text-indigo-900/80 dark:text-indigo-200/80 leading-relaxed">
                      {product.aiReason}
                    </p>
                  </div>
                )}

                <div className="flex gap-4 mt-auto">
                  <button 
                    onClick={handleAddToCart}
                    className={`flex-1 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:-translate-y-0.5 ${
                      addedToCart
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30 hover:shadow-emerald-500/50'
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
