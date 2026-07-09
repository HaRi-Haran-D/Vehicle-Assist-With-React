const API_BASE_URL = 'http://localhost:8000/api';

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

export const register = async (username, email, password, role = 'CUSTOMER') => {
  const response = await fetch(`${API_BASE_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, role }),
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
