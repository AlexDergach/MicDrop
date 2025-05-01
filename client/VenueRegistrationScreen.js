import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { addProfile } from "./profiledata";
import { isValidEmail, isStrongPassword } from "./validation"; // Import validation functions

export default function VenueRegistrationScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [venueName, setVenueName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    // Email and password validation
    if (!username || !password || !venueName || !streetAddress || !city || !postCode || !email) {
        Alert.alert("Missing fields", "Please fill in all the required fields.");
        return;
      }
      
    if (!isValidEmail(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }
    if (!isStrongPassword(password)) {
      Alert.alert("Weak password", "Password must be 8 characters long, with at least 2 numbers and 1 special character.");
      return;
    }

    const venueData = {
      userType: "venue",
      username,
      password,
      venueName,
      streetAddress,
      city,
      postCode,
      email,
    };

    // Add venue user to profile data
    addProfile(venueData);

    // Navigate back to login screen
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <TextInput placeholder="Venue Name" style={styles.input} value={venueName} onChangeText={setVenueName} />
      <TextInput placeholder="Street Address" style={styles.input} value={streetAddress} onChangeText={setStreetAddress} />
      <TextInput placeholder="City" style={styles.input} value={city} onChangeText={setCity} />
      <TextInput placeholder="Post Code" style={styles.input} value={postCode} onChangeText={setPostCode} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
});
