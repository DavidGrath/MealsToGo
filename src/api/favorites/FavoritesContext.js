import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/AuthenticationContext";

export const FavoritesContext = createContext();

export function FavoritesContextProvider({ children, ...props }) {
  const FAVORITES_STORAGE_KEY = "favorites";
  const [favorites, setFavorites] = useState([]);
  const authenticationContext = useContext(AuthenticationContext);

  async function loadFavorites(uid) {
    try {
      const storedFavs = await AsyncStorage.getItem(
        `${FAVORITES_STORAGE_KEY}-${uid}`,
      );
      if (storedFavs !== null) {
        setFavorites(JSON.parse(storedFavs));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function saveFavorites(favorites, uid) {
    const storedFavorites = favorites.slice(0, 20);
    try {
      await AsyncStorage.setItem(
        `${FAVORITES_STORAGE_KEY}-${uid}`,
        JSON.stringify(storedFavorites),
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(
    function () {
      if (authenticationContext.user) {
        loadFavorites(authenticationContext.user.uid);
      }
    },
    [authenticationContext.user],
  );
  useEffect(
    function () {
      if (authenticationContext.user) {
        saveFavorites(favorites, authenticationContext.user.uid);
      }
    },
    [favorites, authenticationContext.user],
  );

  function add(restaurant) {
    if (
      !favorites.find(function (f) {
        return f.placeId === restaurant.placeId;
      })
    ) {
      setFavorites([...favorites, restaurant]);
    }
  }

  function remove(restaurant) {
    const newFavorites = favorites.filter(function (f) {
      return f.placeId !== restaurant.placeId;
    });
    if (newFavorites.length < favorites.length) {
      setFavorites(newFavorites);
    }
  }
  return (
    <FavoritesContext.Provider
      value={{
        favorites: favorites,
        addToFavorites: add,
        removeFromFavorites: remove,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
}
