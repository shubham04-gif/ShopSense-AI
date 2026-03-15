import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, PackageCheck, TrendingDown, ArrowRight, Download } from 'lucide-react';

export default function InventoryDashboard() {
  const inventory = [
    { id: 'SKU-1029', name: 'Sony WH-1000XM5', stock: 12, status: 'low', predictedExhaustion: '3 days' },
    { id: 'SKU-4921', name: 'Minimalist Desk Lamp', stock: 145, status: 'healthy', predictedExhaustion: '45 days' },
    { id: 'SKU-8832', name: 'Ergonomic Chair', stock: 4, status: 'critical', predictedExhaustion: '12 hours' },
    { id: 'SKU-2291', name: 'Mechanical Keyboard', stock: 89, status: 'healthy', predictedExhaustion: '28 days' },
    { id: 'SKU-5510', name: 'USB-C Hub Multiport', stock: 0, status: 'out', predictedExhaustion: 'N/A' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'healthy': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'low': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'critical': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'out': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold mb-2">Predictive Inventory</h1>
        <p className="text-[var(--text-secondary)]">AI-driven stock forecasting to prevent stockouts.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass rounded-3xl p-6 border-l-4 border-red-500 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </motion.div>
            <h3 className="font-semibold">Action Required</h3>
          </div>
          <p className="text-2xl font-bold mb-1 relative z-10">2 Items</p>
          <p className="text-sm text-[var(--text-secondary)] relative z-10">Out of stock or critical</p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass rounded-3xl p-6 border-l-4 border-yellow-500 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <TrendingDown className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold">Reorder Soon</h3>
          </div>
          <p className="text-2xl font-bold mb-1 relative z-10">1 Item</p>
          <p className="text-sm text-[var(--text-secondary)] relative z-10">Less than 7 days supply</p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass rounded-3xl p-6 border-l-4 border-green-500 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <PackageCheck className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Healthy Stock</h3>
          </div>
          <p className="text-2xl font-bold mb-1 relative z-10">142 Items</p>
          <p className="text-sm text-[var(--text-secondary)] relative z-10">Sufficient inventory</p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="glass rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-[var(--glass-border)] flex justify-between items-center">
          <h2 className="text-xl font-bold">Inventory Status</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-xl hover:bg-indigo-500/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Report
          </motion.button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/5 dark:bg-white/5 text-sm text-[var(--text-secondary)]">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">SKU</th>
                <th className="p-4 font-medium">Current Stock</th>
                <th className="p-4 font-medium">AI Forecast</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--glass-border)]">
              {inventory.map((item, i) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300, damping: 24 }}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                  className="transition-colors group"
                >
                  <td className="p-4 font-medium group-hover:text-indigo-500 transition-colors">{item.name}</td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{item.id}</td>
                  <td className="p-4 font-bold">{item.stock}</td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">Exhausts in {item.predictedExhaustion}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <motion.button 
                      whileHover={{ x: 5 }}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      Reorder <ArrowRight className="w-3 h-3" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
