import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BASE_COLOR } from "../../config";

const ButtonIcon = props => {
  const icon = props.icon;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, props.buttonStyle]}
      onPress={props.onPress}
    >
      <View style={styles.contentContainer}>
        <Icon
          name={Platform.OS === "android" ? `md-${icon}` : `ios-${icon}`}
          size={20}
          color="#FFF"
          style={{ margin: 5 }}
        />
        <Text style={[styles.text, props.textStyle]}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: BASE_COLOR,
    borderRadius: 10,
    margin: 15
  },
  contentContainer: {
    margin: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: { color: "#FFF" }
});

export default ButtonIcon;
