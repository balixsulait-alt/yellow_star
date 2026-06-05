import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentMethod } from '../types';
import { ShieldCheck, Truck, ArrowLeft, Landmark, CheckCircle2, ShoppingBag } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    currentUser,
    getCartTotal,
    getCartCount,
    createOrder,
    setView,
    showToast
  } = useApp();

  // Redirect to products/basket if cart is empty
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Checkout is locked</h2>
        <p className="text-sm text-gray-500">Add products to your cart before proceeding to checkout.</p>
        <button onClick={() => setView('products')} className="px-4 py-2 bg-[#1A6B3A] text-white rounded font-bold">
          See Catalogue
        </button>
      </div>
    );
  }

  // Address and Payment Forms State
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MTN Mobile Money');
  const [momoNumber, setMomoNumber] = useState(currentUser?.phone || '');

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'upcountry'>('standard');

  const subtotal = getCartTotal();
  const shippingFee = shippingMethod === 'standard' ? 5000 : 15000;
  const total = subtotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !address) {
      showToast('Delivery telephone line and delivery address are mandatory.', 'error');
      return;
    }

    if ((paymentMethod === 'MTN Mobile Money' || paymentMethod === 'Airtel Money') && !momoNumber) {
      showToast('Please specify your registered Mobile Money subscriber number.', 'error');
      return;
    }

    // Place the order
    createOrder({
      phone,
      address,
      paymentMethod,
      billingNumber: (paymentMethod === 'MTN Mobile Money' || paymentMethod === 'Airtel Money') ? momoNumber : undefined
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in pointer-events-auto">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => setView('products')}
          className="flex items-center space-x-1 hover:text-[#1A6B3A] text-xs font-bold text-gray-400"
        >
          <ArrowLeft className="w-4 h-4" /> <span>Abort and Return to Store</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: input details form */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-8 rounded-2xl border shadow-xs">
          
          <div className="border-b pb-3">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">Billing & Delivery Dispatch coordinates</h1>
            <p className="text-xs text-gray-500">Provide telephone and location logistics pointers for transport.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">1. Transport Destination</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10.5px] uppercase font-bold text-gray-500">Recipient Name</label>
                <input
                  type="text"
                  value={currentUser?.name || ''}
                  disabled
                  className="w-full text-xs p-2.5 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10.5px] uppercase font-bold text-[#1A6B3A]">Active shipping telephone*</label>
                <input
                  type="text"
                  placeholder="e.g. 0772613531"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-lg focus:outline-[#1A6B3A] font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10.5px] uppercase font-bold text-[#1A6B3A]">Precise home / shop Delivery address*</label>
              <input
                type="text"
                placeholder="e.g. Block 170, Kira Town Council, Wakiso, opposite Centenary Bank"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs p-2.5 border rounded-lg focus:outline-[#1A6B3A] font-medium"
                required
              />
            </div>

            {/* Delivery Methods selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div
                onClick={() => setShippingMethod('standard')}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-2.5 ${
                  shippingMethod === 'standard' ? 'border-[#1A6B3A] bg-[#E8F5ED]' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  checked={shippingMethod === 'standard'}
                  onChange={() => {}}
                  className="mt-0.5 text-[#1A6B3A] focus:ring-0"
                />
                <div className="text-xs">
                  <span className="font-bold text-gray-900 block">Kampala Express Flat</span>
                  <span className="text-gray-500 block">Deliveries inside Kampala/Wakiso within 24 hours.</span>
                  <span className="font-extrabold text-[#1A6B3A] block mt-1">UGX 5,000</span>
                </div>
              </div>

              <div
                onClick={() => setShippingMethod('upcountry')}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-2.5 ${
                  shippingMethod === 'upcountry' ? 'border-[#1A6B3A] bg-[#E8F5ED]' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  checked={shippingMethod === 'upcountry'}
                  onChange={() => {}}
                  className="mt-0.5 text-[#1A6B3A] focus:ring-0"
                />
                <div className="text-xs">
                  <span className="font-bold text-gray-900 block">Upcountry Scheduled Cargo</span>
                  <span className="text-gray-500 block">Bus lines and carrier bags to upcountry district hubs.</span>
                  <span className="font-extrabold text-[#1A6B3A] block mt-1">UGX 15,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Selection row */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">2. Settle payment Gateway</h3>
            
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'MTN Mobile Money' as const, label: 'MTN MoMo', color: 'border-yellow-400 bg-amber-50 text-amber-900' },
                { id: 'Airtel Money' as const, label: 'Airtel Money', color: 'border-red-500 bg-red-50 text-red-950' },
                { id: 'Bank Transfer' as const, label: 'Centenary Bank', color: 'border-blue-600 bg-blue-50 text-blue-950' }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  className={`p-2.5 rounded-lg border-2 cursor-pointer text-center font-bold text-xs transition-all ${
                    paymentMethod === opt.id ? opt.color : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  {opt.label}
                </div>
              ))}
            </div>

            {/* Conditional input fields based on payment gateways choices */}
            {paymentMethod !== 'Bank Transfer' ? (
              <div className="space-y-1.5 p-3.5 bg-gray-50 rounded-lg border border-gray-150 animate-fade-in">
                <label className="text-[10px] uppercase font-bold text-gray-650 block">Mobile subscriber payout phone line:</label>
                <input
                  type="text"
                  placeholder="e.g. 0772613531"
                  value={momoNumber}
                  onChange={(e) => setMomoNumber(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-lg bg-white focus:outline-[#1A6B3A] font-mono font-bold"
                  required
                />
                <span className="text-[9.5px] text-gray-400 font-medium block mt-1">
                  We'll dispatch a secure "Request to Pay" push window to this subscriber phone.
                </span>
              </div>
            ) : (
              <div className="p-4 bg-[#E8F5ED] rounded-xl border border-emerald-100 space-y-2 text-xs text-emerald-950 animate-fade-in leading-relaxed">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Landmark className="w-4 h-4 text-[#F5A800]" />
                  <span>Centenary Bank Transfer info:</span>
                </div>
                <div className="font-medium space-y-0.5">
                  <p>Bank: <strong className="font-extrabold text-[#1A1A1A]">Centenary Bank Uganda Limited</strong></p>
                  <p>Branch: <strong className="font-extrabold text-[#1A1A1A]">Kira Town Council Agency</strong></p>
                  <p>Account Name: <strong className="font-extrabold text-[#1A1A1A]">Yellow Star Produce & Food Processors</strong></p>
                  <p>Account Number: <strong className="font-extrabold text-[#1A1A1A]">0107261353102</strong></p>
                </div>
                <p className="text-[10.5px] text-gray-500 pt-1">
                  After wire submission, reference the generated order reference (e.g. <span className="font-bold">YS-98312</span>) in payment reference memo field so we approve immediately.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t">
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg text-sm font-extrabold text-white bg-[#1A6B3A] hover:bg-opacity-95 hover:text-[#F5A800] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-950/20"
              id="confirm-place-order-checkout"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Dispatch Order (UGX {total.toLocaleString()})</span>
            </button>
          </div>

        </form>

        {/* Right column: Basket list summary overview */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Buying basket contents</h3>
          
          <div className="divide-y max-h-64 overflow-y-auto pr-1">
            {cart.map(item => (
              <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3 py-3">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-10 h-10 object-cover rounded-md border"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-xs text-gray-800 tracking-tight line-clamp-1">{item.productName}</h4>
                  <span className="text-[9.5px] font-bold text-[#1A6B3A] bg-[#E8F5ED] px-1.5 py-0.5 rounded-sm inline-block mt-0.5">
                    {item.size} x {item.quantity} packs
                  </span>
                </div>
                <div className="text-xs font-extrabold text-gray-900 pr-1">
                  UGX {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing parameters sums */}
          <div className="border-t border-gray-150 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-gray-500 font-medium font-semibold">
              <span>Cart Subtotal</span>
              <span>UGX {subtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-gray-500 font-medium font-semibold">
              <span>Logistics Transit charge ({shippingMethod === 'standard' ? 'Kampala Express' : 'Upcountry Scheduled'})</span>
              <span>UGX {shippingFee.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-dashed">
              <span>Aggregate Total</span>
              <span className="text-[#1A6B3A]">UGX {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border flex gap-2 text-[10px] text-gray-500 leading-normal">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            <span>
              By dispatching order you consent to our certified farm-trade compliance, enabling direct secure transfers verified under Uganda consumer acts.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
