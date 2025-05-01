import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { addProfile } from "./profiledata";
import { isValidEmail, isStrongPassword } from "./validation"; 

export default function BuskarRegistrationScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    // Email and password validation
    if (!username || !password || !firstName || !lastName || !email) {
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

    const userData = {
      userType: "buskar",
      username,
      password,
      firstName,
      lastName,
      email,
    };

    // Add user to profile data
    addProfile(userData);

    // Navigate back to the login screen
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <TextInput placeholder="First Name" style={styles.input} value={firstName} onChangeText={setFirstName} />
      <TextInput placeholder="Last Name" style={styles.input} value={lastName} onChangeText={setLastName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
});
