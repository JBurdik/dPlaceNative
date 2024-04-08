import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableOpacity
} from "react-native";
import React from "react";
import { useAppwrite } from "../src/contexts/AppwriteContext";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { router } from "expo-router";
import { useAuth } from "../src/contexts/AuthContext";

const CustomHeader = (props: any) => {
    const { authState, signOut } = useAuth();
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={styles.headerWrapper}>
                <View style={styles.infoContainer}>
                    <Ionicons name="headset" color={Colors.primary} size={30} />
                    <View style={styles.welcomeMessage}>
                        <Text style={styles.welcomeText}>Vítejte</Text>
                        <Text style={styles.whiteText}>
                            {authState?.isAuthenticated
                                ? authState.userInfo?.name
                                : "Guest"}
                        </Text>
                    </View>
                </View>
                <View style={styles.actionsContainer}>
                    {authState?.isAuthenticated && (
                        <TouchableOpacity onPress={() => signOut()}>
                            <Ionicons
                                name="log-out-outline"
                                color={Colors.primary}
                                size={30}
                            />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => router.push("/(modals)/onboard")}>
                        <Ionicons name="options" color={Colors.primary} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        backgroundColor: "black",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headerWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10,
        paddingRight: 20
    },
    whiteText: {
        color: "white"
    },
    welcomeText: {
        color: "white",
        fontSize: 11,
        fontWeight: "900"
    },
    infoContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        padding: 10
    },
    actionsContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        padding: 10
    },
    welcomeMessage: {
        flexDirection: "column"
    }
});

export default CustomHeader;
