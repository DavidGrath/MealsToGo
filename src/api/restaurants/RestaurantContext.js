import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useMemo,
} from "react";

import { LocationContext } from "../location/LocationContext";
import { restaurantRequest, restaurantTransform } from "./RestaurantService";

export const RestaurantContext = createContext();

export function RestaurantsContextProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const locationContext = useContext(LocationContext);

  useEffect(
    function () {
      const location = locationContext.location;
      setRestaurants([]);
      if (!location) {
        return;
      }
      retrieveRestaurants(`${location.lat},${location.lng}`);
    },
    [locationContext],
  );

  function retrieveRestaurants(locationString) {
    setIsLoading(true);
    setTimeout(function () {
      restaurantRequest(locationString)
        .then(function (response) {
          return response.json();
        })
        .then(restaurantTransform)
        .then(function (results) {
          setError(null);
          setIsLoading(false);
          setRestaurants(results);
        })
        .catch(function (e) {
          setIsLoading(false);
          setError(e);
        });
    }, 1500);
  }
  return (
    <RestaurantContext.Provider
      value={{ restaurants: restaurants, isLoading: isLoading, error: error }}>
      {children}
    </RestaurantContext.Provider>
  );
}
