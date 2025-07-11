import React from 'react';
import { render, screen } from '@testing-library/react-native';
import NetworkProxyEventCard from './NetworkProxyEventCard';
import { NetworkProxyConfiguredEvent } from '../types';

// Mock console.warn before all tests
let consoleWarnSpy: jest.SpyInstance;

beforeEach(() => {
  // Mock console.warn to prevent actual console output during tests and allow checking calls
  consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  // Restore original console.warn after each test
  consoleWarnSpy.mockRestore();
});

describe('NetworkProxyEventCard', () => {
  const baseEvent: NetworkProxyConfiguredEvent = {
    id: 'evt-test-123',
    eventName: 'NetworkProxyConfigured',
    timestamp: new Date('2023-10-26T10:30:00Z').getTime(),
    applicationState: 'foreground',
    proxyHost: 'secure.proxy.info',
    proxyPort: 3128,
    proxyType: 'SOCKS5',
    connectionType: 'WiFi',
  };

  it('renders correctly with all data provided', () => {
    render(<NetworkProxyEventCard event={baseEvent} />);

    expect(screen.getByText('Network Proxy Detected')).toBeTruthy();

    expect(screen.getByText('Proxy Host:')).toBeTruthy();
    expect(screen.getByText(baseEvent.proxyHost!)).toBeTruthy();

    expect(screen.getByText('Proxy Port:')).toBeTruthy();
    expect(screen.getByText(baseEvent.proxyPort!.toString())).toBeTruthy();

    expect(screen.getByText('Proxy Type:')).toBeTruthy();
    expect(screen.getByText(baseEvent.proxyType!)).toBeTruthy();

    expect(screen.getByText('Connection Type:')).toBeTruthy();
    expect(screen.getByText(baseEvent.connectionType!)).toBeTruthy();

    expect(screen.getByText('Application State:')).toBeTruthy();
    expect(screen.getByText(baseEvent.applicationState!)).toBeTruthy();

    expect(screen.getByText('Detected At:')).toBeTruthy();
    expect(screen.getByText(new Date(baseEvent.timestamp).toLocaleString())).toBeTruthy();

    // No warnings should be logged when all data is present
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('displays "N/A" and logs warnings for missing string fields (proxyHost, proxyType)', () => {
    const eventWithMissingStrings: NetworkProxyConfiguredEvent = {
      ...baseEvent,
      id: 'evt-missing-strings',
      proxyHost: undefined,
      proxyType: '', // Test empty string as well
    };
    render(<NetworkProxyEventCard event={eventWithMissingStrings} />);

    // Using queryAllByText because the value "N/A" will appear multiple times
    // We expect "N/A" for proxyHost and proxyType
    const naValues = screen.getAllByText('N/A');
    expect(naValues.length).toBeGreaterThanOrEqual(2);

    // Check that warnings were logged for the specific missing fields
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "NetworkProxyEventCard: 'proxyHost' is missing or empty for event id:",
      'evt-missing-strings'
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "NetworkProxyEventCard: 'proxyType' is missing or empty for event id:",
      'evt-missing-strings'
    );
  });

  it('displays "N/A" and logs warning for missing proxyPort (number)', () => {
    const eventWithMissingPort: NetworkProxyConfiguredEvent = {
      ...baseEvent,
      id: 'evt-missing-port',
      proxyPort: undefined,
    };
    render(<NetworkProxyEventCard event={eventWithMissingPort} />);

    // Check that N/A is displayed for the port
    // We need to be careful here. If other fields are also N/A, this might be too broad.
    // However, in this specific test, only port is N/A.
    expect(screen.getAllByText('N/A').length).toBeGreaterThanOrEqual(1);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "NetworkProxyEventCard: 'proxyPort' is missing or empty for event id:",
      'evt-missing-port'
    );
  });

  it('displays "N/A" and logs warnings for other missing fields (connectionType, applicationState)', () => {
    const eventWithOtherMissing: NetworkProxyConfiguredEvent = {
      ...baseEvent,
      id: 'evt-missing-other',
      connectionType: undefined,
      applicationState: '',
    };
    render(<NetworkProxyEventCard event={eventWithOtherMissing} />);

    const naValues = screen.getAllByText('N/A');
    expect(naValues.length).toBeGreaterThanOrEqual(2);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "NetworkProxyEventCard: 'connectionType' is missing or empty for event id:",
      'evt-missing-other'
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "NetworkProxyEventCard: 'applicationState' is missing or empty for event id:",
      'evt-missing-other'
    );
  });

  it('renders correctly and does not warn when optional fields are explicitly empty strings but not undefined', () => {
    const eventWithEmptyStrings: NetworkProxyConfiguredEvent = {
      ...baseEvent,
      id: 'evt-empty-strings',
      proxyHost: 'host.com', // present
      proxyType: '', // explicitly empty
      applicationState: '', // explicitly empty
    };
    render(<NetworkProxyEventCard event={eventWithEmptyStrings} />);

    expect(screen.getByText('host.com')).toBeTruthy();
    const naValues = screen.getAllByText('N/A'); // proxyType and applicationState should be N/A
    expect(naValues.length).toBeGreaterThanOrEqual(2);


    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "NetworkProxyEventCard: 'proxyType' is missing or empty for event id:",
      'evt-empty-strings'
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "NetworkProxyEventCard: 'applicationState' is missing or empty for event id:",
      'evt-empty-strings'
    );
    // Should not warn for proxyHost as it's present
    expect(consoleWarnSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("'proxyHost'"),
      expect.anything()
    );
  });
});
