import { PropsWithChildren, ReactNode } from "react";
import { ModalBaseProps, StyleProp, ViewStyle, Pressable } from "react-native";
import {
  HorizontalLayout,
  ScreenRootView,
  VerticalLayout,
} from "@/components/ui/View";
import { useTheme } from "styled-components/native";
import { Title } from "@/components/ui/Text";
import { Icon } from "@/components/ui/Icon";
import styled from "styled-components/native";

type Props = {
  close: () => void;
  style?: StyleProp<ViewStyle>;
  title?: string;
  beforeElement?: ReactNode;
} & Omit<ModalBaseProps, "onRequestClose">;

const RNModal = styled.Modal`
  width: 100%;
  height: 100%;
`;

const Container = styled(VerticalLayout)`
  border-radius: 15px;
  max-width: 450px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  background-color: ${({ theme: { colors } }) => colors.modalBackground};
`;

export function Modal({
  style,
  children,
  close,
  beforeElement,
  animationType = "fade",
  transparent = true,
  title = "",
  ...props
}: PropsWithChildren<Props>) {
  const { colors } = useTheme();

  return (
    <RNModal
      onRequestClose={close}
      animationType={animationType}
      transparent={transparent}
      {...props}
    >
      <ScreenRootView style={{ backgroundColor: `${colors.background}B0` }}>
        <Container style={style}>
          <HorizontalLayout>
            {beforeElement}
            <Title style={{ flexGrow: 1, textAlign: "center" }}>{title}</Title>
            <Pressable onPress={close}>
              <Icon name="close" />
            </Pressable>
          </HorizontalLayout>
          {children}
        </Container>
      </ScreenRootView>
    </RNModal>
  );
}
