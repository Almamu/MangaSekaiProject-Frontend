import { PropsWithChildren } from "react";

declare module "@react-navigation/native" {
  export function ThemeProvider(props: PropsWithChildren<{ value: Theme }>);
  export function useTheme(): NativeTheme;

  // WARNING: HAVE TO KEEP UP TO DATE WITH ORIGINAL DEFINITION TO ADD EXTRA INFO...
  type FontStyle = {
    fontFamily: string;
    fontWeight:
      | "normal"
      | "bold"
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900";
    fontSize: number;
  };
  export interface NativeTheme {
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
    };
    fonts: {
      regular: FontStyle;
      medium: FontStyle;
      bold: FontStyle;
      heavy: FontStyle;
    };
  }

  export type Theme = NativeTheme;
}
