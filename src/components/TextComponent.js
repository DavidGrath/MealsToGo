import React from "react";
import styled from "styled-components/native";

function defaultTextStyles(theme) {
  return `
        font-family: ${theme.fonts.body};
        font-weight: ${theme.fontWeights.regular};
        color: ${theme.colors.text.primary};
        flex-wrap: wrap;
        margin-top: 0px;
        margin-bottom: 0px;
    `;
}

function body(theme) {
  return `
        font-family: ${theme.fonts.body};
    `;
}

function label(theme) {
  return `
        font-family: ${theme.fonts.heading};
        font-size: ${theme.fontSizes.body};
        font-weight: ${theme.fontWeights.medium};
    `;
}
function caption(theme) {
  return `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
    `;
}
function error(theme) {
  return `
        color: ${theme.colors.text.error};
    `;
}
function hint(theme) {
  return `
        font-size: ${theme.fontSizes.caption};
    `;
}

const variants = {
  body,
  label,
  caption,
  error,
  hint,
};

const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

export default Text;

Text.defaultProps = {
  variant: "body",
};
