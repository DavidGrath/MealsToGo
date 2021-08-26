import React, { useState, useContext } from "react";
import { View } from "react-native";
import { TextInput, ActivityIndicator, Colors } from "react-native-paper";
import Text from "../components/TextComponent";

import { AuthenticationContext } from "../api/authentication/AuthenticationContext";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
  ErrorContainer,
} from "../components/account/AccountStyles";
import Spacer from "../components/Spacer";

function SignUpScreen({ ...props }) {
  const authenticationContext = useContext(AuthenticationContext);
  const error = authenticationContext.error;
  const isLoading = authenticationContext.isLoading;
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatedPassword, setRepeatedPassword] = useState(null);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <TextInput
          style={{ width: 300 }}
          onChangeText={function (text) {
            setEmail(text);
          }}
          value={email}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholder="E-mail"
        />
        <Spacer position="top" size="medium" />
        <TextInput
          style={{ width: 300 }}
          onChangeText={function (text) {
            setPassword(text);
          }}
          textContentType="password"
          placeholder="Password"
          autoCapitalize="none"
          value={password}
          secureTextEntry={true}
        />
        <Spacer position="top" size="medium" />
        <TextInput
          style={{ width: 300 }}
          onChangeText={function (text) {
            setRepeatedPassword(text);
          }}
          textContentType="password"
          placeholder="Confirm Password"
          autoCapitalize="none"
          value={repeatedPassword}
          secureTextEntry={true}
        />
        {error && (
          <ErrorContainer>
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer position="top" size="medium" />
        {isLoading ? (
          <ActivityIndicator animating={true} color={Colors.blue300} />
        ) : (
          <AuthButton
            icon="email"
            onPress={function () {
              if (!email || !password) {
                return;
              }
              if (!email.length || !password.length) {
                return;
              }
              authenticationContext.onRegister(
                email,
                password,
                repeatedPassword,
              );
            }}>
            Sign Up
          </AuthButton>
        )}
      </AccountContainer>
      <Spacer size="large" position="top">
        <AuthButton
          onPress={function () {
            navigation.goBack();
          }}>
          BACK
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
}

export default SignUpScreen;
