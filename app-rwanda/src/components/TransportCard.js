import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransportCard = ({ transport }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{transport.name}</Text>
      <Text style={styles.route}>{transport.route}</Text>
      <Text style={styles.fare}>RWF {transport.fare}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  route: {
    color: '#4b5563',
    marginBottom: 4,
  },
  fare: {
    color: '#2e8b57',
    fontWeight: 'bold',
  },
});

export default TransportCard;