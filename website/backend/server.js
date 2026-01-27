require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

// Import consumer services (they auto-initialize)
const notificationService = require('./services/notificationService');
const analyticsService = require('./services/analyticsService');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'EduConnect API is running' });
});

// Analytics endpoint (optional - to view statistics)
app.get('/api/analytics/stats', (req, res) => {
  const stats = analyticsService.getStatistics();
  res.json({
    success: true,
    data: stats
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Server running on port ${PORT}`);
  console.log(`Event-Driven Architecture: ENABLED`);
  console.log(`Consumer Services: NotificationService, AnalyticsService`);
  console.log(`${'='.repeat(60)}\n`);
});