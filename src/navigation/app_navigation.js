import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { NAVIGATION_NAMES } from "./constants";
import BottomTabNavigator from "./bottom_tab_navigation";
import { PaymentContextProvider } from "../api/checkout/PaymentContext";
import { FavoritesContextProvider } from "../api/favorites/FavoritesContext";
import { LocationContextProvider } from "../api/location/LocationContext";
import { RestaurantsContextProvider } from "../api/restaurants/RestaurantContext";
import { CartContextProvider } from "../api/cart/CartContext";

const AppStack = createStackNavigator();

function AppStackNavigator({ usedSplashBefore, ...props }) {
  return (
    <PaymentContextProvider>
      <FavoritesContextProvider>
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <CartContextProvider>
              <AppStack.Navigator headerMode="none">
                {resolveSplash(usedSplashBefore)}
                <AppStack.Screen
                  name={NAVIGATION_NAMES.HOME}
                  component={BottomTabNavigator}
                />
              </AppStack.Navigator>
            </CartContextProvider>
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </FavoritesContextProvider>
    </PaymentContextProvider>
  );
}

function resolveSplash(usedSplashBefore) {
  if (usedSplashBefore) {
    return false;
  } else {
    return (
      <AppStack.Screen
        name={NAVIGATION_NAMES.ONBOARDING}
        component={Onboarding}
      />
    );
  }
}

export default AppStackNavigator;
