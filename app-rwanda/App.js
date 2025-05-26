import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';

// Screens
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import BookRideScreen from './src/screens/BookRideScreen';
import RideHistoryScreen from './src/screens/RideHistoryScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'History') {
          iconName = 'history';
        }

        return <IconButton icon={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="History" component={RideHistoryScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2563eb',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="MainApp" 
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="BookRide" 
            component={BookRideScreen}
            options={{ title: 'Book a Ride' }}
          />
                    <Stack.Screen 
            name="RideHistory" 
            component={RideHistoryScreen}
            options={{ title: 'See your history' }}
          />
          <Stack.Screen 
            name="Feedback" 
            component={FeedbackScreen}
            options={{ title: 'Give Feedback' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}