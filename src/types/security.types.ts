// src/types/security.types.ts
/**
 * Defines the types of threat events that can be detected.
 */
export type ThreatEventType =
  | 'RootedDevice'
  | 'UnknownSourcesEnabled'
  | 'DeveloperOptionsEnabled'
  | 'SslCertificateValidationFailed'
  | 'SslNonSslConnection'
  | 'SslIncompatibleVersion'
  | 'NetworkProxyConfigured' // Ensure this existing type is included
  | 'DebuggerThreatDetected'
  | 'AppIsDebuggable'
  | 'AppIntegrityError'
  | 'EmulatorFound'
  | 'GoogleEmulatorDetected';

/**
 * Represents a detected threat event.
 */
export interface ThreatEvent {
  /** Unique identifier for the event. */
  id: string;
  /** The type of threat event. */
  type: ThreatEventType;
  /** ISO 8601 timestamp of when the event occurred. */
  timestamp: string;
  /** Indicates if the event is currently active or has been resolved. */
  isActive: boolean;
  /** Optional description providing more details about the event. */
  description?: string;
  /** Additional properties specific to certain event types. */
  [key: string]: any; // For event-specific properties like proxyHost, proxyPort
}
