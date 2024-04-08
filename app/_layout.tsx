import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomHeader from "../components/CustomHeader";
import OnBoardHeader from "../components/OnBoardHeader";
import { AppwriteProvider } from "../src/contexts/AppwriteContext";
import { Pressable, SafeAreaView, View } from "react-native";
import { AuthProvider } from "../src/contexts/AuthContext";
import { ProfileProvider } from "../src/contexts/ProfileContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)"
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const router = useRouter();
    const queryClient = new QueryClient();

    return (
        <AppwriteProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ProfileProvider>
                        <Stack>
                            <Stack.Screen
                                options={{
                                    header: props => <CustomHeader {...props} />,
                                    statusBarColor: "black"
                                }}
                                name="(tabs)"
                            />
                            <Stack.Screen
                                name="(modals)/sign"
                                options={{
                                    presentation: "fullScreenModal",
                                    headerTitle: "Přidej se k nám",
                                    headerStyle: {
                                        backgroundColor: "black"
                                    },
                                    headerTintColor: "white",
                                    headerLeft: () => (
                                        <TouchableOpacity onPress={() => router.back()}>
                                            <Ionicons
                                                name="close"
                                                size={24}
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                            <Stack.Screen
                                name="(modals)/onboard"
                                options={{
                                    presentation: "modal",
                                    header: props => <OnBoardHeader {...props} />,
                                    headerLeft: () => (
                                        <TouchableOpacity onPress={() => router.back()}>
                                            <Ionicons
                                                name="close"
                                                size={24}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                            <Stack.Screen
                                name="(modals)/profileEdit"
                                options={{
                                    presentation: "modal",
                                    headerTitle: "Edit profile",
                                    headerStyle: {
                                        backgroundColor: "black"
                                    },
                                    headerTintColor: "white",
                                    headerLeft: () => (
                                        <TouchableOpacity onPress={() => router.back()}>
                                            <Ionicons
                                                name="close"
                                                size={24}
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                            <Stack.Screen
                                name="(profile)/detail/[id]"
                                options={{
                                    presentation: "card",
                                    headerTitle: "Profile",
                                    headerStyle: {
                                        backgroundColor: "black"
                                    },
                                    headerTintColor: "white",
                                    headerLeft: () => (
                                        <Pressable onPress={() => router.back()}>
                                            <Ionicons
                                                name="arrow-back"
                                                size={24}
                                                color="white"
                                            />
                                        </Pressable>
                                    )
                                }}
                            />
                        </Stack>
                    </ProfileProvider>
                </AuthProvider>
            </QueryClientProvider>
        </AppwriteProvider>
    );
}
