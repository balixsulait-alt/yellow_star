import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Shield, ArrowLeft, ShoppingCart, Info, Check } from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProductId,
    products,
    addToCart,
    currentUser,
    setView
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'benefits'>('details');

  const product = products.find(p => p.id === selectedProductId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Critical Error</h3>
        <p className="text-xs text-gray-500">Product could not be localized on the catalog servers.</p>
        <button onClick={() => setView('products')} className="px-4 py-2 bg-[#1A6B3A] text-white rounded text-xs font-bold">
          Back to Catalogue
        </button>
      </div>
    );
  }

  const [selectedSizeName, setSelectedSizeName] = useState<string>(product.sizes[0].size);
  const activeSize = product.sizes.find(s => s.size === selectedSizeName) || product.sizes[0];

  const isWholesale = currentUser?.wholesaleStatus === 'approved';
  const showPrice = isWholesale ? activeSize.wholesalePrice : activeSize.price;

  const handleAddToCart = () => {
    addToCart(product, selectedSizeName, quantity);
  };

  const isOutOfStock = activeSize.stock <= 0;

  // Sourcing related items
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in pointer-events-auto">
      {/* Back to explore shortcut */}
      <div>
        <button
          onClick={() => setView('products')}
          className="flex items-center space-x-1.5 text-xs text-gray-500 hover:text-[#1A6B3A] font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sourcing Catalogue</span>
        </button>
      </div>

      {/* Main product presentation split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
        
        {/* Left column: image aspect */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-4/3 max-h-[400px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-base font-bold">
              Temporarily Out of Stock
            </div>
          )}
        </div>

        {/* Right column: detail attributes */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-extrabold tracking-wider bg-[#E8F5ED] text-[#1A6B3A] px-2.5 py-1 rounded-md">
              {product.category} Portfolio
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight leading-tight">{product.name}</h1>
            
            <div className="flex items-center space-x-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-bold">({product.reviewsCount} customer audits)</span>
            </div>
          </div>

          {/* Sizing choosing blocks */}
          <div className="space-y-2">
            <span className="text-[10.5px] uppercase font-bold text-gray-400 block tracking-wide">Net Volume / Pack Weight:</span>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(sz => (
                <button
                  key={sz.size}
                  onClick={() => {
                    setSelectedSizeName(sz.size);
                    setQuantity(1);
                  }}
                  className={`text-xs font-bold px-4 py-2.5 rounded-lg border transition-all ${
                    selectedSizeName === sz.size
                      ? 'border-[#1A6B3A] bg-[#E8F5ED] text-[#1A6B3A] ring-2 ring-[#1A6B3A]/10'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {sz.size}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing parameters depending on trade privileges tier */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block leading-tight">
                {isWholesale ? 'Wholesaler Premium Rate' : 'Customer Standard Retail Rate'}
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-gray-900 tracking-tight">
                  UGX {showPrice.toLocaleString()}
                </span>
                {!isWholesale && activeSize.oldPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    UGX {activeSize.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="text-gray-500 font-semibold block">Inventory Stock Level</span>
              <span className={`font-bold ${activeSize.stock > 10 ? 'text-[#1A6B3A]' : 'text-red-600 animate-pulse'}`}>
                {isOutOfStock ? 'Unavailable' : `${activeSize.stock} packs remaining`}
              </span>
            </div>
          </div>

          {/* Add to Cart Actions Block */}
          {!isOutOfStock && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors border-r"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-extrabold text-gray-800 text-center min-w-[40px]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => Math.min(activeSize.stock, prev + 1))}
                  className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors border-l"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#1A6B3A] hover:bg-opacity-95 text-white hover:text-[#F5A800] py-2.5 px-6 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-700/20"
                id="add-qty-cart-detail"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add ({quantity}) to Shopping basket</span>
              </button>
            </div>
          )}

          {/* Product detail tabs (Description vs Ingredients vs Benefits) */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex border-b border-gray-150 text-xs gap-3">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'details' ? 'border-[#1A6B3A] text-[#1A6B3A]' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <Info className="w-3.5 h-3.5" /> <span>Description Description</span>
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-2.5 font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'ingredients' ? 'border-[#1A6B3A] text-[#1A6B3A]' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <Check className="w-3.5 h-3.5" /> <span>Harvest Ingredients</span>
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-2.5 font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'benefits' ? 'border-[#1A6B3A] text-[#1A6B3A]' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <Shield className="w-3.5 h-3.5" /> <span>Nutrition health Benefits</span>
              </button>
            </div>

            <div className="text-xs text-gray-600 leading-relaxed font-medium">
              {activeTab === 'details' && <p>{product.description}</p>}
              {activeTab === 'ingredients' && (
                <div className="space-y-1">
                  <span className="font-bold block text-gray-800">Sourced Components:</span>
                  <p className="italic">{product.ingredients || '100% natural organic harvest and processing.'}</p>
                </div>
              )}
              {activeTab === 'benefits' && (
                <div className="space-y-2">
                  <span className="font-bold block text-gray-800">Direct Health Attributes:</span>
                  <p>{product.benefits || 'High trace mineral content, stone-ground preservation.'}</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Related Products block */}
      {related.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight border-b pb-2">Related Items in Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map(relProd => (
              <div
                key={relProd.id}
                onClick={() => { setSelectedSizeName(relProd.sizes[0].size); setView('products'); }}
                className="bg-white p-3 rounded-2xl border border-gray-150 hover:border-emerald-600 cursor-pointer transition-all flex gap-3"
              >
                <img
                  src={relProd.image}
                  alt={relProd.name}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <h4 className="font-bold text-xs text-gray-800 truncate">{relProd.name}</h4>
                  <span className="text-[10px] text-gray-400 leading-none block">{relProd.category}</span>
                  <span className="text-xs text-[#1A6B3A] font-extrabold pt-2">
                    UGX {relProd.sizes[0].price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
