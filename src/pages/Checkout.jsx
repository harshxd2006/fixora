import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShoppingBag,
  Truck,
  Building,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { formatINR } from '../utils/formatPrice';
import { createOrder } from '../services/orderService';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Calculate Shipping & Total
  const shippingFee = cartTotal > 1999 ? 0 : 149;
  const grandTotal = cartTotal + shippingFee;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'PIN/Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
    if (paymentError) setPaymentError(null);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please complete all required shipping fields');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // SECURITY: Send ONLY product IDs, quantities, customer info, and address.
      // Server retrieves actual product prices, computes bundle discounts, and inserts into Supabase orders table.
      const payload = {
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity
        })),
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        },
        userId: user?.id || null
      };

      const data = await createOrder(payload);

      if (!data.success) {
        throw new Error(data.error || 'Server failed to process order creation.');
      }

      // Order created successfully in Supabase orders table
      toast.success(`Order Placed: ${data.orderNumber}`);
      clearCart(); // Clear cart ONLY after confirmed order creation
      navigate(`/order-confirmation?orderNumber=${encodeURIComponent(data.orderNumber)}&orderId=${data.orderId || ''}&totalAmount=${data.totalAmount}`);

    } catch (err) {
      console.error('Checkout submission error:', err);
      setPaymentError(err.message || 'Order creation failed. Your cart items remain safe.');
      toast.error(err.message || 'Order creation failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-20 h-20 glass-card rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={36} className="text-[#E5B268]" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2">Your Cart is Empty</h1>
        <p className="text-base text-white/70 max-w-md mb-8">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link to="/products">
          <button className="btn-primary">Explore Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-24 text-white min-h-screen">
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/15">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} /> Back to Cart
          </button>
          <div className="flex items-center gap-2 text-xs text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <Lock size={14} className="text-[#E5B268]" /> 256-Bit SSL Encrypted Checkout
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: SHIPPING & PAYMENT FORM (7 COLS) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. CONTACT INFORMATION */}
            <div className="glass-card p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <User size={20} className="text-[#E5B268]" />
                <h2 className="text-xl font-bold text-white">1. Contact Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="John Doe"
                    className={`w-full h-12 glass-input ${errors.fullName ? 'border-red-500/80' : ''}`}
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className={`w-full h-12 glass-input ${errors.email ? 'border-red-500/80' : ''}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider block mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full h-12 glass-input ${errors.phone ? 'border-red-500/80' : ''}`}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SHIPPING ADDRESS */}
            <div className="glass-card p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <MapPin size={20} className="text-[#E5B268]" />
                <h2 className="text-xl font-bold text-white">2. Shipping Address</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider block mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Flat / House No. / Street"
                    className={`w-full h-12 glass-input ${errors.address ? 'border-red-500/80' : ''}`}
                  />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider block mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Bengaluru"
                      className={`w-full h-12 glass-input ${errors.city ? 'border-red-500/80' : ''}`}
                    />
                    {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider block mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="Karnataka"
                      className={`w-full h-12 glass-input ${errors.state ? 'border-red-500/80' : ''}`}
                    />
                    {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider block mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="560001"
                      className={`w-full h-12 glass-input ${errors.postalCode ? 'border-red-500/80' : ''}`}
                    />
                    {errors.postalCode && <p className="text-red-400 text-xs mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider block mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    disabled
                    className="w-full h-12 glass-input opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* 3. PAYMENT METHOD SELECTION */}
            <div className="glass-card p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <CreditCard size={20} className="text-[#E5B268]" />
                <h2 className="text-xl font-bold text-white">3. Payment Option</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-[#E5B268]/20 border-[#E5B268] text-white'
                      : 'bg-white/5 border-white/15 text-white/70 hover:border-white/30'
                  }`}
                >
                  <div className="font-bold text-sm mb-1 text-white">UPI / GPay / PhonePe</div>
                  <div className="text-[11px] text-white/60">Instant UPI QR payment</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#E5B268]/20 border-[#E5B268] text-white'
                      : 'bg-white/5 border-white/15 text-white/70 hover:border-white/30'
                  }`}
                >
                  <div className="font-bold text-sm mb-1 text-white">Credit / Debit Card</div>
                  <div className="text-[11px] text-white/60">Visa, Mastercard, RuPay</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-[#E5B268]/20 border-[#E5B268] text-white'
                      : 'bg-white/5 border-white/15 text-white/70 hover:border-white/30'
                  }`}
                >
                  <div className="font-bold text-sm mb-1 text-white">Cash on Delivery</div>
                  <div className="text-[11px] text-white/60">Pay when item arrives</div>
                </button>
              </div>

              {/* PAYMENT ERROR / STATUS BANNER */}
              {paymentError && (
                <div className="p-4 bg-red-500/15 border border-red-500/30 rounded-2xl flex items-start gap-3 text-xs leading-relaxed text-red-200">
                  <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-red-300 font-semibold mb-0.5">Gateway Status Notice:</strong>
                    {paymentError}
                  </div>
                </div>
              )}

              {/* PAY BUTTON */}
              <button
                type="button"
                onClick={handlePaymentSubmit}
                disabled={isProcessing}
                className="btn-primary w-full h-14 text-base font-bold flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin text-ink" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    Pay {formatINR(grandTotal)}
                  </>
                )}
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY (5 COLS) */}
          <div className="lg:col-span-5">
            <div className="glass-card p-6 md:p-8 sticky top-28 space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">
                Order Summary ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </h2>

              {/* ITEM LIST */}
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 glass-card p-2 flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-white/60">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-bold text-[#E5B268] flex-shrink-0">
                      {formatINR(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{formatINR(cartTotal)}</span>
                </div>
                
                <div className="flex justify-between text-white/70">
                  <span>Estimated Shipping</span>
                  <span>{shippingFee === 0 ? <span className="text-[#E5B268] font-bold">FREE</span> : formatINR(shippingFee)}</span>
                </div>

                {cartTotal > 1999 && (
                  <div className="flex items-center gap-1.5 text-xs text-[#E5B268] bg-[#E5B268]/15 px-3 py-1.5 rounded-lg border border-[#E5B268]/30">
                    <Truck size={14} /> Free Express Delivery unlocked!
                  </div>
                )}
              </div>

              <div className="border-t border-white/15 pt-4 flex justify-between items-center text-lg font-extrabold text-white">
                <span>Total Amount</span>
                <span className="text-xl text-[#E5B268]">{formatINR(grandTotal)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
