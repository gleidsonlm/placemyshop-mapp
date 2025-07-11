import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThreatEvent } from '../../types'; // Ensure this path is correct

interface ThreatEventCardProps {
  event: ThreatEvent;
}

const ThreatEventCard: React.FC<ThreatEventCardProps> = ({ event }) => {
  const renderDetail = (label: string, value: string | number | boolean | undefined | null) => {
    const displayValue = value !== undefined && value !== '' ? String(value) : 'N/A';
    return (
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{displayValue}</Text>
      </View>
    );
  };

  // Extract common properties
  const { id, type, timestamp, isActive, description, ...otherDetails } = event;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.iconPlaceholder}>[ICON]</Text>
        <Text style={styles.title}>{type.replace(/([A-Z])/g, ' $1').trim()} </Text> {/* Format type for display */}
      </View>

      {description && renderDetail('Description:', description)}
      {renderDetail('Status:', isActive ? 'Active' : 'Resolved')}
      {renderDetail('Timestamp:', new Date(timestamp).toLocaleString())}
      {renderDetail('Event ID:', id)}

      {Object.keys(otherDetails).length > 0 && (
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Additional Details:</Text>
          {Object.entries(otherDetails).map(([key, value]) => {
            // Simple camelCase to Title Case formatter for keys
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            let displayValue: string | number | boolean | undefined | null;
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null || value === undefined) {
              displayValue = value;
            } else {
              displayValue = String(value); // Convert other unknown types to string
            }
            return renderDetail(formattedKey + ':', displayValue);
          })}
        </View>
      )}
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
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconPlaceholder: {
    fontSize: 20,
    marginRight: 8,
    // In a real app, this would be an <Icon /> component
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#c0392b', // Keeping the alert-like color
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    marginRight: 8,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
    flexShrink: 1,
  },
  detailsSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  }
});

export default ThreatEventCard;
