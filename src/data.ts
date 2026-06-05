import { Product, Order } from './types';

export const HERO_IMAGE = "/assets/hero.jpg";
export const LOGO_SVG_PATH = ""; // Will implement beautiful vector SVG logo in components

export const PRODUCTS: Product[] = [
  // --- FLOUR PRODUCTS ---
  {
    id: 'ys-pure-millet-flour',
    name: 'YS Pure Millet Flour',
    category: 'Flour',
    description: '100% natural pure millet flour, packed with essential minerals and nutrients. Sourced from organic growers in Eastern Uganda, stone-ground to preserve freshness and natural fiber. Perfect for making traditional millet porridge (Uji) and millet bread (Kalo).',
    image: '/assets/products/millet-flour.jpg',
    rating: 4.8,
    reviewsCount: 34,
    ingredients: '100% Organic Finger Millet Grains',
    benefits: 'High in iron, calcium, dietary fiber, and completely gluten-free. Promotes healthy digestion and provides long-lasting energy.',
    sizes: [
      { size: '1kg', price: 6000, oldPrice: 5000, wholesalePrice: 4800, stock: 120 }
    ],
    isFeatured: true
  },
  {
    id: 'ys-soya-millet-flour',
    name: 'YS Soya Millet Flour',
    category: 'Flour',
    description: 'A nutritious blend of roasted soya beans and pure millet flour. Provides a protein-packed meal that is highly recommended for growing babies and health-conscious adults. Adds a rich, nutty flavor to your daily breakfast.',
    image: '/assets/products/soya-millet-flour.jpg',
    rating: 4.9,
    reviewsCount: 48,
    ingredients: 'Organic Finger Millet Grains (70%), Selected Roasted Soya Beans (30%)',
    benefits: 'Excellent source of high-quality plant protein and essential amino acids. Boosts immune function and bone development.',
    sizes: [
      { size: '1kg', price: 6000, oldPrice: 5500, wholesalePrice: 4800, stock: 85 }
    ],
    isFeatured: true
  },
  {
    id: 'ys-pure-rice-flour',
    name: 'YS Pure Rice Flour',
    category: 'Flour',
    description: 'Finely milled white rice flour ideal for baking gluten-free pastries, thickening sauces, and making traditional rice-based African pancakes. Highly digestible, hypoallergenic, and light.',
    image: '/assets/products/rice-flour.jpg',
    rating: 4.5,
    reviewsCount: 19,
    ingredients: '100% Premium Pure Milled Uganda White Rice',
    benefits: 'Easily digestible, gluten-free, low-fat flour that is very gentle on the stomach and an excellent source of quick carbohydrates.',
    sizes: [
      { size: '1kg', price: 6500, wholesalePrice: 5200, stock: 60 }
    ]
  },
  {
    id: 'ys-soya-rice-flour',
    name: 'YS Soya Rice Flour',
    category: 'Flour',
    description: 'A delicate and nutrition-dense flour combining pure white rice flour with high-protein soya bean meal. Excellent food modifier that is extremely smooth when prepared, suitable for weaners and dietary supplementation.',
    image: '/assets/products/soya-rice-flour.jpg',
    rating: 4.6,
    reviewsCount: 22,
    ingredients: 'Fine Pure White Rice (60%), Nutritious Soybeans (40%)',
    benefits: 'Combines simple carbohydrates with vital soy proteins. Accelerates muscle growth and tissue repair for active lives.',
    sizes: [
      { size: '1kg', price: 6500, wholesalePrice: 5200, stock: 45 }
    ]
  },
  {
    id: 'ys-roasted-millet-cassava',
    name: 'YS Roasted Millet with Cassava',
    category: 'Flour',
    description: 'An outstanding traditional blend of roasted millet and sun-dried cassava. Formulated specially for preparing authentic Ugandan Kalo (millet bread) with the perfect elasticity, dark color, and aromatic roasted scent.',
    image: '/assets/products/roasted-millet-cassava.jpg',
    rating: 4.7,
    reviewsCount: 28,
    ingredients: 'Roasted Finger Millet (80%), Premium Sun-Dried Cassava (20%)',
    benefits: 'Traditional stamina food with slow-release carbohydrates and high resistance starch. High fiber supports standard gut mobility.',
    sizes: [
      { size: '1kg', price: 5000, wholesalePrice: 4000, stock: 150 }
    ]
  },
  {
    id: 'ys-baby-soya-rice-enkejje',
    name: 'YS Baby Soya Rice with Enkejje',
    category: 'Flour',
    description: 'Special pediatric formulation enrichment with Enkejje (Lake Victoria Silver Fish - small nutrient-dense fish). Stone-ground with rich soya beans and rice. Contains natural animal phosphorus, calcium, and proteins essential for infants.',
    image: '/assets/products/baby-soya-rice-enkejje.jpg',
    rating: 5.0,
    reviewsCount: 74,
    ingredients: 'Pure White Rice (50%), High-Grade Soybeans (35%), Sun-dried Enkejje Silver Fish (15%)',
    benefits: 'Rich in organic iron, Vitamin D, high calcium, and natural omega-3 fatty acids from fish. Extremely vital to prevent infant malnutrition and rickety bone conditions.',
    sizes: [
      { size: '1kg', price: 8000, oldPrice: 7500, wholesalePrice: 6400, stock: 70 },
      { size: '500g', price: 4000, wholesalePrice: 3200, stock: 90 }
    ],
    isFeatured: true
  },
  {
    id: 'ys-baby-soya-rice-oats-milk',
    name: 'YS Baby Soya Rice with Oats & Milk',
    category: 'Flour',
    description: 'Premium baby weaning porridge flour formulated with imported high-fiber rolled oats, organic local rice, soy flour, and skimmed milk powder. Highly aromatic and creamy, the ideal first baby food.',
    image: '/assets/products/baby-soya-rice-oats-milk.jpg',
    rating: 4.9,
    reviewsCount: 56,
    ingredients: 'Oatmeal Grains (30%), Local Rice (30%), Soybean (25%), Skimmed Milk Powder (15%)',
    benefits: 'Soothes baby’s digestive system with oat beta-glucans. Highly-digestible calcium, vitamin B12 from milk, and high protein blocks.',
    sizes: [
      { size: '1kg', price: 8000, oldPrice: 7500, wholesalePrice: 6400, stock: 55 },
      { size: '500g', price: 4000, wholesalePrice: 3200, stock: 80 }
    ],
    isFeatured: true
  },

  // --- PEANUT BUTTER PRODUCTS ---
  {
    id: 'ys-pure-peanut-butter',
    name: 'YS Pure Peanut Butter (Gnuts)',
    category: 'Peanut Butter',
    description: 'Creamy peanut butter made strictly from 100% selected roasted Ugandan Red-skin Groundnuts (G-nuts). No hydrogenated oils, no industrial preservatives, and no artificial sweeteners—just natural oils and rich taste.',
    image: '/assets/products/pure-peanut-butter.jpg',
    rating: 4.8,
    reviewsCount: 61,
    ingredients: '100% Premium Roasted Red-Skin Groundnuts (Gnuts), trace of solar-refined salt',
    benefits: 'Packed with muscle-building monounsaturated fats, protein, and dietary potassium. Low glycemic index food great for healthy snacking.',
    sizes: [
      { size: '1kg', price: 13000, wholesalePrice: 10400, stock: 40 },
      { size: '800g', price: 11000, wholesalePrice: 8800, stock: 50 },
      { size: '500g', price: 7000, wholesalePrice: 5600, stock: 75 },
      { size: '400g', price: 5500, wholesalePrice: 4400, stock: 65 },
      { size: '250g', price: 3500, wholesalePrice: 2800, stock: 100 }
    ],
    isFeatured: true
  },
  {
    id: 'ys-simsim-peanut-butter',
    name: 'YS SimSim Peanut Butter',
    category: 'Peanut Butter',
    description: 'A special, highly traditional premium spread blending selected ground sesame seeds (Simsim) and roasted groundnuts. Creamy, aromatic, and deep with flavor, it works as a great healthy breakfast spread or local cooking soup thickener.',
    image: '/assets/products/simsim-peanut-butter.jpg',
    rating: 4.9,
    reviewsCount: 42,
    ingredients: 'Roasted Local Groundnuts (65%), Sesame Seeds (35%)',
    benefits: 'Sesame seeds add incredibly rich antioxidants, sesamin, zinc, and magnesium. Excellent booster for cellular metabolism and brain health.',
    sizes: [
      { size: '1kg', price: 14000, wholesalePrice: 11200, stock: 35 },
      { size: '800g', price: 12000, wholesalePrice: 9600, stock: 40 },
      { size: '500g', price: 7500, wholesalePrice: 6000, stock: 80 },
      { size: '400g', price: 6000, wholesalePrice: 4800, stock: 70 },
      { size: '250g', price: 4000, wholesalePrice: 3200, stock: 95 }
    ],
    isFeatured: true
  },

  // --- HONEY PRODUCTS ---
  {
    id: 'ys-wild-honey',
    name: 'YS Wild-Forest Multiflora Honey',
    category: 'Honey',
    description: '100% raw, cold-filtered wild forest liquid honey. Sourced from organic bee farms nestled deep in the tropical forest preserves of Uganda. Since it is unfiltered and unpasteurized, it retains vital bee pollen, propolis, and bioactive enzymes.',
    image: '/assets/products/wild-honey.jpg',
    rating: 4.9,
    reviewsCount: 89,
    ingredients: '100% Raw Forest Hive Liquid Honey',
    benefits: 'Natural antimicrobial, antioxidant-dense, and cough-relieving properties. Contains live helpful bio-enzymes.',
    sizes: [
      { size: '529g', price: 11000, wholesalePrice: 8800, stock: 90 },
      { size: '500g', price: 10000, wholesalePrice: 8000, stock: 110 },
      { size: '250g', price: 5500, wholesalePrice: 4400, stock: 150 }
    ],
    isFeatured: true
  }
];

export const FAQS = [
  {
    question: 'How do you check for wholesale requirements or minimum order quantities?',
    answer: 'Wholesale pricing is visible solely to approved Trade/Wholesale accounts. If you have registered a trade profile, you are eligible for up to 20% discount but are subject to a minimum order value of UGX 150,000 or a minimum of 5 units per product. You can apply directly on our Wholesale Account status page.'
  },
  {
    question: 'How do I pay using MTN Mobile Money or Airtel Money?',
    answer: 'During checkout, specify your Mobile Money subscriber number. We issue a real-time "Request to Pay" push prompt. You will receive an authorization popup on your phone; simply enter your MoMo PIN to securely pay.'
  },
  {
    question: 'How do Bank Transfers work?',
    answer: 'Upon selection, our bank coordinates (Centenary Bank, Uganda) are generated alongside a unique reference identifier (e.g., YS-98421). Transfer the funds, reference the identifier in the payments memo, and our finance team will mark the shipment processing within standard administrative hours.'
  },
  {
    question: 'Where is Yellow Star foods based?',
    answer: 'We are located at Plot 649, Block 170, Kijabijjo, Kira Town Council in Wakiso District. We produce and package with certified machinery adhering strictly to UNBS certifications.'
  },
  {
    question: 'What are your delivery costs within Kampala and beyond?',
    answer: 'Within Kampala & Wakiso district, we offer same-day shipping at a flat rate of UGX 5,000. Upcountry shipments are arranged through trusted carrier buses or postal couriers at custom rates starting from UGX 15,000.'
  }
];

export const MOCK_REVIEWS = [
  {
    name: 'Sarah Nakato',
    rating: 5,
    text: "The Baby Soya with Enkejje has supercharged my son's growth! He enjoys the rich taste, and the packaging keeps it highly fresh.",
    product: 'YS Baby Soya Rice with Enkejje',
    date: 'May 12, 2026'
  },
  {
    name: 'Brian Ssekajja',
    rating: 5,
    text: "Extremely rich Peanut butter! I coordinate an organic food wholesale store, and Yellow Star is always our most-requested peanut butter brand.",
    product: 'YS Pure Peanut Butter (Gnuts)',
    date: 'June 01, 2026'
  },
  {
    name: 'Esther Mukasa',
    rating: 5,
    text: "The wild-forest honey has a distinct woodsy flavor, absolutely pure and completely unfiltered. Highly recommended!",
    product: 'YS Wild-Forest Multiflora Honey',
    date: 'May 28, 2026'
  }
];

export const COMPANY_STORY = {
  founded: '2014',
  location: 'Kijabijjo, Kira Town Council, Wakiso, Uganda',
  mission: 'To process pure, organic, nutrient-rich local grains, seeds, and forest foods directly from Ugandan farmers, bringing high-health-value foods of exportable standards directly to every Ugandan dining table.',
  narrative: 'Yellow Star Produce & Food Processors Uganda Limited rose from a humble milling operation in Wakiso to one of the country’s most reliable names in agro-processing. By working hand-in-hand with individual local farmers and agricultural co-operatives, we guarantee fair trade wages, seed purity, and exceptional field practices. Our production facility located at Plot 649, Block 170 in Kijabijjo is equipped with modern, sanitary grinding and oil extraction lines certified to ensure clean food handling and the highest quality control.',
  contact: {
    address: 'Plot 649, Block 170, Kijabijjo, Kira Town Council, Wakiso District, Kampala, Uganda',
    phones: ['0772-613531', '0704-160033'],
    email: 'yellowstarfoods@gmail.com',
    socials: {
      facebook: '@yellowstarfoods',
      twitter: '@yellowstarfoods',
      instagram: '@yellowstarfoods'
    },
    website: 'www.yellowstarfoodprocessors.net'
  }
};
