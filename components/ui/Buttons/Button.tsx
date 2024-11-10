import { Pressable, StyleSheet } from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import {
  TextStyle,
  ViewStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import React, { PropsWithChildren } from "react";
import { Href, Link } from "expo-router";
import { Text } from "@/components/ui/Text";

type LinkProps = { href: Href<string | object>; method?: "replace" | "push" };
type ClickProps = { onClick: () => void };
type LinkOrClick = LinkProps | ClickProps;
export type ButtonProps = PropsWithChildren<
  {
    style?: StyleProp<ViewStyle> | undefined;
    textStyle?: StyleProp<TextStyle> | undefined;
    append?: React.ReactNode;
    prepend?: React.ReactNode;
  } & LinkOrClick
>;

export function Button({
  children,
  style,
  textStyle,
  append,
  prepend,
  ...props
}: ButtonProps) {
  if ("href" in props) {
    return (
      <Link
        href={props.href}
        asChild
        push={props.method === "push"}
        replace={!props.method || props.method === "replace"}
      >
        <Pressable style={StyleSheet.flatten([styles.parent, style])}>
          {!!prepend && prepend}
          <Text style={textStyle}>{children}</Text>
          {!!append && append}
        </Pressable>
      </Link>
    );
  } else {
    return (
      <Pressable
        style={StyleSheet.flatten([styles.parent, style])}
        onPress={props.onClick}
      >
        {!!prepend && prepend}
        <Text style={textStyle}>{children}</Text>
        {!!append && append}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    gap: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
});
