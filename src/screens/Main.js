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
      <View style={styles.container}>
        <Map />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>INICIAR</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 90,
    height: 90,
    backgroundColor: "#425cf4",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
    borderRadius: 100,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 3
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold"
  }
});

export default Main;
