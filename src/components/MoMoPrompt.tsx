import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Smartphone, X, Lock, CheckCircle2 } from 'lucide-react';

export const MoMoPrompt: React.FC = () => {
  const {
    isMoMoPromptOpen,
    setMoMoPromptOpen,
    momoDetails,
    confirmMomoPayment
  } = useApp();

  const [pin, setPin] = useState('');
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  if (!isMoMoPromptOpen || !momoDetails) return null;

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4) return;

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        confirmMomoPayment(pin);
        setSuccess(false);
        setPin('');
      }, 1500);
    }, 1500);
  };

  const isMtn = momoDetails.provider.toLowerCase().includes('mtn');

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-gray-100 flex flex-col relative animate-scale-up">
        
        {/* Header */}
        <div className={`p-4 text-white flex items-center justify-between ${isMtn ? 'bg-[#F5A800]' : 'bg-red-600'}`}>
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 animate-pulse text-white" />
            <h3 className="font-extrabold text-sm tracking-wide uppercase">
              {isMtn ? 'MTN MoMo Approval' : 'Airtel Money Pay'}
            </h3>
          </div>
          <button
            onClick={() => setMoMoPromptOpen(false)}
            className="text-white/80 hover:text-white hover:bg-black/10 p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic States Representation */}
        {success ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Payment Processing</h3>
            <p className="text-xs text-gray-500">
              Receipt verified. Synchronizing payment status on server database...
            </p>
          </div>
        ) : processing ? (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <div className="space-y-1">
              <h4 className="font-bold text-gray-800 text-sm">Waiting for Mobile Network...</h4>
              <p className="text-xs text-gray-400">Communicating with Airtel/MTN telecom gateway</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleAuthorize} className="p-5 space-y-4">
            <div className="text-center space-y-1 mb-2 bg-gray-50 p-3 rounded-lg border">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Transaction Amount</div>
              <div className="text-2xl font-extrabold text-[#1A6B3A]">
                UGX {momoDetails.amount.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 font-medium pt-1">
                Subscribers: <span className="font-bold text-gray-700">{momoDetails.billingNumber}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex gap-2 text-amber-900 text-[11px] font-medium leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Airtel / MTN Sandbox Rule:</strong> Enter any 4-digit secret authorization PIN to simulate the live telecom callback receipt.
                </span>
              </div>

              <div className="relative">
                <input
                  type="password"
                  maxLength={5}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter MoMo PIN"
                  className="w-full text-center text-lg tracking-widest font-mono py-2.5 px-4 mt-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1A6B3A] focus:ring-2 focus:ring-[#1A6B3A]/20"
                  required
                  id="momo-pin-input"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-300">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={pin.length < 4}
                className={`w-full py-3 rounded-lg text-sm font-bold text-white transition-all shadow-md ${
                  pin.length < 4
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
                id="momo-authorize-btn"
              >
                Authorize Request-to-Pay
              </button>
            </div>

            <p className="text-[10px] text-gray-400 text-center font-medium leading-normal flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Authorized under Uganda Communications Commission compliance.
            </p>
          </form>
        )}

      </div>
    </div>
  );
};
