import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useRouter } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect } from "react";
import AppwriteContext from "../../src/contexts/AppwriteContext";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const { isLoggedIn, appwrite } = useContext(AppwriteContext);
    const router = useRouter();
    const colorScheme = useColorScheme();

    // useEffect(() => {
    //   if (!isLoggedIn && appwrite) router.push("/");
    // }, [isLoggedIn, appwrite]);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarStyle: {
                    backgroundColor: "#000",
                    paddingBottom: 20,
                    height: 80
                },
                tabBarLabelStyle: {
                    color: "#ffffff"
                },
                tabBarIconStyle: {
                    color: "blue"
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Objevovat",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="explore" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="cards"
                options={{
                    headerShown: false,
                    title: "Cards",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="view-carousel" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    title: "Profil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle" color={color} size={size} />
                    )
                }}
            />
        </Tabs>
    );
}
