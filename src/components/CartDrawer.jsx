import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatPrice';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-[#0A0A0A]/95 backdrop-blur-2xl border-l border-white/15 text-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/15 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingBag size={22} className="text-[#E5B268]" /> Your Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/60 space-y-4">
                  <ShoppingBag size={48} className="opacity-30 text-[#E5B268]" />
                  <p className="text-lg text-white font-medium">Your cart is empty.</p>
                  <button onClick={onClose} className="btn-primary mt-4">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-white/15 pb-6">
                      <div className="w-20 h-20 glass-card p-2 flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-bold text-white line-clamp-2 text-sm leading-tight">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-white/60 hover:text-red-400 transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="text-[15px] font-bold text-[#E5B268] mt-1">
                            {formatINR(item.price)}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center glass-pill border-white/20">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-white hover:bg-white/20 transition-colors rounded-full"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-7 text-center text-[13px] font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-white hover:bg-white/20 transition-colors rounded-full"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/15 bg-white/5 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold text-white">
                  <span>Subtotal</span>
                  <span className="text-[#E5B268]">{formatINR(cartTotal)}</span>
                </div>
                <p className="text-[12px] text-white/60 text-center">
                  Shipping, taxes, and discounts calculated at checkout.
                </p>
                <button onClick={handleCheckoutClick} className="btn-primary w-full h-13 text-base">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
