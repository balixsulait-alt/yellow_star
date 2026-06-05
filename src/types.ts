export interface ProductSize {
  size: string; // e.g., '1kg', '500g', '250g', '400g', '800g'
  price: number; // retail price
  oldPrice?: number; // retail old price (for discounts)
  wholesalePrice: number; // discounted price for trade accounts
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'Flour' | 'Peanut Butter' | 'Honey';
  description: string;
  image: string;
  sizes: ProductSize[];
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
  ingredients?: string;
  benefits?: string;
}

export type UserRole = 'customer' | 'admin';
export type WholesaleStatus = 'none' | 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  address: string;
  wholesaleStatus: WholesaleStatus;
  companyName?: string;
  tinNumber?: string;
  savedAddresses: string[];
}

export interface CartItem {
  productId: string;
  productName: string;
  category: 'Flour' | 'Peanut Butter' | 'Honey';
  size: string;
  price: number; // active price depending on customer type
  quantity: number;
  stock: number;
  image: string;
}

export type PaymentMethod = 'MTN Mobile Money' | 'Airtel Money' | 'Bank Transfer';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed';
export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  referenceCode: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  billingNumber?: string; // For mobile money, e.g., Airtel or MTN phone
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  date: string;
}

export interface WholesaleRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  companyName: string;
  tinNumber?: string;
  businessType: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}
