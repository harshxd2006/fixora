import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Package, 
  ShoppingBag, 
  Truck, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../hooks/useAuth';
import { products } from '../data/products';
import { formatINR } from '../utils/formatPrice';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const searchParams = new URLSearchParams(location.search);
  const paramOrderNumber = searchParams.get('orderNumber');
  const paramOrderId = searchParams.get('orderId');

  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    async function fetchOrderDetails() {
      setLoading(true);
      setAuthError(null);

      if (!paramOrderNumber && !paramOrderId) {
        setLoading(false);
        return;
      }

      try {
        // Query orders table
        let query = supabase.from('orders').select('*');
        if (paramOrderId && paramOrderId !== 'null' && !paramOrderId.startsWith('local-')) {
          query = query.eq('id', paramOrderId);
        } else if (paramOrderNumber) {
          query = query.eq('order_number', paramOrderNumber);
        }

        const { data: orderData, error: orderErr } = await query.maybeSingle();

        if (orderErr) {
          console.error('Error fetching order:', orderErr);
        }

        if (!orderData) {
          // If no database order row found (e.g. invalid orderId), throw auth/not found error
          setAuthError('Order details could not be found or access is restricted.');
          setLoading(false);
          return;
        }

        // SECURITY CHECK: Verify order belongs to the authenticated user if logged in
        if (user && orderData.user_id && orderData.user_id !== user.id && orderData.customer_email !== user.email) {
          setAuthError('Access Denied: You do not have permission to view this order.');
          setLoading(false);
          return;
        }

        setOrder(orderData);

        // Query order items
        if (orderData.id) {
          const { data: itemsData, error: itemsErr } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', orderData.id);

          if (!itemsErr && itemsData) {
            setOrderItems(itemsData);
          }
        }
      } catch (err) {
        console.error('Order Confirmation Fetch Error:', err);
        setAuthError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [paramOrderNumber, paramOrderId, user]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-white">
        <Loader2 size={36} className="animate-spin text-[#E5B268] mb-4" />
        <p className="text-white/70 text-sm">Retrieving order details from database...</p>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-16 h-16 bg-red-500/20 border border-red-500/40 rounded-full flex items-center justify-center mb-4 text-red-400">
          <AlertTriangle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Restricted</h1>
        <p className="text-white/70 text-sm max-w-md mb-6">{authError}</p>
        <Link to="/products">
          <button className="btn-primary">Return to Store</button>
        </Link>
      </div>
    );
  }

  // Calculate Subtotal & Bundle Discount from actual database order_items
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalUnits = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const bundleDiscount = totalUnits >= 3 ? Math.round(subtotal * 0.15) : 0;
  const shippingFee = (subtotal - bundleDiscount) > 1999 ? 0 : 149;
  const finalTotal = order?.total_amount || Math.max(0, subtotal - bundleDiscount + shippingFee);

  const shippingAddr = order?.shipping_address || {};

  return (
    <div className="pt-8 pb-32 md:pb-24 text-white min-h-screen overflow-x-hidden">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        
        {/* HEADER BADGE */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E5B268]/20 border border-[#E5B268]/40 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-[#E5B268]"
          >
            <CheckCircle2 size={36} className="sm:w-11 sm:h-11" />
          </motion.div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2 sm:mb-3">
            Order Confirmed!
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-white/70 max-w-lg mx-auto leading-relaxed">
            Thank you for your order. We have received your purchase and initialized processing.
          </p>
        </div>

        {/* ORDER DETAILS SUMMARY CARD */}
        <div className="glass-card p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 mb-8 overflow-hidden max-w-full">
          
          {/* TOP BAR: ORDER REFERENCE & STATUS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="min-w-0">
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#E5B268] font-bold block mb-0.5 sm:mb-1">
                Order Reference
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wide break-all">
                {order?.order_number || paramOrderNumber || '#FIX-98241'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="flex-shrink-0">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50 block mb-0.5">
                  Payment Status
                </span>
                <span className="inline-block text-[11px] sm:text-xs font-bold text-white uppercase bg-white/10 px-2.5 py-1 rounded">
                  {order?.payment_status || 'Pending'}
                </span>
              </div>
              
              <div className="flex-shrink-0">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50 block mb-0.5">
                  Order Status
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#E5B268] bg-[#E5B268]/20 px-2.5 sm:px-3 py-1 rounded-full border border-[#E5B268]/30">
                  <Package size={13} /> {order?.order_status || 'Processing'}
                </span>
              </div>
            </div>
          </div>

          {/* 1. ORDERED ITEMS SECTION */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#E5B268] uppercase tracking-wider mb-3 sm:mb-4">
              Ordered Items ({orderItems.length || '—'})
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {orderItems.map((item) => {
                const productMatch = products.find(p => p.id === item.product_id);
                const imageUrl = productMatch?.image || 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300';

                return (
                  <div key={item.id || item.product_id} className="flex items-center gap-3 sm:gap-4 bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 glass-card p-1 flex-shrink-0 overflow-hidden rounded-lg sm:rounded-xl">
                      <img src={imageUrl} alt={item.product_name} className="w-full h-full object-cover rounded-md sm:rounded-lg" />
                    </div>

                    <div className="flex-1 min-w-0 pr-1">
                      <h4 className="text-xs sm:text-sm md:text-base font-bold text-white line-clamp-2 sm:line-clamp-1 leading-snug">
                        {item.product_name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-white/60 mt-0.5">
                        {formatINR(item.price)} × {item.quantity}
                      </p>
                    </div>

                    <div className="text-xs sm:text-sm md:text-base font-bold text-[#E5B268] flex-shrink-0 text-right">
                      {formatINR(item.price * item.quantity)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. SHIPPING TO & CONTACT INFORMATION SECTION */}
          <div className="border-t border-white/10 pt-5 sm:pt-6">
            <h3 className="text-xs sm:text-sm font-bold text-[#E5B268] uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
              <MapPin size={15} /> Shipping & Contact Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm bg-white/5 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10">
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-2 text-white">
                  <User size={14} className="text-[#E5B268] flex-shrink-0" />
                  <span className="font-semibold truncate">{order?.customer_name || 'Customer'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Mail size={14} className="text-[#E5B268] flex-shrink-0" />
                  <span className="break-all">{order?.customer_email || 'Email address'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Phone size={14} className="text-[#E5B268] flex-shrink-0" />
                  <span>{order?.customer_phone || 'Phone number'}</span>
                </div>
              </div>

              <div className="space-y-1 text-white/80 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6 min-w-0">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 block font-semibold mb-1">
                  Delivery Address
                </span>
                <p className="font-medium text-white break-words">{shippingAddr.address || 'Street address'}</p>
                <p>{shippingAddr.city ? `${shippingAddr.city}, ${shippingAddr.state || ''}` : 'City, State'}</p>
                <p>{shippingAddr.postalCode ? `PIN: ${shippingAddr.postalCode}` : ''} ({shippingAddr.country || 'India'})</p>
              </div>
            </div>
          </div>

          {/* 3. FINANCIAL BREAKDOWN SUMMARY */}
          <div className="border-t border-white/10 pt-5 sm:pt-6 space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-white/70">
              <span>Subtotal</span>
              <span className="font-semibold text-white">{formatINR(subtotal)}</span>
            </div>

            {bundleDiscount > 0 && (
              <div className="flex justify-between text-[#E5B268]">
                <span>15% Fixora Bundle Discount</span>
                <span className="font-bold">-{formatINR(bundleDiscount)}</span>
              </div>
            )}

            <div className="flex justify-between text-white/70">
              <span>Shipping Cost</span>
              <span>
                {shippingFee === 0 ? (
                  <span className="text-[#E5B268] font-bold">FREE</span>
                ) : (
                  formatINR(shippingFee)
                )}
              </span>
            </div>

            <div className="border-t border-white/15 pt-3.5 flex justify-between items-center text-sm sm:text-xl font-extrabold text-white">
              <span>Final Total</span>
              <span className="text-base sm:text-2xl text-[#E5B268]">{formatINR(finalTotal)}</span>
            </div>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link to="/products" className="w-full sm:w-auto">
            <button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
              <ShoppingBag size={18} /> Continue Shopping
            </button>
          </Link>

          <Link to="/dashboard" className="w-full sm:w-auto">
            <button className="glass-card w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white hover:border-[#E5B268] transition-colors text-center">
              View Dashboard
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmation;
