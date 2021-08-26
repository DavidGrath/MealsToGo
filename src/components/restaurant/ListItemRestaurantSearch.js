import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

import star from "../../../assets/vector-icons/star.svg";
import open from "../../../assets/vector-icons/open.svg";
import Spacer from "../Spacer";
import Text from "../TextComponent";
import Favorite from "../favorites/Favorite";

import {
  Address,
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Icon,
  Row,
} from "./ListItemRestaurantSearchStyles";

function ListItemRestaurantSearch({
  restaurant = {},
  includeFavorite = true,
  ...props
}) {
  const {
    name = "Dominos",
    icon = null,
    photos = [],
    address = "32 Moro Drive",
    isOpenNow = false,
    rating = 4.5,
    isClosedTemporarily = true,
    isBookmarked = true,
    placeId,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  const closedComponent = <Text variant="caption">CLOSED TEMPORARILY</Text>;
  return (
    <RestaurantCard elevation={2}>
      {includeFavorite && <Favorite restaurant={restaurant} />}
      <RestaurantCardCover
        source={{
          uri: photos.length ? photos[0] : "https://picsum.photos/700",
        }}
      />
      <Info>
        <Text variant="label">{name}</Text>

        <View style={{ flexDirection: "row" }}>
          <Spacer position="top|bottom" size="large">
            <Row>
              {ratingArray.map((rating, i) => (
                <SvgXml
                  key={`star-${placeId}-${i}`}
                  xml={star}
                  width={36}
                  height={36}
                />
              ))}
            </Row>
          </Spacer>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            {isClosedTemporarily && closedComponent}
            {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            <Spacer position="left" size="medium">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </View>
        </View>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
}

export default ListItemRestaurantSearch;
