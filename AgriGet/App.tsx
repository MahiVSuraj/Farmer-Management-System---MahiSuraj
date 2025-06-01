import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Import Screens
import HomePage from './Homepage';
import Education from './Education';
import Profile from './Profile';

// Screens from CropInsuranceForm.js
import CropInsuranceForm from './CropInsuranceForm';
import Premium from './Premium';
import SchemesList from './SchemesList';
import SignUpPage from './SignUp';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { width } = Dimensions.get('window');

// Stack Navigator for Schemes



// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            } else if (route.name === 'Edu') {
              iconName = 'book';
            } else if (route.name === 'Schemes') {
              iconName = 'gavel';
            }

            return (
              <Icon
                name={iconName}
                size={focused ? size + 5 : size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: '#6c757d',
          tabBarStyle: styles.tabBar,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Edu" component={Education} />
        <Tab.Screen name="Schemes" component={SchemesList} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFF8DC',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 65,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});
