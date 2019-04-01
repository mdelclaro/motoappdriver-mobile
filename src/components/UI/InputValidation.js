import React, { Component } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import {
  emailChanged,
  senhaChanged,
  nomeChanged,
  sobrenomeChanged,
  motoChanged,
  placaChanged
} from "../../store/actions/index";

class InputValidation extends Component {
  textChangeHandler = value => {
    const {
      name,
      onChange,
      emailChanged,
      senhaChanged,
      nomeChanged,
      sobrenomeChanged,
      motoChanged,
      placaChanged
    } = this.props;

    onChange(name, value);
    if (name == "email") emailChanged(value);
    if (name == "senha") senhaChanged(value);
    if (name == "nome") nomeChanged(value);
    if (name == "sobrenome") sobrenomeChanged(value);
    if (name == "moto") motoChanged(value);
    if (name == "placa") placaChanged(value);
  };

  touchHandler = () => {
    this.props.onTouch(this.props.name);
  };

  render() {
    const { placeholder, error, myRef, style, ...rest } = this.props;
    return (
      <View>
        <TextInput
          ref={myRef}
          underlineColorAndroid="transparent"
          onChangeText={this.textChangeHandler}
          onBlur={this.touchHandler}
          placeholder={placeholder}
          {...rest}
          style={[styles.input, style]}
        />
        {error && <Text style={styles.errorMsg}>{error}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderBottomWidth: 1,
    padding: 5,
    marginTop: 8,
    marginBottom: 8
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
    justifyContent: "center"
  }
});

const mapDispatchToProps = {
  emailChanged: email => emailChanged(email),
  senhaChanged: senha => senhaChanged(senha),
  nomeChanged: nome => nomeChanged(nome),
  sobrenomeChanged: sobrenome => sobrenomeChanged(sobrenome),
  motoChanged: moto => motoChanged(moto),
  placaChanged: placa => placaChanged(placa),
  cnhChanged: cnh => cnhChanged(cnh),
  corChanged: cor => corChanged(cor)
};

export default connect(
  null,
  mapDispatchToProps
)(InputValidation);
