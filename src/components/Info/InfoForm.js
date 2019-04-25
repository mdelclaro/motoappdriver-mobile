import React, { Component } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Text
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";

import { Formik } from "formik";
import * as Yup from "yup";

import { cnh1Changed, cnh2Changed } from "../../store/actions/";

import ButtonWithBackground from "../UI/ButtonWithBackground";
import InputValidation from "../UI/InputValidation";
import HeadingText from "../UI/HeadingText";
import MainText from "../UI/MainText";
import ButtonIcon from "../UI/ButtonIcon";
import { BASE_COLOR, BASE_COLOR_ERROR, BACKGROUND_COLOR } from "../../config";

class SignupForm extends Component {
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

  renderCamera = id => {
    const text = id === 1 ? "frente" : "verso";

    Navigation.showModal({
      stack: {
        id: "infoStack",
        children: [
          {
            component: {
              passProps: {
                id,
                handleUpload: (uri, id) => this.handleUpload(uri, id)
              },
              id: "camera",
              name: "motoapp.Camera",
              options: {
                topBar: {
                  visible: true,
                  drawBehind: false,
                  title: {
                    text: `Tirar foto da CNH (${text})`
                  }
                }
              }
            }
          }
        ]
      }
    });
  };

  handleUpload(uri, id) {
    const { cnh1Changed, cnh2Changed } = this.props;
    id === 1 ? cnh1Changed(uri) : cnh2Changed(uri);
  }

  render() {
    let headingText = (
      <MainText>
        <HeadingText style={{ color: BASE_COLOR }}>
          Adicionar informações
        </HeadingText>
      </MainText>
    );

    const { moto, placa, cnh1, cnh2 } = this.props.form;

    return (
      <Formik
        ref={el => (this.form = el)}
        initialValues={{
          moto,
          placa
        }}
        onSubmit={this.props.submitHandler}
        validationSchema={Yup.object().shape({
          moto: Yup.string()
            .required("Preencha o modelo e cor da moto")
            .min(5, "Modelo e/ou cor inválida"),
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
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingTop: 35
                }}
              >
                {headingText}
                <Text>
                  Informe os dados abaixo para completar o seu cadastro
                </Text>
              </View>
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <ButtonIcon
                  icon={cnh1 ? "checkmark" : "close"}
                  onPress={() => this.renderCamera(1)}
                  buttonStyle={
                    cnh1 ? null : { backgroundColor: BASE_COLOR_ERROR }
                  }
                >
                  Foto da CNH (frente)
                </ButtonIcon>
                <ButtonIcon
                  icon={cnh2 ? "checkmark" : "close"}
                  onPress={() => this.renderCamera(2)}
                  buttonStyle={
                    cnh2 ? null : { backgroundColor: BASE_COLOR_ERROR }
                  }
                >
                  Foto da CNH (verso)
                </ButtonIcon>
              </View>
              <View style={styles.inputContainer}>
                <InputValidation
                  myRef={ref => (this.moto = ref)}
                  placeholder="Modelo e cor da moto (Titan 125 - Prata)"
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => this.placa.focus()}
                  autoCorrect={false}
                  value={moto}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="moto"
                  error={touched.moto && errors.moto}
                  style={styles.input}
                />
                <InputValidation
                  myRef={ref => (this.placa = ref)}
                  placeholder="Placa da moto (apenas letras e números)"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={handleSubmit}
                  autoCorrect={false}
                  value={placa}
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
                    color={BASE_COLOR}
                    onPress={handleSubmit}
                    isDisabled={!isValid}
                  >
                    Enviar
                  </ButtonWithBackground>
                </View>
              ) : (
                <ActivityIndicator />
              )}
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
    paddingTop: 15,
    justifyContent: "flex-start",
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
    form: state.form
  };
};

const mapDispatchToProps = {
  cnh1Changed: image => cnh1Changed(image),
  cnh2Changed: image => cnh2Changed(image)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
