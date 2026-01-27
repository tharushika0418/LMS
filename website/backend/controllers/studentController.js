const Student = require('../models/Student');
const eventBus = require('../utils/eventBus');

// @desc    Get all students
// @route   GET /api/students
// @access  Public
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
// @access  Public
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Public
exports.createStudent = async (req, res) => {
  try {
    // 1. Complete database operation first
    const student = await Student.create(req.body);
    
    console.log('[Producer] Student created successfully in DB');
    
    // 2. Prepare event payload
    const eventPayload = {
      eventName: 'StudentRegistered',
      entityId: student._id.toString(),
      timestamp: new Date().toISOString(),
      metadata: {
        studentId: student.studentId,
        fullName: student.fullName,
        email: student.email,
        department: student.department,
        enrollmentYear: student.enrollmentYear
      }
    };
    
    // 3. Publish event to Event Bus (non-blocking)
    console.log('[Producer] Publishing StudentRegistered event...');
    setImmediate(() => {
      eventBus.publish('StudentRegistered', eventPayload);
    });
    
    // 4. Return response immediately (don't wait for consumers)
    console.log('[Producer] Returning response to client (before consumer processing)');
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
    
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Student ID or Email already exists'
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Failed to create student',
      error: error.message
    });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Public
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return updated document
        runValidators: true // Run schema validators
      }
    );
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Publish StudentUpdated event
    const eventPayload = {
      eventName: 'StudentUpdated',
      entityId: student._id.toString(),
      timestamp: new Date().toISOString(),
      metadata: {
        studentId: student.studentId,
        fullName: student.fullName,
        email: student.email,
        updatedFields: Object.keys(req.body)
      }
    };
    
    setImmediate(() => {
      eventBus.publish('StudentUpdated', eventPayload);
    });
    
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update student',
      error: error.message
    });
  }
};

// @desc    Delete student (soft delete)
// @route   DELETE /api/students/:id
// @access  Public
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};