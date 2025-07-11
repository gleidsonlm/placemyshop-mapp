import { useState, useEffect, useCallback } from 'react';
import { ThreatEvent } from '../../types'; // Adjust path if necessary

// Placeholder for actual Appdome SDK/API interaction
const appdomeApi = {
  subscribeToEvents: (_callback: (event: ThreatEvent) => void) => {
    // Simulate receiving events periodically
    const intervalId = setInterval(() => {
      // This is just a placeholder for a real subscription.
      // In a real scenario, Appdome SDK would push events here.
      // For now, we're not dynamically adding events via this subscriber
      // but relying on the initial fetch/refresh.
    }, 5000);
    return () => clearInterval(intervalId); // Cleanup function
  },
  fetchInitialEvents: async (): Promise<ThreatEvent[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockEvents: ThreatEvent[] = [
          {
            id: 'evt-mock-1',
            type: 'RootedDevice',
            timestamp: new Date(Date.now() - 1000 * 60 * Math.random() * 60).toISOString(),
            isActive: true,
            description: 'Device has superuser access enabled.',
          },
          {
            id: 'evt-mock-2',
            type: 'NetworkProxyConfigured',
            timestamp: new Date(Date.now() - 1000 * 60 * Math.random() * 120).toISOString(),
            isActive: true,
            proxyHost: '192.168.1.100',
            proxyPort: 8888,
            description: 'Network proxy is configured, potentially intercepting traffic.',
          },
          {
            id: 'evt-mock-3',
            type: 'DeveloperOptionsEnabled',
            timestamp: new Date(Date.now() - 1000 * 60 * Math.random() * 30).toISOString(),
            isActive: true,
            description: 'Developer options are enabled on this device.',
          },
          {
            id: 'evt-mock-4',
            type: 'SslCertificateValidationFailed',
            timestamp: new Date(Date.now() - 1000 * 60 * Math.random() * 10).toISOString(),
            isActive: true,
            description: 'An SSL certificate validation failed for a connection.',
          },
          {
            id: 'evt-mock-5',
            type: 'EmulatorFound',
            timestamp: new Date(Date.now() - 1000 * 60 * Math.random() * 240).toISOString(),
            isActive: false, // Example of an inactive/resolved event
            description: 'Application is running on an emulator environment.',
          },
        ];
        resolve(mockEvents);
      }, 1000);
    });
  },
};

export const useAppdomeEvents = () => {
  const [events, setEvents] = useState<ThreatEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedEvents = await appdomeApi.fetchInitialEvents();
      setEvents(fetchedEvents);
    } catch (e) {
      setError('Failed to fetch threat events.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();

    // Subscribe to live Appdome events
    // const unsubscribe = appdomeApi.subscribeToEvents((newEvent) => {
    //   setEvents((prevEvents) => {
    //     // Avoid duplicates and potentially update existing events
    //     const eventExists = prevEvents.find(e => e.id === newEvent.id);
    //     if (eventExists) {
    //       return prevEvents.map(e => e.id === newEvent.id ? newEvent : e);
    //     }
    //     return [newEvent, ...prevEvents];
    //   });
    // });

    // Cleanup subscription on unmount
    // return () => {
    //   unsubscribe();
    // };
  }, [fetchEvents]); // fetchEvents is wrapped in useCallback

  const refresh = useCallback(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    isLoading,
    error,
    refresh,
  };
};
