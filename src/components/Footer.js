import React from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";

import RoundedButton from "./RoundedButton";

function Footer({
  backgroundColor,
  leftButtonLabel = false,
  leftButtonPress = false,
  rightButtonLabel = false,
  rightButtonPress = false,
}) {
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.21;
  const FOOTER_PADDING = windowWidth * 0.1;

  const aStyle = style(
    backgroundColor,
    leftButtonLabel,
    HEIGHT,
    FOOTER_PADDING,
  );

  return (
    <View style={aStyle.footerStyle}>
      {leftButtonLabel && (
        <RoundedButton label={leftButtonLabel} onPress={leftButtonPress} />
      )}
      <RoundedButton label={rightButtonLabel} onPress={rightButtonPress} />
    </View>
  );
}

function style(backgroundColor, leftButtonLabel, HEIGHT, FOOTER_PADDING) {
  return StyleSheet.create({
    footerStyle: {
      flexDirection: "row",
      justifyContent: leftButtonLabel ? "space-between" : "flex-end",
      height: HEIGHT,
      backgroundColor: backgroundColor,
      opacity: 0.6,
      alignItems: "center",
      paddingHorizontal: FOOTER_PADDING,
    },
  });
}

export default Footer;
