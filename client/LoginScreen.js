import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Image } from "react-native";
import { findUserByUsernameAndPassword } from "./profiledata"; // Import profile data

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = findUserByUsernameAndPassword(username, password);
    if (user) {
      const token = {
        id: user.id,
        username: user.username,
        userType: user.userType,
      };

      // Navigate to respective page
      if (user.userType === "buskar") {
        navigation.navigate("BuskarHome", { token });
      } else if (user.userType === "venue") {
        navigation.navigate("VenueHome", { token });
      }
    } else {
      Alert.alert("Invalid login", "Incorrect username or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/micdrop.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Create Account" onPress={() => navigation.navigate("AccountTypeSelection")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  input: { borderWidth: 1, width: "100%", marginBottom: 10, padding: 8, borderRadius: 5 },
  logo: { width: 200, height: 100, marginBottom: 20 }, 
});
