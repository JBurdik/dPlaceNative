import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const Badge = ({ text, style }: { text: string; style?: ViewStyle }) => {
  return (
    <View style={[styles.badge, style]}>
      <Text style={{ color: "white" }}>{text}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badge: {
    borderRadius: 70,
    backgroundColor: Colors.primary,
    flex: 0,
    padding: 8,
  },
});
