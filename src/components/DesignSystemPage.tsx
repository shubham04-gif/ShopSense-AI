import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, Sparkles, ShoppingCart, CreditCard, 
  LayoutDashboard, TrendingUp, BarChart3, Moon, Sun, Menu, X, Store,
  ArrowRight, CheckCircle2, ShieldCheck, Zap, Package, Truck, Lock, Download, ShoppingBag, Plus, Minus
} from 'lucide-react';

export default function DesignSystemPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-24 pb-24">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-5xl font-display font-bold tracking-tight">ShopSense AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Design System</span></h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-3xl">
          A comprehensive guide to the typography, colors, components, and interactions that make up the ShopSense AI interface.
        </p>
      </div>

      {/* 1. Color Palette */}
      <section className="space-y-8">
        <div className="space-y-2 border-b border-[var(--glass-border)] pb-4">
          <h2 className="text-3xl font-display font-bold">1. Color Palette</h2>
          <p className="text-[var(--text-secondary)]">The core colors used across the application. We use a dynamic theme system for light and dark modes.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <ColorSwatch name="Background Primary" varName="--bg-primary" className="bg-[var(--bg-primary)] border border-[var(--glass-border)]" />
          <ColorSwatch name="Background Secondary" varName="--bg-secondary" className="bg-[var(--bg-secondary)] border border-[var(--glass-border)]" />
          <ColorSwatch name="Text Primary" varName="--text-primary" className="bg-[var(--text-primary)]" textClass="text-[var(--bg-primary)]" />
          <ColorSwatch name="Text Secondary" varName="--text-secondary" className="bg-[var(--text-secondary)]" textClass="text-white" />
          <ColorSwatch name="Accent (Indigo)" varName="--accent" className="bg-[var(--accent)]" textClass="text-white" />
          <ColorSwatch name="Success (Emerald)" varName="--success" className="bg-[var(--success)]" textClass="text-white" />
          <ColorSwatch name="Warning (Amber)" varName="--warning" className="bg-[var(--warning)]" textClass="text-white" />
          <ColorSwatch name="Danger (Rose)" varName="--danger" className="bg-[var(--danger)]" textClass="text-white" />
        </div>
      </section>

      {/* 2. Typography */}
      <section className="space-y-8">
        <div className="space-y-2 border-b border-[var(--glass-border)] pb-4">
          <h2 className="text-3xl font-display font-bold">2. Typography</h2>
          <p className="text-[var(--text-secondary)]">We use Space Grotesk for display/headings, Inter for body text, and JetBrains Mono for technical data.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <p className="text-sm text-[var(--text-secondary)] mb-2 font-mono">font-display (Space Grotesk)</p>
              <div className="space-y-4">
                <h1 className="text-5xl font-display font-bold">Heading 1</h1>
                <h2 className="text-4xl font-display font-bold">Heading 2</h2>
                <h3 className="text-3xl font-display font-bold">Heading 3</h3>
                <h4 className="text-2xl font-display font-bold">Heading 4</h4>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-sm text-[var(--text-secondary)] mb-2 font-mono">font-sans (Inter)</p>
              <div className="space-y-4">
                <p className="text-xl">Lead paragraph. The quick brown fox jumps over the lazy dog.</p>
                <p className="text-base">Body text. The quick brown fox jumps over the lazy dog. ShopSense AI uses Inter for maximum legibility at smaller sizes.</p>
                <p className="text-sm text-[var(--text-secondary)]">Small text. Used for secondary information and captions.</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)] mb-2 font-mono">font-mono (JetBrains Mono)</p>
              <div className="space-y-4">
                <p className="text-base font-mono">ORD-84920</p>
                <p className="text-sm font-mono text-[var(--text-secondary)]">0000 0000 0000 0000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Button Styles */}
      <section className="space-y-8">
        <div className="space-y-2 border-b border-[var(--glass-border)] pb-4">
          <h2 className="text-3xl font-display font-bold">3. Button Styles</h2>
          <p className="text-[var(--text-secondary)]">Interactive elements with consistent hover and tap states using Framer Motion.</p>
        </div>

        <div className="flex flex-wrap gap-8 items-center">
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)] font-mono">Primary (Solid)</p>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Primary Action
            </motion.button>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)] font-mono">Secondary (Glass)</p>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-2xl glass hover:bg-black/5 dark:hover:bg-white/5 font-medium flex items-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Secondary Action
            </motion.button>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)] font-mono">Ghost / Outline</p>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-2xl border border-dashed border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-indigo-500 hover:border-indigo-500/50 font-medium flex items-center gap-2 transition-colors dark:hover:bg-white/5"
            >
              <Plus className="w-5 h-5" />
              Add Item
            </motion.button>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)] font-mono">Icon Button</p>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Search className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* 4. Card Styles */}
      <section className="space-y-8">
        <div className="space-y-2 border-b border-[var(--glass-border)] pb-4">
          <h2 className="text-3xl font-display font-bold">4. Card Styles</h2>
          <p className="text-[var(--text-secondary)]">Containers for content. We heavily utilize the "glassmorphism" aesthetic.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)] font-mono">Standard Glass Card</p>
            <div className="glass rounded-3xl p-6">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Payment Details</h3>
              <p className="text-[var(--text-secondary)] text-sm">Standard container for forms, summaries, and grouped content.</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)] font-mono">Interactive Card</p>
            <motion.div 
              whileHover={{ y: -4 }}
              className="glass rounded-3xl p-6 cursor-pointer hover:border-indigo-500/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Track Order</h3>
              <p className="text-[var(--text-secondary)] text-sm">Cards that act as large buttons or links have hover lift effects.</p>
            </motion.div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)] font-mono">Selectable Item</p>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="p-4 rounded-2xl border-2 border-indigo-500 bg-indigo-500/5 shadow-md shadow-indigo-500/10 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold">Selected State</span>
                <CheckCircle2 className="w-5 h-5 text-indigo-500" />
              </div>
              <p className="text-sm text-[var(--text-secondary)]">Used for addresses, payment methods, and variants.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Icons */}
      <section className="space-y-8">
        <div className="space-y-2 border-b border-[var(--glass-border)] pb-4">
          <h2 className="text-3xl font-display font-bold">5. Icons (Lucide React)</h2>
          <p className="text-[var(--text-secondary)]">Consistent 2px stroke width, rounded caps and joins. Standard size is w-5 h-5.</p>
        </div>

        <div className="flex flex-wrap gap-6">
          {[Search, Sparkles, ShoppingCart, CreditCard, LayoutDashboard, TrendingUp, BarChart3, Moon, Sun, Menu, X, Store, ArrowRight, CheckCircle2, ShieldCheck, Zap, Package, Truck, Lock, Download, ShoppingBag].map((Icon, i) => (
            <div key={i} className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <Icon className="w-5 h-5 text-[var(--text-primary)]" />
            </div>
          ))}
        </div>
      </section>

      {/* 6. Form Elements */}
      <section className="space-y-8">
        <div className="space-y-2 border-b border-[var(--glass-border)] pb-4">
          <h2 className="text-3xl font-display font-bold">6. Form Elements</h2>
          <p className="text-[var(--text-secondary)]">Inputs with focus rings and clear labels.</p>
        </div>

        <div className="max-w-md space-y-5 glass p-6 rounded-3xl">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Standard Input</label>
            <input 
              type="text" 
              placeholder="Enter text..." 
              className="w-full bg-black/5 dark:bg-white/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Input with Icon</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-black/5 dark:bg-white/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ColorSwatch({ name, varName, className, textClass = "text-[var(--text-primary)]" }: { name: string, varName: string, className: string, textClass?: string }) {
  return (
    <div className="space-y-2">
      <div className={`w-full aspect-square rounded-2xl shadow-sm flex items-end p-3 ${className}`}>
        <span className={`text-xs font-mono font-medium opacity-80 ${textClass}`}>var({varName})</span>
      </div>
      <div>
        <p className="font-medium text-sm">{name}</p>
      </div>
    </div>
  );
}
