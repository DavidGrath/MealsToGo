import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppStackNavigator from "./app_navigation";
import AccountStackNavigator from "./account_navigation";
import { AuthenticationContext } from "../api/authentication/AuthenticationContext";

function MainNavigation({ usedSplashBefore, ...props }) {
  const authenticationContext = useContext(AuthenticationContext);
  const nullUser = authenticationContext.user;
  return (
    <NavigationContainer>
      {nullUser ? (
        <AppStackNavigator usedSplashBefore={usedSplashBefore} />
      ) : (
        <AccountStackNavigator />
      )}
    </NavigationContainer>
  );
}

export default MainNavigation;
