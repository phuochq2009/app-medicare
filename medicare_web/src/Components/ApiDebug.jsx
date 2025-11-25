import React, { useState, useEffect } from 'react';
import api from '../Controllers/api';

const ApiDebug = () => {
  const [apiInfo, setApiInfo] = useState({
    apiUrl: '',
    environment: '',
    isProduction: false,
    connectionStatus: 'checking'
  });

  useEffect(() => {
    const checkApiInfo = () => {
      const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
      
      setApiInfo({
        apiUrl: api,
        environment: isProduction ? 'Production' : 'Development',
        isProduction,
        connectionStatus: 'ready'
      });
    };

    checkApiInfo();
  }, []);

  const testApiConnection = async () => {
    try {
      setApiInfo(prev => ({ ...prev, connectionStatus: 'testing' }));
      
      const response = await fetch(`${api}/get_configurations`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (response.ok) {
        setApiInfo(prev => ({ ...prev, connectionStatus: 'success' }));
      } else {
        setApiInfo(prev => ({ ...prev, connectionStatus: 'error' }));
      }
    } catch (error) {
      console.error('API Test Error:', error);
      setApiInfo(prev => ({ ...prev, connectionStatus: 'error' }));
    }
  };

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <h3 className="font-bold text-sm mb-2">API Debug Info</h3>
      <div className="text-xs space-y-1">
        <div><strong>Environment:</strong> {apiInfo.environment}</div>
        <div><strong>API URL:</strong> {apiInfo.apiUrl}</div>
        <div><strong>Status:</strong> 
          <span className={`ml-1 px-2 py-1 rounded text-xs ${
            apiInfo.connectionStatus === 'success' ? 'bg-green-100 text-green-800' :
            apiInfo.connectionStatus === 'error' ? 'bg-red-100 text-red-800' :
            apiInfo.connectionStatus === 'testing' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {apiInfo.connectionStatus}
          </span>
        </div>
        <button 
          onClick={testApiConnection}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          Test Connection
        </button>
      </div>
    </div>
  );
};

export default ApiDebug; 