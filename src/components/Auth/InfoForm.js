import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import ButtonWithBackground from "../UI/ButtonWithBackground";
import InputValidation from "../UI/InputValidation";
import HeadingText from "../UI/HeadingText";
import MainText from "../UI/MainText";

import { BACKGROUND_COLOR } from "../../config";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    step: 0
  };

  componentDidMount() {
    if (
      this.form.initialValues.email !== "" ||
      this.form.initialValues.senha !== ""
    ) {
      this.form.setFieldValue(
        this.form.email,
        this.form.initialValues.email,
        true
      );
      this.form.setFieldValue(
        this.form.senha,
        this.form.initialValues.senha,
        true
      );
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  render() {
    let headingText = null;

    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText style={{ color: "#425cf4" }}>
            Adicionar informações
          </HeadingText>
        </MainText>
      );
    }
    return (
      <Formik
        initialValues={{
          cnh: this.props.cnh,
          moto: this.props.moto,
          placa: this.props.placa,
          cor: this.props.cor
        }}
        onSubmit={this.props.submitHandler}
        validationSchema={Yup.object().shape({
          cnh: Yup.string()
            .required("Preencha a CNH")
            .min(7, "Insira um número de documento válido")
            .max(7, "Insira um número de documento válido"),
          moto: Yup.string()
            .required("Preencha o modelo da moto")
            .min(3, "Modelo inválido"),
          cor: Yup.string()
            .required("Preencha a cor da moto")
            .min(3, "Cor inválida"),
          placa: Yup.string()
            .required("Preencha a placa")
            .length(7, "Placa inválida")
        })}
        render={({
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          setFieldTouched,
          isValid
        }) => (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              {headingText}
              <View style={styles.inputContainer}>
                <InputValidation
                  myRef={ref => (this.cnh = ref)}
                  placeholder="CNH (apenas números)"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => this.moto.focus()}
                  autoCorrect={false}
                  value={this.props.cnh}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="cnh"
                  error={touched.cnh && errors.cnh}
                  style={styles.input}
                />
                <InputValidation
                  myRef={ref => (this.moto = ref)}
                  placeholder="Modelo da moto"
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => this.cor.focus()}
                  autoCorrect={false}
                  value={this.props.moto}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="moto"
                  error={touched.moto && errors.moto}
                  style={styles.input}
                />
                <InputValidation
                  myRef={ref => (this.cor = ref)}
                  placeholder="Cor da moto"
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => this.placa.focus()}
                  autoCorrect={false}
                  value={this.props.cor}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="cor"
                  error={touched.cor && errors.cor}
                  style={styles.input}
                />
                <InputValidation
                  myRef={ref => (this.placa = ref)}
                  placeholder="Placa da moto (apenas letras e números)"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={handleSubmit}
                  autoCorrect={false}
                  value={this.props.placa}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="placa"
                  error={touched.placa && errors.placa}
                  style={styles.input}
                />
              </View>
              {!this.props.isLoading ? (
                <View style={{ width: "80%" }}>
                  <ButtonWithBackground
                    myRef={ref => (this.submitButton = ref)}
                    color="#425cf4"
                    onPress={handleSubmit}
                    isDisabled={!isValid}
                  >
                    Enviar
                  </ButtonWithBackground>
                </View>
              ) : (
                <ActivityIndicator />
              )}
              {!this.props.isLoading ? (
                <ButtonWithBackground
                  onPress={this.props.onSwitchAuthMode}
                  textColor="#425cf4"
                >
                  Cancelar
                </ButtonWithBackground>
              ) : null}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR
  },
  input: {
    borderBottomColor: "#bbb"
  },
  inputContainer: {
    width: "80%"
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    email: state.form.email,
    senha: state.form.senha,
    nome: state.form.nome,
    sobrenome: state.form.sobrenome,
    cnh: state.form.cnh,
    moto: state.form.moto,
    placa: state.form.placa,
    cor: state.form.cor
  };
};

export default connect(mapStateToProps)(SignupForm);
