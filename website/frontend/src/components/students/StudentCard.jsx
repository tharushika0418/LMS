import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentCard = ({ student, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-student/${student._id}`, { state: { student } });
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="card-title mb-0">{student.fullName}</h5>
            <span className="badge bg-secondary">{student.studentId}</span>
          </div>
          
          <p className="text-muted mb-2">
            <i className="bi bi-envelope me-2"></i>
            {student.email}
          </p>
          
          {student.phone && (
            <p className="text-muted mb-2">
              <i className="bi bi-telephone me-2"></i>
              {student.phone}
            </p>
          )}
          
          <p className="text-muted mb-2">
            <i className="bi bi-building me-2"></i>
            {student.department}
          </p>
          
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <small className="text-muted">
                Semester {student.semester} | {student.enrollmentYear}
              </small>
            </div>
          </div>
          
          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-sm btn-outline-primary flex-fill"
              onClick={handleEdit}
            >
              <i className="bi bi-pencil me-1"></i>
              Edit
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(student._id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;