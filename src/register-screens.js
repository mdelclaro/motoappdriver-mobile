import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Auth, SideMenu, Main, Info, Verification, Chats } from "./screens/";
import { Camera, ProfileImage, Chat } from "./components/";

import { store, persistor } from "./store/configureStore";

const loadingComponent = (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" />
  </View>
);

const providerWrapper = (props, Component) => {
  return (
    <Provider store={store}>
      <PersistGate loading={loadingComponent} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
};

const registerScreens = () => {
  Navigation.registerComponent(
    "motoapp.Main",
    () => props => providerWrapper(props, Main),
    () => Main
  );
  Navigation.registerComponent(
    "motoapp.Auth",
    () => props => providerWrapper(props, Auth),
    () => Auth
  );
  Navigation.registerComponent(
    "motoapp.Verification",
    () => props => providerWrapper(props, Verification),
    () => Verification
  );
  Navigation.registerComponent(
    "motoapp.Info",
    () => props => providerWrapper(props, Info),
    () => Info
  );
  Navigation.registerComponent(
    "motoapp.SideMenu",
    () => props => providerWrapper(props, SideMenu),
    () => SideMenu
  );
  Navigation.registerComponent(
    "motoapp.Chats",
    () => props => providerWrapper(props, Chats),
    () => Chats
  );
  Navigation.registerComponent(
    "motoapp.Chat",
    () => props => providerWrapper(props, Chat),
    () => Chat
  );
  Navigation.registerComponent("motoapp.Camera", () => Camera);
  Navigation.registerComponent("motoapp.ProfileImage", () => ProfileImage);
};

export default registerScreens;
