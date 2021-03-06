import React, { Fragment } from "react";
import { Navigation } from "react-native-navigation";

import CustomIcon from "../UI/CustomIcon";
import { View, ImageBackground, BackButton, Container } from "./styles";
import { BASE_COLOR, BACKGROUND_COLOR } from "../../config";

const ProfileImage = props => {
  const { uri, componentId } = props;

  handleBack = () => {
    Navigation.dismissModal(componentId);
  };

  return (
    <View>
      <ImageBackground source={uri} resizeMode="center">
        <Container>
          <BackButton onPress={this.handleBack}>
            <CustomIcon icon={"x"} size={30} color={BACKGROUND_COLOR} />
          </BackButton>
        </Container>
      </ImageBackground>
    </View>
  );
};

export default ProfileImage;
