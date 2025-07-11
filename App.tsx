import { StatusBar } from 'expo-status-bar';
import React from 'react';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ThreatEventsScreen from './features/threat-events/components/ThreatEventsScreen';

export default function App() {
  const [showThreatEvents, setShowThreatEvents] = useState(false);

  if (showThreatEvents) {
    return <ThreatEventsScreen onClose={() => setShowThreatEvents(false)} />;
  }

  return (
    <View style={styles.container}>
      <Text>Hello World of Expo!</Text>
      <Button title="Show Threat Events" onPress={() => setShowThreatEvents(true)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
