import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { NAVIGATION_NAMES } from "./constants";
import LoginScreen from "../screens/LoginScreen";
import AccountScreen from "../screens/AccountScreen";
import SignUpScreen from "../screens/SignUpScreen";

const AccountStack = createStackNavigator();

function AccountStackNavigator() {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen
        name={NAVIGATION_NAMES.ACCOUNT_HOME}
        component={AccountScreen}
      />
      <AccountStack.Screen
        name={NAVIGATION_NAMES.ACCOUNT_LOGIN}
        component={LoginScreen}
      />
      <AccountStack.Screen
        name={NAVIGATION_NAMES.ACCOUNT_SIGN_UP}
        component={SignUpScreen}
      />
    </AccountStack.Navigator>
  );
}

export default AccountStackNavigator;
