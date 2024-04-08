import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const Label = ({ text }: { text: string }) => {
  return (
    <Text
      style={{
        color: Colors.primary,
        marginBottom: 5,
        fontWeight: "bold",
      }}
    >
      {text}
    </Text>
  );
};

export default Label;

const styles = StyleSheet.create({});
