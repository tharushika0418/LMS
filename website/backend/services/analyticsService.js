const eventBus = require('../utils/eventBus');

class AnalyticsService {
  constructor() {
    this.serviceName = 'AnalyticsService';
    this.statistics = {
      totalStudentsRegistered: 0,
      totalStudentsUpdated: 0,
      departmentCounts: {},
      lastProcessedEvent: null
    };
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
      console.log(`[${this.serviceName}] Processing analytics data...`);
      
      // Simulate analytics processing delay
      await this.delay(1500);
      
      // Update statistics
      this.statistics.totalStudentsRegistered++;
      
      const department = event.metadata.department;
      if (!this.statistics.departmentCounts[department]) {
        this.statistics.departmentCounts[department] = 0;
      }
      this.statistics.departmentCounts[department]++;
      
      this.statistics.lastProcessedEvent = {
        eventName: event.eventName,
        timestamp: event.timestamp,
        entityId: event.entityId
      };
      
      console.log(`[${this.serviceName}] ✓ Analytics updated successfully`);
      console.log(`[${this.serviceName}] Total registered: ${this.statistics.totalStudentsRegistered}`);
      console.log(`[${this.serviceName}] Department: ${department} (${this.statistics.departmentCounts[department]} students)`);
      console.log(`[${this.serviceName}] ========================================\n`);
      
    } catch (error) {
      console.error(`[${this.serviceName}] ✗ Error processing event:`, error.message);
    }
  }

  async handleStudentUpdated(event) {
    try {
      console.log(`\n[${this.serviceName}] ========== EVENT RECEIVED ==========`);
      console.log(`[${this.serviceName}] Event: ${event.eventName}`);
      console.log(`[${this.serviceName}] Recording update in analytics...`);
      
      await this.delay(1000);
      
      this.statistics.totalStudentsUpdated++;
      
      console.log(`[${this.serviceName}] ✓ Update recorded in analytics`);
      console.log(`[${this.serviceName}] Total updates: ${this.statistics.totalStudentsUpdated}`);
      console.log(`[${this.serviceName}] ========================================\n`);
      
    } catch (error) {
      console.error(`[${this.serviceName}] ✗ Error processing event:`, error.message);
    }
  }

  // Get current statistics
  getStatistics() {
    return this.statistics;
  }

  // Utility function to simulate async operations
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
module.exports = new AnalyticsService();