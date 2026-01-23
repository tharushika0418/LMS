import React, { useState, useEffect } from 'react';

const StudentForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    email: '',
    phone: '',
    department: 'Computer Engineering',
    semester: 1,
    enrollmentYear: new Date().getFullYear(),
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Student ID *</label>
          <input
            type="text"
            className="form-control"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="CE2021001"
            required
            disabled={initialData ? true : false}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+94 71 234 5678"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Department *</label>
          <select
            className="form-select"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-md-3 mb-3">
          <label className="form-label">Semester *</label>
          <select
            className="form-select"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 mb-3">
          <label className="form-label">Enrollment Year *</label>
          <input
            type="number"
            className="form-control"
            name="enrollmentYear"
            value={formData.enrollmentYear}
            onChange={handleChange}
            min="2000"
            max={new Date().getFullYear()}
            required
          />
        </div>
      </div>

      <div className="d-flex gap-2 mt-4">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Saving...
            </>
          ) : (
            <>
              <i className="bi bi-check-circle me-2"></i>
              {initialData ? 'Update Student' : 'Add Student'}
            </>
          )}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => window.history.back()}
        >
          <i className="bi bi-x-circle me-2"></i>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StudentForm;