import { PropsWithChildren, ReactNode } from "react";
import {
  ModalBaseProps,
  StyleProp,
  ViewStyle,
  Pressable,
  View,
} from "react-native";
import { ScreenRootView } from "@/components/ui/View";
import { TitleCenter } from "@/components/ui/Text";
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

const ModalContainer = styled(ScreenRootView)`
  background-color: ${({ theme: { colors } }) => colors.background}B0;
  align-items: center;
  justify-content: center;
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  border-radius: 15px;
  max-width: 450px;
  width: 100%;
  display: flex;
  align-self: center;
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
  return (
    <RNModal
      onRequestClose={close}
      animationType={animationType}
      transparent={transparent}
      {...props}
    >
      <ModalContainer>
        <Container style={style}>
          <Header>
            {beforeElement && beforeElement}
            <TitleCenter style={{ flexGrow: 1 }}>{title}</TitleCenter>
            <Pressable onPress={close}>
              <Icon name="close" />
            </Pressable>
          </Header>
          <View>{children}</View>
        </Container>
      </ModalContainer>
    </RNModal>
  );
}
