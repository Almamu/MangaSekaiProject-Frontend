import styled from "styled-components/native";

export const LightText = styled.Text`
  color: ${({ theme: { colors } }) => colors.textBackground};
  font-family: ${({ theme: { fonts } }) => fonts.light.fontFamily};
  font-size: ${({ theme: { fonts } }) => fonts.light.fontSize};
`;

export const LightTextCenter = styled(LightText)`
  text-align: center;
`;

export const LightTextRight = styled(LightText)`
  text-align: right;
`;
