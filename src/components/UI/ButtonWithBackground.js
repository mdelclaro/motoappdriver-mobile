import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ButtonWithBackground = props => {
  let buttonColor = null;
  let textColor = props.textColor;

  if (props.isDisabled) {
    buttonColor = {
      backgroundColor: "#c1c1c1"
    };
  } else {
    buttonColor = {
      backgroundColor: props.color
    };
  }

  const content = (
    <View style={[styles.button, buttonColor, props.style]}>
      {props.children == null ? (
        <Icon
          name={Platform.OS === "android" ? "md-locate" : "ios-locate"}
          size={30}
          style={styles.icon}
        />
      ) : (
        <Text style={{ color: textColor || "white", textAlign: "center" }}>
          {props.children}
        </Text>
      )}
    </View>
  );
  return (
    <TouchableOpacity
      ref={props.myRef}
      onPress={props.onPress}
      disabled={props.isDisabled}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    margin: 10
  },
  icon: {
    justifyContent: "center",
    alignContent: "center",
    color: "#425cf4"
  }
});

export default ButtonWithBackground;
