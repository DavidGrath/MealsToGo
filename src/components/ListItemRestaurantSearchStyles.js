import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { Card } from "react-native-paper";

import Text from "./TextComponent";

export const Address = styled(Text)`
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.caption};
`;
export const RestaurantCard = styled(Card)``;
export const RestaurantCardCover = styled(Card.Cover)``;
export const Info = styled(View)`
  padding: ${props => props.theme.space.medium};
`;
export const Row = styled(View)`
  flex-direction: row;
`;
