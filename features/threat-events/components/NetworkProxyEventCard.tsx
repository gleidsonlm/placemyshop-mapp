import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NetworkProxyConfiguredEvent } from '../types';

interface NetworkProxyEventCardProps {
  event: NetworkProxyConfiguredEvent;
}

const NetworkProxyEventCard: React.FC<NetworkProxyEventCardProps> = ({ event }) => {
  // Helper function to render a detail row and handle missing values
  const renderDetail = (label: string, value: string | number | undefined, originalKey: keyof NetworkProxyConfiguredEvent) => {
    const displayValue = value !== undefined && value !== '' ? value : 'N/A';
    if (value === undefined || value === '') {
        // Basic error logging for debugging
        console.warn(`NetworkProxyEventCard: '${originalKey}' is missing or empty for event id: ${event.id}`);
    }
    return (
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{displayValue}</Text>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Network Proxy Detected</Text>
      {renderDetail('Proxy Host:', event.proxyHost, 'proxyHost')}
      {renderDetail('Proxy Port:', event.proxyPort, 'proxyPort')}
      {renderDetail('Proxy Type:', event.proxyType, 'proxyType')}
      {renderDetail('Connection Type:', event.connectionType, 'connectionType')}
      {renderDetail('Application State:', event.applicationState, 'applicationState')}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Detected At:</Text>
        <Text style={styles.detailValue}>{new Date(event.timestamp).toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android
  },
  title: {
    fontSize: 17, // Slightly larger title
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#c0392b', // A reddish color for emphasis, like an alert
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, // Increased spacing
    alignItems: 'flex-start', // Align items to start for potentially long values
  },
  detailLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500', // Medium weight for labels
    marginRight: 8, // Add some space between label and value
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
    flexShrink: 1, // Allow value to shrink if needed, preventing overflow
  },
});

export default NetworkProxyEventCard;
