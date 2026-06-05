import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import { MoMoPrompt } from './components/MoMoPrompt';

// Views
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ProductDetailView } from './views/ProductDetailView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AccountView } from './views/AccountView';
import { AdminView } from './views/AdminView';
import { CheckoutView } from './views/CheckoutView';

import { BellRing, ShieldCheck, X } from 'lucide-react';

const StoreLayoutContent: React.FC = () => {
  const { currentView, toast } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Simple, elegant client-side SPA view router
  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'products':
        return <ProductsView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'account':
        return <AccountView />;
      case 'admin':
        return <AdminView />;
      case 'checkout':
        return <CheckoutView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#1A1A1A] text-xs">
      
      {/* 1. Nav header bar */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* 2. Slide out Shopping Cart drawer */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* 3. Global Mobile Money Push PIN prompt simulation overlay */}
      <MoMoPrompt />

      {/* 4. Active main page view content panels */}
      <main className="flex-grow select-text">
        {renderActiveView()}
      </main>

      {/* 5. Sticky dynamic toast/notification system */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-xl flex items-center space-x-3 max-w-sm border shrink-0 animate-fade-in ${
          toast.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
            : toast.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-950'
            : 'bg-blue-50 border-blue-200 text-blue-950'
        }`} id="global-toast-notification">
          <div className="flex-shrink-0">
            {toast.type === 'success' ? (
              <ShieldCheck className="w-5 h-5 text-[#1A6B3A]" />
            ) : (
              <BellRing className="w-5 h-5 text-amber-500" />
            )}
          </div>
          <div className="flex-1 text-[11px] font-bold leading-normal">
            {toast.message}
          </div>
        </div>
      )}

      {/* 6. Footer coordinates */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <StoreLayoutContent />
    </AppProvider>
  );
}
