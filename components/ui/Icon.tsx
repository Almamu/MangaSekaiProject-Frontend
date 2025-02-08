import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Icon as ExpoIconList } from "@expo/vector-icons/build/createIconSet";
import styled from "styled-components/native";

type IconList<T> = T extends ExpoIconList<infer U, infer _> ? U : never;

export const Icon = styled(FontAwesome).attrs<{
  muted?: boolean;
  icon: IconList<typeof FontAwesome>;
}>(({ icon }) => ({
  name: icon,
}))`
  color: ${({ muted, theme: { colors } }) =>
    muted ? colors.textDark : colors.textLight};
  font-size: 20px;
`;
