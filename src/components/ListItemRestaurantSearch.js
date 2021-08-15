import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

// import star_border from "../../assets/vector-icons/star_border.svg";
// import star_border from "../../assets/vector-icons/star_24px.svg";
import star from "../../assets/vector-icons/star.svg";
import open from "../../assets/vector-icons/open.svg";
import Spacer from "./Spacer";
import Text from "./TextComponent";
import {
  Address,
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Row,
} from "./ListItemRestaurantSearchStyles";

export function ListItemRestaurantSearch({ restaurant = {} }) {
  const {
    name = "Dominos",
    icon = null,
    photos = [],
    address = "32 Moro Drive",
    openingHours = 480,
    rating = 4.5,
    isClosedTemporarily = true,
    isBookmarked = true,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));
  const date = new Date();
  const minutesTotal = date.getHours() * 60 + date.getMinutes();
  const openNow = minutesTotal >= openingHours && !isClosedTemporarily;

  const closedComponent = <Text variant="caption">CLOSED TEMPORARILY</Text>;

  return (
    <RestaurantCard elevation={0}>
      <RestaurantCardCover source={{ uri: "https://picsum.photos/700" }} />
      <Info>
        <Text variant="label">{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Spacer position="top|bottom" size="large">
            <Row>
              {ratingArray.map(() => (
                <SvgXml xml={star} width={36} height={36} />
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
            {openNow && <SvgXml xml={open} width={36} height={36} />}
          </View>
        </View>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
}
