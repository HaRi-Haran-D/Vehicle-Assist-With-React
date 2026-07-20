const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

export const register = async (username, email, password, mobile_number, role = 'CUSTOMER') => {
  const response = await fetch(`${API_BASE_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, mobile_number, role }),
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return response.json();
};

export const getProfile = async (token) => {
  const response = await fetch(`${API_BASE_URL}/profile/`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return response.json();
};

export const getVehicles = async (token) => {
  const response = await fetch(`${API_BASE_URL}/vehicles/`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }
  return response.json();
};

export const addVehicle = async (token, vehicleData) => {
  const response = await fetch(`${API_BASE_URL}/vehicles/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
    },
    body: vehicleData,
  });
  if (!response.ok) {
    let errorMessage = 'Failed to add vehicle';
    try {
      const errorData = await response.json();
      if (typeof errorData === 'object') {
        const firstKey = Object.keys(errorData)[0];
        if (firstKey) {
          errorMessage = `${firstKey}: ${errorData[firstKey]}`;
        }
      }
    } catch (e) {}
    throw new Error(errorMessage);
  }
  return response.json();
};

export const getServiceRequests = async (token) => {
  const response = await fetch(`${API_BASE_URL}/service-requests/`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch service requests');
  }
  return response.json();
};

export const addServiceRequest = async (token, requestData) => {
  const response = await fetch(`${API_BASE_URL}/service-requests/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
    },
    body: requestData,
  });
  if (!response.ok) {
    throw new Error('Failed to add service request');
  }
  return response.json();
};

export const cancelServiceRequest = async (token, requestId) => {
  const response = await fetch(`${API_BASE_URL}/service-requests/${requestId}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'CANCELLED' }),
  });
  if (!response.ok) {
    throw new Error('Failed to cancel service request');
  }
  return response.json();
};

export const getMechanicStats = async (token) => {
  const response = await fetch(`${API_BASE_URL}/mechanic/stats/`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch mechanic stats');
  }
  return response.json();
};

export const acceptServiceRequest = async (token, requestId) => {
  const response = await fetch(`${API_BASE_URL}/service-requests/${requestId}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'IN_PROGRESS' }),
  });
  if (!response.ok) {
    throw new Error('Failed to accept service request');
  }
  return response.json();
};

export const updateServiceRequestStatus = async (token, requestId, status) => {
  const response = await fetch(`${API_BASE_URL}/service-requests/${requestId}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error('Failed to update service request status');
  }
  return response.json();
};

