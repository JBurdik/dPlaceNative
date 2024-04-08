import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { Profile } from "../../models/user";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { API_URL } from "../../constants/ENV";

// Define the shape of the context value
interface ProfileContextValue {
    profile: Profile | null;
    setProfile: Dispatch<SetStateAction<Profile | null>>;
    reloadImage: () => void;
    imageUrl: string | null;
    imageKey?: number;
}

// Create the context
export const ProfileContext = createContext<ProfileContextValue>({
    profile: null,
    setProfile: () => {},
    reloadImage: () => {},
    imageUrl: null,
    imageKey: 0
});

export const useProfile = () => {
    return useContext(ProfileContext);
};

// Create a provider component
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const { authState } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(
        `${API_URL}/profile/me/image`
    );
    const [imageKey, setImageKey] = useState<number>(0);

    const reloadImage = async () => {
        // setImageUrl(`${API_URL}/profile/me/image?time=${new Date().getTime()}`);
        setImageKey(new Date().getTime());
    };

    useEffect(() => {
        if (authState?.isAuthenticated) {
            axios.get(`${API_URL}/profile`).then(({ data }: { data: Profile }) => {
                setProfile(data);
            });
        }
    }, []);

    return (
        <ProfileContext.Provider
            value={{ profile, setProfile, imageUrl, reloadImage, imageKey }}
        >
            {children}
        </ProfileContext.Provider>
    );
};
