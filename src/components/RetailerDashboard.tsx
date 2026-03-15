import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, DollarSign, Package, ArrowUpRight, ArrowDownRight, Sparkles, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000, visitors: 2400 },
  { name: 'Tue', revenue: 3000, visitors: 1398 },
  { name: 'Wed', revenue: 2000, visitors: 9800 },
  { name: 'Thu', revenue: 2780, visitors: 3908 },
  { name: 'Fri', revenue: 1890, visitors: 4800 },
  { name: 'Sat', revenue: 2390, visitors: 3800 },
  { name: 'Sun', revenue: 3490, visitors: 4300 },
];

export default function RetailerDashboard() {
  const stats = [
    { title: 'Total Revenue', value: '$124,563.00', change: '+14.5%', isPositive: true, icon: DollarSign },
    { title: 'Active Users', value: '45,231', change: '+5.2%', isPositive: true, icon: Users },
    { title: 'Conversion Rate', value: '3.8%', change: '-1.1%', isPositive: false, icon: TrendingUp },
    { title: 'Total Orders', value: '1,204', change: '+8.4%', isPositive: true, icon: Package },
  ];

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-display font-bold mb-2">Retailer Overview</h1>
          <p className="text-[var(--text-secondary)]">Monitor your store's performance in real-time.</p>
        </motion.div>
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium text-sm flex items-center gap-2 cursor-default"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          AI Insights Active
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass rounded-3xl p-6 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors duration-300">
                <stat.icon className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-indigo-500 transition-colors duration-300" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg ${stat.isPositive ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-1 relative z-10">{stat.title}</h3>
            <div className="text-2xl font-bold relative z-10">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 glass rounded-3xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              <h2 className="text-xl font-bold">Revenue Overview</h2>
            </div>
            <select className="bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-1 text-sm outline-none cursor-pointer hover:border-indigo-500/50 transition-colors">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 min-h-[300px] w-full relative">
            {/* Animated chart entrance */}
            <motion.div 
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="absolute inset-0 origin-bottom"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--glass-border)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: 'var(--text-primary)', fontWeight: 'bold' }}
                    cursor={{ stroke: 'var(--glass-border)', strokeWidth: 2, strokeDasharray: '5 5' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#6366f1" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass rounded-3xl p-6 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <h2 className="text-xl font-bold mb-6 relative z-10 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            AI Recommendations
          </h2>
          <div className="flex-1 space-y-4 relative z-10">
            {[
              { title: 'Increase ad spend on Audio', desc: 'Demand for headphones is up 24% this week.', type: 'opportunity', color: 'text-green-500', bg: 'bg-green-500/10' },
              { title: 'Restock warning', desc: 'Minimalist Desk Lamp will run out in 3 days.', type: 'warning', color: 'text-orange-500', bg: 'bg-orange-500/10' },
              { title: 'Price optimization', desc: 'Lowering Mechanical Keyboard by 5% could increase sales by 15%.', type: 'insight', color: 'text-indigo-500', bg: 'bg-indigo-500/10' }
            ].map((rec, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--glass-border)] cursor-pointer hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${rec.bg.replace('/10', '')}`} />
                  <h4 className="font-semibold text-sm">{rec.title}</h4>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{rec.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
