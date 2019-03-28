import React from "react";
import { ActivityIndicator } from "react-native";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Auth from "./screens/Auth";
import SideMenu from "./screens/SideMenu";
import Main from "./screens/Main";
import Camera from "./screens/Camera";
import Info from "./screens/Info";

import { store, persistor } from "./store/configureStore";

const registerScreens = () => {
  Navigation.registerComponent(
    "motoapp.Main",
    () => props => (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Main {...props} />
        </PersistGate>
      </Provider>
    ),
    () => Main
  );
  Navigation.registerComponent(
    "motoapp.Auth",
    () => props => (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Auth {...props} />
        </PersistGate>
      </Provider>
    ),
    () => Auth
  );
  Navigation.registerComponent(
    "motoapp.Info",
    () => props => (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Info {...props} />
        </PersistGate>
      </Provider>
    ),
    () => Info
  );
  Navigation.registerComponent(
    "motoapp.SideMenu",
    () => props => (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <SideMenu {...props} />
        </PersistGate>
      </Provider>
    ),
    () => SideMenu
  );
  Navigation.registerComponent(
    "motoapp.Camera",
    () => props => (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Camera {...props} />
        </PersistGate>
      </Provider>
    ),
    () => Camera
  );
};

export default registerScreens;
