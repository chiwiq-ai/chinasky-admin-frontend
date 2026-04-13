// Mock Data for China Sky Supermarket Admin Dashboard

export function formatPrice(amount) {
  return '₦' + Number(amount).toLocaleString('en-NG');
}

export const adminUser = {
  name: 'Adebayo Okonkwo',
  role: 'CHIEF OPERATIONS',
  avatar: null,
  email: 'adebayo@chinaskysupermarket.ng',
};

export const dashboardKPIs = {
  totalRevenue: 14820500,
  totalOrders: 1247,
  avgOrderValue: 13866,
  activeSKUs: 42,
  dailyOrders: 8420,
  fulfillmentRate: 68.5,
  cartAbandonment: 6.38,
  highlightedRevenue: 11264500,
  miniStats: [
    { label: 'Daily Revenue', value: 29440, type: 'currency', change: 12.5 },
    { label: 'Conversion Rate', value: 4.38, type: 'percent', change: -2.1 },
    { label: 'Return Rate', value: 34.2, type: 'percent', change: 5.3 },
    { label: 'Avg Delivery', value: '3d 4h', type: 'text', change: -8.2 },
  ],
};

export const revenueChartData = [
  { month: 'Jan', revenue: 4200000, orders: 820 },
  { month: 'Feb', revenue: 3800000, orders: 750 },
  { month: 'Mar', revenue: 5100000, orders: 980 },
  { month: 'Apr', revenue: 4600000, orders: 890 },
  { month: 'May', revenue: 5800000, orders: 1100 },
  { month: 'Jun', revenue: 6200000, orders: 1180 },
  { month: 'Jul', revenue: 7100000, orders: 1320 },
  { month: 'Aug', revenue: 6800000, orders: 1250 },
  { month: 'Sep', revenue: 7500000, orders: 1400 },
  { month: 'Oct', revenue: 8200000, orders: 1520 },
  { month: 'Nov', revenue: 9400000, orders: 1680 },
  { month: 'Dec', revenue: 14820500, orders: 1247 },
];

export const salesByCategoryData = [
  { name: 'Asian Groceries', value: 5200000, color: '#C8102E' },
  { name: 'Beverages', value: 3100000, color: '#1a1625' },
  { name: 'Snacks', value: 2400000, color: '#f59e0b' },
  { name: 'Frozen Foods', value: 1800000, color: '#10b981' },
  { name: 'Pantry Staples', value: 1320000, color: '#6366f1' },
  { name: 'Others', value: 1000500, color: '#8b5cf6' },
];

export const revenueComparisonData = [
  { region: 'Lagos', current: 5800000, previous: 4200000 },
  { region: 'Abuja', current: 3200000, previous: 2800000 },
  { region: 'Port Harcourt', current: 2100000, previous: 1900000 },
  { region: 'Ibadan', current: 1800000, previous: 1600000 },
  { region: 'Kano', current: 1200000, previous: 980000 },
];

export const topProducts = [
  { id: 1, name: 'Organic Fuji Apples (6pc)', image: null, price: 4500, sales: 1245, category: 'Asian Groceries' },
  { id: 2, name: 'Golden Jasmine Tea (200g)', image: null, price: 3200, sales: 980, category: 'Beverages' },
  { id: 3, name: 'Spicy Rice Crackers (12 pack)', image: null, price: 2800, sales: 876, category: 'Snacks' },
  { id: 4, name: 'Premium Sushi Rice 5kg', image: null, price: 8500, sales: 654, category: 'Asian Groceries' },
  { id: 5, name: 'Wagyu Beef Slices (500g)', image: null, price: 18500, sales: 342, category: 'Frozen Foods' },
  { id: 6, name: 'Matcha Powder (100g)', image: null, price: 6200, sales: 298, category: 'Beverages' },
];

export const topLocations = [
  { name: 'Lagos - Ikeja', orders: 3240, percentage: 38 },
  { name: 'Lagos - Lekki', orders: 2180, percentage: 26 },
  { name: 'Abuja - Wuse', orders: 1560, percentage: 18 },
  { name: 'Port Harcourt', orders: 890, percentage: 11 },
  { name: 'Ibadan', orders: 550, percentage: 7 },
];

export const products = [
  { id: 1, name: 'Organic Fuji Apples (6pc)', sku: 'SKU-CS-FJA-6P', category: 'Fruits', subcategory: 'Fresh Fruits', price: 4500, sales: 1245, brand: 'Fuji Farms', status: 'Published', image: null, description: 'Hand-picked organic Fuji apples, sweet and crisp. Sourced from premium orchards.' },
  { id: 2, name: 'Golden Jasmine Tea (200g)', sku: 'SKU-CS-GJT-200', category: 'Beverages', subcategory: 'Teas', price: 3200, sales: 980, brand: 'Dragon Well', status: 'Published', image: null, description: 'Aromatic jasmine-infused green tea leaves, traditionally processed for maximum flavour.' },
  { id: 3, name: 'Spicy Rice Crackers (12 pack)', sku: 'SKU-CS-SRC-12', category: 'Snacks', subcategory: 'Crackers', price: 2800, sales: 876, brand: 'KamEda', status: 'Published', image: null, description: 'Crunchy rice crackers with a fiery chili kick. A classic Asian snack favourite.' },
  { id: 4, name: 'Premium Sushi Rice 5kg', sku: 'SKU-CS-PSR-5K', category: 'Grains', subcategory: 'Rice', price: 8500, sales: 654, brand: 'Koshihikari', status: 'Published', image: null, description: 'Short-grain Japanese rice, perfect for sushi, onigiri, and everyday meals.' },
  { id: 5, name: 'Wagyu Beef Slices (500g)', sku: 'SKU-CS-WBS-500', category: 'Frozen Foods', subcategory: 'Meats', price: 18500, sales: 342, brand: 'Miyazaki Select', status: 'Published', image: null, description: 'Premium A5 wagyu beef, thinly sliced for shabu-shabu and yakiniku.' },
  { id: 6, name: 'Matcha Powder (100g)', sku: 'SKU-CS-MTP-100', category: 'Beverages', subcategory: 'Teas', price: 6200, sales: 298, brand: 'Uji Harvest', status: 'Published', image: null, description: 'Ceremonial-grade matcha from Uji, Kyoto. Stone-ground for smooth, rich flavour.' },
  { id: 7, name: 'Kimchi Paste (450g)', sku: 'SKU-CS-KMP-450', category: 'Condiments', subcategory: 'Pastes & Sauces', price: 3800, sales: 512, brand: 'Seoul Kitchen', status: 'Published', image: null, description: 'Authentic Korean gochugaru-based kimchi paste. Make fresh kimchi at home.' },
  { id: 8, name: 'Instant Miso Soup (10 pack)', sku: 'SKU-CS-IMS-10', category: 'Soups', subcategory: 'Instant Soups', price: 2200, sales: 724, brand: 'Marukome', status: 'Draft', image: null, description: 'Traditional Japanese miso soup with wakame seaweed and tofu pieces.' },
  { id: 9, name: 'Coconut Milk (400ml)', sku: 'SKU-CS-CNM-400', category: 'Pantry', subcategory: 'Canned Goods', price: 1500, sales: 1100, brand: 'Thai Choice', status: 'Published', image: null, description: 'Rich and creamy coconut milk for curries, desserts, and smoothies.' },
  { id: 10, name: 'Dried Shiitake Mushrooms (200g)', sku: 'SKU-CS-DSM-200', category: 'Pantry', subcategory: 'Dried Goods', price: 4800, sales: 0, brand: 'Forest Harvest', status: 'Draft', image: null, description: 'Sun-dried shiitake mushrooms with intense umami flavour. Rehydrate before use.' },
];

export const orders = [
  { id: 'CS-92810', customer: { name: 'Chioma Okafor', email: 'chioma@gmail.com', avatar: 'CO', phone: '+234 812 345 6789', location: 'Lagos, Ikeja' }, qty: 5, date: '2026-04-08', total: 42500, delivery: 'Doorstep', status: 'Processing', items: [
    { name: 'Organic Fuji Apples (6pc)', price: 4500, qty: 2, subtotal: 9000, image: null },
    { name: 'Golden Jasmine Tea (200g)', price: 3200, qty: 3, subtotal: 9600, image: null },
    { name: 'Spicy Rice Crackers (12 pack)', price: 2800, qty: 1, subtotal: 2800, image: null },
  ], payment: { method: 'Card Payment', currency: 'NGN', status: 'Paid' } },
  { id: 'CS-92809', customer: { name: 'Emeka Nwosu', email: 'emeka.n@yahoo.com', avatar: 'EN', phone: '+234 803 456 7890', location: 'Abuja, Wuse' }, qty: 3, date: '2026-04-08', total: 195000, delivery: 'Pickup', status: 'Pending', items: [
    { name: 'Wagyu Beef Slices (500g)', price: 18500, qty: 2, subtotal: 37000, image: null },
    { name: 'Premium Sushi Rice 5kg', price: 8500, qty: 1, subtotal: 8500, image: null },
  ], payment: { method: 'Bank Transfer', currency: 'NGN', status: 'Pending' } },
  { id: 'CS-92808', customer: { name: 'Aisha Bello', email: 'aisha.b@hotmail.com', avatar: 'AB', phone: '+234 705 678 1234', location: 'Lagos, Lekki' }, qty: 8, date: '2026-04-07', total: 67800, delivery: 'Doorstep', status: 'Shipped', items: [
    { name: 'Golden Jasmine Tea (200g)', price: 3200, qty: 3, subtotal: 9600, image: null },
    { name: 'Matcha Powder (100g)', price: 6200, qty: 2, subtotal: 12400, image: null },
  ], payment: { method: 'Card Payment', currency: 'NGN', status: 'Paid' } },
  { id: 'CS-92807', customer: { name: 'Tunde Adeyemi', email: 'tunde.a@gmail.com', avatar: 'TA', phone: '+234 816 789 0123', location: 'Ibadan' }, qty: 2, date: '2026-04-07', total: 490000, delivery: 'Doorstep', status: 'Delivered', items: [
    { name: 'Wagyu Beef Slices (500g)', price: 18500, qty: 4, subtotal: 74000, image: null },
  ], payment: { method: 'Card Payment', currency: 'NGN', status: 'Paid' } },
  { id: 'CS-92806', customer: { name: 'Ngozi Eze', email: 'ngozi.e@gmail.com', avatar: 'NE', phone: '+234 809 012 3456', location: 'Port Harcourt' }, qty: 6, date: '2026-04-06', total: 28400, delivery: 'Pickup', status: 'Delivered', items: [
    { name: 'Coconut Milk (400ml)', price: 1500, qty: 4, subtotal: 6000, image: null },
    { name: 'Kimchi Paste (450g)', price: 3800, qty: 2, subtotal: 7600, image: null },
  ], payment: { method: 'Cash on Delivery', currency: 'NGN', status: 'Paid' } },
];

export const customers = [
  { id: 'CUS-001', name: 'Chioma Okafor', email: 'chioma@gmail.com', avatar: 'CO', status: 'Loyal', lastVisit: '2026-04-08', location: 'Lagos, Ikeja', aov: 28500, totalSpend: 842000 },
  { id: 'CUS-002', name: 'Emeka Nwosu', email: 'emeka.n@yahoo.com', avatar: 'EN', status: 'Loyal', lastVisit: '2026-04-08', location: 'Abuja, Wuse', aov: 45200, totalSpend: 1256000 },
  { id: 'CUS-003', name: 'Aisha Bello', email: 'aisha.b@hotmail.com', avatar: 'AB', status: 'New', lastVisit: '2026-04-07', location: 'Lagos, Lekki', aov: 12400, totalSpend: 67800 },
  { id: 'CUS-004', name: 'Tunde Adeyemi', email: 'tunde.a@gmail.com', avatar: 'TA', status: 'At Risk', lastVisit: '2026-03-15', location: 'Ibadan', aov: 65000, totalSpend: 980000 },
  { id: 'CUS-005', name: 'Ngozi Eze', email: 'ngozi.e@gmail.com', avatar: 'NE', status: 'Churned', lastVisit: '2026-01-20', location: 'Port Harcourt', aov: 18900, totalSpend: 567000 },
];

export const suppliers = [
  { id: 'SUP-001', name: 'Evergreen Orchards', category: 'Fruits & Produce', rating: 4.8, contact: { name: 'Li Wei', email: 'liwei@evergreenorchards.com', phone: '+234 801 234 5678' }, performance: [85, 90, 88, 95, 92, 96], image: null, fulfillmentRate: 96.5, avgLeadTime: '3 days', qualityScore: 98, status: 'Active', productsSupplied: 24 },
  { id: 'SUP-002', name: 'Pacific Rim Foods', category: 'Frozen & Seafood', rating: 4.7, contact: { name: 'Kenji Tanaka', email: 'kenji@pacificrimfoods.com', phone: '+234 802 345 6789' }, performance: [88, 92, 90, 93, 91, 94], image: null, fulfillmentRate: 94.2, avgLeadTime: '2 days', qualityScore: 95, status: 'Active', productsSupplied: 18 },
  { id: 'SUP-003', name: 'Atlas Wholesale Co.', category: 'Pantry & Dry Goods', rating: 4.5, contact: { name: 'Priya Sharma', email: 'priya@atlaswholesale.com', phone: '+234 803 456 7890' }, performance: [80, 85, 88, 90, 89, 92], image: null, fulfillmentRate: 91.8, avgLeadTime: '5 days', qualityScore: 97, status: 'Active', productsSupplied: 32 },
];

export const inventory = [
  { id: 'INV-001', name: 'Organic Fuji Apples (6pc)', sku: 'SKU-CS-FJA-6P', status: 'In Stock', category: 'Fruits', subcategory: 'Fresh Fruits', supplier: 'Evergreen Orchards', brand: 'Fuji Farms', currentStock: 1250, reserved: 145, available: 1105 },
  { id: 'INV-002', name: 'Golden Jasmine Tea (200g)', sku: 'SKU-CS-GJT-200', status: 'Low Stock', category: 'Beverages', subcategory: 'Teas', supplier: 'Atlas Wholesale Co.', brand: 'Dragon Well', currentStock: 42, reserved: 10, available: 32 },
  { id: 'INV-003', name: 'Wagyu Beef Slices (500g)', sku: 'SKU-CS-WBS-500', status: 'Low Stock', category: 'Frozen Foods', subcategory: 'Meats', supplier: 'Pacific Rim Foods', brand: 'Miyazaki Select', currentStock: 18, reserved: 5, available: 13 },
  { id: 'INV-004', name: 'Dried Shiitake Mushrooms (200g)', sku: 'SKU-CS-DSM-200', status: 'Out of Stock', category: 'Pantry', subcategory: 'Dried Goods', supplier: 'Atlas Wholesale Co.', brand: 'Forest Harvest', currentStock: 0, reserved: 0, available: 0 },
  { id: 'INV-005', name: 'Coconut Milk (400ml)', sku: 'SKU-CS-CNM-400', status: 'In Stock', category: 'Pantry', subcategory: 'Canned Goods', supplier: 'Pacific Rim Foods', brand: 'Thai Choice', currentStock: 3200, reserved: 300, available: 2900 },
];

export const transactions = [
  { id: '#STR-94281-XC', amount: 245000, netAmount: 238500, customer: 'Tunde Adeyemi', date: '2026-04-08 14:32', status: 'Success' },
  { id: '#STR-94282-AB', amount: 42500, netAmount: 41200, customer: 'Chioma Okafor', date: '2026-04-08 12:15', status: 'Success' },
  { id: '#STR-94283-KF', amount: 195000, netAmount: 189800, customer: 'Emeka Nwosu', date: '2026-04-08 10:45', status: 'Pending' },
  { id: '#STR-94284-QL', amount: 67800, netAmount: 65900, customer: 'Aisha Bello', date: '2026-04-07 18:20', status: 'Success' },
  { id: '#STR-94285-MN', amount: 490000, netAmount: 477000, customer: 'Tunde Adeyemi', date: '2026-04-07 15:10', status: 'Success' },
  { id: '#STR-94286-RT', amount: 18200, netAmount: 17700, customer: 'Fatima Yusuf', date: '2026-04-06 09:30', status: 'Failed' },
  { id: '#STR-94287-WP', amount: 156800, netAmount: 152400, customer: 'Blessing Obi', date: '2026-04-05 22:15', status: 'Success' },
  { id: '#STR-94288-DZ', amount: 32400, netAmount: 31500, customer: 'Ngozi Eze', date: '2026-04-05 11:40', status: 'Pending' },
];

export const notifications = [
  { id: 1, type: 'Low Stock', title: 'Stock Alert', message: 'Wagyu Beef Slices is running low (13 units remaining)', time: '2 hours ago', read: false },
  { id: 2, type: 'New Order', title: 'Order Received', message: 'New order CS-92810 received from Chioma Okafor - ₦42,500', time: '3 hours ago', read: false },
  { id: 3, type: 'Abandoned Cart', title: 'Cart Abandoned', message: 'Blessing Obi abandoned cart worth ₦156,800', time: '5 hours ago', read: false },
  { id: 4, type: 'Payment Failed', title: 'Payment Issue', message: 'Payment failed for order CS-92803 - ₦156,800', time: '6 hours ago', read: true },
  { id: 5, type: 'Low Stock', title: 'Stock Alert', message: 'Dried Shiitake Mushrooms is OUT OF STOCK', time: '8 hours ago', read: true },
];

export const campaigns = [
  { id: 1, name: 'Spring Tea Festival', type: 'Email', discount: '15%', segment: 'All Users', status: 'Active', reach: 42850, conversion: 8.5 },
  { id: 2, name: 'Abandoned Cart Recovery', type: 'Email', discount: '₦500 off', segment: 'Abandoned Cart', status: 'Active', reach: 1240, conversion: 12.3 },
  { id: 3, name: 'New Arrivals - Frozen', type: 'Push', discount: '10%', segment: 'Loyal Customers', status: 'Active', reach: 38500, conversion: 6.8 },
];

export const pricingRules = [
  { id: 1, name: 'Weekend Fresh Blowout', discount: 15, scope: 'Fresh Fruits & Produce', schedule: 'Sat-Sun, All Day', type: 'Percentage', status: 'Active' },
  { id: 2, name: 'Pantry Stock-up (BOGO)', discount: 50, scope: 'Pantry Staples', schedule: 'Mon-Fri, All Day', type: 'BOGO', status: 'Active' },
  { id: 3, name: 'Midnight Dim Sum Rush', discount: 500, scope: 'Frozen Dim Sum & Dumplings', schedule: 'Daily, 10PM-2AM', type: 'Fixed', status: 'Active' },
];

export const coupons = [
  { code: 'SKYSPRING24', discount: 10, type: 'Percentage', usageCount: 342, maxUsage: 1000, status: 'Active', expiryDate: '2026-06-30' },
  { code: 'NEWUSER500', discount: 500, type: 'Fixed', usageCount: 128, maxUsage: 500, status: 'Active', expiryDate: '2026-12-31' },
  { code: 'FREEDELIVERY', discount: 100, type: 'Free Shipping', usageCount: 890, maxUsage: 1000, status: 'Active', expiryDate: '2026-05-15' },
];

export const cmsModules = [
  { id: 1, name: 'Hero Carousel', type: 'carousel', active: true, description: 'Main homepage banner carousel with promotional content' },
  { id: 2, name: 'Trust Strip', type: 'strip', active: true, description: 'Trust indicators and delivery promise badges' },
  { id: 3, name: 'Shop by Category', type: 'grid', active: true, description: 'Category browsing grid with icons' },
  { id: 4, name: 'Everyday Asian Eats', type: 'product_grid', active: true, description: 'Curated Asian food products section' },
  { id: 5, name: "Today's Sweet Deals", type: 'product_grid', active: true, description: 'Daily deals and discounted items' },
  { id: 6, name: 'Seasonal Promo Banner', type: 'banner', active: true, description: 'Seasonal promotional banner' },
  { id: 7, name: 'Frozen & Fresh', type: 'product_grid', active: true, description: 'Featured frozen and fresh products' },
  { id: 8, name: 'Snack Attack', type: 'product_grid', active: false, description: 'Snack deals and promotions' },
  { id: 9, name: 'Tea & Beverages', type: 'product_grid', active: true, description: 'Tea and beverage collection' },
  { id: 10, name: 'Flagship Store (Map)', type: 'map', active: true, description: 'Interactive map showing store location' },
];

export const marketingStats = {
  activeCampaigns: 12,
  marketingRevenue: 4200000,
  recoveredCarts: 1800000,
  roi: 5.4,
};

export const aiInsights = {
  forecast30Day: 18500000,
  volumeProjection: 2840,
  immediateStockNeeds: 8,
  recommendations: [
    { priority: 'High', title: 'Restock Wagyu Beef Slices', description: 'Current velocity suggests stockout in 5 days. Recommended order: 200 units.', category: 'Inventory' },
    { priority: 'High', title: 'Price Optimization - Matcha Powder', description: 'Competitor analysis shows 8% margin opportunity. Suggested price: ₦6,700.', category: 'Pricing' },
    { priority: 'Medium', title: 'Bundle Opportunity', description: 'Customers buying Sushi Rice frequently also buy Wagyu Beef. Create a bundle deal.', category: 'Marketing' },
    { priority: 'Low', title: 'Seasonal Trend Alert', description: 'Lunar New Year demand surge expected. Increase dumpling and dim sum stock by 30%.', category: 'Inventory' },
  ],
  categoryVelocity: [
    { category: 'Asian Groceries', velocity: 'High', trend: 'up', change: 12.5 },
    { category: 'Frozen Foods', velocity: 'Medium', trend: 'up', change: 8.2 },
    { category: 'Beverages', velocity: 'Medium', trend: 'stable', change: 1.1 },
    { category: 'Snacks', velocity: 'Low', trend: 'down', change: -3.4 },
    { category: 'Pantry', velocity: 'Low', trend: 'up', change: 5.6 },
  ],
};

export const userRoles = [
  { id: 1, name: 'Super Admin', users: 2, permissions: ['All Access'], color: '#C8102E' },
  { id: 2, name: 'Operations Manager', users: 5, permissions: ['Orders', 'Inventory', 'Products', 'Suppliers', 'CRM'], color: '#6366f1' },
  { id: 3, name: 'Marketing Lead', users: 3, permissions: ['Marketing', 'CMS', 'CRM', 'AI Insights'], color: '#10b981' },
  { id: 4, name: 'Support Agent', users: 7, permissions: ['Orders', 'CRM'], color: '#f59e0b' },
];

export const adminUsers = [
  { id: 1, name: 'Adebayo Okonkwo', email: 'adebayo@chinaskysupermarket.ng', role: 'Super Admin', status: 'Active', lastLogin: '2026-04-10 09:30' },
  { id: 2, name: 'Funke Adeola', email: 'funke@chinaskysupermarket.ng', role: 'Super Admin', status: 'Active', lastLogin: '2026-04-10 08:15' },
  { id: 3, name: 'Chukwudi Emeka', email: 'chukwudi@chinaskysupermarket.ng', role: 'Operations Manager', status: 'Active', lastLogin: '2026-04-09 17:45' },
  { id: 4, name: 'Halima Abdullahi', email: 'halima@chinaskysupermarket.ng', role: 'Operations Manager', status: 'Active', lastLogin: '2026-04-10 07:00' },
  { id: 5, name: 'Yinka Oladipo', email: 'yinka@chinaskysupermarket.ng', role: 'Marketing Lead', status: 'Active', lastLogin: '2026-04-09 16:20' },
  { id: 6, name: 'Amara Nkem', email: 'amara@chinaskysupermarket.ng', role: 'Support Agent', status: 'Inactive', lastLogin: '2026-04-01 10:00' },
];

export const stripeTransactions = [
  { id: 'TXN-CS-001', amount: 245000, netAmount: 238500, fees: 6500, customer: 'Tunde Adeyemi', date: '2026-04-08 14:32', status: 'Completed' },
  { id: 'TXN-CS-002', amount: 42500, netAmount: 41200, fees: 1300, customer: 'Chioma Okafor', date: '2026-04-08 12:15', status: 'Completed' },
  { id: 'TXN-CS-003', amount: 195000, netAmount: 189800, fees: 5200, customer: 'Emeka Nwosu', date: '2026-04-08 10:45', status: 'Pending' },
  { id: 'TXN-CS-004', amount: 67800, netAmount: 65900, fees: 1900, customer: 'Aisha Bello', date: '2026-04-07 18:20', status: 'Completed' },
  { id: 'TXN-CS-005', amount: 490000, netAmount: 477000, fees: 13000, customer: 'Tunde Adeyemi', date: '2026-04-07 15:10', status: 'Completed' },
  { id: 'TXN-CS-006', amount: 18200, netAmount: 17700, fees: 500, customer: 'Fatima Yusuf', date: '2026-04-06 09:30', status: 'Refunded' },
  { id: 'TXN-CS-007', amount: 156800, netAmount: 152400, fees: 4400, customer: 'Blessing Obi', date: '2026-04-05 22:15', status: 'Completed' },
];

export const categories = ['Fruits', 'Beverages', 'Snacks', 'Grains', 'Frozen Foods', 'Condiments', 'Soups', 'Pantry'];
export const subCategories = {
  Fruits: ['Fresh Fruits', 'Dried Fruits', 'Preserved Fruits'],
  Beverages: ['Teas', 'Juices', 'Soft Drinks', 'Milk & Dairy'],
  Snacks: ['Crackers', 'Chips', 'Nuts & Seeds', 'Sweets'],
  Grains: ['Rice', 'Noodles', 'Flour'],
  'Frozen Foods': ['Meats', 'Seafood', 'Dumplings', 'Vegetables'],
  Condiments: ['Pastes & Sauces', 'Oils', 'Spices', 'Vinegars'],
  Soups: ['Instant Soups', 'Broth & Stock'],
  Pantry: ['Canned Goods', 'Dried Goods', 'Baking'],
};

export const catalogProducts = [
  { id: 101, name: 'Pocky Chocolate Sticks (10 pack)', price: 2800, image: null },
  { id: 102, name: 'Oolong Tea (150g)', price: 3200, image: null },
  { id: 103, name: 'Sriracha Hot Sauce 500ml', price: 4500, image: null },
  { id: 104, name: 'Dashi Stock Powder (100g)', price: 1500, image: null },
  { id: 105, name: 'Frozen Gyoza (50 pcs)', price: 12500, image: null },
  { id: 106, name: 'Rice Noodles 500g', price: 850, image: null },
];

export const settings = {
  contactEmail: 'support@chinaskysupermarket.ng',
  supportPhone: '+234 800 CHINA SKY',
  timezone: 'Africa/Lagos (WAT)',
  passwordRotation: '90 days',
  emailNotifications: { newOrder: true, lowStock: true, customerSignup: false, dailyReport: true },
  whatsappUpdates: { orderStatus: true, promotions: false, stockAlerts: true },
  activeSessions: [
    { device: 'Chrome - Windows 11', ip: '102.89.23.45', location: 'Lagos, Nigeria', lastActive: '2026-04-10 09:30', current: true },
    { device: 'Safari - iPhone 15', ip: '102.89.23.46', location: 'Lagos, Nigeria', lastActive: '2026-04-09 22:15', current: false },
  ],
};
