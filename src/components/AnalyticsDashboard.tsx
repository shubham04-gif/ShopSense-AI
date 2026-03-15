import React from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { 
  TrendingUp, Users, ShoppingBag, Sparkles, 
  AlertCircle, ArrowUpRight, ArrowDownRight, Calendar, Download,
  Package, Zap
} from 'lucide-react';

// --- Mock Data ---

const demandData = [
  { date: 'Mar 10', actual: 3200, predicted: null },
  { date: 'Mar 11', actual: 3800, predicted: null },
  { date: 'Mar 12', actual: 4100, predicted: null },
  { date: 'Mar 13', actual: 3900, predicted: null },
  { date: 'Mar 14', actual: 4800, predicted: 4800 }, // Join point
  { date: 'Mar 15', actual: null, predicted: 5200 },
  { date: 'Mar 16', actual: null, predicted: 5800 },
  { date: 'Mar 17', actual: null, predicted: 5100 },
  { date: 'Mar 18', actual: null, predicted: 6300 },
];

const behaviorData = [
  { subject: 'Electronics', A: 120, fullMark: 150 },
  { subject: 'Apparel', A: 98, fullMark: 150 },
  { subject: 'Home', A: 86, fullMark: 150 },
  { subject: 'Beauty', A: 99, fullMark: 150 },
  { subject: 'Sports', A: 85, fullMark: 150 },
  { subject: 'Books', A: 65, fullMark: 150 },
];

const trendingProducts = [
  { name: 'Wireless Noise-Canceling Headphones', sales: 1245, growth: '+24%', stock: 'Healthy' },
  { name: 'Ergonomic Office Chair', sales: 982, growth: '+18%', stock: 'Low' },
  { name: 'Smart Home Hub v2', sales: 845, growth: '+42%', stock: 'Healthy' },
  { name: 'Organic Cotton Bedding Set', sales: 654, growth: '+12%', stock: 'Healthy' },
];

const inventoryAlerts = [
  { item: 'Ergonomic Office Chair', status: 'Critical', daysLeft: 3 },
  { item: 'Mechanical Keyboard (Blue Switch)', status: 'Warning', daysLeft: 8 },
  { item: '4K Monitor 27"', status: 'Warning', daysLeft: 12 },
];

const aiInsights = [
  { title: 'Demand Spike Predicted', desc: 'Expect a 40% surge in Smart Home Hubs next week based on recent search trends.', type: 'positive' },
  { title: 'Pricing Optimization', desc: 'Lowering the price of "Organic Cotton Bedding" by 5% could increase overall revenue by 12%.', type: 'neutral' },
];

// --- Components ---

export default function AnalyticsDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-display font-bold mb-2 tracking-tight">Analytics & Insights</h1>
          <p className="text-[var(--text-secondary)]">AI-powered predictions and performance metrics.</p>
        </motion.div>
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <button className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-[var(--glass-border)]">
            <Calendar className="w-4 h-4" />
            Last 7 Days
          </button>
          <button className="text-sm font-medium text-white flex items-center gap-2 bg-indigo-500 px-4 py-2 rounded-xl hover:bg-indigo-600 transition-colors shadow-sm shadow-indigo-500/20">
            <Download className="w-4 h-4" />
            Export
          </button>
        </motion.div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Gross Revenue', value: '$45,231.89', trend: '+12.5%', isPositive: true, icon: TrendingUp },
          { title: 'Predicted Demand (Next 7d)', value: '$52,400.00', trend: '+15.8%', isPositive: true, icon: Zap },
          { title: 'Active Customers', value: '2,845', trend: '-2.4%', isPositive: false, icon: Users },
          { title: 'Avg. Order Value', value: '$142.50', trend: '+4.1%', isPositive: true, icon: ShoppingBag },
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            className="glass rounded-2xl p-5 relative overflow-hidden group border border-[var(--glass-border)] hover:border-indigo-500/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-[var(--text-secondary)] group-hover:text-indigo-500 group-hover:bg-indigo-500/10 transition-colors">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${stat.isPositive ? 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400' : 'text-rose-600 bg-rose-500/10 dark:text-rose-400'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <h3 className="text-sm text-[var(--text-secondary)] font-medium mb-1">{stat.title}</h3>
              <div className="text-2xl font-mono font-bold tracking-tight">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue & Prediction Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass rounded-2xl p-6 border border-[var(--glass-border)] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                Revenue & Demand Prediction
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-500 uppercase tracking-wider">AI Powered</span>
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Historical sales vs. AI predicted demand</p>
            </div>
          </div>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontFamily: 'monospace' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--glass-border)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: 'var(--text-primary)', fontFamily: 'monospace', fontWeight: 'bold' }}
                  labelStyle={{ color: 'var(--text-secondary)', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="actual" name="Actual Sales" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="predicted" name="Predicted Demand" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Customer Behavior Radar */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-6 border border-[var(--glass-border)] flex flex-col">
          <h2 className="text-lg font-bold mb-1">Customer Interests</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Category engagement distribution</p>
          <div className="flex-1 min-h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={behaviorData}>
                <PolarGrid stroke="var(--glass-border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Engagement" dataKey="A" stroke="#ec4899" strokeWidth={2} fill="#ec4899" fillOpacity={0.3} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}
                  itemStyle={{ color: 'var(--text-primary)', fontWeight: 'bold' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row: Lists & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Trending Products */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-6 border border-[var(--glass-border)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Trending Products</h2>
            <button className="text-xs font-medium text-indigo-500 hover:text-indigo-600">View All</button>
          </div>
          <div className="space-y-4">
            {trendingProducts.map((product, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-[var(--text-secondary)] group-hover:bg-indigo-500/10 group-hover:text-indigo-500 transition-colors">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-1">{product.name}</p>
                    <p className="text-xs text-[var(--text-secondary)] font-mono">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-500">{product.growth}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Inventory Alerts */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-6 border border-[var(--glass-border)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Inventory Alerts</h2>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/20 text-[10px] font-bold text-rose-500">
              {inventoryAlerts.length}
            </span>
          </div>
          <div className="space-y-4">
            {inventoryAlerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-rose-500/5 border border-rose-500/10">
                <AlertCircle className={`w-5 h-5 shrink-0 ${alert.status === 'Critical' ? 'text-rose-500' : 'text-amber-500'}`} />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-1">{alert.item}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {alert.status} • Est. out of stock in {alert.daysLeft} days
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-6 border border-[var(--glass-border)] bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold">AI Insights</h2>
          </div>
          <div className="space-y-4">
            {aiInsights.map((insight, i) => (
              <div key={i} className="relative pl-4 border-l-2 border-indigo-500/30">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-indigo-500" />
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{insight.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{insight.desc}</p>
              </div>
            ))}
            <button className="w-full mt-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-500/20 transition-colors">
              Generate More Insights
            </button>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
