import { Button, ButtonProps } from "./Button";
import { useTheme } from "@react-navigation/native";
import { Fonts } from "@/themes/fonts";

type Props = ButtonProps & { muted?: boolean };

export function ButtonPrimary({ muted, ...props }: Props) {
  const data = useTheme();

  return (
    <Button
      {...props}
      style={[
        props.style,
        {
          backgroundColor: muted ? "transparent" : data.colors.primary,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: data.colors.primary,
        },
      ]}
      textStyle={[
        props.textStyle,
        {
          color: muted ? data.colors.textDark : data.colors.textLight,
          fontFamily: Fonts.Medium,
          fontSize: 16,
        },
      ]}
    ></Button>
  );
}
