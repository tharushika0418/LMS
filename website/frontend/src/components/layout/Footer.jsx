import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} EduConnect - Student Management System
        </p>
        <small className="text-white-50">
          Built with React, Node.js & MongoDB
        </small>
      </div>
    </footer>
  );
};

export default Footer;