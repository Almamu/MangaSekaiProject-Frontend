import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { StyleSheet } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

type Props = {
  style?: StyleProp<ViewStyle>;
} & SafeAreaViewProps;

export function ScreenRootView({
  style,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <SafeAreaView style={[styles.container, style]} {...props}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
