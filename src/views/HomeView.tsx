import React from 'react';
import { useApp } from '../context/AppContext';
import { Shovel, HelpCircle, ArrowRight, Award, Truck, BadgeCheck, Users, Star } from 'lucide-react';
import { COMPANY_STORY, PRODUCTS, MOCK_REVIEWS, HERO_IMAGE } from '../data';

export const HomeView: React.FC = () => {
  const { setView, setActiveCategory, setSelectedProductId } = useApp();

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setView('products');
  };

  const featured = PRODUCTS.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="space-y-16 pb-16 animate-fade-in pointer-events-auto">
      {/* Hero Banner Section */}
      <section className="relative bg-teal-950 overflow-hidden min-h-[480px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Organic farming grain processing"
            className="w-full h-full object-cover opacity-25 object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-950/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 text-white grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1 bg-[#F5A800] text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 animate-bounce" /> 100% Organic certified
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              We Care to Feed <br />
              <span className="text-[#F5A800]">You Right</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-200 font-medium max-w-lg leading-relaxed">
              Yellow Star Produce & Food Processors brings you the purest stone-ground flours, high-grade local peanut spreads, and raw forest liquid honey directly sourced from rural Ugandan families since 2014.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setView('products')}
                className="bg-[#1A6B3A] hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg text-sm transition-all text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-900/30"
              >
                <span>Browse Products catalogue</span>
                <ArrowRight className="w-4 h-4 text-[#F5A800]" />
              </button>
              <button
                onClick={() => setView('about')}
                className="bg-white/10 hover:bg-white/15 text-white py-3 px-6 rounded-lg text-sm transition-all border border-white/20 hover:border-white/30 text-center"
              >
                Our Farming Story
              </button>
            </div>
          </div>

          {/* Quick Stats Panel visual overlay */}
          <div className="hidden md:grid grid-cols-2 gap-4 bg-white/5 backdrop-blur-xs p-6 rounded-2xl border border-white/10 shadow-xl">
            <div className="space-y-1">
              <div className="text-2xl font-extrabold text-[#F5A800]">10+ Years</div>
              <div className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Processing Trust</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-extrabold text-[#F5A800]">100% Pure</div>
              <div className="text-xs text-gray-300 font-semibold uppercase tracking-wider">No Additives</div>
            </div>
            <div className="space-y-3 pt-3 border-t border-white/10 col-span-2 flex items-center gap-3">
              <Users className="w-8 h-8 text-[#F5A800]" />
              <div className="text-xs text-gray-200">
                Supporting over <span className="font-extrabold text-white">400+ small-scale agrarian families</span> inside Wakiso, Kira, and upcountry districts.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 p-5 bg-[#E8F5ED] rounded-xl border border-emerald-100">
            <div className="p-3 bg-[#1A6B3A] text-[#F5A800] rounded-lg">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Certified Sanitation Quality</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Adhering to certified UNBS (Uganda National Bureau of Standards) sanitary grinding protocols.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-[#E8F5ED] rounded-xl border border-emerald-100">
            <div className="p-3 bg-[#1A6B3A] text-[#F5A800] rounded-lg">
              <Shovel className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Organically Farmed</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Groundnuts, millet grains, and tropical honeycomb harvested sustainably without chemicals.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-[#E8F5ED] rounded-xl border border-emerald-100">
            <div className="p-3 bg-[#1A6B3A] text-[#F5A800] rounded-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Express Regional Logistics</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Swift dispatch within Kampala or scheduled upcountry bus freight directly to your store doorway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Category Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Our Core Food Portfolios</h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Explore our rich divisions built from natural, wholesome ingredients processed to export-quality standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Flour Card */}
          <div
            onClick={() => handleCategoryClick('Flour')}
            className="group relative h-80 rounded-2xl overflow-hidden shadow-xs cursor-pointer border border-gray-100 hover:shadow-lg transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400"
              alt="Millet and soy flour products"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <h3 className="font-extrabold text-lg tracking-tight">Grain & Soya Flours</h3>
              <p className="text-xs text-gray-300 leading-normal">
                Pure millet, roasted soy flour blends, and nutrient-dense baby weaning solutions.
              </p>
              <div className="text-xs text-[#F5A800] font-bold pt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Browse Flour Products</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Peanut Butter Card */}
          <div
            onClick={() => handleCategoryClick('Peanut Butter')}
            className="group relative h-80 rounded-2xl overflow-hidden shadow-xs cursor-pointer border border-gray-100 hover:shadow-lg transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=400"
              alt="Rich peanut butter jar"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <h3 className="font-extrabold text-lg tracking-tight">Premium Peanut Spreads</h3>
              <p className="text-xs text-gray-300 leading-normal">
                Rich creams ground matching Red-skin peanuts (G-nuts) blended with sesame (Simsim).
              </p>
              <div className="text-xs text-[#F5A800] font-bold pt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Browse Spreads</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Honey Card */}
          <div
            onClick={() => handleCategoryClick('Honey')}
            className="group relative h-80 rounded-2xl overflow-hidden shadow-xs cursor-pointer border border-gray-100 hover:shadow-lg transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400"
              alt="Golden bee honey"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <h3 className="font-extrabold text-lg tracking-tight">Wild-Forest Multiflora Honey</h3>
              <p className="text-xs text-gray-300 leading-normal">
                Cold-filtered unfiltered forest hive honey containing pure natural nutritional bee enzymes.
              </p>
              <div className="text-xs text-[#F5A800] font-bold pt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Browse Honey Range</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products spotlight / carousel feel */}
      <section className="bg-gray-50 py-12 border-y border-gray-100 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Consumer Favorites Selected</h2>
              <p className="text-xs text-gray-500 mt-0.5">Highly ordered flour, spreads, and honey products by our clients across Uganda.</p>
            </div>
            <button
              onClick={() => setView('products')}
              className="text-xs font-bold text-[#1A6B3A] hover:text-[#F5A800] flex items-center gap-1"
            >
              <span>View full catalogue catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(prod => (
              <div key={prod.id} className="bg-white p-3 rounded-2xl shadow-xs border border-gray-100">
                <div className="aspect-video overflow-hidden rounded-xl bg-gray-50 relative">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover hover:scale-105 duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 bg-[#F5A800] text-gray-900 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    Customer Best
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{prod.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{prod.description}</p>
                  <div className="flex justify-between items-center pt-3 mt-1 border-t">
                    <span className="text-xs text-[#1A6B3A] font-extrabold">UGX {prod.sizes[0].price.toLocaleString()}</span>
                    <button
                      onClick={() => {
                        setSelectedProductId(prod.id);
                        setView('product-detail');
                      }}
                      className="text-[10px] font-bold border border-gray-200 px-3 py-1 rounded bg-[#E8F5ED] text-[#1A6B3A] hover:bg-[#1A6B3A] hover:text-white transition-colors"
                    >
                      Configure weight
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing and Company Mission statement highlight section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#E8F5ED] rounded-3xl p-8 sm:p-12 border border-[#1A6B3A]/10">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-2xl font-black text-emerald-950 tracking-tight leading-tight">Our Sourcing & Farmer Empowerment Pact</h2>
          <p className="text-xs sm:text-sm text-emerald-900/80 leading-relaxed font-semibold">
            {COMPANY_STORY.mission}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
            Yellow Star foods is built around communal empowerment. Every package of pure peanut paste or soy-millet flour represents fair trade pay cycles directly benefiting Ugandan household farms. By sourcing locally, we maintain a complete field-to-mill food chain safety net.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setView('about')}
              className="text-xs font-bold text-[#1A6B3A] hover:text-emerald-900 flex items-center gap-1.5"
            >
              <span>Read the detailed sourcing report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-5 h-64 lg:h-full min-h-[250px] relative rounded-2xl overflow-hidden border-2 border-white shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=500"
            alt="Empowering local agriculture workers in Uganda"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Customer Testimonials section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Honest Feedback From Clients</h2>
          <p className="text-xs text-gray-500 mt-1">We listen carefully to all our regional families and wholesale vendors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((review, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-xs border border-gray-150 relative space-y-4">
              <span className="text-6xl text-emerald-100 font-serif absolute -top-1 left-2 select-none pointer-events-none">“</span>
              <p className="text-xs text-gray-600 italic leading-relaxed relative z-10">{review.text}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <h4 className="font-bold text-xs text-gray-900">{review.name}</h4>
                  <span className="text-[10px] text-[#1A6B3A] font-semibold block">{review.product}</span>
                </div>
                <div className="flex text-amber-400">
                  {Array.from({ length: review.rating }).map((_, rIdx) => (
                    <Star key={rIdx} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
