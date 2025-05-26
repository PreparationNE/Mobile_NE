import { mockTransportOptions, rideHistory } from './mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const transportService = {
  // Get all transport options
  getTransportOptions: async () => {
    try {
      await delay(500); // Simulate network delay
      return mockTransportOptions;
    } catch (error) {
      console.error('Error fetching transport options:', error);
      throw error;
    }
  },

  // Book a ride
  bookRide: async (bookingData) => {
    try {
      await delay(500);
      return {
        ...bookingData,
        id: Math.random().toString(36).substr(2, 9),
        status: 'confirmed',
        bookingDate: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error booking ride:', error);
      throw error;
    }
  },

  // Get user's bookings
  getUserBookings: async (userId) => {
    try {
      await delay(500);
      return rideHistory;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  },

  // Update booking time
  updateBookingTime: async (bookingId, newTime) => {
    try {
      await delay(500);
      return {
        id: bookingId,
        departureTime: newTime,
        status: 'updated'
      };
    } catch (error) {
      console.error('Error updating booking time:', error);
      throw error;
    }
  },

  // Submit feedback
  submitFeedback: async (feedbackData) => {
    try {
      await delay(500);
      return {
        ...feedbackData,
        id: Math.random().toString(36).substr(2, 9),
        submittedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  },
}; 