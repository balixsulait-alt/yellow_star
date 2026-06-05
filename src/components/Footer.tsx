import React from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { COMPANY_STORY } from '../data';
import { YellowStarLogo } from './YellowStarLogo';

export const Footer: React.FC = () => {
  const { setView } = useApp();

  return (
    <footer className="bg-gray-900 text-gray-300 pointer-events-auto mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand/About Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <YellowStarLogo variant="full" className="w-10 h-10" />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              Trusted, quality food and produce processors in Uganda since 2014. Groundnuts, rich traditional millet, and organic honey from farmers to your plate.
            </p>
            <div className="flex items-center gap-1 text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-1 rounded w-max border border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5A800]" /> UNBS Q-Mark Certified
            </div>
          </div>

          {/* Categories Links Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Products Selection</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setView('products')} className="hover:text-[#F5A800] hover:underline transition-colors text-left">
                  Millet & Soya Flours
                </button>
              </li>
              <li>
                <button onClick={() => setView('products')} className="hover:text-[#F5A800] hover:underline transition-colors text-left">
                  Gold Honey Extract
                </button>
              </li>
              <li>
                <button onClick={() => setView('products')} className="hover:text-[#F5A800] hover:underline transition-colors text-left">
                  Pure Peanut Butter & SimSim spreads
                </button>
              </li>
              <li>
                <button onClick={() => setView('products')} className="hover:text-[#F5A800] hover:underline transition-colors text-left">
                  Specialized Baby Weaning Porridges
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Informational Navigation Grid */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Company Information</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setView('about')} className="hover:text-[#F5A800] hover:underline text-left">
                  Our Sourcing Practices
                </button>
              </li>
              <li>
                <button onClick={() => setView('about')} className="hover:text-[#F5A800] hover:underline text-left">
                  Our Processing Integrity
                </button>
              </li>
              <li>
                <button onClick={() => setView('contact')} className="hover:text-[#F5A800] hover:underline text-left">
                  FAQ & Return Policy
                </button>
              </li>
              <li>
                <button onClick={() => setView('contact')} className="hover:text-[#F5A800] hover:underline text-left">
                  Deliveries & Logistics
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-3 text-xs text-gray-400">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Contact Center</h4>
            
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-[#F5A800] flex-shrink-0 mt-0.5" />
              <span>Plot 649, Block 170, Kijabijjo, Kira Town Council, Wakiso District, Kampala</span>
            </div>

            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#F5A800] flex-shrink-0" />
              <span>0772-613531 / 0704-160033</span>
            </div>

            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#F5A800] flex-shrink-0" />
              <span className="hover:text-[#F5A800] transition-colors">yellowstarfoods@gmail.com</span>
            </div>
            
            <div className="pt-2 text-[10px] text-gray-500">
              Operational Hours: Mon – Sat (8:00 AM – 6:00 PM)
            </div>
          </div>
          
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-[11px] text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Yellow Star Produce & Food Processors Uganda Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[10px] text-gray-400">
            <span>We Care to Feed You Right</span>
            <span>•</span>
            <span>B2B & B2C Commercial Agency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
