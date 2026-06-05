import React, { useState } from 'react';
import { FAQS, COMPANY_STORY } from '../data';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // Contact Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all contact fields before dispatching.', 'error');
      return;
    }
    
    showToast('Your message has been successfully dispatched to the office! We will respond within 24 hours.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in pointer-events-auto">
      
      {/* Visual Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">Connect with Us</h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          Have an inquiry about wholesale sourcing, delivery areas, or our certified milling procedures? Send us a message!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Contact details + Custom SVG Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#E8F5ED] rounded-2xl p-6 border space-y-4 shadow-3xs">
            <h3 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider mb-2">Yellow Star Office</h3>
            
            <div className="flex items-start gap-3 text-xs text-gray-700 font-medium">
              <MapPin className="w-5 h-5 text-[#F5A800] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-gray-900">Headquarters & Pack Facility</span>
                Plot 649, Block 170, Kijabijjo, Kira Town Council, Wakiso District, Kampala, Uganda
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-700 font-medium">
              <Phone className="w-5 h-5 text-[#F5A800] flex-shrink-0" />
              <div>
                <span className="font-bold block text-gray-900">Commercial Phone Lines</span>
                0772-613531 / 0704-160033
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-700 font-medium">
              <Mail className="w-5 h-5 text-[#F5A800] flex-shrink-0" />
              <div>
                <span className="font-bold block text-gray-900">Direct Support Email</span>
                yellowstarfoods@gmail.com
              </div>
            </div>
          </div>

          {/* Custom Vector SVG Map of Kijabijjo, Block 170, Kira */}
          <div className="bg-white rounded-2xl border p-4 space-y-3 shadow-xs">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Facility Location Vector Map</h4>
            <div className="bg-gray-50 h-56 rounded-xl relative overflow-hidden border">
              
              {/* Beautiful Custom SVG Representing the Map */}
              <svg className="w-full h-full bg-slate-100" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
                {/* Background Roads Grid */}
                <line x1="0" y1="80" x2="400" y2="150" stroke="#CBD5E1" strokeWidth="12" /> {/* Gayaza-Kira Road */}
                <text x="30" y="70" fill="#64748B" className="text-[9px] font-bold rotate-10" transform="rotate(10, 30, 70)">Gayaza-Kira Highway</text>
                
                <line x1="280" y1="0" x2="280" y2="240" stroke="#CBD5E1" strokeWidth="8" /> {/* Access Road */}
                <text x="210" y="18" fill="#64748B" className="text-[8px] font-bold " transform="rotate(90, 210, 18)">Kijabijjo Rd</text>
                
                {/* Hydrology river */}
                <path d="M 0,200 Q 150,160 400,220" stroke="#93C5FD" strokeWidth="6" fill="none" opacity="0.4" />
                <text x="310" y="225" fill="#3B82F6" className="text-[7px] italic font-semibold" opacity="0.8">Lwajjali Swamp-River</text>

                {/* Local plots outline grids */}
                <rect x="50" y="110" width="60" height="40" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" rx="2" />
                <rect x="130" y="115" width="70" height="45" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" rx="2" />
                
                {/* Yellow Star Plot 649 site block */}
                <rect x="295" y="80" width="85" height="75" fill="#E8F5ED" stroke="#1A6B3A" strokeWidth="2" rx="4" />
                <text x="302" y="98" fill="#15803D" className="text-[8px] font-black uppercase">Plot 649</text>
                <text x="302" y="110" fill="#4B5563" className="text-[7.5px] font-semibold">Block 170</text>
                <text x="302" y="122" fill="#166534" className="text-[8px] font-black underline">Yellow Star Foods</text>
                <text x="302" y="132" fill="#4B5563" className="text-[7px]">Milling & Extracting</text>

                {/* Star Pin point widget */}
                <g transform="translate(330, 60)">
                  <ellipse cx="10" cy="18" rx="8" ry="4" fill="#000" opacity="0.3" />
                  <path d="M10,0 C4,0 0,4 0,10 C0,16 10,24 10,24 C10,24 20,16 20,10 C20,4 16,0 10,0 Z" fill="#1A6B3A" />
                  <polygon points="10,4 12,8 16,8 13,11 14,15 10,13 6,15 7,11 4,8 8,8" fill="#F5A800" />
                </g>
                
              </svg>

              <div className="absolute bottom-2.5 left-2.5 bg-slate-900/90 text-white rounded text-[10px] p-1.5 font-bold">
                Kijabijjo, Kira, Wakiso District
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Send Message form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b pb-2">Direct Inquiry Form</h3>
          
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600">Your Full Name:</label>
                <input
                  type="text"
                  placeholder="e.g. Juliet Namubiru"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A6B3A]"
                  id="contact-name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600">Email Address:</label>
                <input
                  type="email"
                  placeholder="e.g. juliet@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A6B3A]"
                  id="contact-email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600">Your Message Details:</label>
              <textarea
                rows={5}
                placeholder="Write your wholesale application details, supply specs, or feedback information..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs p-2.5 border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A6B3A]"
                id="contact-message"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-[#1A6B3A] hover:bg-opacity-95 text-white hover:text-[#F5A800] text-xs font-extrabold px-5 py-3 rounded-lg flex items-center gap-2 shadow-md hover:shadow-emerald-900/10"
                id="contact-submit-btn"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Frequently Asked Questions accordion */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <HelpCircle className="w-8 h-8 text-[#1A6B3A] mx-auto opacity-80" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">E-Commerce FAQ Support</h2>
          <p className="text-xs text-gray-500 mt-0.5">Sourcing, wholesale limits, mobile money payments guidelines unpacked.</p>
        </div>

        <div className="max-w-3xl mx-auto border rounded-xl divide-y bg-white overflow-hidden shadow-3xs">
          {FAQS.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div key={i} className="transition-all duration-300">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-bold text-gray-800 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="flex-1 pr-4">{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                </button>
                {isOpen && (
                  <div className="p-4 bg-gray-50 text-xs text-gray-600 leading-relaxed border-t border-gray-100 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
