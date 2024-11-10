import { PropsWithChildren, useEffect, useState } from "react";
import { DarkTheme } from "@/themes/dark";
import { LightTheme } from "@/themes/light";
import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/poppins";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SplashScreen } from "expo-router";
import { Appearance, useColorScheme } from "react-native";
import { Platform } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { AppThemeContext } from "@/hooks/useColorScheme";
import setColorScheme = Appearance.setColorScheme;

export function AppTheme({ children }: PropsWithChildren) {
  const scheme = useColorScheme() || "dark";
  const [overridenScheme, setOverridenScheme] = useState<
    "dark" | "light" | null
  >(null);

  const [loaded, _error] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // TODO: HANDLE ERROR

  return (
    <ThemeProvider
      value={(overridenScheme || scheme) === "dark" ? DarkTheme : LightTheme}
    >
      <AppThemeContext.Provider
        value={{
          colorScheme:
            overridenScheme ??
            (Platform.OS === "web"
              ? window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
              : scheme),
          overrideColorScheme: (color: "dark" | "light" | null) => {
            if (Platform.OS !== "web") {
              setColorScheme(color);
            }

            setOverridenScheme(color);
          },
        }}
      >
        {children}
      </AppThemeContext.Provider>
    </ThemeProvider>
  );
}
