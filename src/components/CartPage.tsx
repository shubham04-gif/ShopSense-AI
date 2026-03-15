import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Props {
  onNavigate: (page: any) => void;
}

export default function CartPage({ onNavigate }: Props) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-display font-bold mb-6"
        >
          Shopping Cart
        </motion.h1>
        
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {cartItems.map((item, i) => (
              <motion.div 
                layout
                key={item.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 25 }}
                className="glass rounded-3xl p-4 flex gap-6 items-center group"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 relative">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg group-hover:text-indigo-500 transition-colors">{item.name}</h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-3">In Stock</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 glass rounded-xl px-3 py-1">
                      <motion.button 
                        whileHover={{ scale: 1.2, color: 'var(--color-indigo-500)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <motion.span 
                        key={item.quantity}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-medium w-4 text-center"
                      >
                        {item.quantity}
                      </motion.span>
                      <motion.button 
                        whileHover={{ scale: 1.2, color: 'var(--color-indigo-500)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(248, 113, 113, 0.1)' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                <div className="text-xl font-bold">${item.price * item.quantity}</div>
              </motion.div>
            ))}
          </AnimatePresence>
          {cartItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-[var(--text-secondary)]"
            >
              Your cart is empty.
            </motion.div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-6 bg-indigo-500/5 border-indigo-500/20 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div className="flex items-start gap-4 relative z-10">
            <motion.div 
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0"
            >
              <Sparkles className="w-5 h-5 text-indigo-500" />
            </motion.div>
            <div>
              <h4 className="font-semibold mb-1">AI Suggestion</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-3">People who bought the Sony headphones also frequently buy a headphone stand.</p>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-xl transition-colors"
              >
                Add Stand for $29
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="lg:col-span-1">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-6 sticky top-6"
        >
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Subtotal</span>
              <span className="font-medium">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Shipping</span>
              <span className="font-medium text-green-500">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Tax</span>
              <span className="font-medium">${(subtotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="h-px bg-[var(--glass-border)] w-full my-4" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <motion.span 
                key={subtotal}
                initial={{ scale: 1.2, color: '#6366f1' }}
                animate={{ scale: 1, color: 'var(--text-primary)' }}
              >
                ${(subtotal * 1.08).toFixed(2)}
              </motion.span>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('checkout')}
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-500/25"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
