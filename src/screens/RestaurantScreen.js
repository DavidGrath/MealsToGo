import React from "react";
import styled from "styled-components/native";
import { View, Text, SafeAreaView, StatusBar, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";

import { ListItemRestaurantSearch } from "../components/ListItemRestaurantSearch";
import Spacer from "../components/Spacer";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const RestaurantListContainer = styled(View)`
  padding: ${props => props.theme.space.regular};
  background-color: ${props => props.theme.colors.ui.error};
  flex: 1;
`;

const SearchContainer = styled(View)`
  padding: ${props => props.theme.space.medium};
`;

export function RestaurantScreen() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const names = [
    "Obi-Wan",
    "Naruto",
    "Jughead",
    "Darkseid",
    "Zoro",
    "Jojo",
    "Mario",
    "Octocat",
    "Sub-Zero",
    "Mickey",
  ];
  const data = [];
  for (let i = 0; i < 10; i++) {
    const item = {};
    item.name = names[i];
    item.id = arr[i];
    data.push(item);
  }
  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar placeholder="Search" />
      </SearchContainer>
      <FlatList
        data={data}
        renderItem={item => (
          <Spacer position="bottom" size="medium">
            <ListItemRestaurantSearch restaurant={item.item} />
          </Spacer>
        )}
        keyExtractor={item => item.name}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeArea>
  );
}
