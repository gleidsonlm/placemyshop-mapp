import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useAppdomeEvents } from '../hooks/useAppdomeEvents';
import ThreatEventCard from './ThreatEventCard';
import { ThreatEvent } from '../../types';

const ThreatEventsList: React.FC = () => {
  const { events, isLoading, error, refresh } = useAppdomeEvents();

  if (isLoading && !events.length) { // Show full screen loader only on initial load
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Error: {error}</Text>
        {/* Optionally, add a retry button that calls refresh */}
      </View>
    );
  }

  if (!events.length) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>No threat events detected.</Text>
        {/* Optionally, add a manual refresh button here too */}
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      renderItem={({ item }: { item: ThreatEvent }) => <ThreatEventCard event={item} />}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContentContainer}
      refreshControl={
        <RefreshControl
          refreshing={isLoading} // Show refresh indicator when isLoading is true
          onRefresh={refresh}
          tintColor="#007AFF" // iOS spinner color
          colors={["#007AFF"]} // Android spinner colors
        />
      }
      // Basic Virtualization Props (FlatList handles most of this by default)
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={21} // Default is 21, should be fine
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  listContentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ThreatEventsList;
