import React, { useContext } from "react";
import { View, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { ThemeContext } from "styled-components/native";

import Text from "../TextComponent";

const image = require("../../../assets/home_bg.jpg");

export const AccountCover = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled(View)`
  padding: ${props => props.theme.space.large};
  margin-top: ${props => props.theme.space.medium};
  background-color: rgba(255, 255, 255, 0.7);
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export function AccountBackground({ children, ...props }) {
  return (
    <BackgroundImage source={image} resizeMode="cover">
      {children}
    </BackgroundImage>
  );
}

export const ErrorContainer = styled(View)`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${props => props.theme.space.small};
  margin-bottom: ${props => props.theme.space.small};
`;

const StyledButton = styled(Button)`
  padding: ${props => props.theme.space.medium};
`;

export function AuthButton({ children, ...props }) {
  const themeContext = useContext(ThemeContext);
  return (
    <StyledButton
      color={themeContext.colors.brand.primary}
      mode="contained"
      onPress={props.onPress}
      icon={props.icon}>
      {children}
    </StyledButton>
  );
}
