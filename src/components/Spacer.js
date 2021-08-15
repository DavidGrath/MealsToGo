import React from "react";
import { View } from "react-native";
import styled, { useTheme } from "styled-components/native";

function sizeVariants(theme) {
  return {
    small: theme.space.small,
    medium: theme.space.medium,
    large: theme.space.large,
  };
}

const positionVariants = {
  top: "margin-top",
  left: "margin-left",
  bottom: "margin-bottom",
  right: "margin-right",
};

const SpacerView = styled(View)`
  ${({ styling }) => styling}
`;

function Spacer({ position, size, children }) {
  const theme = useTheme();
  const split = position.split("|");
  const sizeVar = sizeVariants(theme);
  let style = "";
  split.forEach(s => {
    if (!positionVariants[s] || !sizeVar[size]) {
      return;
    }
    style = style.concat(`${positionVariants[s]}: ${sizeVar[size]};\n`);
  });
  return <SpacerView styling={style}>{children}</SpacerView>;
}

Spacer.defaultProps = {
  position: "top",
  size: "small",
};
export default Spacer;
