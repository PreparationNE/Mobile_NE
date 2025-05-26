import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmergencyButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log('Emergency reported:', { issueType, description });
    Alert.alert('Report Submitted', 'Thank you. Authorities have been notified.');
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity 
        className="absolute bottom-8 right-8 bg-red-500 w-16 h-16 rounded-full justify-center items-center shadow-lg"
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="warning" size={28} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-4/5">
            <Text className="text-xl font-bold text-gray-800 mb-4">Report Emergency</Text>
            
            <Text className="text-gray-600 mb-2">Issue Type:</Text>
            <TextInput
              className="bg-gray-100 p-3 rounded-lg mb-4"
              placeholder="Select issue type"
              value={issueType}
              onChangeText={setIssueType}
            />
            
            <Text className="text-gray-600 mb-2">Description:</Text>
            <TextInput
              className="bg-gray-100 p-3 rounded-lg h-24 mb-6"
              placeholder="Describe the issue"
              multiline
              value={description}
              onChangeText={setDescription}
            />
            
            <View className="flex-row justify-between">
              <TouchableOpacity 
                className="bg-gray-300 py-2 px-4 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-gray-800 font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-red-500 py-2 px-4 rounded-lg"
                onPress={handleSubmit}
              >
                <Text className="text-white font-bold">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EmergencyButton;