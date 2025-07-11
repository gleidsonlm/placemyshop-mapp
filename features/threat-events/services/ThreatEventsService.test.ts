import { threatEventsService, ThreatEventsService } from './ThreatEventsService';
import { NetworkProxyConfiguredEvent, BaseThreatEvent } from '../types';

describe('ThreatEventsService', () => {
  let serviceInstance: ThreatEventsService;

  // Initial sample data count from the service constructor
  const initialSampleEventsCount = 3;

  beforeEach(() => {
    // Create a new instance for each test to ensure isolation.
    // This resets the state, including the 'nextId' counter and initial events.
    serviceInstance = new ThreatEventsService();
  });

  it('singleton threatEventsService should be an instance of ThreatEventsService', () => {
    expect(threatEventsService).toBeInstanceOf(ThreatEventsService);
  });

  it('serviceInstance used for testing should be a fresh instance of ThreatEventsService', () => {
    expect(serviceInstance).toBeInstanceOf(ThreatEventsService);
  });

  describe('getAllEvents', () => {
    it('should return an array', async () => {
      const events = await serviceInstance.getAllEvents();
      expect(Array.isArray(events)).toBe(true);
    });

    it('should return initial sample events correctly', async () => {
      const events = await serviceInstance.getAllEvents();
      expect(events.length).toBe(initialSampleEventsCount);
      // Check some properties of the first sample event
      expect(events[0].eventName).toBe('NetworkProxyConfigured');
      expect(events[0].id).toBe('evt-1'); // Assuming the ID generation starts with 'evt-1'
      const event0 = events[0] as NetworkProxyConfiguredEvent;
      expect(event0.proxyHost).toBe('proxy.example.com');
    });

    it('should return a copy of the events array, not the original', async () => {
      const events1 = await serviceInstance.getAllEvents();
      expect(events1.length).toBe(initialSampleEventsCount);

      // Try to modify the returned array
      events1.push({
        id: 'temp-id',
        eventName: 'TestEvent',
        timestamp: Date.now(),
        applicationState: 'test',
      } as BaseThreatEvent);

      const events2 = await serviceInstance.getAllEvents();
      // The internal array should remain unchanged
      expect(events2.length).toBe(initialSampleEventsCount);
      // And it should not contain the event we pushed to events1
      expect(events2.find(e => e.id === 'temp-id')).toBeUndefined();
    });
  });

  describe('simulateNetworkProxyConfiguredEvent', () => {
    const eventDetails = {
      proxyHost: 'test.proxy.com',
      proxyPort: 8888,
      proxyType: 'SOCKS5',
      connectionType: 'Cellular',
      applicationState: 'background',
    };

    it('should add a new event to the service internal list', async () => {
      const initialEvents = await serviceInstance.getAllEvents();
      expect(initialEvents.length).toBe(initialSampleEventsCount);

      await serviceInstance.simulateNetworkProxyConfiguredEvent(eventDetails);

      const updatedEvents = await serviceInstance.getAllEvents();
      expect(updatedEvents.length).toBe(initialSampleEventsCount + 1);
    });

    it('should return the newly created event with correct details', async () => {
      const newEvent = await serviceInstance.simulateNetworkProxyConfiguredEvent(eventDetails);

      expect(newEvent).toBeDefined();
      expect(newEvent.eventName).toBe('NetworkProxyConfigured');
      expect(newEvent.proxyHost).toBe(eventDetails.proxyHost);
      expect(newEvent.proxyPort).toBe(eventDetails.proxyPort);
      expect(newEvent.proxyType).toBe(eventDetails.proxyType);
      expect(newEvent.connectionType).toBe(eventDetails.connectionType);
      expect(newEvent.applicationState).toBe(eventDetails.applicationState);
    });

    it('should generate a unique id for the new event', async () => {
      const newEvent = await serviceInstance.simulateNetworkProxyConfiguredEvent(eventDetails);
      expect(newEvent.id).toBeDefined();
      expect(newEvent.id).not.toBeNull();
      // Assuming IDs start with 'evt-' and initial events are evt-1, evt-2, evt-3
      // so the new one should be evt-4
      expect(newEvent.id).toBe(`evt-${initialSampleEventsCount + 1}`);
    });

    it('should generate a timestamp for the new event', async () => {
      const beforeTimestamp = Date.now();
      const newEvent = await serviceInstance.simulateNetworkProxyConfiguredEvent(eventDetails);
      const afterTimestamp = Date.now();

      expect(newEvent.timestamp).toBeDefined();
      expect(newEvent.timestamp).toBeGreaterThanOrEqual(beforeTimestamp);
      expect(newEvent.timestamp).toBeLessThanOrEqual(afterTimestamp);
    });

    it('should correctly add multiple events with unique IDs', async () => {
      const event1 = await serviceInstance.simulateNetworkProxyConfiguredEvent(eventDetails);
      const event2Details = {
        proxyHost: 'another.proxy.org',
        proxyPort: 9090,
        proxyType: 'HTTP',
        connectionType: 'WiFi',
        applicationState: 'foreground',
      };
      const event2 = await serviceInstance.simulateNetworkProxyConfiguredEvent(event2Details);

      expect(event1.id).not.toBe(event2.id);
      expect(event1.id).toBe(`evt-${initialSampleEventsCount + 1}`);
      expect(event2.id).toBe(`evt-${initialSampleEventsCount + 2}`);

      const allEvents = await serviceInstance.getAllEvents();
      expect(allEvents.length).toBe(initialSampleEventsCount + 2);
      expect(allEvents.find(e => e.id === event1.id)).toEqual(event1);
      expect(allEvents.find(e => e.id === event2.id)).toEqual(event2);
    });
  });
});
