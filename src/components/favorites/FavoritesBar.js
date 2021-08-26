import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

import Spacer from "../Spacer";
import CompactInfoCard from "../CompactInfoCard";

const FavoritesWrapper = styled(Card)`
  padding: 16px;
  z-index: 999;
  border-radius: 15px;
`;
function FavoritesBar({ favorites, onDetail, ...props }) {
  if (!favorites.length) {
    return null;
  }
  return (
    <FavoritesWrapper elevation={3}>
      <Spacer position="left" size="medium">
        <Text>Favorites</Text>
      </Spacer>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {favorites.map(function (r) {
          const key = r.name;
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableOpacity
                onPress={function () {
                  onDetail(r);
                }}>
                <CompactInfoCard restaurant={r} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavoritesWrapper>
  );
}

export default FavoritesBar;
