import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { WebView } from "react-native-webview";

import Text from "./TextComponent";

const MapPicture = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;
const WebPicture = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

function CompactInfoCard({ restaurant, isOnMapView = false, ...props }) {
  const isAndroid = Platform.OS === "android";
  const Image = isAndroid && isOnMapView ? WebPicture : MapPicture;
  return (
    <View style={{ padding: 10, maxWidth: 120, alignItems: "center" }}>
      <Image source={{ uri: restaurant.photos[0] }} />
      <Text>{restaurant.name}</Text>
    </View>
  );
}

export default CompactInfoCard;
