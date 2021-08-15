import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";

function SettingsScreen({ ...props }) {
  return (
    <SafeAreaView style={styles.defaultStyle}>
      <Text>Page 1</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
    backgroundColor: "red",
  },
});

export default SettingsScreen;
