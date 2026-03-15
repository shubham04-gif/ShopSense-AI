import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  Check, 
  Receipt, 
  ArrowLeft, 
  Loader2, 
  Plus, 
  Minus, 
  Lock, 
  Download,
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';

type PaymentMethod = 'card' | 'upi';
type CheckoutStatus = 'idle' | 'processing' | 'success';

interface Props {
  onNavigate: (page: any) => void;
}

export default function CheckoutPage({ onNavigate }: Props) {
  const { cartItems: cart, updateQuantity, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [status, setStatus] = useState<CheckoutStatus>('idle');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Dynamic Price Calculation
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 400 || subtotal === 0 ? 0 : 15; // Free shipping over $400
  const total = subtotal + tax + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      clearCart();
    }, 2500);
  };

  // Format currency
  const formatMoney = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  if (status === 'success') {
    return <SuccessScreen cart={cart} total={total} subtotal={subtotal} tax={tax} shipping={shipping} onNavigate={onNavigate} />;
  }

  if (cart.length === 0 && status !== 'success') {
    return (
      <div className="max-w-6xl mx-auto space-y-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-[var(--text-secondary)]" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-2">Your cart is empty</h1>
        <p className="text-[var(--text-secondary)] max-w-md mb-8">Looks like you haven't added anything to your cart yet. Discover our latest products and AI recommendations.</p>
        <button 
          onClick={() => onNavigate('search')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 px-8 font-medium transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Lock className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium uppercase tracking-wider">Secure Checkout</span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column: Payment Details */}
        <div className="flex-1 order-2 lg:order-1">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Payment Method</h1>
            <p className="text-[var(--text-secondary)]">All transactions are secure and encrypted.</p>
          </div>

          <form onSubmit={handleCheckout} className="space-y-8">
            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 transition-all duration-300 ${
                  paymentMethod === 'card' 
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-lg shadow-indigo-500/10' 
                    : 'border-[var(--glass-border)] glass hover:border-indigo-500/30 text-[var(--text-secondary)]'
                }`}
              >
                <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-indigo-500' : ''}`} />
                <span className="font-medium">Credit Card</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border-2 transition-all duration-300 ${
                  paymentMethod === 'upi' 
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-lg shadow-indigo-500/10' 
                    : 'border-[var(--glass-border)] glass hover:border-indigo-500/30 text-[var(--text-secondary)]'
                }`}
              >
                <Smartphone className={`w-8 h-8 ${paymentMethod === 'upi' ? 'text-indigo-500' : ''}`} />
                <span className="font-medium">UPI App</span>
              </button>
            </div>

            {/* Dynamic Payment Form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={paymentMethod}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass rounded-3xl p-6 shadow-sm"
              >
                {paymentMethod === 'card' ? (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Card Number</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          required
                          placeholder="0000 0000 0000 0000" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-black/5 dark:bg-white/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-mono"
                        />
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Expiry Date</label>
                        <input 
                          type="text" 
                          required
                          placeholder="MM/YY" 
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full bg-black/5 dark:bg-white/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">CVC</label>
                        <input 
                          type="text" 
                          required
                          placeholder="123" 
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          className="w-full bg-black/5 dark:bg-white/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Cardholder Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe" 
                        className="w-full bg-black/5 dark:bg-white/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">UPI ID</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          required
                          placeholder="username@upi" 
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full bg-black/5 dark:bg-white/5 border border-[var(--glass-border)] rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        />
                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-2">A payment request will be sent to this UPI ID.</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'processing'}
              className="relative w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-4 px-6 font-semibold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 overflow-hidden group"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              {status === 'processing' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay {formatMoney(total)}
                </>
              )}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Guaranteed safe & secure checkout</span>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="flex-1 order-1 lg:order-2">
          <div className="glass rounded-3xl p-6 lg:p-8 sticky top-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-500" />
              Order Summary
            </h2>
            
            {/* Product List */}
            <div className="space-y-6 mb-8">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-black/5 dark:bg-white/5 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-[var(--text-secondary)]">{item.color}</p>
                      </div>
                      <span className="font-semibold">{formatMoney(item.price * item.quantity)}</span>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 w-fit rounded-lg p-1 border border-[var(--glass-border)]">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-white dark:hover:bg-black/20 rounded-md transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-white dark:hover:bg-black/20 rounded-md transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculation */}
            <div className="space-y-3 pt-6 border-t border-[var(--glass-border)] text-sm">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Subtotal</span>
                <span className="font-medium text-[var(--text-primary)]">{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Shipping</span>
                <span className="font-medium text-[var(--text-primary)]">
                  {shipping === 0 ? (
                    <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-xs uppercase tracking-wider font-bold">Free</span>
                  ) : (
                    formatMoney(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Estimated Tax</span>
                <span className="font-medium text-[var(--text-primary)]">{formatMoney(tax)}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--glass-border)] flex justify-between items-end">
              <div>
                <p className="text-sm text-[var(--text-secondary)] mb-1">Total due</p>
                <p className="text-3xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">{formatMoney(total)}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Success Screen & Digital Receipt Component ---

function SuccessScreen({ cart, total, subtotal, tax, shipping, onNavigate }: any) {
  const formatMoney = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex items-center justify-center p-4 min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Animated Checkmark Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30 relative"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-emerald-500/20"
            />
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative z-10"
            >
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
          <h1 className="text-3xl font-display font-bold tracking-tight mb-2">Payment Successful</h1>
          <p className="text-[var(--text-secondary)]">Thank you for your purchase!</p>
        </div>

        {/* Digital Receipt Card */}
        <div className="glass rounded-3xl shadow-xl overflow-hidden relative border border-[var(--glass-border)]">
          {/* Receipt Zig-Zag Top (CSS trick using radial gradients) */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-[radial-gradient(circle_at_10px_0,_transparent_10px,_var(--bg-primary)_11px)] bg-[length:20px_10px] bg-repeat-x z-10" style={{ backgroundPosition: '0 0' }} />
          
          <div className="p-8 pt-10">
            <div className="flex justify-between items-center mb-8 pb-8 border-b border-dashed border-[var(--glass-border)]">
              <div>
                <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-semibold mb-1">Order Number</p>
                <p className="font-mono font-medium">{orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-semibold mb-1">Date</p>
                <p className="font-medium">{date}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {cart.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-black/5 dark:bg-white/5 flex items-center justify-center text-xs font-medium text-[var(--text-secondary)]">{item.quantity}x</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-[var(--text-secondary)]">{formatMoney(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-[var(--text-secondary)] mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatMoney(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatMoney(shipping)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-[var(--glass-border)]">
              <span className="font-semibold">Total Paid</span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{formatMoney(total)}</span>
            </div>
          </div>
          
          {/* Receipt Zig-Zag Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-[radial-gradient(circle_at_10px_10px,_transparent_10px,_var(--bg-primary)_11px)] bg-[length:20px_10px] bg-repeat-x z-10" style={{ backgroundPosition: '0 100%' }} />
        </div>

        <div className="mt-8 flex gap-4">
          <button className="flex-1 glass border border-[var(--glass-border)] hover:bg-black/5 dark:hover:bg-white/5 rounded-xl py-3 px-4 font-medium flex items-center justify-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Receipt
          </button>
          <button 
            onClick={() => onNavigate('search')}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 px-4 font-medium flex items-center justify-center gap-2 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
}
