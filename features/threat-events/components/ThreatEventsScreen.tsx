import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Button } from 'react-native'; // Add Button
import { threatEventsService } from '../services/ThreatEventsService';
import { BaseThreatEvent, NetworkProxyConfiguredEvent } from '../types/index';
import ThreatEventCard from './ThreatEventCard'; // Import the actual component

// Placeholder for NetworkProxyEventCard - REMOVE THIS ONCE THE ACTUAL COMPONENT IS CREATED
// const NetworkProxyEventCard = (props: { event: NetworkProxyConfiguredEvent }) => (
//     <View style={styles.card}>
//         <Text style={styles.cardTitle}>Network Proxy Detected</Text>
//         <Text>Host: {props.event.proxyHost}</Text>
//         <Text>Port: {props.event.proxyPort}</Text>
//         <Text>Type: {props.event.proxyType}</Text>
//         <Text>Connection: {props.event.connectionType}</Text>
//         <Text>State: {props.event.applicationState}</Text>
//         <Text>Timestamp: {new Date(props.event.timestamp).toLocaleString()}</Text>
//     </View>
// );
// END Placeholder

// Define props for ThreatEventsScreen
interface ThreatEventsScreenProps {
  onClose?: () => void; // Optional onClose prop
}

const ThreatEventsScreen: React.FC<ThreatEventsScreenProps> = ({ onClose }) => {
  const [networkProxyEvents, setNetworkProxyEvents] = useState<NetworkProxyConfiguredEvent[]>([]);
  const [otherEvents, setOtherEvents] = useState<BaseThreatEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await threatEventsService.getAllEvents();
      const proxyEvents = allEvents.filter(
        (event): event is NetworkProxyConfiguredEvent => event.eventName === 'NetworkProxyConfigured'
      );
      const restEvents = allEvents.filter(
        event => event.eventName !== 'NetworkProxyConfigured'
      );
      setNetworkProxyEvents(proxyEvents);
      setOtherEvents(restEvents);
    };

    fetchEvents();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {onClose && <Button title="Close" onPress={onClose} />}
        <Text style={styles.title}>Threat Events</Text>

        <Text style={styles.subtitle}>Network Proxy Detected</Text>
        {networkProxyEvents.length > 0 ? (
          <FlatList
            data={networkProxyEvents}
            renderItem={({ item }) => <ThreatEventCard event={item} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={styles.emptyText}>No network proxy events detected.</Text>
        )}


        <Text style={styles.subtitle}>Other Security Events</Text>
        {otherEvents.length > 0 ? (
           <FlatList
            data={otherEvents}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.eventName}</Text>
                <Text>Timestamp: {new Date(item.timestamp).toLocaleString()}</Text>
                <Text>State: {item.applicationState}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={styles.emptyText}>No other security events.</Text>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#777',
    marginTop: 8,
  }
});

export default ThreatEventsScreen;
