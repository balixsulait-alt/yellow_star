import React, { useState } from 'react';
import { Product, ProductSize } from '../types';
import { useApp } from '../context/AppContext';
import { Star, ShoppingCart, Info, Lock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, currentUser, setView, setSelectedProductId } = useApp();
  const [selectedSizeName, setSelectedSizeName] = useState<string>(product.sizes[0].size);

  const activeSize: ProductSize = product.sizes.find(s => s.size === selectedSizeName) || product.sizes[0];
  
  // Custom access variables block
  const isWholesaleApproved = currentUser?.wholesaleStatus === 'approved';
  const showPrice = isWholesaleApproved ? activeSize.wholesalePrice : activeSize.price;
  const oldPrice = isWholesaleApproved ? undefined : activeSize.oldPrice;

  const handleDetailsClick = () => {
    setSelectedProductId(product.id);
    setView('product-detail');
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSizeName, 1);
  };

  const isOutOfStock = activeSize.stock <= 0;
  const isLowStock = activeSize.stock > 0 && activeSize.stock <= 10;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden group">
      {/* Product Image Panel */}
      <div className="relative aspect-4/3 overflow-hidden bg-gray-50 cursor-pointer" onClick={handleDetailsClick} id={`product-img-${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Category tag bubble */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-xs font-bold text-[#1A6B3A] px-2.5 py-1 rounded-full shadow-xs">
          {product.category}
        </span>

        {/* Stock Alert Badge */}
        {isOutOfStock ? (
          <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm select-none">
            Temporarily Out of Stock
          </span>
        ) : isLowStock ? (
          <span className="absolute bottom-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm animate-pulse shadow-xs">
            Low Stock ({activeSize.stock} units left)
          </span>
        ) : null}

        {/* Wholesale locked overlay notice */}
        {!isWholesaleApproved && (
          <span className="absolute bottom-3 left-3 bg-gray-950/80 backdrop-blur-xs p-1 rounded text-[10px] font-semibold text-gray-200 flex items-center gap-1">
            <Lock className="w-2.5 h-2.5 text-amber-500" /> Wholesalers pricing lock
          </span>
        )}
      </div>

      {/* Contents and details */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-base text-gray-900 group-hover:text-[#1A6B3A] transition-colors line-clamp-1 cursor-pointer" onClick={handleDetailsClick}>
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-1.5 mt-1">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-400 font-bold">({product.reviewsCount})</span>
        </div>

        <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Sizing Toggles panel */}
        {product.sizes.length > 1 && (
          <div className="mt-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Select Net Weight:</span>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map(sz => (
                <button
                  key={sz.size}
                  onClick={() => setSelectedSizeName(sz.size)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded transition-all border ${
                    selectedSizeName === sz.size
                      ? 'border-[#1A6B3A] bg-[#E8F5ED] text-[#1A6B3A]'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  {sz.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions columns */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-150">
          <div className="flex flex-col">
            {isWholesaleApproved ? (
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 block leading-tight">Wholesale Rate</span>
                <span className="text-base font-extrabold text-emerald-800 tracking-tight">UGX {showPrice.toLocaleString()}</span>
                <span className="text-[9px] text-gray-500 block">Min MOQ active</span>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-base font-extrabold text-gray-900 tracking-tight">
                    UGX {showPrice.toLocaleString()}
                  </span>
                  {oldPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      UGX {oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-[9.5px] text-gray-500 block leading-tight pt-0.5">Retail Pack Price</span>
              </div>
            )}
          </div>

          <div className="flex space-x-1">
            <button
              onClick={handleDetailsClick}
              className="p-2 text-gray-400 hover:text-[#1A6B3A] hover:bg-gray-100 rounded-md transition-colors"
              title="More Attributes Info"
            >
              <Info className="w-4 h-4" />
            </button>
            <button
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                isOutOfStock
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#1A6B3A] hover:bg-opacity-90 text-white hover:text-[#F5A800]'
              }`}
              id={`add-btn-${product.id}`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
