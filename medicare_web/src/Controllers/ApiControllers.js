import axios from "axios";
import GenerateToken from "./token";
import api from "./api";

const handleSessionExpiration = (error) => {
  if (
    error.response &&
    error.response.data &&
    error.response.data.response === 401 &&
    error.response.data.status === false &&
    error.response.data.message === "Phiên đã hết hạn. Vui lòng đăng nhập lại."
  ) {
    console.error(error.response.data.message);
    setTimeout(() => {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }, 2000);

    return {
      sessionExpired: true,
      message: "Phiên đã hết hạn. Vui lòng đăng nhập lại.",
    };
  }
  throw error;
};

// Retry mechanism for failed requests
const retryRequest = async (config, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};

const GET = async (endPoint) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${api}/${endPoint}`,
    timeout: 15000, // 15 second timeout
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    // Add CORS headers
    withCredentials: false,
    // Allow mixed content and cross-origin requests
    mode: 'cors',
  };
  
  try {
    const response = await retryRequest(config);
    return response.data;
  } catch (error) {
    console.error("API Error Details:", {
      endpoint: endPoint,
      url: `${api}/${endPoint}`,
      error: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: error.config
    });
    
    // Handle specific error types
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      console.error("Network Error - Check API server availability and CORS configuration");
      throw new Error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
    }
    
    if (error.response?.status === 0) {
      console.error("CORS Error - API server may not allow requests from this domain");
      throw new Error("Lỗi CORS - Server không cho phép truy cập từ domain này.");
    }
    
    if (error.response?.status >= 500) {
      throw new Error("Lỗi server. Vui lòng thử lại sau.");
    }
    
    throw new Error(`API call failed: ${error.message}`);
  }
};

const ADD = async (token, endPoint, data) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${api}/${endPoint}`,
    headers: {
      Authorization: GenerateToken(token),
      "Content-Type": "multipart/form-data",
    },
    data: data,
    timeout: 15000,
    withCredentials: false,
  };
  try {
    const response = await retryRequest(config);
    return response.data;
  } catch (error) {
    console.error("ADD API Error:", {
      endpoint: endPoint,
      url: `${api}/${endPoint}`,
      error: error.message,
      status: error.response?.status
    });
    return handleSessionExpiration(error);
  }
};

const ADDMulti = async (token, url, data) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      Authorization: GenerateToken(token),
      "Content-Type": "multipart/form-data",
    },
    data: data,
    timeout: 15000,
    withCredentials: false,
  };
  try {
    const response = await retryRequest(config);
    return response.data;
  } catch (error) {
    console.error("ADDMulti API Error:", {
      url: url,
      error: error.message,
      status: error.response?.status
    });
    return handleSessionExpiration(error);
  }
};

const UPDATE = async (token, endPoint, data) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${api}/${endPoint}`,
    headers: {
      Authorization: GenerateToken(token),
      "Content-Type": "multipart/form-data",
    },
    data: data,
    timeout: 15000,
    withCredentials: false,
  };
  try {
    const response = await retryRequest(config);
    return response.data;
  } catch (error) {
    console.error("UPDATE API Error:", {
      endpoint: endPoint,
      url: `${api}/${endPoint}`,
      error: error.message,
      status: error.response?.status
    });
    return handleSessionExpiration(error);
  }
};

const DELETE = async (token, endPoint, data) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${api}/${endPoint}`,
    headers: {
      Authorization: GenerateToken(token),
      "Content-Type": "application/json",
    },
    data: data,
    timeout: 15000,
    withCredentials: false,
  };
  try {
    const response = await retryRequest(config);
    return response.data;
  } catch (error) {
    console.error("DELETE API Error:", {
      endpoint: endPoint,
      url: `${api}/${endPoint}`,
      error: error.message,
      status: error.response?.status
    });
    return handleSessionExpiration(error);
  }
};

const UPLOAD = async (token, url, data) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      Authorization: GenerateToken(token),
      "Content-Type": "multipart/form-data",
    },
    data: data,
    timeout: 30000, // Longer timeout for uploads
    withCredentials: false,
  };
  try {
    const response = await retryRequest(config);
    return response.data;
  } catch (error) {
    console.error("UPLOAD API Error:", {
      url: url,
      error: error.message,
      status: error.response?.status
    });
    return handleSessionExpiration(error);
  }
};

export { GET, ADD, DELETE, UPDATE, UPLOAD, ADDMulti };
