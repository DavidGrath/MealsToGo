import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { LocationContext } from "../../api/location/LocationContext";

const SearchContainer = styled(View)`
  padding: ${props => props.theme.space.medium};
  position: absolute;
  z-index: 999;
  top: 40px;
  width: 100%;
`;

function MapSearch() {
  const locationContext = useContext(LocationContext);
  const contextKeyword = locationContext.keyword;
  const [searchKeyword, setSearchKeyword] = useState(contextKeyword);
  useEffect(
    function () {
      setSearchKeyword(contextKeyword);
    },
    [contextKeyword],
  );

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        icon="map"
        value={searchKeyword}
        onSubmitEditing={function ({ nativeEvent: term }) {
          locationContext.search(searchKeyword);
        }}
        onChangeText={function (text) {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
}

export default MapSearch;
