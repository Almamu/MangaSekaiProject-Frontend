import "styled-components";
import "styled-components/native";
import { FontStyle } from "@react-navigation/native";

interface BaseTheme {
  dark: boolean;
  colors: {
    primary: string;
    primary100: string;
    textLight: string;
    textDark: string;
    background: string;
    textBackground: string;
    analogous2: string;
    error: string;
    modalBackground: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  fonts: {
    light: FontStyle;
    regular: FontStyle;
    medium: FontStyle;
    bold: FontStyle;
    heavy: FontStyle;
  };
}
s;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends BaseTheme {}
}

declare module "styled-components/native" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends BaseTheme {}
}
