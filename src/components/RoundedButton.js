import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components/native";

const Touchable = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
`;
const Label = styled(Text)`
  font-size: ${props => props.theme.fontSizes.button};
  font-weight: bold;
`;

function RoundedButton({ label, onPress, theme }) {
  return (
    <Touchable onPress={onPress}>
      <Label>{label}</Label>
    </Touchable>
  );
}

export default RoundedButton;
