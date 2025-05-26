import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, ActivityIndicator, Text, Chip, Snackbar } from 'react-native-paper';
import { transportService } from '../utils/apiService';
import { mockTransportOptions } from '../utils/mockData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
  const [transportOptions, setTransportOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [error, setError] = useState(null);

  const fetchTransportOptions = async () => {
    try {
      const data = await transportService.getTransportOptions();
      setTransportOptions(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching transport options:', error);
      // Use mock data as fallback
      setTransportOptions(mockTransportOptions);
      setError('Using offline data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTransportOptions();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTransportOptions();
  };

  const filteredOptions = selectedType === 'all'
    ? transportOptions
    : transportOptions.filter(option => option.type === selectedType);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip
            selected={selectedType === 'all'}
            onPress={() => setSelectedType('all')}
            style={styles.chip}
            icon="apps"
          >
            All
          </Chip>
          <Chip
            selected={selectedType === 'Bus'}
            onPress={() => setSelectedType('Bus')}
            style={styles.chip}
            icon="bus"
          >
            Bus
          </Chip>
          <Chip
            selected={selectedType === 'Moto'}
            onPress={() => setSelectedType('Moto')}
            style={styles.chip}
            icon="motorbike"
          >
            Moto
          </Chip>
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredOptions.map((option) => (
          <Card key={option.id} style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Icon
                  name={option.type === 'Bus' ? 'bus' : 'motorbike'}
                  size={24}
                  color="#2563eb"
                />
                <Title style={styles.routeTitle}>{option.route}</Title>
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Icon name="clock-outline" size={20} color="#666" />
                  <Text style={styles.detailText}>{option.estimatedTime}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="currency-usd" size={20} color="#666" />
                  <Text style={styles.detailText}>{option.fare}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="calendar-clock" size={20} color="#666" />
                  <Text style={styles.detailText}>{option.schedule}</Text>
                </View>
              </View>

              <View style={styles.stopsContainer}>
                <Text style={styles.stopsLabel}>Stops:</Text>
                <View style={styles.stopsList}>
                  {option.stops.map((stop, index) => (
                    <View key={index} style={styles.stopItem}>
                      <Icon name="map-marker" size={16} color="#666" />
                      <Text style={styles.stopText}>{stop}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('BookRide', { transport: option })}
                style={styles.bookButton}
              >
                Book Now
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="alert"
        onPress={() => navigation.navigate('Emergency')}
        label="Emergency"
      />

      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        duration={3000}
        style={styles.snackbar}
      >
        {error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  chip: {
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginTop: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeTitle: {
    marginLeft: 8,
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    color: '#333',
  },
  stopsContainer: {
    marginTop: 8,
  },
  stopsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#666',
  },
  stopsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  stopText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  bookButton: {
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#ff4444',
  },
  snackbar: {
    backgroundColor: '#666',
  },
});

export default HomeScreen;