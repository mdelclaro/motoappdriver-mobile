import React from "react";
import { Image } from "react-native";

import { Container, Title, Description } from "./styles";

import avatar from "../../assets/avatar/avatar.png";

const Online = () => {
  return (
    <Container>
      <Title>Você está online!</Title>
      <Image
        source={avatar}
        style={{
          paddingBottom: 3,
          width: 60,
          height: 60,
          resizeMode: "center",
          borderRadius: 100
        }}
      />
      <Description>Aguardando corridas...</Description>
    </Container>
  );
};

export default Online;
