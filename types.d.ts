import "@react-navigation/native";
import { PropsWithChildren } from "react";

declare module "@react-navigation/native" {
  export function ThemeProvider(props: PropsWithChildren<{ value: Theme }>);

  export type Theme = {
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
    };
  };
}
