import { ViewProps } from "react-native";
import { LayoutView } from "./LayoutView";

export function HorizontalLayout({ style, ...props }: ViewProps) {
  return (
    <LayoutView
      style={[
        {
          flexDirection: "row",
        },
        style,
      ]}
      {...props}
    ></LayoutView>
  );
}
