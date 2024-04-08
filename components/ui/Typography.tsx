import { StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";

type TypoProps = {
  children: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "text";
  style?: TextStyle;
  bold?: boolean;
};

const Typography = ({
  children,
  variant = "text",
  bold = false,
  style,
}: TypoProps) => {
  return (
    <Text
      style={[
        styles[variant],
        bold ? styles.bold : null,
        { color: "white" },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default Typography;

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
  },
  h2: {
    fontSize: 20,
  },
  h3: {
    fontSize: 18,
  },
  h4: {
    fontSize: 16,
  },
  h5: {
    fontSize: 14,
  },
  h6: {
    fontSize: 12,
  },
  bold: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    fontWeight: "normal",
  },
});
