import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

import ListItemRestaurantSearch from "../components/restaurant/ListItemRestaurantSearch";
import Spacer from "../components/Spacer";
import { LocationContext } from "../api/location/LocationContext.js";
import { RestaurantContext } from "../api/restaurants/RestaurantContext";
import { FavoritesContext } from "../api/favorites/FavoritesContext";
import RestaurantSearch from "../components/restaurant/RestaurantSearch";
import FavoritesBar from "../components/favorites/FavoritesBar";
import { FadeInView } from "../animations/FadeAnimation";
import Text from "../components/TextComponent";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: ${props => props.theme.colors.bg.primary};
`;

const RestaurantListContainer = styled(View)`
  padding: ${props => props.theme.space.regular};
  background-color: ${props => props.theme.colors.bg.primary};
  flex: 1;
`;

export function RestaurantScreen({ navigation }) {
  const restaurantContext = useContext(RestaurantContext);
  const locationContext = useContext(LocationContext);
  const favoritesContext = useContext(FavoritesContext);

  const [isFavoritesShowing, setIsFavoritesShowing] = useState(false);

  const restaurants = restaurantContext.restaurants;
  const isLoading = restaurantContext.isLoading;
  const restaurantError = restaurantContext.error;
  const locationError = locationContext.error;
  const hasError = restaurantError || locationError;
  const favorites = favoritesContext.favorites;

  useEffect(function () {}, [isFavoritesShowing]);

  function rootComponent() {
    return (
      <SafeArea>
        <RestaurantSearch
          isFavoritesToggled={isFavoritesShowing}
          onToggleFavorites={function () {
            setIsFavoritesShowing(!isFavoritesShowing);
          }}
        />
        {isFavoritesShowing && (
          <FavoritesBar
            favorites={favorites}
            onDetail={function (rest) {
              const params = {
                restaurant: rest,
              };
              navigation.navigate("Restaurants", {
                screen: "restaurants_details",
                params: params,
              });
            }}
          />
        )}
        {body}
      </SafeArea>
    );
  }

  function loadingComponent() {
    return (
      <View style={{ position: "absolute", top: "50%", left: "50%" }}>
        <ActivityIndicator
          size={50}
          style={{ marginLeft: -25 }}
          animating={true}
          color={Colors.blue400}
        />
      </View>
    );
  }

  function listComponent() {
    return (
      <RestaurantListContainer>
        <FadeInView>
          <FlatList
            data={restaurants}
            renderItem={item => (
              <Spacer position="bottom" size="medium">
                <TouchableOpacity
                  onPress={function () {
                    const params = {
                      restaurant: item.item,
                    };
                    navigation.navigate("Restaurants", {
                      screen: "restaurants_details",
                      params: params,
                    });
                  }}>
                  <ListItemRestaurantSearch restaurant={item.item} />
                </TouchableOpacity>
              </Spacer>
            )}
            keyExtractor={item => item.name}
            contentContainerStyle={{ padding: 16 }}
          />
        </FadeInView>
      </RestaurantListContainer>
    );
  }

  function errorComponent() {
    return (
      <Spacer position="left" size="large">
        <Text variant="error">
          Something went wrong with the network request. Please try again
        </Text>
      </Spacer>
    );
  }

  const body = isLoading
    ? hasError
      ? errorComponent()
      : loadingComponent()
    : listComponent();
  const root = rootComponent();

  return root;
}
