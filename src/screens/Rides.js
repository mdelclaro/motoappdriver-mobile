import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { Appbar, List } from "react-native-paper";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import moment from "moment";

moment.locale("pt-br");

import { getDetails, uiStartLoading, uiStopLoading } from "../store/actions";

import CustomIcon from "../components/UI/CustomIcon";
import ListItem from "../components/UI/ListItem";
import { BASE_COLOR, BASE_COLOR_ERROR, BACKGROUND_COLOR } from "../config";

class Rides extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: false
    };
  }

  async componentDidMount() {
    const {
      getDetails,
      idMotoqueiro,
      uiStartLoading,
      uiStopLoading
    } = this.props;
    uiStartLoading();
    await getDetails(idMotoqueiro);
    uiStopLoading();
  }

  renderItem = ({ item }) => {
    const { createdAt, idCliente, valor, origem, destino, status } = item;
    const date = moment(createdAt).format("llll");
    return (
      <View
        style={{
          backgroundColor: BACKGROUND_COLOR
        }}
      >
        <List.Accordion
          title={`${date}`}
          left={props => (
            <List.Icon
              {...props}
              icon={() => (
                <CustomIcon icon={"calendar"} size={35} color={BASE_COLOR} />
              )}
            />
          )}
        >
          <ListItem
            title="Cliente"
            description={`${idCliente.nome} ${idCliente.sobrenome}`}
            icon="user"
            size={25}
            color={BASE_COLOR}
          />

          <ListItem
            title="Origem"
            description={origem.local}
            icon="map-pin"
            size={25}
            color={BASE_COLOR}
          />

          <ListItem
            title="Destino"
            description={destino.local}
            icon="map-pin"
            size={25}
            color={BASE_COLOR}
          />

          <ListItem
            title="Valor"
            description={`R$${valor}`}
            icon="dollar-sign"
            size={25}
            color={BASE_COLOR}
          />
          <ListItem
            title="Status"
            description={`Corrida ${status === 3 ? "finalizada" : "cancelada"}`}
            icon="info"
            size={25}
            color={status === 3 ? BASE_COLOR : BASE_COLOR_ERROR}
          />
        </List.Accordion>
      </View>
    );
  };

  goBack = () => {
    Navigation.dismissModal("rides");
  };

  render() {
    return (
      <Fragment>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.goBack} />
          <Appbar.Content title="Minhas corridas" />
        </Appbar.Header>
        <View style={styles.container}>
          {this.props.isLoading ? (
            <ActivityIndicator size="large" color={BASE_COLOR} />
          ) : this.props.rides.length > 0 ? (
            <FlatList
              data={this.props.rides}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={{ flex: 1, paddingTop: 40 }}>
              <Text style={styles.text}>Nenhuma viagem...</Text>
            </View>
          )}
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: BACKGROUND_COLOR
  },
  text: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    marginTop: 100,
    color: "#CCC"
  }
});

mapStateToProps = state => {
  return {
    idMotoqueiro: state.auth.userId,
    rides: state.info.corridas,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = {
  getDetails: idMotoqueiro => getDetails(idMotoqueiro),
  uiStartLoading: () => uiStartLoading(),
  uiStopLoading: () => uiStopLoading()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rides);
