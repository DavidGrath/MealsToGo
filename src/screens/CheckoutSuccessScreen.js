import React from "react";
import { SafeAreaView, View } from "react-native";
import { Avatar } from "react-native-paper";

import Text from "../components/TextComponent";
import { colors } from "../theme/colors";

function CheckoutSuccessScreen({ navigation, route }) {
  function emptyCartComponent() {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <Avatar.Icon
            icon="check-bold"
            backgroundColor={colors.brand.primary}
            size={128}
          />
          <Text>Success!</Text>
        </View>
      </SafeAreaView>
    );
  }
  return emptyCartComponent();
}

export default CheckoutSuccessScreen;
