import React from "react";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API, BASE_COLOR } from "../../config";

const Direction = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey={GOOGLE_API}
    strokeWidth={4}
    strokeColor={BASE_COLOR}
  />
);

export default Direction;
