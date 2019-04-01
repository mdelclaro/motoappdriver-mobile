/**
 * Connection/Network
 */

// export const BASE_URL = "http://192.168.2.107:8080/motoapp/v1/";
// export const SOCKET_URL = "http://192.168.2.107:8080/drivers";
export const BASE_URL = "http://192.168.1.13:8080/motoapp/v1/";
export const SOCKET_URL = "http://192.168.1.13:8080/drivers";
export const FETCH_TIMEOUT = 3000;

/**
 * Keys
 */

export const GOOGLE_API = "AIzaSyBtJI4iAvzXZw9o5k2Ee9UwgVyR0vX0vPs";

/**
 * UI
 */

export const BASE_COLOR = "#425cf4";
export const BASE_COLOR_ERROR = "#f24b4b";
export const MAP_STYLE = [
  {
    featureType: "landscape.man_made",
    elementType: "geometry",
    stylers: [
      {
        hue: "#C3E0B0"
      },
      {
        saturation: 23
      },
      {
        lightness: -12
      },
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        hue: "#7DC45C"
      },
      {
        saturation: 37
      },
      {
        lightness: -41
      },
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "poi",
    stylers: [
      {
        hue: "#a19fa0"
      },
      {
        saturation: -100
      },
      {
        lightness: -20
      },
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "poi.attraction",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "poi.government",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        hue: "#FFFFFF"
      },
      {
        saturation: -100
      },
      {
        lightness: 100
      },
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.highway",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        hue: "#71ABC3"
      },
      {
        saturation: -10
      },
      {
        lightness: -21
      },
      {
        visibility: "simplified"
      }
    ]
  }
];
