import axios, { AxiosError } from "axios";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthState, User } from "../../models/user";

type AuthContextType = {
    authState?: AuthState;
    signIn: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<any>;
    signUp: (email: string, password: string, name: string) => Promise<any>;
};
export const AuthContext = createContext<AuthContextType>({
    signIn: (email: string, password: string) => Promise.resolve({}),
    signOut: () => Promise.resolve({}),
    signUp: (email: string, password: string, name: string) => Promise.resolve({})
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: null,
        token: null,
        userInfo: null
    });

    useEffect(() => {
        const autoLogin = async () => {
            const accessToken = await SecureStore.getItemAsync("accessToken");
            if (accessToken) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                const userInfo = await axios.get<User>(
                    "http://93.181.102.169:3000/users/me"
                );
                setAuthState({
                    isAuthenticated: true,
                    token: accessToken,
                    userInfo: userInfo.data
                });
            }
        };
        autoLogin();
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const result = await axios.post<AuthState>(
                "http://93.181.102.169:3000/auth/signin",
                {
                    email,
                    password
                }
            );
            console.log(
                "📁 >> AuthContext.tsx ~ signIn ~ access_token: ",
                result.data.token
            );
            setAuthState({
                isAuthenticated: true,
                token: result.data.token,
                userInfo: result.data.userInfo
            });
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${result.data.token}`;
            SecureStore.setItemAsync("accessToken", result.data.token ?? "");
        } catch (error) {
            return (error as AxiosError).response?.data;
        }
    };
    const signUp = async (email: string, password: string, name: string) => {
        const result = await axios.post("http://93.181.102.169:3000/auth/signup", {
            name,
            email,
            password
        });
        console.log("📁 >> AuthContext.tsx ~ signUp ~ access_token: ", result.data.token);
        setAuthState({
            isAuthenticated: true,
            token: result.data.token,
            userInfo: result.data.userInfo
        });
        axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
        SecureStore.setItemAsync("accessToken", result.data.token);
    };

    const signOut = async () => {
        await SecureStore.deleteItemAsync("accessToken");
        setAuthState({
            isAuthenticated: null,
            token: null,
            userInfo: null
        });
    };

    return (
        <AuthContext.Provider value={{ authState, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
