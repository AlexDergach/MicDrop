import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import {
  findUserByUsernameAndPassword,
  loginMockProfile,
} from "./profiledata";

export default function LoginScreen({ navigation, setIsLoggedIn }) {
// export default function LoginScreen({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = findUserByUsernameAndPassword(username, password);

    if (user) {
      // 1. Set the global profile
      loginMockProfile(user);

      // 2. Mark user as logged in (update App.js state)
      setIsLoggedIn(true);
      // route.params?.setIsLoggedIn(true);

      // 3. Return to MainMap screen
      navigation.navigate("MainMap");
    } else {
      Alert.alert("Invalid login", "Incorrect username or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png" }}
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
      <Button
        title="Create Account"
        onPress={() => navigation.navigate("AccountTypeSelection")}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
});
