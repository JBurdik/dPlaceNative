import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import Card from "../../components/Card";
import { API_URL } from "../../constants/ENV";
import { Profile } from "../../models/user";
import { useEffect, useState } from "react";

export default function Cards() {
    const shuffleBack = useSharedValue(false);

    const profiles = [
        {
            id: "1",
            userId: "1",
            name: "test",
            email: "Null",
            image: "https://media.discordapp.net/attachments/1084947932656177234/1226218112072810528/jirkab_cover_for_friend_song_in_edm_style_neon_colors_green_blu_347e4465-0029-42da-a821-012fb90581d3.png?ex=6623f79b&is=6611829b&hm=14cf6ba5c3d68a4b6f36d07d7168ae079d3492294e4a60cdff94af66c659eeae&=&format=webp&quality=lossless&width=1096&height=1096",
            rating: 5,
            bio: ""
        },
        {
            id: "2",
            userId: "1",
            name: "test",
            email: "Null",
            image: "https://media.discordapp.net/attachments/1084947932656177234/1226218068544589864/jirkab_cover_for_friend_song_in_edm_style_neon_colors_green_blu_fff2694d-f21f-4376-9135-03ace3a665ed.png?ex=6623f791&is=66118291&hm=e78dabb534b544798f0af1ebd1856989e0f4423bef8646121a7bf77c59c336c7&=&format=webp&quality=lossless&width=700&height=700",
            rating: 5,
            bio: ""
        }
    ];
    const [cards, setCards] = useState<Profile[]>([]);

    const {
        data: cardFetch,
        refetch: refetchProfiles,
        isFetching
    } = useQuery<Profile[]>({
        queryKey: ["profiles"],
        initialData: [],
        queryFn: async () => {
            const data = await axios.get<Profile[]>(`${API_URL}/profile/all`);
            setCards(data.data);
            return data.data;
        }
    });
    const refetchCards = () => {
        // const randomiser = Math.random() < 0.5;
        // console.log(randomiser);
        setCards([
            {
                id: Date.now().toString(36) + Math.random().toString(36).substring(2),
                userId: "1",
                name: "test",
                email: "Null",
                image: "https://media.discordapp.net/attachments/1084947932656177234/1226218112072810528/jirkab_cover_for_friend_song_in_edm_style_neon_colors_green_blu_347e4465-0029-42da-a821-012fb90581d3.png?ex=6623f79b&is=6611829b&hm=14cf6ba5c3d68a4b6f36d07d7168ae079d3492294e4a60cdff94af66c659eeae&=&format=webp&quality=lossless&width=1096&height=1096",
                rating: 5,
                bio: ""
            },
            {
                id: Date.now().toString(36) + Math.random().toString(36).substring(2),
                userId: "1",
                name: "test",
                email: "Null",
                image: "https://media.discordapp.net/attachments/1084947932656177234/1226218068544589864/jirkab_cover_for_friend_song_in_edm_style_neon_colors_green_blu_fff2694d-f21f-4376-9135-03ace3a665ed.png?ex=6623f791&is=66118291&hm=e78dabb534b544798f0af1ebd1856989e0f4423bef8646121a7bf77c59c336c7&=&format=webp&quality=lossless&width=700&height=700",
                rating: 5,
                bio: ""
            },
            {
                id: Date.now().toString(36) + Math.random().toString(36).substring(2),
                userId: "1",
                name: "test",
                email: "Null",
                image: "https://media.discordapp.net/attachments/1084947932656177234/1226218112072810528/jirkab_cover_for_friend_song_in_edm_style_neon_colors_green_blu_347e4465-0029-42da-a821-012fb90581d3.png?ex=6623f79b&is=6611829b&hm=14cf6ba5c3d68a4b6f36d07d7168ae079d3492294e4a60cdff94af66c659eeae&=&format=webp&quality=lossless&width=1096&height=1096",
                rating: 5,
                bio: ""
            },
            {
                id: Date.now().toString(36) + Math.random().toString(36).substring(2),
                userId: "1",
                name: "test",
                email: "Null",
                image: "https://media.discordapp.net/attachments/1084947932656177234/1226218068544589864/jirkab_cover_for_friend_song_in_edm_style_neon_colors_green_blu_fff2694d-f21f-4376-9135-03ace3a665ed.png?ex=6623f791&is=66118291&hm=e78dabb534b544798f0af1ebd1856989e0f4423bef8646121a7bf77c59c336c7&=&format=webp&quality=lossless&width=700&height=700",
                rating: 5,
                bio: ""
            },
            {
                id: Date.now().toString(36) + Math.random().toString(36).substring(2),
                userId: "1",
                name: "test",
                email: "Null",
                image: "https://media.discordapp.net/attachments/1084947932656177234/1226218112072810528/jirkab_cover_for_friend_song_in_edm_style_neon_colors_green_blu_347e4465-0029-42da-a821-012fb90581d3.png?ex=6623f79b&is=6611829b&hm=14cf6ba5c3d68a4b6f36d07d7168ae079d3492294e4a60cdff94af66c659eeae&=&format=webp&quality=lossless&width=1096&height=1096",
                rating: 5,
                bio: ""
            },
            {
                id: Date.now().toString(36) + Math.random().toString(36).substring(2),
                userId: "1",
                name: "test",
                email: "Null",
                image: "https://media.discordapp.net/attachments/1084947932656177234/1226218068544589864/jirkab_cover_for_friend_song_in_edm_style_neon_colors_green_blu_fff2694d-f21f-4376-9135-03ace3a665ed.png?ex=6623f791&is=66118291&hm=e78dabb534b544798f0af1ebd1856989e0f4423bef8646121a7bf77c59c336c7&=&format=webp&quality=lossless&width=700&height=700",
                rating: 5,
                bio: ""
            },
            ...cards
        ]);
    };
    return (
        <View style={styles.container}>
            <Pressable
                style={{ zIndex: 99, position: "absolute", top: 0 }}
                onPress={() => setCards(profiles)}
            >
                <Text>TEST</Text>
            </Pressable>
            {cards.map((profile, idx) => (
                <Card
                    profileInfo={profile}
                    key={profile.id}
                    index={idx}
                    shuffleBack={shuffleBack}
                    refetchCards={refetchCards}
                />
            ))}
            <Text style={{ zIndex: 0 }}>This is all for now</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 25
    }
});
