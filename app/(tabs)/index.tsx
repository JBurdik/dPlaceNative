import { Button, StyleSheet, View } from "react-native";

import { Link } from "expo-router";
import { useAppwrite } from "../../src/contexts/AppwriteContext";
import Colors from "../../constants/Colors";

export default function TabOneScreen() {
  const { logout, isLoggedIn } = useAppwrite();
  return (
    <View style={styles.container}>
      {isLoggedIn === false ? (
        <Link style={styles.button} href="/(modals)/login">
          Login
        </Link>
      ) : (
        <Button title="Sign out" onPress={() => logout()} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    color: "white",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
