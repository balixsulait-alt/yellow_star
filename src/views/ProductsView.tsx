import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, Lock, HeartHandshake } from 'lucide-react';

export const ProductsView: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    currentUser,
    setView
  } = useApp();

  const handleCategoryTab = (category: string) => {
    setActiveCategory(category);
  };

  // Filter products by category AND search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isWholesaleApproved = currentUser?.wholesaleStatus === 'approved';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in pointer-events-auto">
      
      {/* Search and Category navigation header */}
      <div className="bg-white rounded-2xl border p-4 sm:p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Our Premium Sourced Catalogue</h1>
            <p className="text-xs text-gray-500 mt-1">Grains, spreads, and high-nutrition baby weaners stone-ground cleanly in Wakiso.</p>
          </div>

          {/* Wholesale notice helper badge */}
          {!isWholesaleApproved ? (
            <div className="bg-amber-50 text-amber-900 border border-amber-200 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 max-w-sm">
              <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <div>
                <span className="font-bold block">Wholesale Pricing is Locked</span>
                <button onClick={() => setView('account')} className="text-emerald-800 font-extrabold underline hover:text-[#1A6B3A]">
                  Register Trade Account
                </button> to unlock up to 20% discounts.
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 text-emerald-950 border border-emerald-200 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-700" />
              <div>
                <span className="font-extrabold block text-emerald-800">Commercial Merchant Sourcing Active</span>
                Min total order value of UGX 150,000 counts. Enjoy discounted bulk rates!
              </div>
            </div>
          )}
        </div>

        {/* Filters and search input boxes */}
        <div className="flex flex-col lg:flex-row gap-4 pt-4 border-t">
          {/* Category Tabs list */}
          <div className="flex overflow-x-auto pb-1 gap-1.5 scrollbar-thin lg:flex-1">
            {['All', 'Flour', 'Peanut Butter', 'Honey'].map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryTab(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? 'bg-[#1A6B3A] text-white border-transparent'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat === 'All' ? 'All Portfolios' : cat}
              </button>
            ))}
          </div>

          {/* Interactive quick filter panel info */}
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Search by ingredients, brand terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1A6B3A] focus:bg-white transition-all"
            />
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
              <Search className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

      </div>

      {/* Grid of Products */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border p-12 text-center flex flex-col items-center justify-center space-y-3">
          <Search className="w-12 h-12 text-gray-200" />
          <h3 className="font-bold text-gray-700 text-sm">No Matching Products Found</h3>
          <p className="text-xs text-gray-400 max-w-xs mt-1">
            We couldn't find matches for "{searchQuery}". Try exploring other agricultural product categories or clear filters.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-4 px-4 py-2 text-xs font-bold text-[#1A6B3A] border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Reset Query Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Delivery details brief box helpful widget */}
      <div className="bg-[#E8F5ED] rounded-xl p-4 flex gap-3 text-[#1A6B3A] text-xs">
        <SlidersHorizontal className="w-4 h-4 flex-shrink-0 text-[#F5A800]" />
        <span>
          <strong>Logistic Express Shipping:</strong> Orders are dispatched daily within Kampala. Upcountry cargo buses route shipments to major hubs including Mbarara, Gulu, Mbale, Fort Portal. Deliveries can be paid securely using Airtel Money, MoMo or direct wire transfers.
        </span>
      </div>

    </div>
  );
};
