import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import StudentCard from '../components/students/StudentCard';
import { getAllStudents, deleteStudent } from '../services/studentService';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        toast.success('Student deleted successfully');
        fetchStudents();
      } catch (error) {
        toast.error(error.message || 'Failed to delete student');
      }
    }
  };

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Student Management</h2>
            <p className="text-muted mb-0">
              Total Students: {students.length}
            </p>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, student ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <small className="text-muted">
                  Showing {filteredStudents.length} of {students.length} students
                </small>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <h4>No Students Found</h4>
            <p className="text-muted">
              {searchTerm
                ? 'Try adjusting your search criteria'
                : 'Start by adding your first student'}
            </p>
          </div>
        ) : (
          <div className="row">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student._id}
                student={student}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;