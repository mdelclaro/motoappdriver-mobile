const home = false;

/**
 *  ---------
 * | Network |
 *  ---------
 */
let BASE_URL, SOCKET_URL, IMAGES_URL;

if (home) {
  BASE_URL = "http://192.168.2.107:8080/motoapp/v1/";
  SOCKET_URL = "http://192.168.2.107:8080";
  IMAGES_URL = "http://192.168.2.107:8080/images/";
} else {
  IMAGES_URL = "http://192.168.1.13:8080/images/";
  BASE_URL = "http://192.168.1.13:8080/motoapp/v1/";
  SOCKET_URL = "http://192.168.1.13:8080";
}
export const FETCH_TIMEOUT = 3000;
export { BASE_URL, SOCKET_URL, IMAGES_URL };

/**
 *  --------
 * |  Keys  |
 *  --------
 */

export const GOOGLE_API = "AIzaSyBtJI4iAvzXZw9o5k2Ee9UwgVyR0vX0vPs";

/**
 *  --------
 * |   UI   |
 *  --------
 */
export const BASE_COLOR = "#5568f1";
export const BASE_COLOR_ERROR = "#ff3907";
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
