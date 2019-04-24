import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import { getDetails, uiStartLoading, uiStopLoading } from "../store/actions/";
import ProfileComponent from "../components/Profile/ProfileComponent";
import { BASE_COLOR } from "../config";

class Profile extends Component {
  async componentDidMount() {
    const { userId, getDetails, uiStartLoading, uiStopLoading } = this.props;
    uiStartLoading();
    await getDetails(userId);
    uiStopLoading();
  }

  render() {
    const {
      nome,
      sobrenome,
      email,
      corridas,
      avaliacoes,
      imgPerfil
    } = this.props.info;
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        {this.props.isLoading ? (
          <ActivityIndicator size="large" color={BASE_COLOR} />
        ) : (
          <ProfileComponent
            nome={nome}
            sobrenome={sobrenome}
            email={email}
            corridas={corridas}
            avaliacoes={avaliacoes}
            imgPerfil={imgPerfil}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    info: state.info,
    userId: state.auth.userId
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
)(Profile);
