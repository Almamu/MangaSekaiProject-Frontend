import { createContext, useContext } from "react";

type AppThemeContextProps = {
  colorScheme: "dark" | "light";
  overrideColorScheme: (color: "dark" | "light" | null) => void;
};

export const AppThemeContext = createContext<AppThemeContextProps>({
  colorScheme: "dark",
  overrideColorScheme: () => {},
});

export function useColorScheme(): [
  "dark" | "light",
  (color: "dark" | "light" | null) => void,
] {
  const context = useContext(AppThemeContext);

  return [context.colorScheme, context.overrideColorScheme];
}
