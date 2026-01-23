import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import StudentForm from '../components/students/StudentForm';
import { createStudent } from '../services/studentService';

const AddStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await createStudent(formData);
      toast.success('Student added successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      toast.error(error.message || 'Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">
                  <i className="bi bi-person-plus me-2"></i>
                  Add New Student
                </h4>
              </div>
              <div className="card-body">
                <StudentForm onSubmit={handleSubmit} isLoading={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;