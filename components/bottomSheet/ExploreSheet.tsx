import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import Typography from "../ui/Typography";
import Badge from "../ui/Badge";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useAppwrite } from "../../src/contexts/AppwriteContext";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../constants/ENV";
import { Profile } from "../../models/user";
type Props = {
    userInfo: Profile;
};
const ExploreSheet = forwardRef<BottomSheet, Props>(({ userInfo }, ref) => {
    const queryClient = useQueryClient();
    const { mutate: favorite } = useMutation({
        mutationFn: async () => axios.post(`${API_URL}/profile/favorite/${userInfo.id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["isFavorite", userInfo.id],
                type: "all"
            });
            queryClient.refetchQueries({
                queryKey: ["favorites"],
                type: "all"
            });
        },
        onError: error => {
            console.log(error);
        }
    });
    const { data: isFavorite } = useQuery<boolean>({
        queryKey: [`isFavorite`, userInfo.id],
        initialData: false,
        queryFn: async () =>
            (await axios.get(`${API_URL}/profile/${userInfo.id}/favorite`)).data
    });
    const { userProfile, appwrite, refreshUser } = useAppwrite();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const snapPoints = useMemo(() => ["20%", "42%"], []);

    useEffect(() => {
        if (userProfile && userProfile.favorites?.length > 0) {
            setIsLiked(userProfile?.favorites.includes(userInfo.id.toString()));
        }
    }, [userProfile, userInfo]);

    const likeUnlike = async () => {
        setIsLiked(!isLiked);
        let favorites = await userProfile.favorites;
        if (userProfile?.favorites.includes(userInfo.id.toString())) {
            await appwrite.updateProfileFavorites(
                favorites.filter((id: string) => id !== userInfo.id.toString())
            );
            refreshUser();
        } else {
            favorites.push(userInfo.id.toString());
            await appwrite.updateProfileFavorites(favorites);
            refreshUser();
        }
    };

    const mailTo = async (email: string) => {
        await Linking.openURL(`mailto:${email}`);
    };
    return (
        <BottomSheet
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: "rgba(0,0,0,.8)" }}
            handleIndicatorStyle={{ backgroundColor: Colors.primary }}
            style={{ zIndex: 1000 }}
        >
            <View style={styles.card}>
                <View style={styles.cardText}>
                    <View style={styles.name}>
                        <Pressable
                            onPress={() =>
                                router.push(`/(profile)/detail/${userInfo.id}`)
                            }
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 5
                            }}
                        >
                            <Typography style={{ color: "white" }} variant="h1">
                                {userInfo.name}
                            </Typography>
                            <Ionicons
                                name="information-circle"
                                size={18}
                                color={Colors.primary}
                            />
                        </Pressable>
                        <Badge style={styles.badge} text={"DJ"} />
                    </View>
                    <Pressable onPress={() => mailTo(userInfo.email)}>
                        <Typography style={{ color: "white" }} variant="h4">
                            {userInfo.email}
                        </Typography>
                    </Pressable>
                </View>
                <View
                    style={{
                        flex: 1,
                        marginTop: 0
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 5,
                            justifyContent: "flex-end",
                            marginBottom: 20
                        }}
                    >
                        <Pressable>
                            <Ionicons
                                name="chatbubbles-outline"
                                size={24}
                                color="white"
                            />
                        </Pressable>
                        <Pressable onPress={() => favorite()}>
                            <Ionicons
                                name="heart-outline"
                                size={24}
                                color={isFavorite ? "red" : "white"}
                            />
                        </Pressable>
                        <View
                            style={{
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 5
                            }}
                        >
                            <MaterialIcons name="star-outline" size={24} color="white" />
                            <Typography style={{ color: "white" }} bold>
                                4.5
                            </Typography>
                        </View>
                    </View>

                    <Typography style={{ color: "white" }}>{userInfo.bio}</Typography>
                </View>
            </View>
        </BottomSheet>
    );
});

export default ExploreSheet;

const styles = StyleSheet.create({
    card: {
        height: "100%",
        marginHorizontal: 20
    },
    cardText: {
        gap: 10
    },
    name: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    badge: {
        marginLeft: 10
    }
});
