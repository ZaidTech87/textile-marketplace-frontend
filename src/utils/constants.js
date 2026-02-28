export const USER_TYPES = {
  SELLER: 'SELLER',
  BUYER: 'BUYER'
}

export const PRODUCT_STATUS = {
  PENDING_PAYMENT: 'PENDING_PAYMENT',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SOLD: 'SOLD'
}

export const PRODUCT_CATEGORIES = [
  { id: 'fabric', name: 'Fabric Roll', icon: '🧵' },
  { id: 'saree', name: 'Saree', icon: '👗' },
  { id: 'suit', name: 'Suit Piece', icon: '👔' },
  { id: 'dress', name: 'Dress Material', icon: '👚' },
  { id: 'scarf', name: 'Scarf/Stole', icon: '🧣' },
  { id: 'home', name: 'Home Textile', icon: '🏠' }
]

export const FABRIC_TYPES = [
  'Silk',
  'Cotton',
  'Linen',
  'Wool',
  'Polyester',
  'Georgette',
  'Chiffon',
  'Velvet',
  'Blend'
]

export const QUALITY_GRADES = [
  { id: 'premium', name: 'Premium (A Grade)', color: 'green' },
  { id: 'standard', name: 'Standard (B Grade)', color: 'yellow' },
  { id: 'economy', name: 'Economy (C Grade)', color: 'orange' }
]

export const PRICE_UNITS = [
  'meter',
  'kg',
  'piece',
  'dozen',
  'roll'
]

export const SORT_OPTIONS = [
  { id: 'newest', name: 'Newest First' },
  { id: 'price_low', name: 'Price: Low to High' },
  { id: 'price_high', name: 'Price: High to Low' },
  { id: 'popular', name: 'Most Popular' }
]

export const API_ENDPOINTS = {
  AUTH: {
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout'
  },
  PRODUCTS: {
    FEED: '/products/feed',
    DETAIL: (id) => `/products/${id}`,
    CREATE_DRAFT: '/products/draft',
    UPLOAD_IMAGES: (id) => `/products/${id}/images`,
    MY_PRODUCTS: '/products/my-products',
    SEARCH: '/products/search',
    NEARBY: '/products/nearby',
    FEATURED: '/products/featured'
  },
  PAYMENTS: {
    CREATE_ORDER: (productId) => `/payments/create-order/${productId}`,
    VERIFY: '/payments/verify',
    STATUS: (orderId) => `/payments/status/${orderId}`,
    PRODUCT_PAYMENT: (productId) => `/payments/product/${productId}`
  },
  CHAT: {
    ROOMS: '/chat/rooms',
    ROOM: (productId) => `/chat/room/${productId}`,
    MESSAGES: (roomId) => `/chat/${roomId}/messages`,
    SEND: (roomId) => `/chat/${roomId}/send`,
    READ: (roomId) => `/chat/${roomId}/read`,
    UNREAD_COUNT: '/chat/unread-count'
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
    IMAGE: '/users/profile/image',
    LOCAL_SELLERS: '/users/local-sellers',
    TOP_RATED: '/users/top-rated'
  }
}