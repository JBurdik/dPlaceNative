export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
};
export type AuthState = {
    isAuthenticated: boolean | null;
    token: string | null;
    userInfo: {
        name: string;
        email: string;
    } | null;
};
export type Profile = {
    id: string;
    userId?: string;
    name: string;
    email: string;
    image?: string;
    localUri?: string | null;
    rating: number;
    bio: string;
};
