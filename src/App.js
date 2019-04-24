import { Navigation } from "react-native-navigation";
import { getImageSource } from "react-native-vector-icons/Feather";
import { store } from "./store/configureStore";
import { uiStopLoading, getDetails } from "./store/actions/";

import { BASE_COLOR } from "./config";

console.disableYellowBox = true;

Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    drawBehind: true,
    animate: false
  }
});

const startApp = async () => {
  await store.dispatch(getDetails(store.getState().auth.userId));
  const status = store.getState().info.status;

  // cadastrar documentos
  if (status === 0) {
    await Navigation.setRoot({
      root: {
        stack: {
          id: "infoStack",
          children: [
            {
              component: {
                id: "info",
                name: "motoapp.Info",
                options: {
                  topBar: {
                    visible: false
                  }
                }
              }
            }
          ]
        }
      }
    });

    store.dispatch(uiStopLoading());
  }
  // aguardando aprovação
  else if (status === 1) {
    await Navigation.setRoot({
      root: {
        stack: {
          id: "verificationStack",
          children: [
            {
              component: {
                id: "verification",
                name: "motoapp.Verification",
                options: {
                  topBar: {
                    visible: false
                  }
                }
              }
            }
          ]
        }
      }
    });

    store.dispatch(uiStopLoading());
  }
  // aprovado
  else if (status === 2) {
    const icon = await getImageSource("map-pin", 35, BASE_COLOR);

    await Navigation.setRoot({
      root: {
        sideMenu: {
          right: {
            component: {
              id: "rightDrawer",
              name: "motoapp.SideMenu"
            }
          },
          center: {
            bottomTabs: {
              id: "bottomTabs",
              backgroundColor: "white",
              options: {
                topbar: {
                  visible: true,
                  id: "topBar",
                  title: {
                    text: "Moto App"
                  }
                }
              },
              children: [
                {
                  stack: {
                    id: "tab1",
                    children: [
                      {
                        component: {
                          id: "Main",
                          name: "motoapp.Main",
                          options: {
                            topbar: {
                              visible: true
                            },
                            bottomTab: {
                              text: "Corrida",
                              textColor: "white",
                              selectedTextColor: "white",
                              icon,
                              iconColor: "white"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          options: {
            sideMenu: {
              right: {
                width: 260
              }
            }
          }
        }
      }
    });

    store.dispatch(uiStopLoading());
  }
};

export default startApp;
