import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { useTheme } from "styled-components/native";

type Props = Omit<ActivityIndicatorProps, "color">;

export function Loader(props: Props) {
  const { colors } = useTheme();

  return <ActivityIndicator color={colors.primary} {...props} />;
}
