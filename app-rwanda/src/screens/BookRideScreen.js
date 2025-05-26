import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Text, TextInput, Portal, Modal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { transportService } from '../utils/apiService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BookRideScreen = ({ route, navigation }) => {
  const { transport } = route.params;
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [departureTime, setDepartureTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [bookingId] = useState(Math.random().toString(36).substr(2, 9));

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setDepartureTime(selectedTime);
    }
  };

  const handleBooking = async () => {
    try {
      const booking = {
        id: bookingId,
        transport,
        departureTime: departureTime.toISOString(),
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
      };

      await transportService.bookRide(booking);
      setBookingConfirmed(true);
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (bookingConfirmed) {
    return (
      <ScrollView style={styles.container}>
        <Card style={styles.ticketCard}>
          <Card.Content>
            <View style={styles.ticketHeader}>
              <Icon name="ticket-confirmation" size={40} color="#2563eb" />
              <Title style={styles.ticketTitle}>Booking Confirmed!</Title>
            </View>

            <View style={styles.ticketContent}>
              <View style={styles.ticketRow}>
                <Icon name="bus" size={24} color="#666" />
                <View style={styles.ticketInfo}>
                  <Text style={styles.ticketLabel}>Route</Text>
                  <Text style={styles.ticketValue}>{transport.route}</Text>
                </View>
              </View>

              <View style={styles.ticketRow}>
                <Icon name="clock-outline" size={24} color="#666" />
                <View style={styles.ticketInfo}>
                  <Text style={styles.ticketLabel}>Departure Time</Text>
                  <Text style={styles.ticketValue}>{formatTime(departureTime)}</Text>
                </View>
              </View>

              <View style={styles.ticketRow}>
                <Icon name="currency-usd" size={24} color="#666" />
                <View style={styles.ticketInfo}>
                  <Text style={styles.ticketLabel}>Fare</Text>
                  <Text style={styles.ticketValue}>{transport.fare}</Text>
                </View>
              </View>

              <View style={styles.ticketRow}>
                <Icon name="ticket" size={24} color="#666" />
                <View style={styles.ticketInfo}>
                  <Text style={styles.ticketLabel}>Booking ID</Text>
                  <Text style={styles.ticketValue}>{bookingId}</Text>
                </View>
              </View>
            </View>

            <Button
              mode="contained"
              onPress={() => navigation.navigate('RideHistory')}
              style={styles.button}
            >
              View My Rides
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Confirm Your Ride</Title>
          
          <View style={styles.rideDetails}>
            <View style={styles.detailRow}>
              <Icon name="bus" size={24} color="#666" />
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>Route</Text>
                <Text style={styles.detailValue}>{transport.route}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="currency-usd" size={24} color="#666" />
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>Fare</Text>
                <Text style={styles.detailValue}>{transport.fare}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Icon name="clock-outline" size={24} color="#666" />
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>Departure Time</Text>
                <Button
                  mode="outlined"
                  onPress={() => setShowTimePicker(true)}
                  style={styles.timeButton}
                >
                  {formatTime(departureTime)}
                </Button>
              </View>
            </View>
          </View>

          <Button
            mode="contained"
            onPress={handleBooking}
            style={styles.button}
          >
            Confirm Booking
          </Button>
        </Card.Content>
      </Card>

      {showTimePicker && (
        <DateTimePicker
          value={departureTime}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  ticketCard: {
    margin: 16,
    elevation: 4,
    backgroundColor: '#fff',
  },
  ticketHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ticketTitle: {
    marginTop: 10,
    color: '#2563eb',
  },
  ticketContent: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  ticketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ticketInfo: {
    marginLeft: 12,
    flex: 1,
  },
  ticketLabel: {
    fontSize: 12,
    color: '#666',
  },
  ticketValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rideDetails: {
    marginVertical: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailInfo: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  timeButton: {
    marginTop: 4,
  },
  button: {
    marginTop: 16,
  },
});

export default BookRideScreen;