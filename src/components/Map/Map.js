import React, { Component, Fragment } from "react";
import { View, Platform, PermissionsAndroid, Dimensions } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import { Navigation } from "react-native-navigation";

import helmet from "../../assets/helmet/helmet.png";

const { width, height } = Dimensions.get("window");

class Localizacao extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this, "Main");
    this.watchID = null;
  }

  state = {
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
          }
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
        console.log("mudou");
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
        </MapView>
      </View>
    );
  }
}

export default Localizacao;
