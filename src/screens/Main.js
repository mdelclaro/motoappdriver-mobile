import React, { Component, Fragment } from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { Navigation } from "react-native-navigation";
import { getImageSource } from "react-native-vector-icons/Ionicons";
import openSocket from "socket.io-client";
import { connect } from "react-redux";
import Timer from "react-native-timekeeper";

import { socketUrl, baseColor } from "../config";
import Map from "../components/Map/Map";
import Details from "../components/Details/Details";
import Online from "../components/Online/Online";

import { goOnline, goOffline, acceptCorrida } from "../store/actions/";

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
      Platform.OS === "android" ? "md-reorder" : "ios-menu",
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
    this.socket;
    // this.socket2 = openSocket(socketUrl);
    // this.socket3 = openSocket(socketUrl);
  }

  state = {
    showOnline: false,
    timer: false,
    reply: "reject",
    corrida: null,
    cliente: null,
    distancia: null
  };

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

  handleStart = () => {
    try {
      //criar conexão
      this.socket = openSocket(socketUrl);

      // lidar com reconexão
      this.socket.on("reconnect", () => {
        this.socket.emit("join", { id: this.props.idMotoqueiro });
      });

      // join no room
      this.socket.emit("join", { id: this.props.idMotoqueiro });
      // this.socket2.emit("join", { id: this.props.idCliente });
      // this.socket3.emit("join", { id: this.props.idCliente });

      this.setState({ showOnline: true });

      this.socket.on("dispatch", (data, reply) => {
        this.setState({ showOnline: false });
        this.setState({
          timer: true,
          corrida: data.corrida,
          cliente: data.cliente,
          distancia: data.distance
        });
        setTimeout(() => {
          reply(this.state.reply);
        }, 10000);
      });

      this.props.onGoOnline();

      // this.socket2.on("dispatch", (data, reply) => {
      //   setTimeout(() => {
      //     reply("reject");
      //   }, 2000);
      // });
    } catch (err) {
      alert("Houve um problema ao se conectar. Tente novamente mais tarde...");
    }
  };

  handleAccept = async () => {
    this.setState({ timer: false, reply: "accept", showOnline: false });
    const exec = await this.props.onAcceptCorrida(
      this.state.corrida._id,
      this.props.idMotoqueiro
    );
    if (!exec) {
      this.setState({
        showOnline: true,
        reply: "reject",
        corrida: null,
        cliente: null,
        distancia: null
      });
    }
  };

  handleReject = () => {
    this.setState({
      showOnline: true,
      timer: false,
      reply: "reject",
      corrida: null,
      cliente: null,
      distancia: null
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Map corrida={this.state.corrida} />
        {!this.props.isOnline && (
          <TouchableOpacity onPress={this.handleStart} style={styles.button}>
            <Text style={styles.text}>INICIAR</Text>
          </TouchableOpacity>
        )}
        {this.state.timer && (
          <View style={styles.timer}>
            <Timer
              beat={true}
              seconds={10}
              radius={60}
              borderWidth={2}
              color="#FFF"
              bgColor={baseColor}
              bgColorSecondary="#79a3e5"
              bgColorThirt="#77abff"
              shadowColor="#9cbef4"
              textStyle={{ fontSize: 15, color: "#FFF" }}
              subTextStyle={{ fontSize: 20, color: "#FFF" }}
              isPausable={true}
              onTimeElapsed={this.handleReject}
              onPause={this.handleAccept}
              minScale={0.9}
              maxScale={1.2}
              text1={"Aceitar"}
              text2={"Aceitar"}
            />
          </View>
        )}
        {this.state.corrida && (
          <Details
            corrida={this.state.corrida}
            cliente={this.state.cliente}
            distancia={this.state.distancia}
            handleReset={this.handleReject}
          />
        )}
        {this.state.showOnline && <Online />}
        {this.state.isLoading && <ActivityIndicator size="large" />}
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
    width: 85,
    height: 85,
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
  timer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 40
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
    // fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    idMotoqueiro: state.auth.userId,
    isOnline: state.status.isOnline
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGoOnline: () => dispatch(goOnline()),
    onGoOffline: () => dispatch(goOffline()),
    onAcceptCorrida: (idCorrida, idMotoqueiro) =>
      dispatch(acceptCorrida(idCorrida, idMotoqueiro))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
