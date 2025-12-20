const getApiUrl = () => {
  // 1. Check for environment variable (Vite way)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // 2. Check if we are in production
  if (import.meta.env.PROD) {
    // Fallback URL for production if env var is missing
    return 'https://temple-backend-dm30.onrender.com';
  }

  // 3. Default to localhost for development
  return 'http://localhost:5011';
};

export const API_URL = getApiUrl();

export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
