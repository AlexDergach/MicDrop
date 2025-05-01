import React, { useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import AccountTypeSelectionScreen from "./AccountTypeSelectionScreen";
import BuskarRegistrationScreen from "./BuskarRegistrationScreen";
import VenueRegistrationScreen from "./VenueRegistrationScreen";
import BuskarHomeScreen from "./BuskarHomeScreen";
import VenueHomeScreen from "./VenueHomeScreen";
import Pin from './pin';
import PopupForm from './pop';
import { profile as userProfile } from './profiledata';

const Stack = createStackNavigator();

export default function App() {
  const [pins, setPins] = useState([]);
  const [activePopupIndex, setActivePopupIndex] = useState(null);

  const handleNewPin = (newProfile) => {
    setPins((prevPins) => [...prevPins, newProfile]);
  };

  const closePopups = () => setActivePopupIndex(null);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="AccountTypeSelection" component={AccountTypeSelectionScreen} />
          <Stack.Screen name="BuskarRegistration" component={BuskarRegistrationScreen} />
          <Stack.Screen name="VenueRegistration" component={VenueRegistrationScreen} />
          <Stack.Screen name="BuskarHome" component={BuskarHomeScreen} />
          <Stack.Screen name="VenueHome" component={VenueHomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  
      <TouchableWithoutFeedback onPress={closePopups}>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            {pins.map((pin, index) => (
              <Pin
                key={index}
                profile={pin}
                isActive={activePopupIndex === index}
                onPress={() =>
                  setActivePopupIndex(activePopupIndex === index ? null : index)
                }
              />
            ))}
            <PopupForm onSubmit={handleNewPin} />
          </View>
  
          <View style={styles.profilePicWrapper}>
            <Image
              source={{ uri: userProfile.profileIcon }}
              style={styles.profilePic}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '65%',
  },
  profilePicWrapper: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1000,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 50,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});