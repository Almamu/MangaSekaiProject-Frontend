import {
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";

export type TextInputProps = {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  prependStyle?: StyleProp<ViewStyle>;
  appendStyle?: StyleProp<ViewStyle>;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  prependPress?: () => void;
  appendPress?: () => void;
} & Omit<RNTextInputProps, "style">;

const Container = styled.View`
  border: 2px solid ${({ theme: { colors } }) => colors.primary};
  background-color: ${({ theme: { colors } }) => colors.primary100};
  flex-direction: row;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
`;

const RNTextInput = styled.TextInput`
  flex-grow: 1;
  outline-style: none;
  padding: 10px;
  /*
   * here to prevent issues with the web version, due to font size the input gets bigger
   * there's some minimum size established in browsers that make it go nuts a little bit
   * and this handles that
   */
  width: 0;
  font-size: 16px;
  font-family: ${({ theme: { fonts } }) => fonts.regular.fontFamily};
`;

const AppendPressable = styled.Pressable`
  background-color: ${({ theme: { colors } }) => colors.primary};
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export function TextInput({
  style,
  inputStyle,
  prependStyle,
  appendStyle,
  append,
  prepend,
  appendPress,
  prependPress,
  ...props
}: TextInputProps) {
  const { colors } = useTheme();

  return (
    <Container style={style}>
      {prepend && (
        <AppendPressable onPress={prependPress} style={prependStyle}>
          {prepend}
        </AppendPressable>
      )}
      <RNTextInput
        style={inputStyle}
        placeholderTextColor={colors.textBackground}
        {...props}
      ></RNTextInput>
      {append && (
        <AppendPressable onPress={appendPress} style={appendStyle}>
          {append}
        </AppendPressable>
      )}
    </Container>
  );
}
