import React from "react";
import { Button } from "react-native-paper";
import { colors } from "../../theme/colors";

function OrderButton({ children, ...props }) {
  return (
    <Button
      onPress={props.onPress}
      icon="cash"
      mode="contained"
      color={colors.brand.primary}
      style={{ padding: 16, width: "80%", alignSelf: "center" }}>
      {children}
    </Button>
  );
}

export default OrderButton;
