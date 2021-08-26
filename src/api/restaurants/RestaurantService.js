import camelize from "camelize";
import { host } from "../../util/env";

export function restaurantRequest(location) {
  const url = `${host}/placesNearby?location=${location}`;
  return fetch(url);
}

export function restaurantTransform({ results = [] }) {
  const mappedResults = results.map(function (restaurant) {
    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.businessStatus === "CLOSED_TEMPOROARILY",
      address: restaurant.vicinity,
    };
  });
  return camelize(mappedResults);
}
