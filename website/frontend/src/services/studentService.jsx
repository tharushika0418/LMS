import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

// Configure axios defaults
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

// Export as default
const studentService = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};

export default studentService;