// API Proxy configuration for handling CORS issues in production
const getApiUrl = (endpoint) => {
  const baseUrl = import.meta.env.VITE_API_ADDRESS || "http://194.233.67.229:443";
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  
  // If in production and CORS issues persist, you can use a CORS proxy
  if (isProduction && import.meta.env.VITE_USE_CORS_PROXY === 'true') {
    // Example CORS proxy (you can use your own or a service like cors-anywhere)
    const corsProxy = import.meta.env.VITE_CORS_PROXY_URL || 'https://cors-anywhere.herokuapp.com/';
    return `${corsProxy}${baseUrl}/${endpoint}`;
  }
  
  return `${baseUrl}/${endpoint}`;
};

export default getApiUrl; 