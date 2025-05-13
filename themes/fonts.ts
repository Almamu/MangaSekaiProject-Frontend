import { StyleSheet } from "react-native";

const FontNames = {
  Poppins_100Thin: "Poppins_100Thin",
  Poppins_100Thin_Italic: "Poppins_100Thin_Italic",
  Poppins_200ExtraLight: "Poppins_200ExtraLight",
  Poppins_200ExtraLight_Italic: "Poppins_200ExtraLight_Italic",
  Poppins_300Light: "Poppins_300Light",
  Poppins_300Light_Italic: "Poppins_300Light_Italic",
  Poppins_400Regular: "Poppins_400Regular",
  Poppins_400Regular_Italic: "Poppins_400Regular_Italic",
  Poppins_500Medium: "Poppins_500Medium",
  Poppins_500Medium_Italic: "Poppins_500Medium_Italic",
  Poppins_600SemiBold: "Poppins_600SemiBold",
  Poppins_600SemiBold_Italic: "Poppins_600SemiBold_Italic",
  Poppins_700Bold: "Poppins_700Bold",
  Poppins_700Bold_Italic: "Poppins_700Bold_Italic",
  Poppins_800ExtraBold: "Poppins_800ExtraBold",
  Poppins_800ExtraBold_Italic: "Poppins_800ExtraBold_Italic",
  Poppins_900Black: "Poppins_900Black",
  Poppins_900Black_Italic: "Poppins_900Black_Italic",
};

const Fonts = {
  Light: FontNames.Poppins_300Light,
  Regular: FontNames.Poppins_400Regular,
  Medium: FontNames.Poppins_500Medium,
  Bold: FontNames.Poppins_700Bold,
  Heavy: FontNames.Poppins_900Black,
};

export const FontStyles = StyleSheet.create({
  light: {
    fontSize: 20,
    fontFamily: Fonts.Light,
    fontWeight: "300",
  },
  regular: {
    fontSize: 20,
    fontFamily: Fonts.Regular,
    fontWeight: "400",
  },
  medium: {
    fontSize: 20,
    fontFamily: Fonts.Medium,
    fontWeight: "500",
  },
  bold: {
    fontSize: 20,
    fontFamily: Fonts.Bold,
    fontWeight: "700",
  },
  heavy: {
    fontSize: 20,
    fontFamily: Fonts.Heavy,
    fontWeight: "900",
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.Medium,
    fontWeight: "500",
  },
  small: {
    fontSize: 12,
    fontFamily: Fonts.Regular,
    fontWeight: "400",
  },
});
