import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Truck, Lock, User as UserIcon, Calendar, ClipboardList, Award, Eye, Receipt, Send } from 'lucide-react';

export const AccountView: React.FC = () => {
  const {
    currentUser,
    registerUser,
    login,
    orders,
    applyForWholesale,
    setView,
    showToast
  } = useApp();

  const [isRegistering, setIsRegistering] = useState(false);
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [applyWholesale, setApplyWholesale] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [tinNumber, setTinNumber] = useState('');

  // Wholesalers application state (for already logged-in standard customers)
  const [tradeCompany, setTradeCompany] = useState('');
  const [tradeTin, setTradeTin] = useState('');
  const [tradePhone, setTradePhone] = useState('');
  const [tradeBusiness, setTradeBusiness] = useState('Grocery Outlet / Supermarket');

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return;

    const success = login(loginEmail);
    if (success) {
      setLoginEmail('');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone || !regAddress) {
      showToast('All standard registration parameters are mandatory.', 'error');
      return;
    }

    if (applyWholesale && !companyName) {
      showToast('Please state your company registration name to join commercial terms.', 'error');
      return;
    }

    registerUser({
      name: regName,
      email: regEmail,
      phone: regPhone,
      address: regAddress,
      role: 'customer',
      applyWholesale,
      companyName: applyWholesale ? companyName : undefined,
      tinNumber: applyWholesale ? tinNumber : undefined
    });

    // Reset forms
    setRegName('');
    setRegEmail('');
    setRegPhone('');
    setRegAddress('');
    setApplyWholesale(false);
    setCompanyName('');
    setTinNumber('');
  };

  const handleTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tradeCompany || !tradePhone) {
      showToast('Authorized company name and telephone line references are required.', 'error');
      return;
    }
    applyForWholesale(tradeCompany, tradeTin, tradePhone, tradeBusiness);
    setTradeCompany('');
    setTradeTin('');
    setTradePhone('');
  };

  const userOrders = currentUser ? orders.filter(o => o.userId === currentUser.id) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in pointer-events-auto">
      
      {/* CASE 1: NO ACTIVE USER LOGGED IN */}
      {!currentUser ? (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Box 1: Simple simulation Login helper */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-extrabold text-[#1A6B3A] tracking-wider block">Access Area</span>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">Secure Customer Log In</h1>
              <p className="text-xs text-gray-500 leading-normal">
                Enter your credentials to manage active purchases, check delivery dispatch tracks, and explore specialized bulk trade pricing.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10.5px] uppercase font-bold text-gray-600 block">Your Profile Email address</label>
                <input
                  type="email"
                  placeholder="e.g. customer@yellowstar.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-lg bg-gray-50 focus:bg-white focus:outline-[#1A6B3A]"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-[#1A6B3A] hover:bg-opacity-95 transition-all text-center flex items-center justify-center gap-1 shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5" /> <span>Verify and Enter Account</span>
                </button>
              </div>
            </form>

            <div className="bg-gray-50 p-3 rounded-lg border text-[10px] text-gray-400 font-semibold space-y-1">
              <span className="uppercase text-[9px] font-bold text-gray-500 block">Local Simulation Shortcut Contacts:</span>
              <p onClick={() => setLoginEmail('customer@yellowstar.com')} className="hover:underline text-[#1A6B3A] cursor-pointer">
                - John Doe sse (Retail Customer): customer@yellowstar.com
              </p>
              <p onClick={() => setLoginEmail('admin@yellowstar.com')} className="hover:underline text-amber-600 cursor-pointer">
                - Sarah Namazzi (Admin): admin@yellowstar.com
              </p>
            </div>
          </div>

          {/* Box 2: Register New Profile */}
          <div className="bg-emerald-950 p-6 sm:p-8 rounded-2xl border text-white flex flex-col justify-between space-y-6 shadow-md">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-extrabold text-[#F5A800] tracking-wider block">Join Us</span>
              <h2 className="text-xl font-bold tracking-tight">Create Professional Account</h2>
              <p className="text-xs text-gray-300 leading-normal">
                Sign up to establish saved addresses, log detailed reviews, and submit trade merchant credentials for bulk buying rates.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-gray-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name (e.g. Joseph Wasswa)"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-white focus:outline-[#1A6B3A]"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address (e.g. wasswa@gmail.com)"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-white focus:outline-[#1A6B3A]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Active Phone Number"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value.replace(/\s/g, ''))}
                  className="w-full text-xs p-2.5 rounded-lg bg-white focus:outline-[#1A6B3A]"
                  required
                />
                <input
                  type="text"
                  placeholder="Precise Location Address"
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-white focus:outline-[#1A6B3A]"
                  required
                />
              </div>

              {/* Apply for Wholesale Checkbox */}
              <div className="pt-2 border-t border-emerald-800 space-y-3">
                <label className="flex items-center gap-2 text-white text-xs font-bold cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={applyWholesale}
                    onChange={(e) => setApplyWholesale(e.target.checked)}
                    className="rounded text-[#1A6B3A] focus:ring-0 w-4 h-4 bg-white"
                  />
                  <span>Apply for Trade/Wholesale privileges</span>
                </label>

                {applyWholesale && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                    <input
                      type="text"
                      placeholder="Company Business Name (e.g. Wasswa Stores)"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg bg-white focus:outline-[#1A6B3A]"
                      required={applyWholesale}
                    />
                    <input
                      type="text"
                      placeholder="TIN Number (Optional)"
                      value={tinNumber}
                      onChange={(e) => setTinNumber(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg bg-white focus:outline-[#1A6B3A]"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-xs font-extrabold text-teal-950 bg-white hover:bg-[#F5A800] hover:text-gray-900 transition-all text-center flex items-center justify-center gap-1 shadow-md"
                >
                  <UserIcon className="w-3.5 h-3.5" /> <span>Establish Profile Account</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      ) : (
        /* CASE 2: USER IS ALREADY LOGGED IN */
        <div className="space-y-12">
          
          {/* Header Panel options */}
          <div className="bg-[#E8F5ED] rounded-2xl p-6 border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1A6B3A] text-white font-extrabold flex items-center justify-center">
                {currentUser.name[0]}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">{currentUser.name}</h1>
                <span className="text-xs text-gray-500 font-semibold flex items-center gap-1 pt-0.5">
                  <UserIcon className="w-3.5 h-3.5" /> {currentUser.email} • Telephone: {currentUser.phone}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setView('admin')}
                  className="bg-amber-500 hover:bg-amber-600 font-extrabold text-xs text-white px-4 py-2 rounded-lg shadow-sm"
                >
                  Admin Control panel
                </button>
              )}
              
              <button
                onClick={() => setView('products')}
                className="bg-white hover:bg-gray-150 border-2 text-xs font-bold text-gray-700 px-4 py-2 rounded-lg"
              >
                Go Shop Store
              </button>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left/Main Column: Orders List */}
            <div className="lg:col-span-8 bg-white p-5 rounded-2xl border shadow-xs space-y-6">
              
              <div className="flex items-center gap-2 border-b pb-3">
                <ClipboardList className="w-5 h-5 text-[#1A6B3A]" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Purchase History & Dispatch Tracker</h3>
              </div>

              {userOrders.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center justify-center space-y-3">
                  <ClipboardList className="w-12 h-12 text-gray-200" />
                  <h4 className="font-bold text-gray-700 text-sm">No Orders Registered</h4>
                  <p className="text-xs text-gray-400 max-w-xs mt-1">
                    You have not logged any purchases under this email yet. Explore our high-health value foods and place your first order.
                  </p>
                  <button
                    onClick={() => setView('products')}
                    className="mt-4 px-4 py-2 text-xs font-extrabold text-white bg-[#1A6B3A] rounded-lg hover:bg-opacity-95"
                  >
                    Go Sourcing
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map(order => {
                    const isExpanded = expandedOrderId === order.id;
                    const statusColors = {
                      'Pending': 'bg-gray-100 text-gray-800 border-gray-200',
                      'Processing': 'bg-blue-50 text-blue-700 border-blue-200',
                      'Shipped': 'bg-amber-50 text-amber-700 border-amber-200',
                      'Delivered': 'bg-green-50 text-green-700 border-green-200',
                      'Cancelled': 'bg-red-50 text-red-700 border-red-200'
                    };

                    const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
                    const activeStepIdx = steps.indexOf(order.status);

                    return (
                      <div key={order.id} className="border rounded-xl bg-white overflow-hidden shadow-3xs hover:border-gray-300 transition-all">
                        
                        {/* Order overview row summary */}
                        <div
                          className="p-4 flex flex-wrap justify-between items-center gap-4 cursor-pointer hover:bg-gray-50/50"
                          onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-extrabold text-[#1A6B3A] text-sm">
                                {order.referenceCode}
                              </span>
                              <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${statusColors[order.status]}`}>
                                {order.status}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-semibold block uppercase">
                              {new Date(order.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-bold text-gray-900 block">UGX {order.total.toLocaleString()}</span>
                            <span className="text-[9.5px] text-gray-400 font-medium block">
                              {order.items.reduce((acc, i) => acc + i.quantity, 0)} packs • {order.paymentMethod}
                            </span>
                          </div>

                          <div className="p-2 border rounded-lg text-gray-400 hover:text-[#1A6B3A] transition-colors bg-white">
                            <Eye className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Collapsible item table and visual path bar */}
                        {isExpanded && (
                          <div className="p-4 border-t border-gray-100 bg-gray-50/80 space-y-6 animate-fade-in">
                            
                            {/* Visual Logistics progress path bar line */}
                            {order.status !== 'Cancelled' && (
                              <div className="space-y-3 p-4 bg-white rounded-xl border">
                                <span className="text-[9.5px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Logistics Dispatch Milestones:</span>
                                
                                <div className="grid grid-cols-4 gap-1 relative pt-2">
                                  {steps.map((st, sIdx) => {
                                    const isDone = sIdx <= activeStepIdx;
                                    const isCurrent = sIdx === activeStepIdx;
                                    return (
                                      <div key={st} className="flex flex-col items-center text-center space-y-1 relative z-10">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10.5px] ${
                                          isDone ? 'bg-[#1A6B3A] text-white' : 'bg-gray-200 text-gray-500'
                                        } ${isCurrent ? 'ring-4 ring-emerald-100 animate-pulse' : ''}`}>
                                          {isDone ? '✓' : sIdx + 1}
                                        </div>
                                        <span className={`text-[9px] font-bold ${isCurrent ? 'text-[#1A6B3A]' : isDone ? 'text-gray-800' : 'text-gray-400'}`}>
                                          {st}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Cart List contents table summary inside receipt */}
                            <div className="space-y-2 bg-white rounded-xl border p-4">
                              <span className="text-[10px] uppercase font-bold tracking-wide text-gray-400 block mb-2">Detailed Shipment Invoice:</span>
                              <div className="divide-y text-xs">
                                {order.items.map(item => (
                                  <div key={`${item.productId}-${item.size}`} className="flex justify-between items-center py-2.5">
                                    <div>
                                      <span className="font-extrabold text-gray-800 block">{item.productName}</span>
                                      <span className="text-gray-400 block text-[10px]">Net weight: {item.size} x {item.quantity} units</span>
                                    </div>
                                    <span className="font-bold text-gray-700">UGX {(item.price * item.quantity).toLocaleString()}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="border-t pt-3 mt-2 text-xs space-y-1 text-gray-500 font-medium">
                                <div className="flex justify-between">
                                  <span>Subtotal sum</span>
                                  <span className="font-bold text-gray-800">UGX {order.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Logistics Express transport</span>
                                  <span className="font-bold text-gray-800">UGX {order.shippingFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-base font-black text-gray-900 border-t pt-2 mt-2">
                                  <span>Aggregate Paid</span>
                                  <span className="text-[#1A6B3A]">UGX {order.total.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            {/* Receipts reference payment status details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                              <div className="bg-white p-3 rounded-lg border">
                                <span className="text-[9px] uppercase font-bold text-gray-400 block">Payment Details</span>
                                <p className="text-gray-800 mt-1">Provider: <strong className="font-bold">{order.paymentMethod}</strong></p>
                                <p className="text-gray-800">Gateway Code: <strong className="font-bold text-[#1A6B3A]">{order.referenceCode}</strong></p>
                                <p className="text-gray-800">Payment clear: <strong className="font-bold">{order.paymentStatus}</strong></p>
                              </div>
                              <div className="bg-white p-3 rounded-lg border">
                                <span className="text-[9px] uppercase font-bold text-gray-400 block">Shipping Location</span>
                                <p className="text-gray-800 mt-1">Recipient: <strong className="font-bold">{order.customerName}</strong></p>
                                <p className="text-gray-800">Destination: <strong className="font-bold">{order.shippingAddress}</strong></p>
                                <p className="text-gray-800">Delivery line: <strong className="font-bold text-[#1A6B3A]">{order.customerPhone}</strong></p>
                              </div>
                            </div>

                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right column: Wholesale privilege program credentials or status updates */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white p-5 rounded-2xl border shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b pb-2">
                  <Award className="w-4 h-4 text-[#F5A800]" />
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Trade Partnership Status</h3>
                </div>

                {currentUser.wholesaleStatus === 'approved' ? (
                  <div className="bg-emerald-50 text-emerald-950 p-4 rounded-xl border border-emerald-250 text-xs leading-relaxed space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                      <ShieldCheck className="w-4 h-4 text-[#F5A800]" />
                      <span>Approved Commercial Partner</span>
                    </div>
                    <p className="font-medium text-gray-600 font-semibold">
                      Your trade credentials are fully verified. You now automatically unlock up to 20% discount on millet, soy, spreads, and honey products.
                    </p>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide pt-1">
                      Min total order: <strong>UGX 150,000</strong>
                    </div>
                  </div>
                ) : currentUser.wholesaleStatus === 'pending' ? (
                  <div className="bg-amber-50 text-amber-950 p-4 rounded-xl border border-amber-200 text-xs leading-relaxed space-y-2 animate-pulse">
                    <div className="flex items-center gap-1.5 font-bold text-amber-800">
                      <Calendar className="w-4 h-4" />
                      <span>Privilege Check Pending</span>
                    </div>
                    <p className="text-gray-600 font-medium font-semibold">
                      Your business profile and trade requests have been dispatched and are awaiting verification by Yellow Star administration handlers.
                    </p>
                    <p className="text-[10px] text-gray-400 leading-normal">
                      Approval cycles normally conclude within 1-2 corporate business hours.
                    </p>
                  </div>
                ) : (
                  /* Form to apply */
                  <form onSubmit={handleTradeSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-gray-800">Apply for Wholesale Sourcing</h4>
                      <p className="text-[10.5px] text-gray-500 leading-normal">
                        Submit company details to join our specialized bulk supply lines. Approved resellers get wholesale prices.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[9.5px] uppercase font-bold text-gray-500">Business Company Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Namazzi Grain Traders Ltd"
                          value={tradeCompany}
                          onChange={(e) => setTradeCompany(e.target.value)}
                          className="w-full text-xs p-2 border rounded-lg bg-gray-50 focus:bg-white focus:outline-[#1A6B3A] font-semibold"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9.5px] uppercase font-bold text-gray-500">Business Type *</label>
                        <select
                          value={tradeBusiness}
                          onChange={(e) => setTradeBusiness(e.target.value)}
                          className="w-full text-xs p-2 border rounded-lg bg-gray-50 focus:bg-white focus:outline-[#1A6B3A] font-semibold"
                        >
                          <option>Grocery Outlet / Supermarket</option>
                          <option>Food Processing Factory</option>
                          <option>Regional Retail Wholesaler</option>
                          <option>Public Boarding Institution</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9.5px] uppercase font-bold text-gray-500">TIN Number (Tax Registry)</label>
                        <input
                          type="text"
                          placeholder="e.g. 1004189028"
                          value={tradeTin}
                          onChange={(e) => setTradeTin(e.target.value)}
                          className="w-full text-xs p-2 border rounded-lg bg-gray-50 focus:bg-white focus:outline-[#1A6B3A] font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9.5px] uppercase font-bold text-gray-500">Verification Phone Line *</label>
                        <input
                          type="text"
                          placeholder="e.g. 0772123456"
                          value={tradePhone}
                          onChange={(e) => setTradePhone(e.target.value)}
                          className="w-full text-xs p-2 border rounded-lg bg-gray-50 focus:bg-white focus:outline-[#1A6B3A] font-semibold"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#1A6B3A] hover:bg-opacity-95 text-white hover:text-[#F5A800] text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1"
                        id="submit-wholesale-trade-application"
                      >
                        <Send className="w-3.5 h-3.5" /> <span>Submit Trade Application</span>
                      </button>
                    </div>

                  </form>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
