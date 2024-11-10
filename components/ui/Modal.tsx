import { PropsWithChildren } from "react";
import {
  Modal as RNModal,
  ModalBaseProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Pressable,
} from "react-native";
import {
  HorizontalLayout,
  ScreenRootView,
  VerticalLayout,
} from "@/components/ui/View";
import { useTheme } from "@react-navigation/native";
import { Title } from "@/components/ui/Text";
import { Icon } from "@/components/ui/Icon";

type Props = {
  close: () => void;
  style?: StyleProp<ViewStyle>;
  title?: string;
} & Omit<ModalBaseProps, "onRequestClose">;

export function Modal({
  style,
  children,
  close,
  animationType = "fade",
  transparent = true,
  title = "",
  ...props
}: PropsWithChildren<Props>) {
  const { colors } = useTheme();

  return (
    <RNModal
      style={[styles.modal]}
      onRequestClose={close}
      animationType={animationType}
      transparent={transparent}
      {...props}
    >
      <ScreenRootView style={{ backgroundColor: `${colors.background}B0` }}>
        <VerticalLayout
          style={StyleSheet.flatten([
            styles.container,
            style,
            { backgroundColor: colors.modalBackground },
          ])}
        >
          <HorizontalLayout>
            <Title style={{ flexGrow: 1, textAlign: "center" }}>{title}</Title>
            <Pressable onPress={close}>
              <Icon icon="close" />
            </Pressable>
          </HorizontalLayout>
          {children}
        </VerticalLayout>
      </ScreenRootView>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "100%",
  },
  container: {
    borderRadius: 15,
    maxWidth: 450,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
});
