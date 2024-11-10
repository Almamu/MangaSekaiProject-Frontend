import { Text as RNText, StyleSheet } from "react-native";
import { TextProps } from "react-native/Libraries/Text/Text";
import { useTheme } from "@react-navigation/native";
import { FontStyles } from "@/themes/fonts";

export function Text({ style, children, ...props }: TextProps) {
  const { colors } = useTheme();

  return (
    <RNText
      style={StyleSheet.flatten([
        { color: colors.textBackground },
        FontStyles.light,
        style,
      ])}
      {...props}
    >
      {children}
    </RNText>
  );
}
