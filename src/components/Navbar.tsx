import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingCart, User as UserIcon, Settings, Search, Menu, X, LogIn, Award } from 'lucide-react';
import { YellowStarLogo } from './YellowStarLogo';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const {
    currentUser,
    setView,
    currentView,
    searchQuery,
    setSearchQuery,
    getCartCount,
    login,
    logout,
    users
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQuickAuth, setShowQuickAuth] = useState(false);

  const handleLogoClick = () => {
    setView('home');
    setMobileMenuOpen(false);
  };

  const currentCount = getCartCount();

  const toggleAuthMode = () => {
    if (currentUser) {
      logout();
    } else {
      setShowQuickAuth(!showQuickAuth);
    }
  };

  const handleQuickLogin = (email: string) => {
    login(email);
    setShowQuickAuth(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={handleLogoClick} id="brand-logo-container">
            <YellowStarLogo variant="full" className="w-11 h-11" />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search premium flours, honey, peanut spread..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'products') setView('products');
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A6B3A] focus:border-transparent transition-all"
                id="search-input"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => setView('home')}
              className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-[#1A6B3A] border-b-2 border-[#1A6B3A] pb-1' : 'text-gray-600 hover:text-[#1A6B3A]'}`}
              id="nav-home"
            >
              Home
            </button>
            <button
              onClick={() => setView('products')}
              className={`text-sm font-medium transition-colors ${currentView === 'products' ? 'text-[#1A6B3A] border-b-2 border-[#1A6B3A] pb-1' : 'text-gray-600 hover:text-[#1A6B3A]'}`}
              id="nav-products"
            >
              Products
            </button>
            <button
              onClick={() => setView('about')}
              className={`text-sm font-medium transition-colors ${currentView === 'about' ? 'text-[#1A6B3A] border-b-2 border-[#1A6B3A] pb-1' : 'text-gray-600 hover:text-[#1A6B3A]'}`}
              id="nav-about"
            >
              Our Story
            </button>
            <button
              onClick={() => setView('contact')}
              className={`text-sm font-medium transition-colors ${currentView === 'contact' ? 'text-[#1A6B3A] border-b-2 border-[#1A6B3A] pb-1' : 'text-gray-600 hover:text-[#1A6B3A]'}`}
              id="nav-contact"
            >
              Contact Us
            </button>
          </nav>

          {/* User & Cart Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Quick Session Swapper Button */}
            <div className="relative">
              <button
                onClick={toggleAuthMode}
                className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-[#1A6B3A] px-2 py-1.5 rounded-md hover:bg-[#E8F5ED] transition-colors"
                title={currentUser ? `Log out from ${currentUser.name}` : "Log In"}
                id="auth-toggle-button"
              >
                {currentUser?.role === 'admin' ? (
                  <Settings className="w-5 h-5 text-amber-500 animate-spin-slow" />
                ) : (
                  <UserIcon className="w-5 h-5 text-gray-600" />
                )}
                <span className="hidden md:inline text-xs font-semibold max-w-[120px] truncate">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
                </span>
                {currentUser?.wholesaleStatus === 'approved' && (
                  <span className="bg-[#F5A800] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <Award className="w-2.5 h-2.5" /> Bulk
                  </span>
                )}
              </button>

              {/* Quick Auth Dropdown */}
              {showQuickAuth && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 p-4 z-50 animate-fade-in">
                  <h3 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2">Log In to Yellow Star Portal</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleQuickLogin('customer@yellowstar.com')}
                      className="w-full text-left text-xs bg-[#E8F5ED] text-gray-800 hover:bg-[#1A6B3A] hover:text-white p-2.5 rounded-md transition-colors font-medium flex items-center justify-between"
                    >
                      <span>John Doe (Retailer Customer)</span>
                      <span className="text-[10px] bg-white text-emerald-800 px-1 py-0.5 rounded">Standard</span>
                    </button>
                    <button
                      onClick={() => handleQuickLogin('admin@yellowstar.com')}
                      className="w-full text-left text-xs bg-amber-50 text-gray-800 hover:bg-amber-600 hover:text-white p-2.5 rounded-md transition-colors font-medium flex items-center justify-between"
                    >
                      <span>Sarah Namazzi (Director Admin)</span>
                      <span className="text-[10px] bg-amber-500 text-white px-1 py-0.5 rounded">Admin CLI</span>
                    </button>
                  </div>
                  <div className="mt-3 border-t pt-2 text-center">
                    <button
                      onClick={() => {
                        setView('account');
                        setShowQuickAuth(false);
                      }}
                      className="text-xs text-[#1A6B3A] font-semibold hover:underline"
                    >
                      Create New Account Profile
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-700 hover:text-[#1A6B3A] hover:bg-[#E8F5ED] rounded-full transition-colors"
              id="cart-trigger"
            >
              <ShoppingCart className="w-5.5 h-5.5" />
              {currentCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F5A800] text-white text-xs font-bold leading-none w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {currentCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard shortcut icon */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setView('admin')}
                className={`p-2 rounded-full transition-all ${currentView === 'admin' ? 'bg-[#1A6B3A] text-white animate-pulse' : 'text-amber-600 hover:bg-amber-100'}`}
                title="Admin Command Console"
                id="admin-shortcut-icon"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#1A6B3A]"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Portal */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 py-3 px-4 space-y-3 z-40 animate-fade-in-down">
          {/* Mobile Search input */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'products') setView('products');
              }}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A6B3A]"
              id="mobile-search-input"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => { setView('home'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 text-sm font-semibold rounded-md ${currentView === 'home' ? 'bg-[#E8F5ED] text-[#1A6B3A]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Home
            </button>
            <button
              onClick={() => { setView('products'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 text-sm font-semibold rounded-md ${currentView === 'products' ? 'bg-[#E8F5ED] text-[#1A6B3A]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Products Catalogue
            </button>
            <button
              onClick={() => { setView('about'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 text-sm font-semibold rounded-md ${currentView === 'about' ? 'bg-[#E8F5ED] text-[#1A6B3A]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Our Story
            </button>
            <button
              onClick={() => { setView('contact'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 text-sm font-semibold rounded-md ${currentView === 'contact' ? 'bg-[#E8F5ED] text-[#1A6B3A]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Contact Us
            </button>
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => { setView('admin'); setMobileMenuOpen(false); }}
                className={`text-left px-3 py-2 text-sm font-bold rounded-md bg-amber-50 text-amber-700 hover:bg-amber-100 flex items-center justify-between`}
              >
                <span>Admin Panel</span>
                <Settings className="w-4 h-4 animate-spin-slow" />
              </button>
            )}
            <button
              onClick={() => { setView('account'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 text-sm font-semibold rounded-md ${currentView === 'account' ? 'bg-[#E8F5ED] text-[#1A6B3A]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {currentUser ? `Manage Profile: ${currentUser.name}` : 'Log In or Register'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
