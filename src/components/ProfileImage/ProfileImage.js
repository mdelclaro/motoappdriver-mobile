import React, { Fragment } from "react";
import { Navigation } from "react-native-navigation";

import CustomIcon from "../UI/CustomIcon";
import { View, ImageBackground, BackButton } from "./styles";
import { BASE_COLOR } from "../../config";

const ProfileImage = props => {
  const { uri, componentId } = props;

  handleBack = () => {
    Navigation.dismissModal(componentId);
  };

  return (
    <Fragment>
      <BackButton onPress={this.handleBack}>
        <CustomIcon icon={"arrow-left"} size={25} color="#f8f8f8" />
      </BackButton>
      <View style={{ backgroundColor: BASE_COLOR }}>
        <ImageBackground source={uri} resizeMode="center" />
      </View>
    </Fragment>
  );
};

export default ProfileImage;
