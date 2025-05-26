import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, TextInput, Button, RadioButton, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedbackScreen = ({ route, navigation }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      const feedback = {
        id: Math.random().toString(36).substr(2, 9),
        rating,
        comment,
        date: new Date().toISOString(),
        rideId: route.params?.rideId,
      };

      // Get existing feedback
      const existingFeedback = await AsyncStorage.getItem('feedback');
      const feedbackList = existingFeedback ? JSON.parse(existingFeedback) : [];
      
      // Add new feedback
      feedbackList.push(feedback);
      
      // Save updated feedback
      await AsyncStorage.setItem('feedback', JSON.stringify(feedbackList));
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Thank You!</Title>
            <Paragraph style={styles.paragraph}>
              Your feedback has been submitted successfully.
            </Paragraph>
            <Button
              mode="contained"
              onPress={() => navigation.goBack()}
              style={styles.button}
            >
              Go Back
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Rate Your Ride</Title>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>How was your experience?</Text>
            <RadioButton.Group onValueChange={value => setRating(parseInt(value))} value={rating.toString()}>
              <View style={styles.ratingOptions}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <View key={value} style={styles.ratingOption}>
                    <RadioButton value={value.toString()} />
                    <Text>{value}</Text>
                  </View>
                ))}
              </View>
            </RadioButton.Group>
          </View>

          <TextInput
            label="Comments (optional)"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
            disabled={rating === 0}
          >
            Submit Feedback
          </Button>
        </Card.Content>
      </Card>
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
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  paragraph: {
    textAlign: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    marginVertical: 16,
  },
  ratingLabel: {
    marginBottom: 8,
  },
  ratingOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  ratingOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginVertical: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default FeedbackScreen;