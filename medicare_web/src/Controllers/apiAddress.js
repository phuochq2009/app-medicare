// API Address configuration with fallback for different environments
const getApiAddress = () => {
  // Check if we're in production (Vercel)
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  
  // Get API address from environment variable
  const envApiAddress = import.meta.env.VITE_API_ADDRESS;
  
  if (envApiAddress) {
    return envApiAddress;
  }
  
  // In production, use CORS proxy to handle mixed content
  if (isProduction) {
    // You can use your own CORS proxy or a service like cors-anywhere
    const corsProxy = 'https://corsproxy.io/?';
    return `${corsProxy}http://194.233.67.229:443`;
  }
  
  // In development, use direct HTTP
  return "http://194.233.67.229:443";
};

const apiAddress = getApiAddress();
export default apiAddress;
