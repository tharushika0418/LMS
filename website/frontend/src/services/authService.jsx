import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register admin
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to register' };
  }
};

// Login admin
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to login' };
  }
};

// Get current admin
export const getMe = async (token) => {
  try {
    const response = await axiosInstance.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to get admin data' };
  }
};

const authService = {
  register,
  login,
  getMe,
};

export default authService;