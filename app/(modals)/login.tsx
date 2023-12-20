import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import AppwriteContext from "../../src/contexts/AppwriteContext";
import Colors from "../../constants/Colors";

const login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const { appwrite, isLoggedIn, setIsLoggedIn, setUserData, login } =
    useContext(AppwriteContext);
  const signin = async () => {
    login(email, password);
    router.push("/");
  };
  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, []);
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          textTransform: "uppercase",
          color: Colors.primary,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Sign in
      </Text>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor={"#ffffff"}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        style={{
          backgroundColor: "hsla(0, 0%, 0%, 0.7)",
          color: "#ffffff",
          padding: 10,
          width: "60%",
        }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={"#ffffff"}
        secureTextEntry={!showPassword}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        style={{
          backgroundColor: "hsla(0, 0%, 0%, 0.7)",
          color: "#ffffff",
          padding: 10,
          width: "60%",
        }}
      />
      <TouchableOpacity
        onPressIn={() => setShowPassword(true)}
        onPressOut={() => setShowPassword(false)}
      >
        <Text>SHOW PASSWORD</Text>
      </TouchableOpacity>
      <Button title="Login" onPress={() => signin()} />
    </View>
  );
};

export default login;
