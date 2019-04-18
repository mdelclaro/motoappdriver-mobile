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
import io from "socket.io-client";
import { connect } from "react-redux";
import Timer from "react-native-timekeeper";

import { SOCKET_URL, BASE_COLOR } from "../config";
import Map from "../components/Map/Map";
import Details from "../components/Details/Details";
import Online from "../components/Online/Online";

import {
  goOnline,
  goOffline,
  acceptCorrida,
  uiStartLoading,
  uiStopLoading
} from "../store/actions/";

class Main extends Component {
  static get options() {
    return {
      topBar: {
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
      BASE_COLOR
    ).then(icon => {
      Navigation.mergeOptions("Main", {
        topBar: {
          visible: true,
          rightButtons: [
            {
              id: "menuButton",
              icon
            }
          ]
        },
        bottomTab: {
          selectedIconColor: BASE_COLOR,
          textColor: BASE_COLOR,
          selectedTextColor: BASE_COLOR
        }
      });
    });
    this.socket;
  }

  state = {
    showOnline: false,
    showStart: true,
    timer: false,
    reply: "reject",
    corrida: null,
    cliente: null,
    distancia: null,
    step: null,
    toast: {
      show: false,
      msg: ""
    }
  };

  componentDidMount() {
    const { corrida, cliente, distancia, goOffline } = this.props;
    if (corrida && cliente) {
      this.setState({
        showOnline: false,
        corrida,
        cliente,
        distancia,
        step: 2
      });
      this.handleStart();
    } else {
      goOffline();
    }
  }

  componentWillUnmount() {
    if (this.socket.connected) this.socket.disconnect();
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

  handleStart = () => {
    const { idMotoqueiro, corrida, location, goOnline } = this.props;

    this.setState({
      showStart: false,
      toast: {
        show: true,
        msg: "Conectando..."
      }
    });

    //criar conexão com timeout
    this.socket = io(SOCKET_URL, {
      timeout: 3000
    });

    //tratar evento de conexão
    this.socket.on("connect", () => {
      //join no room
      this.socket.emit("join", {
        id: idMotoqueiro,
        coords: location
      });
      this.setState({
        corrida,
        toast: {
          show: false,
          msg: ""
        }
      });
      goOnline();
      if (!corrida) {
        this.setState({ showOnline: true });
      }
    });

    //tratar erro de conexão (timeout)
    this.socket.on("connect_timeout", () => {
      this.setState({
        corrida: null,
        toast: {
          show: true,
          msg: "Houve um problema. Tentando reconectar..."
        }
      });
    });

    //tratar evento de desconexão
    this.socket.on("disconnect", () => {
      this.setState({
        corrida: null,
        toast: {
          show: true,
          msg: "Houve um problema. Tentando reconectar..."
        },
        showOnline: false
      });
    });

    //tratar reconexão
    this.socket.on("reconnect", () => {
      this.socket.emit("join", { id: idMotoqueiro });
    });

    //tratar evento de dispatch
    this.socket.on("dispatch", (data, reply) => {
      this.setState({ showOnline: false });
      this.setState({
        timer: true,
        corrida: data.corrida,
        cliente: data.cliente,
        distancia: data.distance,
        step: 1
      });
      setTimeout(() => {
        reply(this.state.reply);
      }, 10000);
    });
  };

  handleAccept = async () => {
    const { idMotoqueiro, acceptCorrida } = this.props;
    const { corrida, cliente, distancia } = this.state;
    this.setState({
      timer: false,
      reply: "accept",
      showOnline: false
    });
    const data = {
      idCorrida: corrida._id,
      idMotoqueiro,
      cliente,
      distancia
    };
    const exec = await acceptCorrida(data);
    if (!exec) {
      this.setState({
        showOnline: true,
        reply: "reject",
        corrida: null,
        cliente: null,
        distancia: null
      });
    }
    this.setState({ step: 2 });
  };

  handleReset = () => {
    this.setState({
      step: null,
      showOnline: true,
      timer: false,
      reply: "reject",
      corrida: null,
      cliente: null,
      distancia: null
    });
  };

  renderMsg() {
    const msg = this.state.toast.msg;
    return (
      <View
        style={{
          backgroundColor: "#333338",
          position: "absolute",
          bottom: 25,
          margin: 10,
          borderRadius: 35
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-around"
          }}
        >
          <ActivityIndicator color="#FFF" size="small" />
          <Text
            style={{
              textAlign: "center",
              color: "#FFF",
              fontSize: 16,
              fontWeight: "bold"
            }}
          >
            {" "}
            {msg}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const {
      corrida,
      step,
      timer,
      cliente,
      distancia,
      showOnline,
      showStart,
      isLoading,
      toast
    } = this.state;
    return (
      <View style={styles.container}>
        <Map corrida={corrida} step={step} />
        {showStart && (
          <TouchableOpacity onPress={this.handleStart} style={styles.button}>
            <Text style={styles.text}>INICIAR</Text>
          </TouchableOpacity>
        )}
        {timer && (
          <View style={styles.timer}>
            <Timer
              beat={true}
              seconds={10}
              radius={45}
              borderWidth={2}
              color="#FFF"
              bgColor={BASE_COLOR}
              bgColorSecondary="#79a3e5"
              bgColorThirt="#77abff"
              shadowColor="#9cbef4"
              textStyle={{ fontSize: 15, color: "#FFF" }}
              subTextStyle={{ fontSize: 20, color: "#FFF" }}
              isPausable={true}
              onTimeElapsed={this.handleReset}
              onPause={this.handleAccept}
              minScale={0.9}
              maxScale={1.2}
              pauseText="Aceitar"
              resumeText="Aceitar"
            />
          </View>
        )}
        {corrida && (
          <Details
            corrida={corrida}
            cliente={cliente}
            distancia={distancia}
            handleReset={this.handleReset}
          />
        )}
        {showOnline && <Online />}
        {isLoading && <ActivityIndicator size="large" />}
        {toast.show && this.renderMsg()}
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
    bottom: 25,
    borderRadius: 100,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { x: 1, y: 0 },
    shadowRadius: 3
  },
  timer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 45
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    idMotoqueiro: state.auth.userId,
    isOnline: state.status.isOnline,
    corrida: state.corrida.corrida,
    cliente: state.corrida.cliente,
    distancia: state.corrida.distancia,
    location: state.location
  };
};

const mapDispatchToProps = {
  uiStartLoading,
  uiStopLoading,
  goOnline,
  goOffline,
  acceptCorrida: data => acceptCorrida(data)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
