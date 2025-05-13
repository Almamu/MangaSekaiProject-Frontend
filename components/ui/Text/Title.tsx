import { LightText } from "@/components/ui/Text/LightText";
import styled from "styled-components/native";

export const Title = styled(LightText)`
  font-family: ${({ theme: { fonts } }) => fonts.title.fontFamily};
  font-size: ${({ theme: { fonts } }) => fonts.title.fontSize};
`;

export const TitleCenter = styled(Title)`
  text-align: center;
`;
