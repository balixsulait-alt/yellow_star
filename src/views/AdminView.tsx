import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order, Product, WholesaleRequest, OrderStatus, PaymentStatus } from '../types';
import { AreaChart, TrendingUp, Compass, ShoppingBag, Plus, Trash2, Edit3, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    products,
    orders,
    wholesaleRequests,
    approveWholesale,
    rejectWholesale,
    updateOrderStatus,
    updateOrderPayment,
    addProduct,
    updateProduct,
    deleteProduct,
    setView,
    showToast
  } = useApp();

  const [adminTab, setAdminTab] = useState<'dashboard' | 'orders' | 'products' | 'merchants'>('dashboard');

  // Product Create/Edit Dialog States
  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // New Product Form States
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'Flour' | 'Peanut Butter' | 'Honey'>('Flour');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImg, setNewProdImg] = useState('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400');
  const [newProdSize, setNewProdSize] = useState('1kg');
  const [newProdPrice, setNewProdPrice] = useState(6000);
  const [newProdWholesale, setNewProdWholesale] = useState(4800);
  const [newProdStock, setNewProdStock] = useState(100);

  // Stats Counters
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'Paid')
    .reduce((acc, curr) => acc + curr.total, 0);

  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const pendingWholesale = wholesaleRequests.filter(r => r.status === 'pending').length;

  const lowStockProducts: { prodName: string; size: string; stock: number }[] = [];
  products.forEach(p => {
    p.sizes.forEach(sz => {
      if (sz.stock <= 10) {
        lowStockProducts.push({ prodName: p.name, size: sz.size, stock: sz.stock });
      }
    });
  });

  // Price modifier inline state tracker
  const [priceEditingKey, setPriceEditingKey] = useState<string | null>(null); // "prodId-sizeName"
  const [priceEditVal, setPriceEditVal] = useState<string>('');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdDesc) {
      showToast('Product title and description parameters are required.', 'error');
      return;
    }

    const newProd: Product = {
      id: `ys-${Date.now()}`,
      name: newProdName,
      category: newProdCategory,
      description: newProdDesc,
      image: newProdImg,
      rating: 5.0,
      reviewsCount: 1,
      sizes: [{ size: newProdSize, price: Number(newProdPrice), wholesalePrice: Number(newProdWholesale), stock: Number(newProdStock) }]
    };

    addProduct(newProd);
    
    // Reset Form
    setNewProdName('');
    setNewProdDesc('');
    setNewProdImg('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400');
    setShowCreateForm(false);
  };

  const handlePriceUpdateSave = (productId: string, sizeName: string) => {
    const rate = Number(priceEditVal);
    if (isNaN(rate) || rate <= 0) {
      showToast('Please state a valid numeric price.', 'error');
      return;
    }

    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct) return;

    const revisedSizes = targetProduct.sizes.map(sz => sz.size === sizeName ? { ...sz, price: rate, wholesalePrice: Math.floor(rate * 0.8) } : sz);
    updateProduct({ ...targetProduct, sizes: revisedSizes });
    
    setPriceEditingKey(null);
    setPriceEditVal('');
  };

  const handleStockRestock = (productId: string, sizeName: string, quantity: number) => {
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct) return;

    const revisedSizes = targetProduct.sizes.map(sz => sz.size === sizeName ? { ...sz, stock: sz.stock + quantity } : sz);
    updateProduct({ ...targetProduct, sizes: revisedSizes });
    showToast(`Inventory restocked with additional ${quantity} packs successfully.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in pointer-events-auto">
      
      {/* Visual Header Grid with Admin Clearance Flag */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 text-white rounded-2xl p-6 border shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black tracking-widest bg-amber-500 text-slate-950 px-2.5 py-1 rounded-sm">
              Operational Clearance Level 3
            </span>
            <span className="text-emerald-400 font-bold text-xs">● Live Database Hook</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight leading-tight">Yellow Star Management Portal</h1>
          <p className="text-xs text-gray-400 leading-normal">
            Operational dashboard to approve trade requests, verify Bank transfers,restock, and review finances.
          </p>
        </div>

        <div>
          <button
            onClick={() => setView('home')}
            className="bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-bold px-4 py-2 rounded-lg"
          >
            Switch to Public Storefront
          </button>
        </div>
      </div>

      {/* Admin Nav Toggles row */}
      <div className="flex border-b text-xs sm:text-sm gap-2">
        {[
          { id: 'dashboard' as const, label: 'Sales Overview' },
          { id: 'orders' as const, label: 'Orders Logistics' },
          { id: 'products' as const, label: 'Catalog & Inventory' },
          { id: 'merchants' as const, label: 'Merchant Approvals' }
        ].map(tb => (
          <button
            key={tb.id}
            onClick={() => setAdminTab(tb.id)}
            className={`pb-3 px-3 font-extrabold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              adminTab === tb.id ? 'border-[#1A6B3A] text-[#1A6B3A]' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {/* --- TAB 1: OVERVIEW & SALES GRAPHICS --- */}
      {adminTab === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Main Counters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-5 rounded-2xl border shadow-3xs space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Verified Net Revenue</span>
              <div className="text-xl sm:text-2xl font-black text-gray-950">UGX {totalRevenue.toLocaleString()}</div>
              <span className="text-[9.5px] text-emerald-600 font-extrabold">Paid checkout transactions only</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border shadow-3xs space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Active Pending Orders</span>
              <div className="text-xl sm:text-2xl font-black text-[#1A6B3A]">{pendingOrders} orders</div>
              <span className="text-[9.5px] text-gray-400 font-medium">Awaiting logistics dispatch routing</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border shadow-3xs space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">B2B Wholesaler Applicants</span>
              <div className="text-xl sm:text-2xl font-black text-amber-600">{pendingWholesale} pending</div>
              <span className="text-[9.5px] text-gray-400 font-medium">Awaiting tax TIN approvals</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border shadow-3xs space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Low Stock Alerts</span>
              <div className={`text-xl sm:text-2xl font-black ${lowStockProducts.length > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                {lowStockProducts.length} items
              </div>
              <span className="text-[9.5px] text-gray-400 font-medium">Size variants with &lt;= 10 units stock</span>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Custom Vector Sales Chart (Plotting metrics dynamically using CSS/SVG) */}
            <div className="lg:col-span-8 bg-white p-5 rounded-2xl border shadow-xs space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-gray-400 block tracking-widest">Revenue Analytics</span>
                <h3 className="text-base font-bold text-gray-900">Weekly Sales Distribution Volume (UGX)</h3>
              </div>

              {/* Responsive SVG Chart representation to avoid layout breaks */}
              <div className="h-64 w-full bg-slate-50 border rounded-xl overflow-hidden p-4 relative flex flex-col justify-between">
                
                {/* Visual gridlines */}
                <div className="absolute inset-x-0 top-1/4 border-b border-gray-200/50" />
                <div className="absolute inset-x-0 top-2/4 border-b border-gray-200/50" />
                <div className="absolute inset-x-0 top-3/4 border-b border-gray-200/50" />

                {/* Grid bars container */}
                <div className="flex-1 flex items-end justify-around relative z-10 pt-10">
                  
                  {[
                    { week: 'Week 21', value: 85000, height: 'h-1/5' },
                    { week: 'Week 22', value: 120000, height: 'h-2/5' },
                    { week: 'Week 23', value: 180000, height: 'h-3/5' },
                    { week: 'Week 24 (Current)', value: 240000, height: 'h-4/5' }
                  ].map(bar => (
                    <div key={bar.week} className="flex flex-col items-center space-y-2 group w-1/5">
                      <span className="text-[9.5px] font-bold text-[#1A6B3A] opacity-0 group-hover:opacity-100 transition-opacity">
                        UGX {bar.value.toLocaleString()}
                      </span>
                      <div className={`w-10 rounded-t bg-[#1A6B3A] group-hover:bg-[#F5A800] transition-colors relative ${bar.height}`}>
                        <div className="absolute inset-x-0 top-0 h-1 bg-white/20" />
                      </div>
                      <span className="text-[8.5px] font-extrabold text-gray-500 uppercase tracking-wider">{bar.week}</span>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* Warning restock reminders panels */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border shadow-xs space-y-4">
              <div className="flex items-center gap-1 border-b pb-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Inventory Restock Reminders</h4>
              </div>

              {lowStockProducts.length === 0 ? (
                <div className="text-center py-6 text-gray-400 text-xs">
                  All catalogue products maintain healthy, approved stock margins.
                </div>
              ) : (
                <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                  {lowStockProducts.map((lsp, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-red-50 text-red-950 rounded-lg border border-red-200 text-xs shadow-3xs animate-fade-in">
                      <div>
                        <span className="font-extrabold block text-gray-800 text-[11.5px]">{lsp.prodName}</span>
                        <span className="text-[10px] text-gray-500 font-medium">{lsp.size} Variant SKU</span>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="text-[10.5px] font-black text-red-600 block leading-none">{lsp.stock} packs</span>
                        <button
                          onClick={() => {
                            const pId = products.find(p => p.name === lsp.prodName)?.id;
                            if (pId) handleStockRestock(pId, lsp.size, 50);
                          }}
                          className="text-[9.5px] bg-red-650 hover:bg-slate-900 text-red-600 hover:text-white border px-1.5 py-0.5 rounded font-extrabold"
                        >
                          Restock +50
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* --- TAB 2: LOGISTICS ORDERS MANAGEMENT --- */}
      {adminTab === 'orders' && (
        <div className="bg-white rounded-2xl border shadow-xs overflow-hidden animate-fade-in space-y-4 p-5">
          <div className="border-b pb-3">
            <h3 className="font-black text-sm text-gray-900 uppercase tracking-wider">Logistics Dispatch and Verification Dashboard</h3>
            <p className="text-xs text-gray-500 mt-1">Alter order billing statuses, payment confirmations, and transport milestones.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y">
              <thead className="bg-slate-50 text-slate-700 font-bold">
                <tr>
                  <th className="p-3">Reference Code</th>
                  <th className="p-3">Customer Profile</th>
                  <th className="p-3">Method / Total</th>
                  <th className="p-3">Settlement</th>
                  <th className="p-3">Logistics Status</th>
                  <th className="p-3 text-right">Fulfillment Command</th>
                </tr>
              </thead>
              <tbody className="divide-y font-medium text-gray-600">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono font-extrabold text-[#1A6B3A]">
                      {order.referenceCode}
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-gray-900 block">{order.customerName}</span>
                      <span className="text-[10px] text-gray-400 block">{order.customerPhone}</span>
                    </td>
                    <td className="p-3">
                      <span className="block">{order.paymentMethod}</span>
                      <strong className="font-bold text-gray-900">UGX {order.total.toLocaleString()}</strong>
                    </td>
                    <td className="p-3">
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => updateOrderPayment(order.id, e.target.value as PaymentStatus)}
                        className={`font-semibold p-1.5 rounded-md border text-[10.5px] bg-white cursor-pointer ${
                          order.paymentStatus === 'Paid' ? 'border-emerald-500 text-emerald-800' : 'border-red-400 text-red-700'
                        }`}
                      >
                        <option value="Pending">Pending Wire</option>
                        <option value="Paid">Verified Paid</option>
                        <option value="Failed">Failed Rejected</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="font-semibold p-1.5 rounded-md border text-[10.5px] bg-white cursor-pointer"
                      >
                        <option value="Pending">Pending Dispatch</option>
                        <option value="Processing">Processing Mill</option>
                        <option value="Shipped">Shipped Transit</option>
                        <option value="Delivered">Delivered Door</option>
                        <option value="Cancelled">Cancelled Aborted</option>
                      </select>
                    </td>
                    <td className="p-3 text-right font-bold text-[10.5px]">
                      {order.paymentStatus === 'Pending' && order.paymentMethod === 'Bank Transfer' ? (
                        <button
                          onClick={() => {
                            updateOrderPayment(order.id, 'Paid');
                            updateOrderStatus(order.id, 'Processing');
                          }}
                          className="bg-[#1A6B3A] text-white px-2.5 py-1.5 rounded-md hover:opacity-90 inline-block text-[10px] font-black uppercase shadow-3xs"
                        >
                          Confirm Bank Wire Receipt
                        </button>
                      ) : (
                        <span className="text-gray-400 font-semibold italic">System Audited</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB 3: CATALOG & INVENTORY MANAGEMENT --- */}
      {adminTab === 'products' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border">
            <div>
              <h3 className="font-bold text-sm text-gray-900 uppercase">Product SKUs Inventory Grid</h3>
              <p className="text-xs text-gray-400 mt-1">Alter price sheets, load initial stocks, or add new crops flours.</p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-[#1A6B3A] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-opacity-95"
            >
              <Plus className="w-4 h-4" /> <span>Crop New Item</span>
            </button>
          </div>

          {/* Form to Append New Crop Portfolios */}
          {showCreateForm && (
            <form onSubmit={handleCreateProduct} className="bg-slate-50 p-6 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 animate-scale-up">
              <h3 className="md:col-span-2 text-xs font-bold text-[#1A6B3A] uppercase tracking-widest border-b pb-2">Load Crop New Product Portfolio</h3>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-500">Product Title *</label>
                <input
                  type="text"
                  placeholder="e.g. YS Organic Cassava flour"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-lg bg-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-500">Product Category portfolio *</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value as any)}
                  className="w-full text-xs p-2.5 border rounded-lg bg-white"
                >
                  <option value="Flour">Flour Division</option>
                  <option value="Peanut Butter">Peanut Butter spreads</option>
                  <option value="Honey">Honey Division</option>
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-bold uppercase text-gray-500">Summary description *</label>
                <input
                  type="text"
                  placeholder="Introduce ingredients, stone-ground details, certifications references..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-lg bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-4 gap-3 md:col-span-2 border-t pt-4">
                <div className="space-y-1">
                  <label className="text-[9.5px] uppercase font-bold text-gray-500">Size net weight</label>
                  <input
                    type="text"
                    value={newProdSize}
                    onChange={(e) => setNewProdSize(e.target.value)}
                    className="w-full text-xs p-2 border rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9.5px] uppercase font-bold text-[#1A6B3A]">Retail Price (UGX)*</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full text-xs p-2 border rounded-lg bg-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9.5px] uppercase font-bold text-[#1A6B3A]">Wholesale Price (UGX)*</label>
                  <input
                    type="number"
                    value={newProdWholesale}
                    onChange={(e) => setNewProdWholesale(Number(e.target.value))}
                    className="w-full text-xs p-2 border rounded-lg bg-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9.5px] uppercase font-bold text-[#1A6B3A]">Milling Stock packs*</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full text-xs p-2 border rounded-lg bg-white"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2 pt-2 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border rounded text-xs"
                >
                  Clear Clear
                </button>
                <button
                  type="submit"
                  className="bg-[#1A6B3A] text-white text-xs font-bold px-4 py-2 rounded shadow-xs"
                >
                  Confirm Crop
                </button>
              </div>
            </form>
          )}

          {/* Catalog Listing details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white rounded-xl border p-4 space-y-4 flex flex-col justify-between shadow-3xs">
                
                <div className="flex gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-md border flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase font-extrabold text-[#1A6B3A] bg-[#E8F5ED] px-2 py-0.5 rounded-sm">
                      {p.category}
                    </span>
                    <h4 className="font-extrabold text-sm text-gray-950 truncate mt-1 leading-none">{p.name}</h4>
                    <p className="text-[11px] text-gray-400 line-clamp-1 leading-normal mt-1">{p.description}</p>
                  </div>
                </div>

                {/* Sizes and prices inline restocker grids */}
                <div className="pt-3 border-t border-dashed space-y-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">SKUs Inventory:</span>
                  <div className="divide-y text-xs font-semibold">
                    {p.sizes.map(sz => {
                      const isEditingPrice = priceEditingKey === `${p.id}-${sz.size}`;
                      return (
                        <div key={sz.size} className="flex justify-between items-center py-2 gap-4">
                          <span className="font-bold text-gray-800 text-xs min-w-[36px]">{sz.size}</span>
                          
                          {/* Price Display vs Editor */}
                          <div className="flex-1 text-left min-w-0">
                            {isEditingPrice ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={priceEditVal}
                                  onChange={(e) => setPriceEditVal(e.target.value)}
                                  className="w-20 p-1 text-xs border rounded focus:outline-emerald-800 font-mono"
                                  placeholder="New Price"
                                />
                                <button
                                  onClick={() => handlePriceUpdateSave(p.id, sz.size)}
                                  className="bg-[#1A6B3A] text-white p-1 rounded hover:opacity-90"
                                >
                                  ✓
                                </button>
                                <button
                                  onClick={() => setPriceEditingKey(null)}
                                  className="bg-gray-200 text-gray-600 p-1 rounded"
                                >
                                  ✗
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-bold text-gray-950 font-mono text-xs">U: {sz.price.toLocaleString()}</span>
                                <span className="text-[10.5px] text-emerald-800 font-medium font-mono">W: {sz.wholesalePrice.toLocaleString()}</span>
                                <button
                                  onClick={() => {
                                    setPriceEditingKey(`${p.id}-${sz.size}`);
                                    setPriceEditVal(sz.price.toString());
                                  }}
                                  className="p-1 hover:bg-gray-150 rounded text-gray-400 hover:text-gray-900 transition-colors"
                                  title="Edit price parameter"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Inventory packs restocking */}
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold leading-none ${sz.stock <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}>
                              {sz.stock} packs
                            </span>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => handleStockRestock(p.id, sz.size, 50)}
                                className="bg-slate-100 hover:bg-[#E8F5ED] hover:text-[#1A6B3A] border text-[9.5px] px-1.5 py-0.5 rounded transition-colors"
                              >
                                Restock +50
                              </button>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Erase crop portfolio action button */}
                <div className="pt-3 border-t flex justify-end">
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-500 hover:text-red-700 bg-red-10 hover:bg-red-50 text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> <span>Withdraw catalog</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* --- TAB 4: MERCHANT B2B WHOLESALE APPLICATIONS --- */}
      {adminTab === 'merchants' && (
        <div className="bg-white rounded-2xl border shadow-xs overflow-hidden animate-fade-in space-y-4 p-5">
          <div className="border-b pb-3">
            <h3 className="font-bold text-sm text-gray-900 uppercase">Resellers & Agricultural Partners clearances</h3>
            <p className="text-xs text-gray-500 mt-1">Review business tax references (TIN) and authorize wholesale rates discounts.</p>
          </div>

          {wholesaleRequests.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs font-medium">
              There are no wholesale credential requests logged on server.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y">
                <thead className="bg-[#E8F5ED] text-emerald-900 font-black">
                  <tr>
                    <th className="p-3">Applicant details</th>
                    <th className="p-3">Company Merchant Name</th>
                    <th className="p-3">Type & TIN details</th>
                    <th className="p-3">Authorized Phone</th>
                    <th className="p-3">Current Status</th>
                    <th className="p-3 text-right">Approval Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y font-medium text-gray-650">
                  {wholesaleRequests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50/50">
                      <td className="p-3">
                        <span className="font-bold text-gray-900 block">{req.userName}</span>
                        <span className="text-[10px] text-gray-400 block">{req.userEmail}</span>
                      </td>
                      <td className="p-3 font-semibold text-gray-800">
                        {req.companyName}
                      </td>
                      <td className="p-3">
                        <span className="block">{req.businessType}</span>
                        <span className="text-[10px] text-gray-400 block font-mono">TIN: {req.tinNumber || 'No registry entry'}</span>
                      </td>
                      <td className="p-3 font-mono">
                        {req.phone}
                      </td>
                      <td className="p-3 text-[10px]">
                        {req.status === 'approved' ? (
                          <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded">Active Partner</span>
                        ) : req.status === 'rejected' ? (
                          <span className="bg-red-100 text-red-800 font-extrabold px-2 py-0.5 rounded">Rejected</span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-800 font-extrabold px-2 py-0.5 rounded animate-pulse">Awaiting audit</span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-1 whitespace-nowrap">
                        {req.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => approveWholesale(req.id)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-1 px-2.5 rounded text-[10px]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectWholesale(req.id)}
                              className="bg-red-500 hover:bg-red-650 text-white font-bold p-1 px-2.5 rounded text-[10px]"
                            >
                              Decline
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-400 italic">Audited verified</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
