import { FontStyles } from "@/themes/fonts";
import { DefaultTheme } from "styled-components/native";

export const DarkTheme: DefaultTheme = {
  dark: true,
  colors: {
    background: "#414458",
    primary: "#7683CD",
    primary100: "#C4C9EA",
    textLight: "#FFF",
    textDark: "#000",
    textBackground: "#fff",
    analogous2: "#9476CD",
    error: "#A42437",
    modalBackground: "#9476CD",
    card: "#7683CD",
    text: "#fff",
    border: "#C4C9EA",
    notification: "#9476CD",
  },
  fonts: FontStyles,
  sizes: {
    cover: {
      width: 160,
      height: 250,
    },
  },
};
