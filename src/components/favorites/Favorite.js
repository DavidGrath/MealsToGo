import React, { useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { FavoritesContext } from "../../api/favorites/FavoritesContext";

const FavoritesButton = styled(TouchableOpacity)`
    background-color: transparent;
    border-color: #20232A
    position: absolute;
    z-index: 9;
    top: 10px;
    right: 10px;
`;

function Favorite({ restaurant, ...props }) {
  const favoritesContext = useContext(FavoritesContext);
  const favorites = favoritesContext.favorites;
  const isFavorite = favorites.find(function (f) {
    return f.placeId === restaurant.placeId;
  });
  return (
    <FavoritesButton
      onPress={function () {
        if (isFavorite) {
          favoritesContext.removeFromFavorites(restaurant);
        } else {
          favoritesContext.addToFavorites(restaurant);
        }
      }}>
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={24}
        color="red"
      />
    </FavoritesButton>
  );
}

export default Favorite;
