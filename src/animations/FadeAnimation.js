import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function FadeInView({ duration = 1500, ...props }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(
    function () {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }).start();
    },
    [fadeAnim, duration],
  );

  return (
    <Animated.View style={{ ...props.style, opacity: fadeAnim }}>
      {props.children}
    </Animated.View>
  );
}
