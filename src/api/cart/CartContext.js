import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/AuthenticationContext";
import { STORAGE_KEYS } from "../../util/constants";

export const CartContext = createContext();

export function CartContextProvider({ children, ...props }) {
  const authenticationContext = useContext(AuthenticationContext);
  const user = authenticationContext.user;

  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [sum, setSum] = useState(0);

  useEffect(async function () {
    const uid = user.uid;
    const key = `${STORAGE_KEYS.USER_DETAILS}-${uid}`;
    try {
      var userDetails = await AsyncStorage.getItem(key);
      console.log("UDTCART: " + JSON.stringify(userDetails));
      if (!userDetails) {
        userDetails = JSON.stringify({});
        await AsyncStorage.setItem(key, userDetails);
      }
      const parsedDetails = JSON.parse(userDetails);
      if (!parsedDetails.cart) {
        parsedDetails.cart = [];
        parsedDetails.restaurant = null;
      }
      setCart(parsedDetails.cart);
      setRestaurant(parsedDetails.restaurant);
      await AsyncStorage.setItem(key, JSON.stringify(parsedDetails));
    } catch (e) {
      console.log(e.toString());
    }
  }, []);

  useEffect(
    async function () {
      console.log("STC: " + JSON.stringify(cart));
      const uid = user.uid;
      const key = `${STORAGE_KEYS.USER_DETAILS}-${uid}`;
      try {
        const userDetails = await AsyncStorage.getItem(key);
        if (!userDetails) {
          await AsyncStorage.setItem(key, JSON.stringify({}));
        }
        const parsedDetails = JSON.parse(userDetails);
        parsedDetails.cart = cart;
        parsedDetails.restaurant = restaurant;
        await AsyncStorage.setItem(key, JSON.stringify(parsedDetails));
      } catch (e) {
        console.log(e.toString());
      }
    },
    [cart, restaurant],
  );

  useEffect(
    function () {
      if (!cart.length) {
        setSum(0);
        return;
      }
      const newSum = cart.reduce(function (acc, current) {
        return acc + current.price;
      }, 0);
      setSum(newSum);
    },
    [cart],
  );
  function add(item, rst) {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
      return;
    }
    setCart([...cart, item]);
  }

  function clear() {
    setCart([]);
    setRestaurant(null);
  }

  const value = {
    cart: cart,
    restaurant: restaurant,
    sum: sum,
    addToCart: add,
    clearCart: clear,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
