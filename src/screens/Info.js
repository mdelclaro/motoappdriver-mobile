import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { updateInfo } from "../store/actions/index";
import startApp from "../App";

import InfoForm from "../components/Info/InfoForm";

class Info extends Component {
  submitHandler = async values => {
    const { cnh1, cnh2, userId, updateInfo } = this.props;
    const exec = await updateInfo(
      cnh1,
      cnh2,
      values.moto,
      values.placa,
      userId
    );
    if (!exec) return;
    startApp();
  };

  render() {
    return (
      <View style={styles.container}>
        <InfoForm submitHandler={this.submitHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    cnh1: state.form.cnh1,
    cnh2: state.form.cnh2
  };
};

const mapDispatchToProps = {
  updateInfo: (cnh1, cnh2, moto, placa, idMotoqueiro) =>
    updateInfo(cnh1, cnh2, moto, placa, idMotoqueiro)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
