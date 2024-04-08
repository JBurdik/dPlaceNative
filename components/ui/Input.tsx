import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Label from "./Label";
type InputProps = {
  label?: string;
  placeholder?: string;
  secure?: boolean;
  textarea?: boolean;
  maxLength?: number;
  onChange?: (v: string) => void;
  value?: string;
};
const Input = ({
  label,
  placeholder,
  secure,
  textarea,
  maxLength,
  onChange,
  value,
}: InputProps) => {
  return (
    <View style={styles.container}>
      <Label text={label ?? ""} />
      <View style={styles.input}>
        <TextInput
          editable
          secureTextEntry={secure}
          placeholderTextColor={"#ffffff"}
          style={{ flex: 1, color: "white" }}
          placeholder={placeholder}
          multiline={textarea}
          numberOfLines={4}
          maxLength={maxLength}
          onChange={(e) => onChange && onChange(e.nativeEvent.text)}
          value={value}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {},
  input: {
    backgroundColor: "hsla(0, 0%, 100%, 0.12)",
    color: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: "flex-start",
    height: 110,
  },
});
