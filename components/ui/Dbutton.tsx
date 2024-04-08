import { View, Text, Button, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

type ButtonProps = {
  title: string;
  onPress: () => void;
  upperacse?: boolean;
  style?: ViewStyle;
};

const Dbutton = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          textTransform: props.upperacse ? "uppercase" : "none",
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    color: "white",
    letterSpacing: 2,
    textTransform: "uppercase",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    elevation: 3,
  },
});
export default Dbutton;
