export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  TIMEOUT: 15000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 2000,
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  DONATION: '/donation',
  POOJA_DETAILS: '/pooja-details',
  GALLERY: '/gallery',
  CONTACT: '/contact',
  ADMIN_PANEL: '/admin-panel'
};

export const API_ENDPOINTS = {
  POOJAS: {
    LIST: '/api/poojas',
    DETAILS: '/api/poojas/:id',
  },
  BOOKINGS: {
    CREATE: '/api/bookings',
    LIST: '/api/bookings',
    DETAILS: '/api/bookings/:id',
    AVAILABILITY: '/api/bookings/availability',
  },
  GALLERY: {
    LIST: '/api/gallery',
    UPLOAD: '/api/gallery/upload',
  },
  DONATIONS: {
    CREATE: '/api/donations',
    LIST: '/api/donations',
    DETAILS: '/api/donations/:id',
  },
}; 