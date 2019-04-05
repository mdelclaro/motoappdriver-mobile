import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { BASE_COLOR } from "../../config";
import CustomIcon from "./CustomIcon";

const ButtonIcon = props => {
  const icon = props.icon;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, props.buttonStyle]}
      onPress={props.onPress}
    >
      <View style={styles.contentContainer}>
        <CustomIcon icon={icon} size={20} color="#FFF" style={{ margin: 5 }} />
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
