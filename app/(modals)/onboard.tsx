import React, { useEffect, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Divider from "../../components/ui/Divider";
import Input from "../../components/ui/Input";
import Typography from "../../components/ui/Typography";
import Colors from "../../constants/Colors";
import Dbutton from "../../components/ui/Dbutton";
import Label from "../../components/ui/Label";
import { useAppwrite } from "../../src/contexts/AppwriteContext";
import { databases } from "../../src/lib/appwrite";
import { router } from "expo-router";
import axios from "axios";
import { API_URL } from "../../constants/ENV";

enum AccountType {
    DJ = "DJ",
    CLUB = "CLUB"
}

const OnBoardModal = () => {
    const [accountType, setAccountType] = useState<AccountType>(AccountType.DJ);
    const [bio, setBio] = useState("");
    const save = async () => {
        axios
            .post(`${API_URL}/profile/onboard`, {
                bio,
                accountType
            })
            .then(res => {
                console.log(res.data);
                router.push("/(tabs)/profile");
            })
            .catch(e => console.log(e));
    };
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
                    <Typography variant="h2">Welcome to dPlace</Typography>
                    <Typography bold variant="h1">
                        place for Djs and Clubs
                    </Typography>
                    <Typography>we're glad you joined us!</Typography>
                    <Divider />
                    <Typography variant="h3">What's next?</Typography>
                    <Typography variant="h4">tel us more info</Typography>
                    <View style={styles.inputContainer}>
                        <View>
                            <Input
                                label="Bio: "
                                placeholder="Tell others about yourself...."
                                textarea
                                onChange={v => setBio(v)}
                            />
                            <View style={{ marginTop: 15 }}>
                                <Label text="Account type:" />
                                <View style={styles.accountTypeWrapper}>
                                    <TouchableOpacity
                                        style={[
                                            styles.accountTypeSelect,
                                            accountType === AccountType.DJ &&
                                                styles.accountTypeActive
                                        ]}
                                        onPress={() => {
                                            setAccountType(AccountType.DJ),
                                                Keyboard.dismiss();
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
                                            accountType === AccountType.CLUB &&
                                                styles.accountTypeActive
                                        ]}
                                        onPress={() => {
                                            setAccountType(AccountType.CLUB),
                                                Keyboard.dismiss();
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
                        </View>
                        <Dbutton title="Save info" onPress={() => save()} />
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
        marginTop: 16,
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

export default OnBoardModal;
