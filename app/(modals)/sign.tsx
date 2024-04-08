import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
    Button,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useAppwrite } from "../../src/contexts/AppwriteContext";
import Colors from "../../constants/Colors";
import Typography from "../../components/ui/Typography";
import { Ionicons } from "@expo/vector-icons";
import Dbutton from "../../components/ui/Dbutton";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../src/contexts/AuthContext";

const LoginForm = (props: {
    email: string;
    setEmail: (v: string) => void;
    password: string;
    setPassword: (v: string) => void;
    signIn: () => void;
    passwordShown: boolean;
    setPasswordShown: (v: boolean) => void;
    setPageType: (v: "login" | "register") => void;
}) => (
    <View
        style={{
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1
        }}
    >
        <TextInput
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor={"#ffffff"}
            onChange={e => props.setEmail(e.nativeEvent.text)}
            style={{
                backgroundColor: "hsla(0, 0%, 100%, 0.2)",
                borderRadius: 10,
                color: "#ffffff",
                paddingHorizontal: 10,
                paddingVertical: 15,
                width: "100%"
            }}
        />
        <View
            style={{
                backgroundColor: "hsla(0, 0%, 100%, 0.2)",
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 15,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <TextInput
                placeholder="Heslo"
                placeholderTextColor={"#ffffff"}
                secureTextEntry={!props.passwordShown}
                onChange={e => props.setPassword(e.nativeEvent.text)}
                style={{
                    color: "#ffffff",
                    flex: 1
                }}
            />

            <TouchableOpacity
                onPressIn={() => props.setPasswordShown(true)}
                onPressOut={() => props.setPasswordShown(false)}
            >
                <Ionicons name="eye" size={20} color="white" />
            </TouchableOpacity>
        </View>
        <View
            style={{
                width: "100%",
                marginTop: "auto",
                marginBottom: 30,
                marginHorizontal: 40,
                paddingHorizontal: 10
            }}
        >
            <Dbutton title="Přihlásit se" onPress={() => props.signIn()} />
        </View>
    </View>
);

const RegisterForm = (props: {
    name: string;
    setName: (v: string) => void;
    email: string;
    setEmail: (v: string) => void;
    password: string;
    setPassword: (v: string) => void;
    signUp: () => void;
    passwordShown: boolean;
    setPasswordShown: (v: boolean) => void;
    setPageType: (v: "login" | "register") => void;
}) => (
    <View
        style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
            flex: 1
        }}
    >
        <TextInput
            autoCapitalize="none"
            placeholder="Jméno"
            placeholderTextColor={"#ffffff"}
            onChange={e => props.setName(e.nativeEvent.text)}
            style={{
                backgroundColor: "hsla(0, 0%, 100%, 0.2)",
                borderRadius: 10,
                color: "#ffffff",
                paddingHorizontal: 10,
                paddingVertical: 15,
                width: "100%"
            }}
        />
        <TextInput
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor={"#ffffff"}
            onChange={e => props.setEmail(e.nativeEvent.text)}
            style={{
                backgroundColor: "hsla(0, 0%, 100%, 0.2)",
                borderRadius: 10,
                color: "#ffffff",
                paddingHorizontal: 10,
                paddingVertical: 15,
                width: "100%"
            }}
        />
        <View
            style={{
                backgroundColor: "hsla(0, 0%, 100%, 0.2)",
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 15,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <TextInput
                placeholder="Heslo"
                placeholderTextColor={"#ffffff"}
                secureTextEntry={!props.passwordShown}
                onChange={e => props.setPassword(e.nativeEvent.text)}
                style={{
                    color: "#ffffff",
                    flex: 1
                }}
            />

            <TouchableOpacity
                onPressIn={() => props.setPasswordShown(true)}
                onPressOut={() => props.setPasswordShown(false)}
            >
                <Ionicons name="eye" size={20} color="white" />
            </TouchableOpacity>
        </View>
        <View
            style={{
                width: "100%",
                marginTop: "auto",
                marginBottom: 30,
                marginHorizontal: 40,
                paddingHorizontal: 10
            }}
        >
            <Dbutton title="Registrovat se" onPress={() => props.signUp()} />
        </View>
    </View>
);

const login = () => {
    const [pageType, setPageType] = React.useState<"login" | "register">("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();
    const { isLoggedIn, login, register, appwrite } = useAppwrite();
    const { signIn, signUp, authState } = useAuth();
    const signin = async () => {
        signIn(email, password)
            .then(result => {
                console.log(result);
                router.push("/");
            })
            .catch(err => {
                console.log(err);
            });
    };
    const signup = async () => {
        signUp(email, password, name).then(result => {
            console.log(result);
            router.push("/(modals)/onboard");
        });
    };
    useEffect(() => {
        if (authState?.isAuthenticated) router.push("/");
    }, []);
    return (
        <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={60}
                style={{
                    flex: 1,
                    backgroundColor: "black",
                    alignItems: "center"
                }}
            >
                <View
                    style={{
                        flex: 1,
                        gap: 10,
                        width: "100%"
                    }}
                >
                    <View style={{ flex: 0.5, backgroundColor: "red" }}>
                        <Image
                            source={require("../../assets/images/loginImg.png")}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </View>
                    <View style={{ flex: 1, gap: 10 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                gap: 10,
                                width: "100%",
                                backgroundColor: "hsla(0, 0%, 50%, 0.4)",
                                borderRadius: 7
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    borderColor:
                                        pageType === "login"
                                            ? Colors.primary
                                            : "transparent",
                                    padding: 5,
                                    borderRadius: 5,
                                    borderWidth: 2,
                                    flex: 1,
                                    alignItems: "center"
                                }}
                                onPress={() => setPageType("login")}
                            >
                                <Text style={{ color: "white" }}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    borderColor:
                                        pageType === "register"
                                            ? Colors.primary
                                            : "transparent",
                                    padding: 5,
                                    borderRadius: 5,
                                    borderWidth: 2,
                                    flex: 1,
                                    alignItems: "center"
                                }}
                                onPress={() => setPageType("register")}
                            >
                                <Text style={{ color: "white" }}>Register</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: "100%",
                                paddingVertical: 10,
                                flex: 1
                            }}
                        >
                            {pageType === "login" ? (
                                <LoginForm
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    signIn={signin}
                                    passwordShown={showPassword}
                                    setPasswordShown={setShowPassword}
                                    setPageType={setPageType}
                                />
                            ) : (
                                <RegisterForm
                                    name={name}
                                    setName={setName}
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    signUp={signup}
                                    passwordShown={showPassword}
                                    setPasswordShown={setShowPassword}
                                    setPageType={setPageType}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Pressable>
    );
};

export default login;
