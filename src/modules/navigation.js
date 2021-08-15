import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";

import { RestaurantScreen } from "../screens/RestaurantScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MapsScreen from "../screens/MapsScreen";
import Onboarding from "../screens/OnboardingScreen";

const AppStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export function appStack(usedSplashBefore) {
  return (
    <AppStack.Navigator headerMode="none">
      {resolveSplash(usedSplashBefore)}
      <AppStack.Screen name="Far" component={home} />
    </AppStack.Navigator>
  );
}

function Restaurant() {
  return (
    <>
      <RestaurantScreen />
      <ExpoStatusBar style="auto" />
    </>
  );
}

function resolveIconName(routeName) {
  switch (routeName) {
    case "Home":
      return "restaurant";
    case "Maps":
      return "map";
    case "Settings":
      return "settings";
  }
}
function home() {
  return (
    <BottomTab.Navigator
      headerMode="none"
      screenOptions={function ({ route }) {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = resolveIconName(route.name);
            let resolvedColor = color;
            if (!focused) {
              iconName = iconName.concat("-outline");
              resolvedColor = "gray";
            }
            return <Ionicons name={iconName} color={resolvedColor} />;
          },
        };
      }}>
      <BottomTab.Screen name="Home" component={Restaurant} />
      <BottomTab.Screen name="Maps" component={MapsScreen} />
      <BottomTab.Screen name="Settings" component={SettingsScreen} />
    </BottomTab.Navigator>
  );
}

function resolveSplash(usedSplashBefore) {
  if (usedSplashBefore) {
    return false;
  } else {
    return <AppStack.Screen name="OffBoarding" component={Onboarding} />;
  }
}
