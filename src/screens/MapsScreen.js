import React, { useContext, useEffect, useState } from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";

import MapSearch from "../components/maps/MapSearch";
import { RestaurantContext } from "../api/restaurants/RestaurantContext";
import { LocationContext } from "../api/location/LocationContext";
import MapCallout from "../components/maps/MapCallout";
import { SafeAreaView } from "react-native";

const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

function MapsScreen({ navigation, ...props }) {
  const restaurantContext = useContext(RestaurantContext);
  const restaurants = restaurantContext.restaurants;
  const locationContext = useContext(LocationContext);
  const location = locationContext.location;
  if (!location) {
    return errorComponent();
  }
  const viewport = location.viewport;
  const [latDelta, setLatDelta] = useState(0);
  useEffect(
    function () {
      const northeastLat = viewport.northeast.lat;
      const southwestLat = viewport.southwest.lat;

      const latDelta = northeastLat - southwestLat;
      setLatDelta(latDelta);
    },
    [location, viewport],
  );
  function errorComponent() {
    return (
      <Map
        region={{
          latitude: 0,
          longitude: 0,
        }}></Map>
    );
  }
  function screenComponent() {
    return (
      <>
        <MapSearch />
        <Map
          region={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: latDelta,
            longitudeDelta: 0.01,
          }}>
          {restaurants.map(function (r) {
            return (
              <MapView.Marker
                key={r.name}
                title={r.name}
                coordinate={{
                  latitude: r.geometry.location.lat,
                  longitude: r.geometry.location.lng,
                }}>
                <MapView.Callout
                  onPress={function () {
                    const params = {
                      restaurant: r,
                    };
                    navigation.navigate("Restaurants", {
                      screen: "restaurants_details",
                      params: params,
                    });
                  }}>
                  <MapCallout restaurant={r} />
                </MapView.Callout>
              </MapView.Marker>
            );
          })}
        </Map>
      </>
    );
  }
  const body = screenComponent();
  return body;
}

export default MapsScreen;
