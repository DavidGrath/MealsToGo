import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { List, Avatar } from "react-native-paper";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { AuthenticationContext } from "../api/authentication/AuthenticationContext";
import Spacer from "../components/Spacer";
import Text from "../components/TextComponent";
import { STORAGE_KEYS } from "../util/constants";
import { colors } from "../theme/colors";

const ListItem = styled(List.Item)`
  margin-top: ${props => props.theme.space.small};
  padding: ${props => props.theme.space.regular};
  background-color: rgba(255, 255, 255, 0.4);
`;

const BackgroundImage = styled(ImageBackground)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

function SettingsScreen({ navigation, ...props }) {
  const [profileUri, setProfileUri] = useState(null);
  const authenticationContext = useContext(AuthenticationContext);
  const user = authenticationContext.user;

  async function getProfilePicture(currentUser) {
    const photoUri = await AsyncStorage.getItem(
      `${STORAGE_KEYS.USER_PROFILE}-${currentUser.uid}`,
    );
    if (!photoUri) {
      return;
    }
    setProfileUri(photoUri);
  }

  useFocusEffect(
    function () {
      getProfilePicture(user);
    },
    [user],
  );

  const avatar = profileUri ? (
    <Avatar.Image size={180} source={{ uri: profileUri }} />
  ) : (
    <Avatar.Icon
      size={180}
      icon="human"
      backgroundColor={colors.brand.primary}
    />
  );

  const image = require("../../assets/home_bg.jpg");

  return (
    <BackgroundImage source={image} resizeMode="cover">
      <SafeAreaView style={{ backgroundColor: "transparent" }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={function () {
              navigation.navigate("settings_camera");
            }}>
            {avatar}
          </TouchableOpacity>
          <Spacer position="top" size="medium">
            <Text variant="caption">{user.email}</Text>
          </Spacer>
        </View>
        <List.Section>
          <ListItem
            title="Favorites"
            description="View your favorites"
            onPress={function () {
              navigation.navigate("settings_favorites");
            }}
            left={function (props) {
              return (
                <List.Icon {...props} color={colors.ui.error} icon="heart" />
              );
            }}
          />
          <ListItem
            title="Payment"
            onPress={function () {
              return;
            }}
            left={function (props) {
              return (
                <List.Icon {...props} color={colors.ui.secondary} icon="cart" />
              );
            }}
          />
          <ListItem
            title="Past Orders"
            onPress={function () {
              return;
            }}
            left={function (props) {
              return (
                <List.Icon
                  {...props}
                  color={colors.ui.secondary}
                  icon="history"
                />
              );
            }}
          />
          <ListItem
            title="Logout"
            onPress={function () {
              authenticationContext.onLogout();
            }}
            left={function (props) {
              return (
                <List.Icon {...props} color={colors.ui.secondary} icon="door" />
              );
            }}
          />
        </List.Section>
      </SafeAreaView>
    </BackgroundImage>
  );
}

export default SettingsScreen;
