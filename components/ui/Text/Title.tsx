import { Text } from "@/components/ui/Text/Text";
import styled from "styled-components/native";

export const Title = styled(Text)`
  font-family: ${({ theme: { fonts } }) => fonts.title.fontFamily};
  font-size: ${({ theme: { fonts } }) => fonts.title.fontSize};
`;
