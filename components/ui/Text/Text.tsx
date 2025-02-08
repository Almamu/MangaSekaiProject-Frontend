import styled from "styled-components/native";

export const Text = styled.Text`
  color: ${({ theme: { colors } }) => colors.textBackground};
  font-family: ${({ theme: { fonts } }) => fonts.light.fontFamily};
  font-size: ${({ theme: { fonts } }) => fonts.light.fontSize};
`;
