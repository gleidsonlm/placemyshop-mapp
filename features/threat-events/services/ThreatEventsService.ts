import { BaseThreatEvent, NetworkProxyConfiguredEvent } from '../types/index';

export class ThreatEventsService {
  private events: BaseThreatEvent[] = [];
  private nextId = 1;

  constructor() {
    // Initialize with some sample data
    this.events.push({
      id: `evt-${this.nextId++}`,
      eventName: 'NetworkProxyConfigured',
      timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
      applicationState: 'foreground',
      proxyHost: 'proxy.example.com',
      proxyPort: 8080,
      proxyType: 'HTTP',
      connectionType: 'WiFi',
    } as NetworkProxyConfiguredEvent);

    this.events.push({
      id: `evt-${this.nextId++}`,
      eventName: 'NetworkProxyConfigured',
      timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
      applicationState: 'background',
      proxyHost: 'secproxy.example.net',
      proxyPort: 3128,
      proxyType: 'SOCKS',
      connectionType: 'Cellular',
    } as NetworkProxyConfiguredEvent);

    this.events.push({
      id: `evt-${this.nextId++}`,
      eventName: 'NetworkProxyConfigured',
      timestamp: Date.now() - 1000 * 60 * 5, // 5 mins ago
      applicationState: 'foreground',
      proxyHost: 'another.proxy.org',
      proxyPort: 1080,
      proxyType: 'HTTP',
      connectionType: 'WiFi',
    } as NetworkProxyConfiguredEvent);
  }

  async getAllEvents(): Promise<BaseThreatEvent[]> {
    // Return a copy to prevent direct modification of the internal array
    return [...this.events];
  }

  async simulateNetworkProxyConfiguredEvent(
    eventDetails: Omit<NetworkProxyConfiguredEvent, 'id' | 'eventName' | 'timestamp'>
  ): Promise<NetworkProxyConfiguredEvent> {
    const newEvent: NetworkProxyConfiguredEvent = {
      id: `evt-${this.nextId++}`,
      eventName: 'NetworkProxyConfigured',
      timestamp: Date.now(),
      ...eventDetails,
    };
    this.events.push(newEvent);
    return newEvent;
  }
}

// Export a singleton instance
export const threatEventsService = new ThreatEventsService();
