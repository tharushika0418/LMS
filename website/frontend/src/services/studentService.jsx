import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

// Get token from localStorage
const getAuthConfig = () => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${admin?.token}`,
    },
  };
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to include token
axiosInstance.interceptors.request.use(
  (config) => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin?.token) {
      config.headers.Authorization = `Bearer ${admin.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get all students
export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch students' };
  }
};

// Get single student by ID
export const getStudentById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch student' };
  }
};

// Create new student
export const createStudent = async (studentData) => {
  try {
    const response = await axiosInstance.post('/', studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create student' };
  }
};

// Update student
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update student' };
  }
};

// Delete student
export const deleteStudent = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete student' };
  }
};

const studentService = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};

export default studentService;