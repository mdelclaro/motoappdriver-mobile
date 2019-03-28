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

import ButtonWithBackground from "../UI/ButtonWithBackground";
import InputValidation from "../UI/InputValidation";
import HeadingText from "../UI/HeadingText";
import MainText from "../UI/MainText";

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

  renderCameraFrente = () => {
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

  renderCameraVerso = () => {
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
    let headingText = null;
    headingText = (
      <MainText>
        <HeadingText style={{ color: "#425cf4" }}>
          Adicionar informações
        </HeadingText>
      </MainText>
    );

    return (
      <Formik
        ref={el => (this.form = el)}
        initialValues={{
          moto: this.props.moto,
          placa: this.props.placa
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
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 15
                }}
              >
                {headingText}
                <Text>
                  Complete seu cadastro insirindo as informações abaixo
                </Text>
              </View>
              <View style={styles.inputContainer}>
                {/* <View> */}
                <ButtonWithBackground
                  color="#425cf4"
                  onPress={this.renderCameraFrente}
                >
                  Foto da CNH (frente)
                </ButtonWithBackground>
                {/* </View> */}
                {/* <View> */}
                <ButtonWithBackground
                  color="#425cf4"
                  onPress={this.renderCameraVerso}
                >
                  Foto da CNH (verso)
                </ButtonWithBackground>
                {/* </View> */}
                <InputValidation
                  myRef={ref => (this.moto = ref)}
                  placeholder="Modelo e cor da moto (Titan 125 - Prata)"
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => this.placa.focus()}
                  // onSubmitEditing={() => this.cor.focus()}
                  autoCorrect={false}
                  value={this.props.moto}
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
    moto: state.form.moto,
    placa: state.form.placa
  };
};

export default connect(mapStateToProps)(SignupForm);
