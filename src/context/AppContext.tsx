import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, User, CartItem, Order, WholesaleRequest, PaymentMethod, PaymentStatus, OrderStatus } from '../types';
import { PRODUCTS } from '../data';

interface AppContextType {
  products: Product[];
  currentView: string;
  setView: (view: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  
  // Auth
  currentUser: User | null;
  users: User[];
  login: (email: string, role?: 'customer' | 'admin') => boolean;
  logout: () => void;
  registerUser: (userData: { name: string; email: string; phone: string; address: string; role: 'customer' | 'admin'; companyName?: string; tinNumber?: string; applyWholesale: boolean }) => void;
  applyForWholesale: (companyName: string, tinNumber: string, phone: string, businessType: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQty: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Checkout & Orders
  orders: Order[];
  createOrder: (orderData: { phone: string; address: string; paymentMethod: PaymentMethod; billingNumber?: string }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrderPayment: (orderId: string, status: PaymentStatus) => void;

  // Admin Controls
  wholesaleRequests: WholesaleRequest[];
  approveWholesale: (requestId: string) => void;
  rejectWholesale: (requestId: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;

  // Search/Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;

  // Toast / Prompt Overlays
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  isMoMoPromptOpen: boolean;
  setMoMoPromptOpen: (open: boolean) => void;
  momoDetails: { amount: number; provider: string; billingNumber: string; pendingOrderId: string } | null;
  setMomoDetails: (details: any) => void;
  confirmMomoPayment: (pin: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Core initial users list with dynamic persistent storage
const INITIAL_USERS: User[] = [
  {
    id: 'u-1',
    email: 'customer@yellowstar.com',
    name: 'John Doe Ssewankambo',
    phone: '0771234567',
    role: 'customer',
    address: 'Kira Town Council, Wakiso, Uganda',
    wholesaleStatus: 'none',
    savedAddresses: ['Kira Town Council, Wakiso, Uganda']
  },
  {
    id: 'u-admin',
    email: 'admin@yellowstar.com',
    name: 'Sarah Namazzi (Director)',
    phone: '0772-613531',
    role: 'admin',
    address: 'Plot 649, Block 170, Kijabijjo, Wakiso',
    wholesaleStatus: 'none',
    savedAddresses: ['Plot 649, Block 170, Kijabijjo, Wakiso']
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-101',
    referenceCode: 'YS-84620',
    userId: 'u-1',
    customerName: 'John Doe Ssewankambo',
    customerEmail: 'customer@yellowstar.com',
    customerPhone: '0771234567',
    shippingAddress: 'Kira Town Council, Wakiso, Uganda',
    items: [
      {
        productId: 'ys-pure-millet-flour',
        productName: 'YS Pure Millet Flour',
        category: 'Flour',
        size: '1kg',
        price: 6000,
        quantity: 5,
        stock: 120,
        image: 'https://images.unsplash.com/photo-1574325131876-a7999788d1ef?auto=format&fit=crop&q=80&w=600'
      },
      {
        productId: 'ys-wild-honey',
        productName: 'YS Wild-Forest Multiflora Honey',
        category: 'Honey',
        size: '500g',
        price: 10000,
        quantity: 2,
        stock: 110,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600'
      }
    ],
    subtotal: 50000,
    shippingFee: 5000,
    total: 55000,
    paymentMethod: 'MTN Mobile Money',
    billingNumber: '0771234567',
    paymentStatus: 'Paid',
    status: 'Delivered',
    date: '2026-06-01T10:15:00Z'
  },
  {
    id: 'order-102',
    referenceCode: 'YS-21950',
    userId: 'u-1',
    customerName: 'John Doe Ssewankambo',
    customerEmail: 'customer@yellowstar.com',
    customerPhone: '0771234567',
    shippingAddress: 'Wandegeya High Street, Kampala',
    items: [
      {
        productId: 'ys-pure-peanut-butter',
        productName: 'YS Pure Peanut Butter (Gnuts)',
        category: 'Peanut Butter',
        size: '1kg',
        price: 13000,
        quantity: 1,
        stock: 40,
        image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=600'
      }
    ],
    subtotal: 13000,
    shippingFee: 5000,
    total: 18000,
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Pending',
    status: 'Pending',
    date: '2026-06-05T09:20:00Z'
  }
];

const INITIAL_WHOLESALE: WholesaleRequest[] = [
  {
    id: 'req-201',
    userId: 'u-1',
    userName: 'John Doe Ssewankambo',
    userEmail: 'customer@yellowstar.com',
    companyName: 'Doe Grain Distributing Ltd',
    tinNumber: '1004128912',
    businessType: 'Retail Wholesaler',
    phone: '0771234567',
    status: 'pending',
    date: '2026-06-05T11:00:00Z'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Initialization from localStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const cached = localStorage.getItem('ys_products');
    return cached ? JSON.parse(cached) : PRODUCTS;
  });
  
  const [users, setUsers] = useState<User[]>(() => {
    const cached = localStorage.getItem('ys_users');
    return cached ? JSON.parse(cached) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const cached = localStorage.getItem('ys_current_user');
    return cached ? JSON.parse(cached) : INITIAL_USERS[0]; // Start logged in as default customer
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const cached = localStorage.getItem('ys_orders');
    return cached ? JSON.parse(cached) : INITIAL_ORDERS;
  });

  const [wholesaleRequests, setWholesaleRequests] = useState<WholesaleRequest[]>(() => {
    const cached = localStorage.getItem('ys_wholesale');
    return cached ? JSON.parse(cached) : INITIAL_WHOLESALE;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const cached = localStorage.getItem('ys_cart');
    return cached ? JSON.parse(cached) : [];
  });

  const [currentView, setView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  // Search and visual categories filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Toasts
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // MoMo Payment Dialog
  const [isMoMoPromptOpen, setMoMoPromptOpen] = useState(false);
  const [momoDetails, setMomoDetails] = useState<{ amount: number; provider: string; billingNumber: string; pendingOrderId: string } | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('ys_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ys_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('ys_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ys_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ys_wholesale', JSON.stringify(wholesaleRequests));
  }, [wholesaleRequests]);

  useEffect(() => {
    localStorage.setItem('ys_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Auth Operations
  const login = (email: string, role?: 'customer' | 'admin'): boolean => {
    const matching = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matching) {
      if (role && matching.role !== role) {
        showToast(`Account does not possess the ${role} clearance.`, 'error');
        return false;
      }
      setCurrentUser(matching);
      showToast(`Welcome back, ${matching.name}!`, 'success');
      return true;
    }
    showToast(`Email ${email} was not found. Contact administrator.`, 'error');
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
    setView('home');
    showToast('Securely logged off the system.', 'info');
  };

  const registerUser = (userData: { name: string; email: string; phone: string; address: string; role: 'customer' | 'admin'; companyName?: string; tinNumber?: string; applyWholesale: boolean }) => {
    const exists = users.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) {
      showToast('A user account with this email address already exists.', 'error');
      return;
    }

    const userId = `u-${Date.now()}`;
    const newUser: User = {
      id: userId,
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      role: userData.role,
      address: userData.address,
      wholesaleStatus: userData.applyWholesale ? 'pending' : 'none',
      companyName: userData.companyName,
      tinNumber: userData.tinNumber,
      savedAddresses: [userData.address]
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);

    if (userData.applyWholesale && userData.companyName) {
      const newReq: WholesaleRequest = {
        id: `req-${Date.now()}`,
        userId: userId,
        userName: userData.name,
        userEmail: userData.email,
        companyName: userData.companyName,
        tinNumber: userData.tinNumber || '',
        businessType: 'Retail/Outlet Distressed Seller',
        phone: userData.phone,
        status: 'pending',
        date: new Date().toISOString()
      };
      setWholesaleRequests(prev => [newReq, ...prev]);
      showToast('Account registered successfully! Wholesale application submitted for administrative approval.', 'success');
    } else {
      showToast('Account successfully created! Enjoy shopping!', 'success');
    }
  };

  const applyForWholesale = (companyName: string, tinNumber: string, phone: string, businessType: string) => {
    if (!currentUser) {
      showToast('Please log in or register to request commercial terms.', 'error');
      return;
    }

    const newReq: WholesaleRequest = {
      id: `req-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      companyName,
      tinNumber,
      businessType,
      phone,
      status: 'pending',
      date: new Date().toISOString()
    };

    setWholesaleRequests(prev => [newReq, ...prev]);

    // Update currentUser and general user profiles status
    const updatedUser = { ...currentUser, wholesaleStatus: 'pending' as const, companyName, tinNumber };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));

    showToast('Your trade/wholesale request has been successfully submitted.', 'success');
  };

  // Cart Operations
  const addToCart = (product: Product, sizeName: string, quantity: number) => {
    const sizeObj = product.sizes.find(s => s.size === sizeName);
    if (!sizeObj) return;

    if (sizeObj.stock < quantity) {
      showToast(`We only have ${sizeObj.stock} units of ${product.name} (${sizeName}) in stock.`, 'error');
      return;
    }

    // Determine correct pricing
    const isWholesaleActive = currentUser?.wholesaleStatus === 'approved';
    const activePrice = isWholesaleActive ? sizeObj.wholesalePrice : sizeObj.price;

    const existingIndex = cart.findIndex(item => item.productId === product.id && item.size === sizeName);

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      const newQty = updatedCart[existingIndex].quantity + quantity;
      if (newQty > sizeObj.stock) {
        showToast(`Cannot check out more than available stock (${sizeObj.stock}).`, 'error');
        return;
      }
      updatedCart[existingIndex].quantity = newQty;
      setCart(updatedCart);
    } else {
      const newItem: CartItem = {
        productId: product.id,
        productName: product.name,
        category: product.category,
        size: sizeName,
        price: activePrice,
        quantity: quantity,
        stock: sizeObj.stock,
        image: product.image
      };
      setCart([...cart, newItem]);
    }
    showToast(`${product.name} (${sizeName}) added to cart!`, 'success');
  };

  const removeFromCart = (productId: string, sizeName: string) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.size === sizeName)));
    showToast('Item removed from cart.', 'info');
  };

  const updateCartQty = (productId: string, sizeName: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, sizeName);
      return;
    }
    const item = cart.find(i => i.productId === productId && i.size === sizeName);
    if (item && qty > item.stock) {
      showToast(`Only ${item.stock} units of stock are currently available.`, 'error');
      return;
    }
    setCart(prev => prev.map(i => i.productId === productId && i.size === sizeName ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Orders and checkout
  const createOrder = (orderData: { phone: string; address: string; paymentMethod: PaymentMethod; billingNumber?: string }): Order => {
    const referenceCode = `YS-${Math.floor(10000 + Math.random() * 90000)}`;
    const subtotal = getCartTotal();
    const shippingFee = 5000; // Flat UGX 5,000 Kampala express delivery
    const total = subtotal + shippingFee;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      referenceCode,
      userId: currentUser?.id || 'guest',
      customerName: currentUser?.name || 'Walkin Guest',
      customerEmail: currentUser?.email || 'guest@yellowstar.com',
      customerPhone: orderData.phone,
      shippingAddress: orderData.address,
      items: [...cart],
      subtotal,
      shippingFee,
      total,
      paymentMethod: orderData.paymentMethod,
      billingNumber: orderData.billingNumber,
      paymentStatus: 'Pending',
      status: 'Pending',
      date: new Date().toISOString()
    };

    // Update products inventory states
    setProducts(prev => {
      const updated = [...prev];
      newOrder.items.forEach(cartItem => {
        const prodIndex = updated.findIndex(p => p.id === cartItem.productId);
        if (prodIndex > -1) {
          updated[prodIndex].sizes = updated[prodIndex].sizes.map(sz => {
            if (sz.size === cartItem.size) {
              return { ...sz, stock: Math.max(0, sz.stock - cartItem.quantity) };
            }
            return sz;
          });
        }
      });
      return updated;
    });

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Trigger MoMo or Airtel Money prompt context
    if (orderData.paymentMethod === 'MTN Mobile Money' || orderData.paymentMethod === 'Airtel Money') {
      setMomoDetails({
        amount: total,
        provider: orderData.paymentMethod,
        billingNumber: orderData.billingNumber || orderData.phone,
        pendingOrderId: newOrder.id
      });
      setMoMoPromptOpen(true);
    } else {
      showToast(`Order logged successfully with reference code ${referenceCode}. Awaiting Bank wire.`, 'success');
      setView('account');
    }

    return newOrder;
  };

  const confirmMomoPayment = (pin: string) => {
    if (!momoDetails) return;
    
    // Simulate API authorization wait time
    showToast(`Authorizing transaction through ${momoDetails.provider}...`, 'info');
    
    setTimeout(() => {
      if (pin.length >= 4) {
        setOrders(prev => prev.map(o => o.id === momoDetails.pendingOrderId ? { ...o, paymentStatus: 'Paid', status: 'Processing' } : o));
        showToast(`Transaction approved! Payment receipt generated for ${momoDetails.billingNumber}.`, 'success');
        setMoMoPromptOpen(false);
        setMomoDetails(null);
        setView('account');
      } else {
        showToast('Invalid Mobile Money PIN entered. Please retry checkout.', 'error');
      }
    }, 1500);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order status updated to ${status}.`, 'info');
  };

  const updateOrderPayment = (orderId: string, paymentStatus: PaymentStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus } : o));
    showToast(`Payment status updated to ${paymentStatus}.`, 'info');
  };

  // Admin approvals
  const approveWholesale = (requestId: string) => {
    const req = wholesaleRequests.find(r => r.id === requestId);
    if (!req) return;

    setWholesaleRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'approved' } : r));
    
    // Promote underlying user status
    setUsers(prev => prev.map(u => {
      if (u.id === req.userId) {
        const revised = { ...u, wholesaleStatus: 'approved' as const };
        if (currentUser && currentUser.id === req.userId) {
          setCurrentUser(revised);
        }
        return revised;
      }
      return u;
    }));

    showToast(`Wholesale privileges granted to ${req.userName}. Commercial rates now active.`, 'success');
  };

  const rejectWholesale = (requestId: string) => {
    const req = wholesaleRequests.find(r => r.id === requestId);
    if (!req) return;

    setWholesaleRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'rejected' } : r));
    
    setUsers(prev => prev.map(u => {
      if (u.id === req.userId) {
        const revised = { ...u, wholesaleStatus: 'rejected' as const };
        if (currentUser && currentUser.id === req.userId) {
          setCurrentUser(revised);
        }
        return revised;
      }
      return u;
    }));

    showToast(`Wholesale application from ${req.companyName} was declined.`, 'info');
  };

  // Admin Catalog Modification
  const addProduct = (prod: Product) => {
    setProducts(prev => [prod, ...prev]);
    showToast(`${prod.name} successfully appended to Yellow Star catalogue.`, 'success');
  };

  const updateProduct = (prod: Product) => {
    setProducts(prev => prev.map(p => p.id === prod.id ? prod : p));
    showToast(`${prod.name} catalog and inventory profile refreshed.`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product withdrawn from active sales channels.', 'info');
  };

  return (
    <AppContext.Provider value={{
      products,
      currentView,
      setView,
      selectedProductId,
      setSelectedProductId,
      currentUser,
      users,
      login,
      logout,
      registerUser,
      applyForWholesale,
      cart,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      getCartTotal,
      getCartCount,
      orders,
      createOrder,
      updateOrderStatus,
      updateOrderPayment,
      wholesaleRequests,
      approveWholesale,
      rejectWholesale,
      addProduct,
      updateProduct,
      deleteProduct,
      searchQuery,
      setSearchQuery,
      activeCategory,
      setActiveCategory,
      toast,
      showToast,
      isMoMoPromptOpen,
      setMoMoPromptOpen,
      momoDetails,
      setMomoDetails,
      confirmMomoPayment
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used inside an AppProvider wrap context.');
  }
  return context;
};
