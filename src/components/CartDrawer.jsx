import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatPrice';
import CTAButton from './CTAButton';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

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
            className="fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-border-light flex justify-between items-center bg-warm-white">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                <ShoppingBag size={24} /> Your Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-slate-muted hover:text-ink transition-colors rounded-full hover:bg-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-muted space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="text-lg">Your cart is empty.</p>
                  <CTAButton onClick={onClose} className="mt-4">
                    Continue Shopping
                  </CTAButton>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-border-light pb-6">
                      <div className="w-24 h-24 bg-warm-white rounded-xl p-2 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-semibold text-ink line-clamp-2 leading-tight">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-muted hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="text-[15px] font-bold text-ink mt-1">
                            {formatINR(item.price)}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center bg-soft-white rounded-full border border-border-light overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-ink hover:bg-muted-white transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-[13px] font-medium text-ink">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-ink hover:bg-muted-white transition-colors"
                            >
                              <Plus size={14} />
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
              <div className="p-6 border-t border-border-light bg-warm-white space-y-4">
                <div className="flex justify-between items-center text-lg font-bold text-ink">
                  <span>Subtotal</span>
                  <span>{formatINR(cartTotal)}</span>
                </div>
                <p className="text-[13px] text-slate-muted text-center">
                  Shipping, taxes, and discounts calculated at checkout.
                </p>
                <CTAButton className="w-full h-14 text-[16px]">
                  Proceed to Checkout
                </CTAButton>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
