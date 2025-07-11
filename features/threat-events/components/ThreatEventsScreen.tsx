import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import ThreatEventsList from './ThreatEventsList'; // Import the new list component

interface ThreatEventsScreenProps {
  onClose?: () => void; // Optional onClose prop
}

const ThreatEventsScreen: React.FC<ThreatEventsScreenProps> = ({ onClose }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {onClose && (
          <View style={styles.header}>
            <Text style={styles.title}>Threat Events</Text>
            <Button title="Close" onPress={onClose} />
          </View>
        )}
        {!onClose && <Text style={styles.title}>Threat Events</Text>}

        <ThreatEventsList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    // If no close button, title might not need specific styling for layout,
    // but keeping it for consistency if header is used.
    // Remove marginBottom from here if header is always present.
    marginBottom: 16, // Add back if header is not always present.
  },
  // Removed subtitle, card, cardTitle, emptyText styles as they are now handled
  // by ThreatEventsList and ThreatEventCard
});

export default ThreatEventsScreen;
