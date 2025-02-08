import { Button } from "./Button";
import styled, { css, toStyleSheet } from "styled-components/native";
import { StyleSheet } from "react-native";

export const ButtonPrimary = styled(Button).attrs<{ muted?: boolean }>(
  ({ muted, theme: { colors, fonts }, textStyle }) => ({
    textStyle: StyleSheet.flatten([
      toStyleSheet(css`
        color: ${muted ? colors.textDark : colors.textLight};
        font-family: ${fonts.medium.fontFamily};
        font-size: 16px;
      `),
      textStyle,
    ]),
  })
)`
  background-color: ${({ muted, theme: { colors } }) =>
    muted ? "transparent" : colors.primary};
  border: 2px solid ${({ theme: { colors } }) => colors.primary};
`;
