import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Dbutton from "../../components/ui/Dbutton";
import Divider from "../../components/ui/Divider";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Typography from "../../components/ui/Typography";
import Colors from "../../constants/Colors";
import { useAppwrite } from "../../src/contexts/AppwriteContext";
import { databases, storage } from "../../src/lib/appwrite";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ID } from "appwrite";
import { blobToFile } from "../../src/utils";
import { useAuth } from "../../src/contexts/AuthContext";
import axios from "axios";
import { API_URL } from "../../constants/ENV";
import { router } from "expo-router";
import { useProfile } from "../../src/contexts/ProfileContext";

const imgDir = FileSystem.documentDirectory + "images/";
const dirExists = async () => {
    const info = await FileSystem.getInfoAsync(imgDir);
    if (!info.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
};

const ProfileEditModal = () => {
    const { authState } = useAuth();
    const [accountType, setAccountType] = useState<"DJ" | "CLUB">("DJ");
    const [user, setUser] = useState<any>();
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarUri, setAvatarUri] = useState<string>();
    const { userData, refreshUser } = useAppwrite();
    const { reloadImage, profile } = useProfile();

    const pickImage = async (useMediaLibrary: boolean) => {
        let result;
        if (useMediaLibrary) {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images
            });
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images
            });
        }
        if (!result.canceled) {
            dirExists();
            await FileSystem.copyAsync({
                from: result.assets[0].uri,
                to: imgDir + user.id + ".jpg"
            });
            // await FileSystem.uploadAsync(
            //     "http://93.181.102.169:3000/profile/upload-avatar",
            //     result.assets[0].uri,
            //     {
            //         headers: {
            //             Authorization: `Bearer ${authState?.token}`
            //         },
            //         uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            //         httpMethod: "POST",
            //         fieldName: "file"
            //     }
            // );
            setAvatarUri(result.assets[0].uri);
        }
    };

    useEffect(() => {
        axios.get("http://93.181.102.169:3000/profile").then(res => {
            setUser(res.data.user);
            setBio(res.data.bio);
            setAccountType(res.data.accountType);
        });
    }, []);

    const save = async () => {
        if (avatarUri) {
            await FileSystem.uploadAsync(
                "http://93.181.102.169:3000/profile/upload-avatar",
                avatarUri,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.token}`
                    },
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    httpMethod: "POST",
                    fieldName: "file"
                }
            );
            reloadImage();
        }
        await axios.put(`${API_URL}/profile/edit`, {
            bio,
            accountType
        });
        router.push("/(tabs)/profile");
    };
    if (!user) return null;
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                flex: 1,
                backgroundColor: "black",
                borderTopColor: Colors.primary,
                borderTopWidth: 1
            }}
        >
            <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                        <Image
                            source={{
                                uri:
                                    avatarUri ??
                                    "http://93.181.102.169:3000/profile/me/image",
                                headers: {
                                    Authorization: `Bearer ${authState?.token}`
                                }
                            }}
                            style={{ width: 80, height: 80 }}
                        />
                        <Typography variant="h1">{user.name}</Typography>
                        {/* <Typography variant="h1">{user.id}</Typography> */}
                    </View>
                    <Divider />
                    <View style={styles.inputContainer}>
                        <View>
                            <Input
                                label="Bio: "
                                placeholder="Tell others about yourself...."
                                value={bio}
                                textarea
                                onChange={v => setBio(v)}
                            />
                            <View style={{ marginTop: 15 }}>
                                <Label text="Typ účtu:" />
                                <View style={styles.accountTypeWrapper}>
                                    <TouchableOpacity
                                        style={[
                                            styles.accountTypeSelect,
                                            accountType === "DJ" &&
                                                styles.accountTypeActive
                                        ]}
                                        onPress={() => {
                                            setAccountType("DJ"), Keyboard.dismiss();
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.textCenter,
                                                { color: "white" }
                                            ]}
                                        >
                                            DJ
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.accountTypeSelect,
                                            accountType === "CLUB" &&
                                                styles.accountTypeActive
                                        ]}
                                        onPress={() => {
                                            setAccountType("CLUB"), Keyboard.dismiss();
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.textCenter,
                                                { color: "white" }
                                            ]}
                                        >
                                            CLUB
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <Label text="Nahrát profilový obrázek" />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        backgroundColor: "hsla(0, 0%, 100%, .1)",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        padding: 10,
                                        marginVertical: 0,
                                        borderRadius: 10,
                                        gap: 10
                                    }}
                                >
                                    <Pressable
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "hsla(0,0%,100%,.1)",
                                            padding: 10,
                                            borderRadius: 10,
                                            flex: 1
                                        }}
                                        onPress={() => pickImage(true)}
                                    >
                                        <Ionicons
                                            name="images-outline"
                                            color={"white"}
                                            size={20}
                                        />
                                        <Text style={{ color: "white" }}>Z fotek</Text>
                                    </Pressable>
                                    <Pressable
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "hsla(0,0%,100%,.1)",
                                            padding: 10,
                                            borderRadius: 10,
                                            flex: 1
                                        }}
                                        onPress={() => pickImage(false)}
                                    >
                                        <Ionicons
                                            name="camera-outline"
                                            color={"white"}
                                            size={20}
                                        />
                                        <Text style={{ color: "white" }}>Fotoaparát</Text>
                                    </Pressable>
                                </View>
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginTop: 25
                                    }}
                                >
                                    {avatarUri && (
                                        <Image
                                            source={{ uri: avatarUri }}
                                            style={{ width: 150, height: 150 }}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                        <Dbutton title="Uložit info" onPress={() => save()} />
                    </View>
                </View>
            </Pressable>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    textCenter: {
        textAlign: "center"
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 40,
        width: "auto",
        flex: 1
    },
    inputContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    accountTypeWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10
    },
    accountTypeSelect: {
        borderRadius: 10,
        padding: 10,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "hsla(0, 0%, 100%, 0.12)",
        flex: 1
    },
    accountTypeActive: {
        borderColor: Colors.primary,
        borderWidth: 1
    }
});

export default ProfileEditModal;
