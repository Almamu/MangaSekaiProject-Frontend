import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Icon as ExpoIconList } from "@expo/vector-icons/build/createIconSet";
import { TextStyle, StyleProp, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

type IconList<T> = T extends ExpoIconList<infer U, infer _> ? U : never;

type Props = {
  icon: IconList<typeof FontAwesome>;
  style?: StyleProp<TextStyle>;
};

export function Icon({ icon, style }: Props) {
  const { colors } = useTheme();

  return (
    <FontAwesome
      style={StyleSheet.flatten([
        { color: colors.textLight },
        { fontSize: 20 },
        style,
      ])}
      name={icon}
    />
  );
}
