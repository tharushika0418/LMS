import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import StudentForm from '../components/students/StudentForm';
import { updateStudent, getStudentById } from '../services/studentService';

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (location.state?.student) {
      setStudent(location.state.student);
    } else {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await getStudentById(id);
      setStudent(response.data);
    } catch (error) {
      toast.error('Failed to fetch student details');
      navigate('/');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await updateStudent(id, formData);
      toast.success('Student updated successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      toast.error(error.message || 'Failed to update student');
    } finally {
      setLoading(false);
    }
  };

  if (!student) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Student
                </h4>
              </div>
              <div className="card-body">
                <StudentForm
                  initialData={student}
                  onSubmit={handleSubmit}
                  isLoading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;