import React, { Component, Fragment } from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { Navigation } from "react-native-navigation";
import { getImageSource } from "react-native-vector-icons/Ionicons";

import Map from "../components/Map/Map";

class Main extends Component {
  static get options() {
    return {
      topBar: {
        animate: true,
        drawBehind: true,
        transparent: true,
        translucent: true,
        noBorder: true,
        elevation: 0,
        background: { color: "transparent" }
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    getImageSource(
      Platform.OS === "android" ? "md-menu" : "ios-menu",
      30,
      "#425cf4"
    ).then(icon => {
      Navigation.mergeOptions("Main", {
        topBar: {
          rightButtons: [
            {
              id: "menuButton",
              icon
            }
          ]
        },
        bottomTab: {
          selectedIconColor: "#425cf4",
          textColor: "#425cf4",
          selectedTextColor: "#425cf4"
        }
      });
    });
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "menuButton") {
      Navigation.mergeOptions("Main", {
        sideMenu: {
          right: {
            visible: true
          }
        }
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Map />
        <TouchableOpacity style={styles.button}>
          <Text>Iniciar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // bottom: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    position: "absolute",
    bottom: 100,
    height: 30,
    width: 30,
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 100,
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  }
});

export default Main;
