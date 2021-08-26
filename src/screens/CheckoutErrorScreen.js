import React from "react";
import { SafeAreaView, View } from "react-native";
import { Avatar } from "react-native-paper";

import Text from "../components/TextComponent";
import { colors } from "../theme/colors";

function CheckoutErrorScreen({ navigation, route }) {
  const params = route.params;
  function emptyCartComponent() {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <Avatar.Icon
            icon="close"
            backgroundColor={colors.ui.error}
            size={128}
          />
          <Text>{params.error}</Text>
        </View>
      </SafeAreaView>
    );
  }
  return emptyCartComponent();
}

export default CheckoutErrorScreen;
