const eventBus = require('../utils/eventBus');

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
      
      // Simulate email sending delay (asynchronous operation)
      console.log(`[${this.serviceName}] Sending welcome email to ${event.metadata.email}...`);
      await this.delay(2000); // Simulate 2 second email sending
      
      console.log(`[${this.serviceName}] ✓ Welcome email sent to ${event.metadata.fullName}`);
      console.log(`[${this.serviceName}] Email content: Welcome to ${event.metadata.department}!`);
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
      
      await this.delay(1000);
      
      console.log(`[${this.serviceName}] ✓ Update notification sent to ${event.metadata.email}`);
      console.log(`[${this.serviceName}] Updated fields: ${event.metadata.updatedFields.join(', ')}`);
      console.log(`[${this.serviceName}] ========================================\n`);
      
    } catch (error) {
      console.error(`[${this.serviceName}] ✗ Error processing event:`, error.message);
    }
  }

  // Utility function to simulate async operations
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
module.exports = new NotificationService();