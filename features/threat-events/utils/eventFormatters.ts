import { ThreatEventType } from '../../types'; // Adjust path if necessary

/**
 * Provides a human-readable description for a given threat event type.
 * @param type - The type of the threat event.
 * @returns A string describing the event, or a generic message if the type is unknown.
 */
export const getEventDescription = (type: ThreatEventType): string => {
  const descriptions: Record<ThreatEventType, string> = {
    RootedDevice: 'Device integrity compromised: Root access has been detected. This could allow unauthorized actions.',
    UnknownSourcesEnabled: 'Security risk: Installation of applications from unknown sources is enabled. Only install apps from trusted stores.',
    DeveloperOptionsEnabled: 'Potential risk: Developer options are enabled on this device. These settings are intended for development purposes only.',
    SslCertificateValidationFailed: 'Network security warning: SSL certificate validation failed for a connection. This could indicate a man-in-the-middle attack.',
    SslNonSslConnection: 'Network security risk: Application attempted to establish a non-SSL connection to a host configured for SSL.',
    SslIncompatibleVersion: 'Network security risk: SSL connection failed due to an incompatible SSL/TLS version.',
    NetworkProxyConfigured: 'Network warning: A network proxy is configured. All network traffic may be routed through this proxy.',
    DebuggerThreatDetected: 'Security risk: A debugger is attached to the application. This could be used to inspect or modify app behavior.',
    AppIsDebuggable: 'Security configuration warning: The application is currently debuggable. This should be disabled in production builds.',
    AppIntegrityError: 'Application integrity compromised: The application code or its resources may have been tampered with.',
    EmulatorFound: 'Informational: Application is running in an emulated environment. Some functionalities might behave differently.',
    GoogleEmulatorDetected: 'Informational: Application is running on a Google-provided emulator.',
    // Add any new event types here with their descriptions
  };

  return descriptions[type] || `Unknown event type: ${type}`;
};

// Example of another potential formatter (not required by current plan but good for structure)
/**
 * Formats a timestamp into a more readable string.
 * @param timestamp - The ISO string or Date object.
 * @returns A formatted date-time string.
 */
// export const formatTimestamp = (timestamp: string | Date): string => {
//   return new Date(timestamp).toLocaleString();
// };
