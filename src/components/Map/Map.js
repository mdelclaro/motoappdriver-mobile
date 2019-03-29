import React, { Component, Fragment } from "react";
import {
  View,
  Platform,
  PermissionsAndroid,
  Dimensions,
  ActivityIndicator
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";

import Directions from "../Directions/Directions";

import { getPixelSize } from "../../utils";

import helmet from "../../assets/helmet/helmet.png";

const { width, height } = Dimensions.get("window");

class Localizacao extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this, "Main");
    this.watchID = null;
  }

  state = {
    isLoading: true,
    region: null,
    myLocation: new AnimatedRegion({
      latitude: null,
      longitude: null,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0122
    })
  };

  // pedir permissao de localizacao
  async componentDidMount() {
    if (Platform.OS === "android") {
      try {
        // Checa se ja deu permissao
        const isGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        // se nao
        if (!isGranted) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.getCurrentLocation();
            this.locationChanged();
          }
        } else {
          this.getCurrentLocation();
          this.locationChanged();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      this.getCurrentLocation();
      this.locationChanged();
    }
  }

  // pega localizacao atual
  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0122,
            longitudeDelta:
              (Dimensions.get("window").width /
                Dimensions.get("window").height) *
              0.0122
          },
          myLocation: {
            latitude,
            longitude
          },
          isLoading: false
        });
      },
      err => console.log(err),
      {
        timeout: 5000,
        enableHighAccuracy: true
      }
    );
  };

  // observa mudanca de localizacao
  locationChanged = () => {
    this.watchID = navigator.geolocation.watchPosition(
      lastPosition => {
        const latitude = parseFloat(
          JSON.stringify(lastPosition.coords.latitude)
        );
        const longitude = parseFloat(
          JSON.stringify(lastPosition.coords.longitude)
        );
        const location = { latitude, longitude };
        this.setState(prevState => {
          return {
            region: {
              ...prevState.region,
              latitude,
              longitude
            },
            myLocation: {
              latitude,
              longitude
            }
          };
        });

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(location, 3000);
          }
        } else {
          this.state.myLocation.timing(location).start();
        }
      },
      err => console.log(err),
      { enableHighAccuracy: true, timeout: 5000, distanceFilter: 3 }
    );
  };

  render() {
    const { region, myLocation } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <MapView
            style={{ flex: 1, height: height, width: width }}
            region={region}
            loadingEnabled
            showsCompass={false}
            showsScale={false}
            ref={el => (this.mapView = el)}
          >
            <Marker.Animated
              // anchor={{ x: 0.5, y: 0.5 }}
              coordinate={myLocation}
              image={helmet}
              ref={el => {
                this.marker = el;
              }}
            />
            {this.props.step === 1 ? (
              <Fragment>
                <Directions
                  origin={{
                    latitude: this.state.region.latitude,
                    longitude: this.state.region.longitude
                  }}
                  destination={{
                    latitude: this.props.corrida.origem.lat,
                    longitude: this.props.corrida.origem.long
                  }}
                  onReady={result => {
                    this.setState({
                      duration: Math.floor(result.duration),
                      distance: Math.floor(result.distance)
                    });
                    this.mapView.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        right: getPixelSize(60),
                        left: getPixelSize(60),
                        top: getPixelSize(260),
                        bottom: getPixelSize(260)
                      },
                      animated: true
                    });
                  }}
                />
                <Marker
                  coordinate={{
                    latitude: this.props.corrida.origem.lat,
                    longitude: this.props.corrida.origem.long
                  }}
                />
              </Fragment>
            ) : null}
            {this.props.step === 2
              ? this.props.acceptedCorrida && (
                  <Fragment>
                    <Directions
                      origin={{
                        latitude:
                          this.props.acceptedCorrida.status === 1 // aceita
                            ? this.state.region.latitude // origem eh minha posicao
                            : this.props.acceptedCorrida.origem.lat, // origem eh a propria origem
                        longitude:
                          this.props.acceptedCorrida.status === 1
                            ? this.state.region.longitude
                            : this.props.acceptedCorrida.origem.long
                      }}
                      destination={{
                        latitude:
                          this.props.acceptedCorrida.status === 1
                            ? this.props.acceptedCorrida.origem.lat // destino eh a origem da corrida
                            : this.props.acceptedCorrida.destino.lat, // destino eh o proprio destino
                        longitude:
                          this.props.acceptedCorrida.status === 1
                            ? this.props.acceptedCorrida.origem.long
                            : this.props.acceptedCorrida.destino.long
                      }}
                      onReady={result => {
                        this.setState({
                          duration: Math.floor(result.duration),
                          distance: Math.floor(result.distance)
                        });
                        this.mapView.fitToCoordinates(result.coordinates, {
                          edgePadding: {
                            right: getPixelSize(60),
                            left: getPixelSize(60),
                            top: getPixelSize(260),
                            bottom: getPixelSize(260)
                          },
                          animated: true
                        });
                      }}
                    />
                    <Marker
                      coordinate={{
                        latitude:
                          this.props.acceptedCorrida.status === 1
                            ? this.props.acceptedCorrida.origem.lat // destino eh a origem da corrida
                            : this.props.acceptedCorrida.destino.lat, // destino eh o proprio destino
                        longitude:
                          this.props.acceptedCorrida.status === 1
                            ? this.props.acceptedCorrida.origem.long
                            : this.props.acceptedCorrida.destino.long
                      }}
                    />
                  </Fragment>
                )
              : null}
          </MapView>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    acceptedCorrida: state.corrida.corrida
  };
};

export default connect(mapStateToProps)(Localizacao);
