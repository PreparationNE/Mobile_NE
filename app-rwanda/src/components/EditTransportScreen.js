import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { updateTransportOption } from '../api/apiService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditTransportScreen = ({ route, navigation }) => {
  const { transport } = route.params;
  const [formData, setFormData] = useState({
    id: transport.id,
    name: transport.name,
    route: transport.route,
    fare: transport.fare.toString(),
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.route || !formData.fare) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await updateTransportOption(formData.id, {
        name: formData.name,
        route: formData.route,
        fare: Number(formData.fare),
      });
      Alert.alert('Success', 'Transport option updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update transport option');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Transport</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Route:</Text>
        <TextInput
          style={styles.input}
          value={formData.route}
          onChangeText={(text) => handleChange('route', text)}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Fare (RWF):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.fare}
          onChangeText={(text) => handleChange('fare', text)}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Update Transport</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e293b',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4b5563',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default EditTransportScreen;