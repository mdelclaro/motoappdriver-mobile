import React, { Component, Fragment } from "react";
import { Image, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import { startCorrida, finishCorrida } from "../../store/actions/";

import {
  Container,
  Title,
  Description,
  RequestButton,
  RequestButtonText
} from "./styles";

import avatar from "../../assets/avatar/avatar.png";

class Details extends Component {
  handleSubmit = () => {};

  getStatus = () => {
    switch (this.props.acceptedCorrida.status) {
      case 1:
        return (
          <RequestButton onPress={this.handleStart}>
            <RequestButtonText>Iniciar corrida</RequestButtonText>
          </RequestButton>
        );
      case 2:
        return (
          <RequestButton onPress={this.handleFinish}>
            <RequestButtonText>Finalizar corrida</RequestButtonText>
          </RequestButton>
        );
      default:
        break;
    }
  };

  handleStart = async () => {
    const exec = await this.props.startCorrida(this.props.acceptedCorrida._id);
    if (!exec) return;
  };

  handleFinish = async () => {
    const exec = await this.props.finishCorrida(this.props.acceptedCorrida._id);
    if (!exec) return;
    this.props.handleReset();
  };

  render() {
    const { corrida, cliente, distancia } = this.props;
    console.log(distancia);
    return (
      <Container>
        <Title>
          {cliente.nome} {cliente.sobrenome}
        </Title>
        <Image
          source={avatar}
          style={{
            paddingBottom: 3,
            width: 60,
            height: 60,
            resizeMode: "center",
            borderRadius: 100
          }}
        />
        <Description>
          De {corrida.origem.local} para {corrida.destino.local}
        </Description>
        <Description>R$6,00 - {Math.floor(distancia / 1000)}km</Description>
        {this.props.acceptedCorrida && (
          <Fragment>
            {this.props.isLoading ? <ActivityIndicator /> : this.getStatus()}
          </Fragment>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    acceptedCorrida: state.corrida.corrida
  };
};

const mapDispatchToProps = {
  startCorrida: idCorrida => startCorrida(idCorrida),
  finishCorrida: idCorrida => finishCorrida(idCorrida)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
