import styled from "styled-components/native";
import { BASE_COLOR, BACKGROUND_COLOR } from "../../config";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: ${BACKGROUND_COLOR};
`;

export const TitleContainer = styled.View`
  justify-content: flex-start;
  padding-top: 50px;
  padding-bottom: 20px;
`;

export const TitleText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${BASE_COLOR};
`;

export const TitleTextSecondary = styled(TitleText)`
  color: #ddd;
`;

export const TextOne = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const TextTwo = styled.Text`
  font-size: 16px;
  text-align: center;
`;

export const TextThree = styled.Text`
  font-size: 14px;
  text-align: center;
`;

export const TextFooter = styled.Text`
  font-weight: bold;
`;

export const ContentContainer = styled.View`
  flex: 1;
  margin-left: 30px;
  margin-right: 30px;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
  margin: 20px;
`;
export const Image = styled.Image`
  width: 120px;
  height: 120px;
  resize-mode: center;
  border-radius: 100px;
`;
export const Footer = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-bottom: 20px;
`;
