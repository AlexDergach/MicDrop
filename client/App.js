// App.js

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import AccountTypeSelectionScreen from './AccountTypeSelectionScreen';
import BuskarRegistrationScreen from './BuskarRegistrationScreen';
import VenueRegistrationScreen from './VenueRegistrationScreen';
import Pin from './pin';
import PopupForm from './pop';
import { getActiveProfile } from './profiledata';

const Stack = createStackNavigator();

export default function App() {
  const [pins, setPins] = useState([]);
  const [activePopupIndex, setActivePopupIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNewPin = (newProfile) => {
    setPins((prev) => [...prev, newProfile]);
  };

  const profile = getActiveProfile();
  const profileIconUri = isLoggedIn && profile
    ? profile.profileIcon
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const MainMap = ({ navigation }) => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.profilePicWrapper}
        onPress={() => navigation.navigate('Login', { setIsLoggedIn })}
      >
        <Image source={{ uri: profileIconUri }} style={styles.profilePic} />
      </TouchableOpacity>

      {isLoggedIn && (
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
      )}
    </View>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainMap" component={MainMap} />
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="AccountTypeSelection" component={AccountTypeSelectionScreen} />
        <Stack.Screen name="BuskarRegistration" component={BuskarRegistrationScreen} />
        <Stack.Screen name="VenueRegistration" component={VenueRegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
