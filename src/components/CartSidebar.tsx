import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, AlertTriangle, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    getCartTotal,
    currentUser,
    setView
  } = useApp();

  if (!isOpen) return null;

  const subtotal = getCartTotal();
  const isWholesale = currentUser?.wholesaleStatus === 'approved';

  // Wholesale validations: MOQ 150,000 UGX total, OR must have at least 10 items in total.
  const minWholesaleValue = 150000;
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isMoqMet = !isWholesale || (subtotal >= minWholesaleValue || totalItemsCount >= 10);

  const handleCheckoutClick = () => {
    if (!currentUser) {
      setView('account');
      onClose();
      return;
    }
    setView('checkout');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-modal="true" role="dialog">
      {/* Dark backdrop blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl h-full animate-slide-in-right">
          
          {/* Header */}
          <div className="px-4 py-5 bg-[#1A6B3A] text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#F5A800]" />
              <h2 className="text-lg font-bold tracking-tight">Your Shopping Cart</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-white hover:bg-emerald-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-200 mb-3" />
                <h3 className="font-bold text-gray-700 text-sm">Shopping Basket is Empty</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-[240px]">
                  Explore our premium organic flour, honey extraction, and tasty groundnut spreads to add items!
                </p>
                <button
                  onClick={() => { setView('products'); onClose(); }}
                  className="mt-5 px-5 py-2 text-xs font-bold text-white bg-[#1A6B3A] hover:bg-opacity-90 rounded-md transition-all shadow-xs"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-14 h-14 object-cover rounded-md flex-shrink-0 border"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-gray-800 truncate">{item.productName}</h4>
                    <span className="inline-block bg-[#E8F5ED] text-[#1A6B3A] text-[9px] font-bold px-1.5 py-0.5 rounded-sm mt-0.5">
                      {item.size}
                    </span>
                    <div className="text-xs font-extrabold text-[#1A6B3A] mt-1">
                      UGX {item.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => removeFromCart(item.productId, item.size)}
                      className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                      title="Erase item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    
                    <div className="flex items-center border border-gray-200 rounded bg-white">
                      <button
                        onClick={() => updateCartQty(item.productId, item.size, item.quantity - 1)}
                        className="px-2 py-0.5 text-gray-500 hover:bg-gray-150 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-gray-800 text-center min-w-[20px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.productId, item.size, item.quantity + 1)}
                        className="px-2 py-0.5 text-gray-500 hover:bg-gray-150 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer details pricing summary */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
              
              {/* Wholesale MOQ Validation Warning */}
              {isWholesale && !isMoqMet && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-amber-800 text-xs shadow-xs animate-pulse">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-[#F5A800]" />
                  <div>
                    <span className="font-extrabold block">Wholesale MOQ Alert!</span>
                    As an approved merchant trade user, your order must meet at least <span className="font-bold">UGX {minWholesaleValue.toLocaleString()}</span> in value OR include at least <span className="font-bold">10 total units</span>.
                    <p className="mt-1 font-bold text-[#1A6B3A]">Current: UGX {subtotal.toLocaleString()} ({totalItemsCount} items)</p>
                  </div>
                </div>
              )}

              <div className="space-y-1 text-xs">
                <div className="flex justify-between font-medium text-gray-500">
                  <span>Cart Items Count</span>
                  <span className="font-bold text-gray-800">{totalItemsCount} units</span>
                </div>
                {isWholesale && isMoqMet && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Wholesale Pricing applied</span>
                    <span>20% off retail rate</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-gray-900 border-t pt-2 mt-2">
                  <span>Order Subtotal</span>
                  <span className="text-[#1A6B3A]">UGX {subtotal.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium"> Kampala logistics delivery flat rate of UGX 5,000 will be added at checkout.</p>
              </div>

              <div>
                <button
                  disabled={isWholesale && !isMoqMet}
                  onClick={handleCheckoutClick}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold shadow-xs transition-all ${
                    isWholesale && !isMoqMet
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#1A6B3A] hover:bg-opacity-95 text-[#FFF] hover:text-[#F5A800]'
                  }`}
                  id="checkout-proceed-btn"
                >
                  <span>{currentUser ? 'Proceed to Dispatch Checkout' : 'Login to Complete Purchase'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center">
                <button onClick={onClose} className="text-xs text-[#1A6B3A] font-semibold hover:underline">
                  Continue Sourcing Store
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
