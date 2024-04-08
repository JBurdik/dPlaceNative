import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Image as ExpoImage } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Dbutton from "../../components/ui/Dbutton";
import Typography from "../../components/ui/Typography";
import Colors from "../../constants/Colors";
import { API_URL } from "../../constants/ENV";
import { useAuth } from "../../src/contexts/AuthContext";
import { useProfile } from "../../src/contexts/ProfileContext";
import { Ionicons } from "@expo/vector-icons";
import Badge from "../../components/ui/Badge";

const ProfilePage = () => {
    const router = useRouter();
    const { authState, signOut } = useAuth();
    const [isLoading, setLoading] = useState<boolean>();
    const [avatarKey, setAvatarKey] = useState<any>();
    const { imageKey, profile } = useProfile();
    const img = require("../../assets/images/djs/man/dj15.png");
    const favorites = useQuery({
        queryKey: ["favorites"],
        queryFn: () => axios.get(`${API_URL}/users/favorites`)
    });
    return (
        <ExpoImage
            key={imageKey}
            style={{ flex: 1 }}
            source={
                authState?.isAuthenticated
                    ? {
                          uri:
                              `${API_URL}/profile/me/image` ??
                              "https://picsum.photos/130/130",
                          headers: {
                              Authorization: `Bearer ${authState?.token}`
                          }
                      }
                    : img
            }
        >
            <View style={styles.container}>
                {authState?.isAuthenticated && !isLoading ? (
                    <ScrollView style={{ marginBottom: 20 }}>
                        <View style={{ alignItems: "center", marginTop: 20 }}>
                            <ExpoImage
                                source={{
                                    uri:
                                        `${API_URL}/profile/me/image` ??
                                        "https://picsum.photos/130/130",
                                    headers: {
                                        Authorization: `Bearer ${authState.token}`
                                    }
                                }}
                                style={{
                                    width: 130,
                                    height: 130,
                                    borderRadius: 500,
                                    borderColor: Colors.primary,
                                    borderWidth: 3
                                }}
                            />
                            <Typography variant="h1">
                                {authState.userInfo!.name}
                            </Typography>
                            <Typography>{authState.userInfo!.email}</Typography>
                            <View
                                style={{ marginTop: 20, flexDirection: "row", gap: 15 }}
                            >
                                <Dbutton
                                    title="Upravit info"
                                    onPress={() => router.push("/(modals)/profileEdit")}
                                />
                                <Dbutton title="Odhlásit se" onPress={() => signOut()} />
                            </View>
                        </View>
                        <View style={{ flex: 1, marginTop: 20, gap: 10 }}>
                            <Typography variant="h3" bold style={{ textAlign: "center" }}>
                                Oblíbení DJs
                            </Typography>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: 5,
                                    marginHorizontal: 40,
                                    justifyContent: "space-between"
                                }}
                            >
                                {favorites.data?.data.map((item: any) => (
                                    <ExpoImage
                                        key={item.id}
                                        source={{
                                            uri: `${API_URL}/profile/${item.id}/image`,
                                            headers: {
                                                Authorization: `Bearer ${authState.token}`
                                            }
                                        }}
                                        style={{
                                            width: 150,
                                            height: 150,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: "rgba(0,0,0,.4)",
                                                flex: 1,
                                                width: "100%",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <View
                                                style={{
                                                    alignItems: "center",
                                                    gap: 15
                                                }}
                                            >
                                                <Typography
                                                    style={{
                                                        fontSize: 14,
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                            </View>
                                            <Pressable
                                                style={{
                                                    backgroundColor: Colors.trash,
                                                    width: "100%",
                                                    paddingVertical: 8,
                                                    paddingHorizontal: 15,
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    position: "absolute",
                                                    bottom: 0
                                                }}
                                            >
                                                <Ionicons
                                                    name="heart-dislike"
                                                    size={15}
                                                    color={"white"}
                                                />
                                                <Typography>Už se mi nelíbí</Typography>
                                            </Pressable>
                                        </View>
                                    </ExpoImage>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                ) : (
                    <Dbutton
                        upperacse
                        title="Přihlásit se"
                        onPress={() => router.push("/(modals)/sign")}
                    />
                )}
            </View>
        </ExpoImage>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,.65)",
        gap: 5
    }
});

export default ProfilePage;
