import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, ActivityIndicator, Text, IconButton, Dialog, Portal } from 'react-native-paper';
import { transportService } from '../utils/apiService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RideHistoryScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      const data = await transportService.getUserBookings(1); // Using userId 1 for demo
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const handleDelete = async () => {
    try {
      await transportService.deleteBooking(selectedBooking.id);
      setBookings(bookings.filter(booking => booking.id !== selectedBooking.id));
      setDeleteDialogVisible(false);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {bookings.map((booking) => (
          <Card key={booking.id} style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Icon name="bus" size={24} color="#2563eb" />
                <Title style={styles.routeTitle}>{booking.route}</Title>
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => {
                    setSelectedBooking(booking);
                    setDeleteDialogVisible(true);
                  }}
                />
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Icon name="calendar" size={20} color="#666" />
                  <Text style={styles.detailText}>{formatDate(booking.date)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="currency-usd" size={20} color="#666" />
                  <Text style={styles.detailText}>{booking.fare}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="check-circle" size={20} color="#666" />
                  <Text style={styles.detailText}>{booking.status}</Text>
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Feedback', { rideId: booking.id })}
                style={styles.feedbackButton}
              >
                Give Feedback
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      <Portal>
        <Dialog
          visible={deleteDialogVisible}
          onDismiss={() => setDeleteDialogVisible(false)}
        >
          <Dialog.Title>Cancel Booking</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to cancel this booking?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>No</Button>
            <Button onPress={handleDelete}>Yes, Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  feedbackButton: {
    marginTop: 8,
  },
});

export default RideHistoryScreen;