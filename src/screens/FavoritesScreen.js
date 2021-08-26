import React, { useContext } from "react";
import { View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import ListItemRestaurantSearch from "../components/restaurant/ListItemRestaurantSearch";
import { FavoritesContext } from "../api/favorites/FavoritesContext";
import Text from "../components/TextComponent";
import Spacer from "../components/Spacer";

const FavoritesListContainer = styled(SafeAreaView)`
  padding: ${props => props.theme.space.regular};
  background-color: ${props => props.theme.colors.bg.primary};
  flex: 1;
`;

function FavoritesScreen({ navigation, ...props }) {
  const favoritesContext = useContext(FavoritesContext);

  const favorites = favoritesContext.favorites;
  const body = favorites.length
    ? favoritesListComponent(favorites)
    : emptyViewComponent();

  return <FavoritesListContainer>{body}</FavoritesListContainer>;
}

function favoritesListComponent(favorites) {
  return (
    <FlatList
      data={favorites}
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
            <ListItemRestaurantSearch
              includeFavorites={false}
              restaurant={item.item}
            />
          </TouchableOpacity>
        </Spacer>
      )}
      keyExtractor={item => item.name}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

function emptyViewComponent() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>You do not have any favorites right now</Text>
    </View>
  );
}

export default FavoritesScreen;
