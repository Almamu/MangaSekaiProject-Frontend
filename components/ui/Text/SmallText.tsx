import styled from "styled-components/native";

export const SmallText = styled.Text`
  color: ${({ theme: { colors } }) => colors.textBackground};
  font-family: ${({ theme: { fonts } }) => fonts.small.fontFamily};
  font-size: ${({ theme: { fonts } }) => fonts.small.fontSize};
`;
