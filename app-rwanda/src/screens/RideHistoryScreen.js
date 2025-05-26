import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Chip, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rideHistory } from '../utils/mockData';
import { useNavigation } from '@react-navigation/native';

const RideHistoryScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigation = useNavigation();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const storedBookings = await AsyncStorage.getItem('bookings');
      const loadedBookings = storedBookings ? JSON.parse(storedBookings) : [];
      setBookings([...loadedBookings, ...rideHistory]);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const filterBookings = () => {
    if (filter === 'all') return bookings;
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate >= sevenDaysAgo;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-RW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Chip
          selected={filter === 'all'}
          onPress={() => setFilter('all')}
          style={styles.chip}
        >
          All Rides
        </Chip>
        <Chip
          selected={filter === 'week'}
          onPress={() => setFilter('week')}
          style={styles.chip}
        >
          Last 7 Days
        </Chip>
      </View>

      <ScrollView style={styles.scrollView}>
        {filterBookings().map((booking) => (
          <Card key={booking.id} style={styles.card}>
            <Card.Content>
              <Title>{booking.transport?.route || booking.route}</Title>
              <Paragraph>Date: {formatDate(booking.date)}</Paragraph>
              <Paragraph>Fare: {booking.transport?.fare || booking.fare}</Paragraph>
              <Paragraph>Status: {booking.status}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="outlined"
                onPress={() => navigation.navigate('Feedback', { rideId: booking.id })}
              >
                Give Feedback
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  chip: {
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
});

export default RideHistoryScreen;