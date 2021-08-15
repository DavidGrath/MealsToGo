import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";

class MapsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.defaultStyle}>
        <Text>Page 2</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
    backgroundColor: "violet",
  },
});

export default MapsScreen;
