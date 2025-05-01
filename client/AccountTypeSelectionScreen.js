import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function AccountTypeSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Which account would you like to create?</Text>
      <View style={styles.buttonContainer}>
        <Button title="Buskar" onPress={() => navigation.navigate("BuskarRegistration")} />
        <Button title="Venue/Bar" onPress={() => navigation.navigate("VenueRegistration")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  buttonContainer: { gap: 10 },
});
