import React, { Component, Fragment } from "react";
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

import ButtonWithBackground from "../UI/ButtonWithBackground";
import InputValidation from "../UI/InputValidation";
import HeadingText from "../UI/HeadingText";
import MainText from "../UI/MainText";
import ButtonIcon from "../UI/ButtonIcon";
import { baseColor, baseErrorColor } from "../../config";

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

  renderCamera1 = () => {
    Navigation.showModal({
      stack: {
        id: "infoStack",
        children: [
          {
            component: {
              passProps: {
                cnh: 1
              },
              id: "camera",
              name: "motoapp.Camera",
              options: {
                topBar: {
                  visible: true,
                  drawBehind: false,
                  title: {
                    text: "Tirar foto da CNH (frente)"
                  }
                }
              }
            }
          }
        ]
      }
    });
  };

  renderCamera2 = () => {
    Navigation.showModal({
      stack: {
        id: "infoStack",
        children: [
          {
            component: {
              passProps: {
                cnh: 2
              },
              id: "camera",
              name: "motoapp.Camera",
              options: {
                topBar: {
                  visible: true,
                  drawBehind: false,
                  title: {
                    text: "Tirar foto da CNH (verso)"
                  }
                }
              }
            }
          }
        ]
      }
    });
  };

  render() {
    let headingText = (
      <MainText>
        <HeadingText
          style={{
            // color: "#425cf4"
            color: baseColor
          }}
        >
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
            {/* <Fragment> */}
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
                  onPress={this.renderCamera1}
                  buttonStyle={
                    cnh1 ? null : { backgroundColor: baseErrorColor }
                  }
                >
                  Foto da CNH (frente)
                </ButtonIcon>
                <ButtonIcon
                  icon={cnh2 ? "checkmark" : "close"}
                  onPress={this.renderCamera2}
                  buttonStyle={
                    cnh2 ? null : { backgroundColor: baseErrorColor }
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
                  // onSubmitEditing={() => this.cor.focus()}
                  autoCorrect={false}
                  value={moto}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="moto"
                  error={touched.moto && errors.moto}
                  style={styles.input}
                />
                {/* <InputValidation
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
                /> */}
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
                    color={baseColor}
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
            {/* </Fragment> */}
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
    alignItems: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  input: {
    //backgroundColor: "#eee",
    borderBottomColor: "#bbb"
  },
  inputContainer: {
    // it controls the input width,
    // better approach. makes
    // TextInputs reusable with 100% width
    width: "80%"
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    form: state.form
  };
};

export default connect(mapStateToProps)(SignupForm);
