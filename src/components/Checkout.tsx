import React, { useState, useEffect } from 'react';
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
  ShoppingBag
} from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
};

type PaymentMethod = 'card' | 'upi';
type CheckoutStatus = 'idle' | 'processing' | 'success';

export default function Checkout() {
  const [cart, setCart] = useState<Product[]>([
    { 
      id: 1, 
      name: 'Sony WH-1000XM5', 
      price: 398, 
      quantity: 1, 
      color: 'Silver',
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=200' 
    },
    { 
      id: 2, 
      name: 'Minimalist Desk Lamp', 
      price: 89, 
      quantity: 1, 
      color: 'Matte Black',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=200' 
    }
  ]);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [status, setStatus] = useState<CheckoutStatus>('idle');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Dynamic Price Calculation
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 400 ? 0 : 15; // Free shipping over $400
  const total = subtotal + tax + shipping;

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 2500);
  };

  // Format currency
  const formatMoney = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  if (status === 'success') {
    return <SuccessScreen cart={cart} total={total} subtotal={subtotal} tax={tax} shipping={shipping} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8 md:mb-12">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Secure Checkout</span>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Column: Payment Details */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-2">Payment Method</h1>
              <p className="text-gray-500 dark:text-gray-400">All transactions are secure and encrypted.</p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-8">
              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' 
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`} />
                  <span className="font-medium">Credit Card</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                    paymentMethod === 'upi' 
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' 
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <Smartphone className={`w-8 h-8 ${paymentMethod === 'upi' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`} />
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
                  className="bg-white dark:bg-[#141414] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
                >
                  {paymentMethod === 'card' ? (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Card Number</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            placeholder="0000 0000 0000 0000" 
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-mono"
                          />
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Expiry Date</label>
                          <input 
                            type="text" 
                            required
                            placeholder="MM/YY" 
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CVC</label>
                          <input 
                            type="text" 
                            required
                            placeholder="123" 
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Cardholder Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="John Doe" 
                          className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">UPI ID</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            placeholder="username@upi" 
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                          />
                          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">A payment request will be sent to this UPI ID.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'processing'}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-4 px-6 font-semibold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
              >
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
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Guaranteed safe & secure checkout</span>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="bg-white dark:bg-[#141414] rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order Summary
              </h2>
              
              {/* Product List */}
              <div className="space-y-6 mb-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.color}</p>
                        </div>
                        <span className="font-semibold">{formatMoney(item.price * item.quantity)}</span>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-gray-50 dark:bg-black w-fit rounded-lg p-1 border border-gray-200 dark:border-gray-800">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-white dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-white dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-800 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{formatMoney(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {shipping === 0 ? (
                      <span className="text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded text-xs uppercase tracking-wider font-bold">Free</span>
                    ) : (
                      formatMoney(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{formatMoney(tax)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total due</p>
                  <p className="text-3xl font-bold tracking-tight">{formatMoney(total)}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- Success Screen & Digital Receipt Component ---

function SuccessScreen({ cart, total, subtotal, tax, shipping }: any) {
  const formatMoney = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a] flex items-center justify-center p-4 font-sans">
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
            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Payment Successful</h1>
          <p className="text-gray-500 dark:text-gray-400">Thank you for your purchase!</p>
        </div>

        {/* Digital Receipt Card */}
        <div className="bg-white dark:bg-[#141414] rounded-3xl shadow-xl overflow-hidden relative">
          {/* Receipt Zig-Zag Top (CSS trick) */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDEwIDEwLDAgMjAsMTAiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDEwIDEwLDAgMjAsMTAiIGZpbGw9IiMwYTBhMGEiLz48L3N2Zz4=')] bg-repeat-x z-10" />
          
          <div className="p-8 pt-10">
            <div className="flex justify-between items-center mb-8 pb-8 border-b border-dashed border-gray-200 dark:border-gray-800">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Order Number</p>
                <p className="font-mono font-medium">{orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Date</p>
                <p className="font-medium">{date}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {cart.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-500">{item.quantity}x</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{formatMoney(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
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

            <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-800">
              <span className="font-semibold text-gray-900 dark:text-white">Total Paid</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatMoney(total)}</span>
            </div>
          </div>
          
          {/* Receipt Zig-Zag Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDAgMTAsMTAgMjAsMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDAgMTAsMTAgMjAsMCIgZmlsbD0iIzBhMGEwYSIvPjwvc3ZnPg==')] bg-repeat-x z-10" />
        </div>

        <div className="mt-8 flex gap-4">
          <button className="flex-1 bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-900 dark:text-white rounded-xl py-3 px-4 font-medium flex items-center justify-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 px-4 font-medium flex items-center justify-center gap-2 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
}
