import { View, ViewProps } from "react-native";

export function LayoutView({ style, ...props }: ViewProps) {
  return (
    <View
      style={[
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 10,
        },
        style,
      ]}
      {...props}
    ></View>
  );
}
