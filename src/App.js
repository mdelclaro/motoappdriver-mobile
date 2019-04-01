import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import { getImageSource } from "react-native-vector-icons/Ionicons";
import { store } from "./store/configureStore";
import { getAccountStatus } from "./store/actions/StatusAction";
import { uiStopLoading } from "./store/actions/UIAction";

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
  let status = store.getState().status.accountStatus;
  if (status === 1) {
    await store.dispatch(getAccountStatus(store.getState().auth.userId));
    status = store.getState().status.accountStatus;
  }
  // cadastrar documentos
  if (status === 0) {
    Navigation.setRoot({
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
  }
  // aguardando aprovação
  else if (status === 1) {
    Navigation.setRoot({
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
  }
  // aprovado
  else if (status === 2) {
    Promise.all([
      getImageSource(
        Platform.OS === "android" ? "md-pin" : "ios-pin",
        35,
        BASE_COLOR
      ),
      getImageSource(
        Platform.OS === "android" ? "md-paper-plane" : "ios-paper-plane",
        35,
        BASE_COLOR
      ),
      getImageSource(
        Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back",
        35,
        BASE_COLOR
      )
    ]).then(icons => {
      Navigation.setRoot({
        root: {
          component: {
            id: "info",
            name: "motoapp.Info"
          },
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
                                // leftButton: [
                                //   {
                                //     id: "backButton",
                                //     icon: icons[2],
                                //     visible: false
                                //   }
                                // ]
                              },
                              bottomTab: {
                                text: "Corrida",
                                textColor: "white",
                                selectedTextColor: "white",
                                icon: icons[0],
                                iconColor: "white"
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                  // {
                  //   stack: {
                  //     id: "tab2",
                  //     children: [
                  //       {
                  //         component: {
                  //           id: "Home2",
                  //           name: "motoapp.Main",
                  //           options: {
                  //             bottomTab: {
                  //               text: "Entrega",
                  //               textColor: "white",
                  //               icon: icons[1],
                  //               iconColor: "white"
                  //             }
                  //           }
                  //         }
                  //       }
                  //     ]
                  //   }
                  // }
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
    });
  }
};

export default startApp;
