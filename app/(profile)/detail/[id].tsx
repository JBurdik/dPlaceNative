import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  Linking,
  Alert,
} from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import djs from "../../../mock/djs.json";
import Typography from "../../../components/ui/Typography";
import Colors from "../../../constants/Colors";
import Badge from "../../../components/ui/Badge";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Divider from "../../../components/ui/Divider";
import Dbutton from "../../../components/ui/Dbutton";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = djs.find((dj) => dj.id === Number(id));
  const maleAvatars = [
    { id: 1, url: require("../../../assets/images/djs/man/dj1.png") },
    { id: 2, url: require("../../../assets/images/djs/man/dj2.png") },
    { id: 3, url: require("../../../assets/images/djs/man/dj3.png") },
    { id: 4, url: require("../../../assets/images/djs/man/dj4.png") },
    { id: 9, url: require("../../../assets/images/djs/man/dj9.png") },
    { id: 11, url: require("../../../assets/images/djs/man/dj11.png") },
    { id: 13, url: require("../../../assets/images/djs/man/dj13.png") },
    { id: 15, url: require("../../../assets/images/djs/man/dj15.png") },
  ];
  const femaleAvatars = [
    { id: 5, url: require("../../../assets/images/djs/woman/dj5.png") },
    { id: 6, url: require("../../../assets/images/djs/woman/dj6.png") },
    { id: 7, url: require("../../../assets/images/djs/woman/dj7.png") },
    { id: 8, url: require("../../../assets/images/djs/woman/dj8.png") },
    { id: 10, url: require("../../../assets/images/djs/woman/dj10.png") },
    { id: 12, url: require("../../../assets/images/djs/woman/dj12.png") },
    { id: 14, url: require("../../../assets/images/djs/woman/dj14.png") },
    { id: 16, url: require("../../../assets/images/djs/woman/dj16.png") },
  ];
  const openIG = (username: string) => {
    Linking.openURL(`instagram://user?username=tomas_oxy.dll${username}`)
      .then((val) => console.log(val))
      .catch(() => Linking.openURL(`https://instagram.com/${username}`));
  };
  const mailME = (email: string) => {
    Linking.openURL(`mailto:${email}`).catch(() =>
      Alert.alert("Nepodařilo se otevřít emailového klienta")
    );
  };
  if (!user) return <></>;
  return (
    <ImageBackground
      style={{
        flex: 1,
        alignItems: "center",
        gap: 15,
      }}
      source={
        user.sex === "male"
          ? maleAvatars.find((avatar) => avatar.id === user.id)?.url ??
            maleAvatars[0].url
          : femaleAvatars.find((avatar) => avatar.id === user.id)?.url ??
            femaleAvatars[0].url
      }
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.85)",
          alignItems: "center",
          justifyContent: "flex-start",
          flex: 1,
          width: "100%",
          paddingHorizontal: 16,
        }}
      >
        <Image
          source={
            user.sex === "male"
              ? maleAvatars.find((avatar) => avatar.id === user.id)?.url ??
                maleAvatars[0].url
              : femaleAvatars.find((avatar) => avatar.id === user.id)?.url ??
                femaleAvatars[0].url
          }
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            marginTop: 20,
            marginBottom: 20,
            borderColor: Colors.primary,
            borderWidth: 3,
          }}
        />
        {/* Name and rating */}
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Typography style={{ color: "white" }} variant="h1">
              {user?.name ?? "DJ not found"}
            </Typography>
            <Badge text="DJ" />
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 5,
              }}
            >
              <MaterialIcons name="star-outline" size={24} color="white" />
              <Typography style={{ color: "white" }} bold>
                4.8
              </Typography>
            </View>
          </View>
        </View>
        {/* Socky */}
        <View style={styles.row}>
          <TouchableOpacity>
            <Ionicons name="chatbubbles-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openIG("tomas_oxy.dll")}>
            <Ionicons name="logo-instagram" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="soundcloud" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="music" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={{ marginHorizontal: 16 }}>
          <Typography style={{ color: "white" }}>{user.bio}</Typography>
        </View>
        <View style={{ marginTop: "auto", marginBottom: 20, width: "100%" }}>
          <Dbutton
            title="Napiš mi email"
            upperacse
            onPress={() => mailME(user.email)}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Page;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
});
