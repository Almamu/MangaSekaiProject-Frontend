import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  TextStyle,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Fonts } from "@/themes/fonts";
import React from "react";

export type TextInputProps = {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  prependStyle?: StyleProp<TextStyle>;
  appendStyle?: StyleProp<ViewStyle>;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  prependPress?: () => void;
  appendPress?: () => void;
} & Omit<RNTextInputProps, "style">;

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
    <View
      style={StyleSheet.flatten([
        styles.parent,
        { borderColor: colors.primary, backgroundColor: colors.primary100 },
        style,
      ])}
    >
      {prepend && (
        <Pressable
          onPress={prependPress}
          style={StyleSheet.flatten([
            styles.append,
            { backgroundColor: colors.primary },
            prependStyle,
          ])}
        >
          {prepend}
        </Pressable>
      )}
      <RNTextInput
        style={StyleSheet.flatten([styles.text, inputStyle])}
        placeholderTextColor={colors.textBackground}
        {...props}
      ></RNTextInput>
      {append && (
        <Pressable
          onPress={appendPress}
          style={StyleSheet.flatten([
            styles.append,
            { backgroundColor: colors.primary },
            appendStyle,
          ])}
        >
          {append}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    borderWidth: 2,
    flexDirection: "row",
    gap: 10,
    alignSelf: "stretch",
    borderRadius: 5,
  },
  text: {
    flexGrow: 1,
    // @ts-expect-error outlineStyle only exists for react-native-web
    outlineStyle: "none",
    padding: 10,
    // here to prevent issues with web version, due to font size the input gets bigger
    // there's some minimum size established in browsers that make it go nuts a little bit
    // and this handles that
    width: 0,
    fontSize: 16,
    fontFamily: Fonts.Normal,
  },
  append: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
