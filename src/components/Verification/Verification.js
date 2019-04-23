import React from "react";
import { View, Text } from "react-native";

import {
  Container,
  TitleContainer,
  ContentContainer,
  ImageContainer,
  Image,
  Footer,
  TextOne,
  TextTwo,
  TextThree,
  TextFooter,
  TitleText,
  TitleTextSecondary
} from "./styles";
import flags from "../../assets/flags/flags.png";

const Verification = () => {
  return (
    <Container>
      <TitleContainer>
        <Text>
          <TitleText>MotoApp</TitleText>
          <TitleTextSecondary> Driver</TitleTextSecondary>
        </Text>
      </TitleContainer>

      <ContentContainer>
        <View>
          <TextOne>Obrigado por se cadastrar no MotoApp Driver!</TextOne>
        </View>

        <ImageContainer>
          <Image source={flags} />
        </ImageContainer>

        <View>
          <TextTwo>
            Já recebemos os seus dados e estamos em fase de análise. Você irá
            receber um retorno de nossa equipe dentro de 1 a 2 semanas.
          </TextTwo>
        </View>

        <Footer>
          <TextThree>
            Em caso de dúvidas, entre em contato pelo email
            <TextFooter> contato@motoapp.com</TextFooter>
          </TextThree>
        </Footer>
      </ContentContainer>
    </Container>
  );
};

export default Verification;
