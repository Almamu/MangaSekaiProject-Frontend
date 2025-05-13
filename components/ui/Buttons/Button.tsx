import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import {
  TextStyle,
  ViewStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import React, { PropsWithChildren } from "react";
import { Href, Link } from "expo-router";
import { LightText } from "@/components/ui/Text";
import styled from "styled-components/native";

type LinkProps = { href: Href; method?: "replace" | "push" };
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

const ButtonContainer = styled.Pressable`
  gap: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  padding: 16px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

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
        <ButtonContainer style={style}>
          {!!prepend && prepend}
          <LightText style={textStyle}>{children}</LightText>
          {!!append && append}
        </ButtonContainer>
      </Link>
    );
  } else {
    return (
      <ButtonContainer style={style} onPress={props.onClick}>
        {!!prepend && prepend}
        <LightText style={textStyle}>{children}</LightText>
        {!!append && append}
      </ButtonContainer>
    );
  }
}
