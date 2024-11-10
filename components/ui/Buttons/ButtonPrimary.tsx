import { Button, ButtonProps } from "./Button";
import { useTheme } from "@react-navigation/native";
import { Fonts } from "@/themes/fonts";

export function ButtonPrimary({ children, ...props }: ButtonProps) {
  const data = useTheme();

  return (
    <Button
      {...props}
      style={[
        props.style,
        {
          backgroundColor: data.colors.primary,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: data.colors.primary,
        },
      ]}
      textStyle={[
        props.textStyle,
        {
          color: data.colors.textLight,
          fontFamily: Fonts.Medium,
          fontSize: 16,
        },
      ]}
    >
      {children}
    </Button>
  );
}
