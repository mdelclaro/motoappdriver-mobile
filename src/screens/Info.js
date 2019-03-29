import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { updateInfo } from "../store/actions/index";
import startApp from "../App";

import InfoForm from "../components/Info/InfoForm";

class Info extends Component {
  componentDidMount() {}

  submitHandler = async values => {
    // console.log(values);
    const exec = this.props.onUpdateInfo(
      this.props.cnh1,
      this.props.cnh2,
      values.moto,
      values.placa,
      this.props.userId
    );
    if (!exec) return;
    startApp(this.props.status);
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
    cnh2: state.form.cnh2,
    status: state.auth.accountStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateInfo: (cnh1, cnh2, moto, placa, idMotoqueiro) =>
      dispatch(updateInfo(cnh1, cnh2, moto, placa, idMotoqueiro))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
