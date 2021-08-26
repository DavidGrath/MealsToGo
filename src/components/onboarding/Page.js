import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Page({ backgroundColor, title }) {
  const stylesheet = style(backgroundColor);
  return (
    <View style={stylesheet.pageContainer}>
      <Text style={stylesheet.title}>{title}</Text>
    </View>
  );
}

const style = color =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color,
    },
    title: {
      fontSize: 36,
      fontWeight: "bold",
      color: "white",
    },
  });
export default Page;
