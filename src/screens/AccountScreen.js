import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";

import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
} from "../components/account/AccountStyles";
import Spacer from "../components/Spacer";

const AnimationContainer = styled(View)`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${props => props.theme.space.regular};
`;
function AccountScreen({ navigation, ...props }) {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationContainer>
        <LottieView
          key="animation"
          autoPlay={true}
          loop={true}
          resizeMode="cover"
          source={require("../../assets/watermelon.json")}
        />
      </AnimationContainer>
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          onPress={function () {
            navigation.navigate("account_login");
          }}>
          Login
        </AuthButton>
        <Spacer position="top" size="large" />
        <AuthButton
          icon="email"
          onPress={function () {
            navigation.navigate("account_sign_up");
          }}>
          Register
        </AuthButton>
      </AccountContainer>
    </AccountBackground>
  );
}

export default AccountScreen;
