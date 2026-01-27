const eventBus = require('../utils/eventBus');
const emailService = require('../utils/emailService');

class NotificationService {
  constructor() {
    this.serviceName = 'NotificationService';
    this.initialize();
  }

  initialize() {
    console.log(`[${this.serviceName}] Starting service...`);
    
    // Subscribe to StudentRegistered event
    eventBus.subscribe('StudentRegistered', this.handleStudentRegistered.bind(this));
    
    // Subscribe to StudentUpdated event
    eventBus.subscribe('StudentUpdated', this.handleStudentUpdated.bind(this));
    
    console.log(`[${this.serviceName}] Successfully subscribed to events`);
  }

  async handleStudentRegistered(event) {
    try {
      console.log(`\n[${this.serviceName}] ========== EVENT RECEIVED ==========`);
      console.log(`[${this.serviceName}] Event: ${event.eventName}`);
      console.log(`[${this.serviceName}] Timestamp: ${event.timestamp}`);
      console.log(`[${this.serviceName}] Processing started at: ${new Date().toISOString()}`);
      
      // Prepare student data for email
      const studentData = {
        fullName: event.metadata.fullName,
        email: event.metadata.email,
        studentId: event.metadata.studentId,
        department: event.metadata.department,
        enrollmentYear: event.metadata.enrollmentYear
      };
      
      console.log(`[${this.serviceName}] Sending welcome email to ${event.metadata.email}...`);
      
      // Send real email using emailService
      try {
        const result = await emailService.sendWelcomeEmail(studentData);
        
        if (result.success) {
          console.log(`[${this.serviceName}] ✓ Welcome email sent successfully to ${event.metadata.fullName}`);
          console.log(`[${this.serviceName}] Email Message ID: ${result.messageId}`);
        }
      } catch (emailError) {
        // If email fails, log but don't crash the service
        console.error(`[${this.serviceName}] ✗ Failed to send email:`, emailError.message);
        console.log(`[${this.serviceName}] ⚠️  Email service unavailable, but event processing continues`);
        
        // Fallback: At least log what would have been sent
        console.log(`[${this.serviceName}] [FALLBACK] Would have sent welcome email to ${event.metadata.email}`);
        console.log(`[${this.serviceName}] [FALLBACK] Subject: Welcome to EduConnect - ${event.metadata.department}`);
      }
      
      console.log(`[${this.serviceName}] Processing completed at: ${new Date().toISOString()}`);
      console.log(`[${this.serviceName}] ========================================\n`);
      
    } catch (error) {
      console.error(`[${this.serviceName}] ✗ Error processing event:`, error.message);
      // Important: Consumer failure doesn't affect the producer
      console.log(`[${this.serviceName}] Note: Main API continues working despite this error`);
    }
  }

  async handleStudentUpdated(event) {
    try {
      console.log(`\n[${this.serviceName}] ========== EVENT RECEIVED ==========`);
      console.log(`[${this.serviceName}] Event: ${event.eventName}`);
      console.log(`[${this.serviceName}] Processing notification for student update...`);
      
      // Prepare student data for email
      const studentData = {
        fullName: event.metadata.fullName,
        email: event.metadata.email,
        studentId: event.metadata.studentId
      };
      
      const updatedFields = event.metadata.updatedFields || [];
      
      console.log(`[${this.serviceName}] Sending update notification to ${event.metadata.email}...`);
      
      // Send real email using emailService
      try {
        const result = await emailService.sendUpdateNotification(studentData, updatedFields);
        
        if (result.success) {
          console.log(`[${this.serviceName}] ✓ Update notification sent to ${event.metadata.email}`);
          console.log(`[${this.serviceName}] Updated fields: ${updatedFields.join(', ')}`);
          console.log(`[${this.serviceName}] Email Message ID: ${result.messageId}`);
        }
      } catch (emailError) {
        // If email fails, log but don't crash the service
        console.error(`[${this.serviceName}] ✗ Failed to send update notification:`, emailError.message);
        console.log(`[${this.serviceName}] ⚠️  Email service unavailable, but event processing continues`);
        
        // Fallback: At least log what would have been sent
        console.log(`[${this.serviceName}] [FALLBACK] Would have sent update notification to ${event.metadata.email}`);
        console.log(`[${this.serviceName}] [FALLBACK] Updated fields: ${updatedFields.join(', ')}`);
      }
      
      console.log(`[${this.serviceName}] ========================================\n`);
      
    } catch (error) {
      console.error(`[${this.serviceName}] ✗ Error processing event:`, error.message);
    }
  }
}

// Export singleton instance
module.exports = new NotificationService();