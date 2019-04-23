import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import { getDetails } from "../store/actions/";
import ProfileComponent from "../components/Profile/ProfileComponent";
import { BASE_COLOR } from "../config";

class Profile extends Component {
  async componentDidMount() {
    const { userId, getDetails } = this.props;
    await getDetails(userId);
  }
  render() {
    const { nome, sobrenome, email, corridas, avaliacoes } = this.props.info;
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
  getDetails: idMotoqueiro => getDetails(idMotoqueiro)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
