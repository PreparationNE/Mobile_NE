import axios from 'axios';

const API_URL = 'https://68336a41464b499636ff60e6.mockapi.io/api/v1';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transportService = {
  // Get all transport options
  getTransportOptions: async () => {
    try {
      const response = await api.get('/transport');
      return response.data;
    } catch (error) {
      console.error('Error fetching transport options:', error);
      throw error;
    }
  },

  // Book a ride
  bookRide: async (bookingData) => {
    try {
      const response = await api.post('/bookings', {
        transportId: bookingData.transport.id,
        route: bookingData.transport.route,
        departureTime: bookingData.departureTime,
        fare: bookingData.transport.fare,
        status: 'confirmed',
        userId: 1, // For demo purposes
        bookingDate: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error booking ride:', error);
      throw error;
    }
  },

  // Get user's bookings
  getUserBookings: async (userId) => {
    try {
      const response = await api.get(`/bookings?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  },

  // Update booking time
  updateBookingTime: async (bookingId, newTime) => {
    try {
      const response = await api.put(`/bookings/${bookingId}`, {
        departureTime: newTime,
        status: 'updated'
      });
      return response.data;
    } catch (error) {
      console.error('Error updating booking time:', error);
      throw error;
    }
  },

  // Submit feedback
  submitFeedback: async (feedbackData) => {
    try {
      const response = await api.post('/feedback', {
        bookingId: feedbackData.rideId,
        userId: 1, // For demo purposes
        rating: feedbackData.rating,
        comment: feedbackData.message,
        type: feedbackData.type,
        submittedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  },

  // Delete booking
  deleteBooking: async (bookingId) => {
    try {
      await api.delete(`/bookings/${bookingId}`);
      return { id: bookingId, status: 'cancelled' };
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }
}; 