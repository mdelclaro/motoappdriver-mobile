import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { BASE_COLOR } from "../../config";

export const View = styled.View`
  flex: 1;
`;

export const ImageBackground = styled.Image`
  flex: 1;
`;

export const BackButton = styled.TouchableOpacity`
  flex: 0;
  border-radius: 100px;
  height: 55px;
  width: 55px;
  margin: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 5px;
  top: 15px;
`;
