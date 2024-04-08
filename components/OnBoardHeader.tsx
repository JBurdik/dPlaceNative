import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAppwrite } from "../src/contexts/AppwriteContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { router } from "expo-router";

const OnBoardHeader = (props: any) => {
  const { userData, logout, isLoggedIn } = useAppwrite();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <View style={styles.infoContainer}>
          <View style={styles.welcomeMessage}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.whiteText}>
              {userData ? userData.name : "Guest"}
            </Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={30}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "black",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  whiteText: {
    color: "white",
  },
  welcomeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "900",
  },
  infoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
  },
  welcomeMessage: {
    flexDirection: "column",
  },
});

export default OnBoardHeader;
