import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function VenueHomeScreen({ route }) {
  const { token } = route.params;

  return (
    <View style={styles.container}>
      <Text>Welcome Venue: {token.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
