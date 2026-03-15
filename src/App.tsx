/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Sparkles, ShoppingCart, CreditCard, 
  LayoutDashboard, TrendingUp, BarChart3, Moon, Sun, Menu, X, Store, Palette
} from 'lucide-react';
import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';
import RecommendationsPage from './components/RecommendationsPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import RetailerDashboard from './components/RetailerDashboard';
import InventoryDashboard from './components/InventoryDashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import DesignSystemPage from './components/DesignSystemPage';
import Logo from './components/Logo';
import { useCart } from './context/CartContext';

type Page = 'landing' | 'search' | 'recommendations' | 'cart' | 'checkout' | 'retailer' | 'inventory' | 'analytics' | 'design-system';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Store },
    { id: 'search', label: 'AI Search', icon: Search },
    { id: 'recommendations', label: 'For You', icon: Sparkles },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'checkout', label: 'Checkout', icon: CreditCard },
    { id: 'retailer', label: 'Retailer', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'design-system', label: 'Design System', icon: Palette },
  ] as const;

  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <LandingPage onNavigate={setCurrentPage} />;
      case 'search': return <SearchPage />;
      case 'recommendations': return <RecommendationsPage />;
      case 'cart': return <CartPage onNavigate={setCurrentPage} />;
      case 'checkout': return <CheckoutPage onNavigate={setCurrentPage} />;
      case 'retailer': return <RetailerDashboard />;
      case 'inventory': return <InventoryDashboard />;
      case 'analytics': return <AnalyticsDashboard />;
      case 'design-system': return <DesignSystemPage />;
      default: return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 glass z-50 sticky top-0 border-b border-[var(--glass-border)]">
        <div className="flex items-center gap-2">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 flex items-center justify-center"
          >
            <Logo className="w-8 h-8 text-indigo-500" />
          </motion.div>
          <span className="font-display font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">ShopSense AI</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 768) && (
          <motion.nav 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className={`
              fixed md:static inset-y-0 left-0 z-40 w-64 glass border-r border-[var(--glass-border)]
              flex flex-col py-6 px-4 transform transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
              ${isMobileMenuOpen ? 'translate-x-0 mt-[73px] md:mt-0 h-[calc(100vh-73px)] md:h-screen' : '-translate-x-full md:translate-x-0 h-screen'}
            `}
          >
            <div className="hidden md:flex items-center gap-3 mb-10 px-2 cursor-pointer group" onClick={() => setCurrentPage('landing')}>
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 flex items-center justify-center"
              >
                <Logo className="w-10 h-10 text-indigo-500" />
              </motion.div>
              <span className="font-display font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">ShopSense AI</span>
            </div>

            <div className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
              <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4 px-2 mt-4 md:mt-0 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-indigo-500" />
                Customer
              </div>
              {navItems.slice(0, 5).map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4, backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden group
                    ${currentPage === item.id 
                      ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
                  `}
                >
                  {currentPage === item.id && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <div className="relative">
                    <item.icon className={`w-5 h-5 transition-colors duration-200 ${currentPage === item.id ? 'text-indigo-500' : 'group-hover:text-indigo-400'}`} />
                    {item.id === 'cart' && cartCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm"
                      >
                        {cartCount}
                      </motion.div>
                    )}
                  </div>
                  {item.label}
                </motion.button>
              ))}

              <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4 px-2 mt-8 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-purple-500" />
                Retailer
              </div>
              {navItems.slice(5, 8).map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4, backgroundColor: 'rgba(168, 85, 247, 0.05)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden group
                    ${currentPage === item.id 
                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
                  `}
                >
                  {currentPage === item.id && (
                    <motion.div 
                      layoutId="activeNavIndicatorRetailer"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-r-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 transition-colors duration-200 ${currentPage === item.id ? 'text-purple-500' : 'group-hover:text-purple-400'}`} />
                  {item.label}
                </motion.button>
              ))}

              <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4 px-2 mt-8 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                System
              </div>
              {navItems.slice(8).map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4, backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden group
                    ${currentPage === item.id 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
                  `}
                >
                  {currentPage === item.id && (
                    <motion.div 
                      layoutId="activeNavIndicatorSystem"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 transition-colors duration-200 ${currentPage === item.id ? 'text-emerald-500' : 'group-hover:text-emerald-400'}`} />
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="hidden md:flex mt-auto pt-6 border-t border-[var(--glass-border)] px-2">
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.05)' }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode} 
                className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors w-full p-2 rounded-xl dark:hover:bg-white/5"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
                <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </motion.button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden md:pt-0">
        {/* Animated Global Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 dark:bg-indigo-600/20 blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-purple-500/20 dark:bg-purple-600/20 blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-pink-500/20 dark:bg-pink-600/20 blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.98, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-full p-4 md:p-8 lg:p-12 max-w-7xl mx-auto relative z-10"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
