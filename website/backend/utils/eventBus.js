const EventEmitter = require('events');

class EventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(20); // Increase listener limit
  }

  // Publish an event
  publish(eventName, eventData) {
    console.log(`[EventBus] Publishing event: ${eventName}`);
    console.log(`[EventBus] Event data:`, JSON.stringify(eventData, null, 2));
    this.emit(eventName, eventData);
  }

  // Subscribe to an event
  subscribe(eventName, handler) {
    console.log(`[EventBus] New subscriber registered for: ${eventName}`);
    this.on(eventName, handler);
  }
}

// Singleton instance
const eventBus = new EventBus();

module.exports = eventBus;