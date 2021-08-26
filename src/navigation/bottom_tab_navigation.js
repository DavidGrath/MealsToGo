import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import MapsScreen from "../screens/MapsScreen";
import CameraScreen from "../screens/CameraScreen";
import RestaurantDetails from "../screens/modal/RestaurantDetails";
import { RestaurantScreen } from "../screens/RestaurantScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { NAVIGATION_NAMES } from "./constants";
import FavoritesScreen from "../screens/FavoritesScreen";
import { colors } from "../theme/colors";
import CheckoutScreen from "../screens/CheckoutScreen";
import CheckoutSuccessScreen from "../screens/CheckoutSuccessScreen";
import CheckoutErrorScreen from "../screens/CheckoutErrorScreen";

const RestaurantStack = createStackNavigator();
const CheckoutStack = createStackNavigator();
const MapsStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function RestaurantStackNavigator() {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
      }}>
      <RestaurantStack.Screen
        name={NAVIGATION_NAMES.RESTAURANTS_HOME}
        component={RestaurantScreen}
      />
      <RestaurantStack.Screen
        name={NAVIGATION_NAMES.RESTAURANTS_DETAIL}
        component={RestaurantDetails}
      />
    </RestaurantStack.Navigator>
  );
}

function CheckoutStackNavigator() {
  return (
    <CheckoutStack.Navigator screenOptions={{ headerShown: false }}>
      <CheckoutStack.Screen
        name={NAVIGATION_NAMES.CHECKOUT_HOME}
        component={CheckoutScreen}
      />
      <CheckoutStack.Screen
        name={NAVIGATION_NAMES.CHECKOUT_SUCCESS}
        component={CheckoutSuccessScreen}
      />
      <CheckoutStack.Screen
        name={NAVIGATION_NAMES.CHECKOUT_ERROR}
        component={CheckoutErrorScreen}
      />
    </CheckoutStack.Navigator>
  );
}

function MapsStackNavigator() {
  return (
    <MapsStack.Navigator screenOptions={{ headerShown: false }}>
      <MapsStack.Screen
        name={NAVIGATION_NAMES.MAP_HOME}
        component={MapsScreen}
      />
    </MapsStack.Navigator>
  );
}

function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerMode: "screen",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <SettingsStack.Screen
        name={NAVIGATION_NAMES.SETTINGS_HOME}
        component={SettingsScreen}
      />
      <SettingsStack.Screen
        name={NAVIGATION_NAMES.SETTINGS_FAVORITES}
        component={FavoritesScreen}
      />
      <SettingsStack.Screen
        name={NAVIGATION_NAMES.SETTINGS_CAMERA}
        component={CameraScreen}
      />
    </SettingsStack.Navigator>
  );
}

function resolveIconName(routeName) {
  switch (routeName) {
    case NAVIGATION_NAMES.RESTAURANTS:
      return "restaurant";
    case NAVIGATION_NAMES.CHECKOUT:
      return "cart";
    case NAVIGATION_NAMES.MAP:
      return "map";
    case NAVIGATION_NAMES.SETTINGS:
      return "settings";
  }
}

function BottomTabNavigator({ ...props }) {
  return (
    <BottomTab.Navigator
      screenOptions={function ({ route }) {
        return {
          headerShown: false,
          tabBarActiveTintColor: colors.brand.primary,
          tabBarInactiveTintColor: colors.brand.muted,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = resolveIconName(route.name);
            let resolvedColor = color;
            if (!focused) {
              iconName = iconName.concat("-outline");
              resolvedColor = "gray";
            }
            return <Ionicons name={iconName} />;
          },
        };
      }}>
      <BottomTab.Screen
        name={NAVIGATION_NAMES.RESTAURANTS}
        component={RestaurantStackNavigator}
      />
      <BottomTab.Screen
        name={NAVIGATION_NAMES.CHECKOUT}
        component={CheckoutStackNavigator}
      />
      <BottomTab.Screen
        name={NAVIGATION_NAMES.MAP}
        component={MapsStackNavigator}
      />
      <BottomTab.Screen
        name={NAVIGATION_NAMES.SETTINGS}
        component={SettingsStackNavigator}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
