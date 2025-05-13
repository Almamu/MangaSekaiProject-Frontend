import styled from "styled-components/native";

export const RegularText = styled.Text`
  color: ${({ theme: { colors } }) => colors.textBackground};
  font-family: ${({ theme: { fonts } }) => fonts.regular.fontFamily};
  font-size: ${({ theme: { fonts } }) => fonts.regular.fontSize};
`;
