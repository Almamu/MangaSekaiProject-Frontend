import { TextProps } from "react-native/Libraries/Text/Text";
import { Text } from "@/components/ui/Text/Text";
import { FontStyles } from "@/themes/fonts";

export function Title({ style, children, ...props }: TextProps) {
  return (
    <Text style={[style, FontStyles.title]} {...props}>
      {children}
    </Text>
  );
}
