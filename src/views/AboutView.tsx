import React from 'react';
import { COMPANY_STORY, HERO_IMAGE } from '../data';
import { Landmark, Shovel, ShieldAlert, Award, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutView: React.FC = () => {
  const { setView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in pointer-events-auto">
      
      {/* Narrative Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-extrabold text-[#1A6B3A] tracking-wider block">Est. Year {COMPANY_STORY.founded}</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight">Our Sourcing & Processing Story</h1>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-semibold">
            {COMPANY_STORY.narrative}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            By eliminating expensive middle layers and establishing high-sanitation processing lines directly inside Kira Town Council (Kijabijjo), we guarantee that every pack of pure peanut butter and soy-millet flour carries pristine nutritional value. Our facilities are built around supporting communal prosperity. Our network reaches hundreds of farmer-families, enabling safe agro-forestry and fair wage schedules.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setView('products')}
              className="bg-[#1A6B3A] hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg text-xs transition-all shadow-md"
            >
              Examine Our Product Range
            </button>
          </div>
        </div>

        <div className="h-96 rounded-2xl overflow-hidden border border-gray-150 shadow-xl relative bg-emerald-900 flex items-center">
          <img
            src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=700"
            alt="Organic farming communities"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-6 bottom-6 bg-white/95 backdrop-blur-xs p-5 rounded-xl text-left border">
            <h3 className="font-extrabold text-[#1A6B3A] text-sm leading-tight uppercase">Raw Harvesting Integrity</h3>
            <p className="text-[11px] text-gray-600 leading-normal mt-1 font-medium">
              We source only dry, premium grain cultivars and raw Multiflora wild honey directly from forest beekeepers, ensuring absolute pure product quality from field to packaged item.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate pillars info blocks */}
      <section className="bg-gray-50 rounded-2xl p-6 sm:p-10 border border-gray-150 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Our Core Processing Pillars</h2>
          <p className="text-xs text-gray-500 mt-0.5">How we maintain standard certified foods on high scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <div className="p-2.5 bg-[#E8F5ED] text-[#1A6B3A] rounded-md w-max">
              <Landmark className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-gray-950">UNBS Food Standard adherence</h4>
            <p className="text-xs text-gray-600 leading-normal font-medium">
              All milling is certified under stringent quality checks. We preserve essential micronutrients by employing dry solar storage and slow stone milling.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <div className="p-2.5 bg-[#E8F5ED] text-[#1A6B3A] rounded-md w-max">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-gray-950">Absolutely Zero Preservatives</h4>
            <p className="text-xs text-gray-600 leading-normal font-medium">
              Our products are completely free from synthetic flavorings, emulsifiers, hydrogenated seed oils, or artificial sugar supplements. Just raw, healthy food.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <div className="p-2.5 bg-[#E8F5ED] text-[#1A6B3A] rounded-md w-max">
              <Shovel className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-gray-950">Rural Farmers Sourcing Pact</h4>
            <p className="text-xs text-gray-650 leading-normal font-medium">
              By working with agricultural cooperatives, we sustain steady incomes for farm households, returning fair value to rural agricultural centers.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership message section */}
      <section className="bg-[#E8F5ED] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 border">
        <div className="w-16 h-16 bg-[#1A6B3A] text-[#F5A800] rounded-full flex items-center justify-center text-xl font-black shadow-md flex-shrink-0">
          YS
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h4 className="font-bold text-emerald-950 text-sm">"Quality Sustenance for All Uganda"</h4>
          <p className="text-xs text-emerald-900/80 leading-normal font-medium italic">
            "At Yellow Star, we believe that pure, nutrient-rich food is a fundamental human right. Since 2014, our goal has been to marry the natural yield of our fertile Ugandan fields with state-of-the-art milling sanitation, ensuring our children grow up healthy."
          </p>
          <span className="block text-[10px] uppercase font-bold text-emerald-800">— Sarah Namazzi, Director of Production</span>
        </div>
      </section>

    </div>
  );
};
