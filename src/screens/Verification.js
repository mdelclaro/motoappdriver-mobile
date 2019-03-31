import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import HeadingText from "../components/UI/HeadingText";
import MainText from "../components/UI/MainText";

import { baseColor } from "../config";
import flags from "../assets/flags/flags.png";

const Verification = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <MainText>
          <HeadingText style={{ color: baseColor }}>MotoApp</HeadingText>
          <HeadingText style={{ color: "#ddd" }}> Driver</HeadingText>
        </MainText>
      </View>

      <View style={styles.contentContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          >
            Obrigado por se cadastrar no MotoApp Driver!
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={flags} style={styles.image} />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            Já recebemos os seus dados e estamos em fase de análise. Você irá
            receber um retorno de nossa equipe dentro de 1 a 2 semanas.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={{ fontSize: 14, textAlign: "center" }}>
            Em caso de dúvidas, entre em contato pelo email
            <Text style={{ fontWeight: "bold" }}> contato@motoapp.com</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  titleContainer: {
    justifyContent: "flex-start",
    paddingTop: 60
  },
  contentContainer: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    alignContent: "center",
    alignItems: "center",
    paddingTop: 60
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "center",
    borderRadius: 100
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20
  }
});

export default Verification;
