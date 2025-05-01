import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BuskarHomeScreen({ route }) {
  const { token } = route.params;

  return (
    <View style={styles.container}>
      <Text>Welcome Buskar: {token.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
