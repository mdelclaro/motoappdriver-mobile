import React, { Fragment } from "react";
import { View, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";

import {
  Container,
  ContentContainer,
  ImageContainer,
  Image,
  MainText,
  SecondaryText,
  Border,
  FooterContainer,
  Footer,
  BackButton
} from "./styles";
import CustomIcon from "../UI/CustomIcon";
import { BASE_COLOR, IMAGES_URL, BACKGROUND_COLOR } from "../../config";

const Profile = props => {
  const { nome, sobrenome, email, corridas, avaliacoes, imgPerfil } = props;
  const total = avaliacoes.reduce((total, item) => total + item.nota, 0);
  const nota = total / avaliacoes.length;
  return (
    <Fragment>
      <Container>
        <ImageContainer>
          <Border>
            <Image
              source={{ uri: IMAGES_URL + imgPerfil }}
              resizeMode="cover"
            />
          </Border>
        </ImageContainer>

        <ContentContainer>
          <MainText>
            {nome} {sobrenome}
          </MainText>
          <View style={{ flexDirection: "row" }}>
            <SecondaryText>{email} </SecondaryText>
            <TouchableOpacity>
              <CustomIcon icon={"edit-2"} size={15} color={BACKGROUND_COLOR} />
            </TouchableOpacity>
          </View>
        </ContentContainer>

        <FooterContainer>
          <View>
            <Footer>
              <CustomIcon icon="map-pin" size={30} color={BASE_COLOR} />
            </Footer>
            <MainText>{corridas.length}</MainText>
            <SecondaryText>Corrida(s)</SecondaryText>
          </View>
          <View>
            <Footer>
              <CustomIcon icon="star" size={30} color={BASE_COLOR} />
            </Footer>
            <MainText>{nota}/5</MainText>
            <SecondaryText>Nota</SecondaryText>
          </View>
        </FooterContainer>
      </Container>

      <BackButton onPress={() => Navigation.dismissAllModals()}>
        <CustomIcon icon={"arrow-left"} size={25} color={BACKGROUND_COLOR} />
      </BackButton>
    </Fragment>
  );
};

export default Profile;
