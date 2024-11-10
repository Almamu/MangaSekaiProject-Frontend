import { ViewProps } from "react-native";
import { LayoutView } from "./LayoutView";

export function VerticalLayout({ style, ...props }: ViewProps) {
  return (
    <LayoutView
      style={[
        {
          flexDirection: "column",
        },
        style,
      ]}
      {...props}
    ></LayoutView>
  );
}
