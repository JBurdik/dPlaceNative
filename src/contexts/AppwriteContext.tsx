import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appwrite, account } from "../lib/appwrite";
import { Models, Account } from "appwrite";
import { router } from "expo-router";

// Define the initial context value
type AppwriteContextType = {
  appwrite: Appwrite;
  userData: any;
  setUserData: (userData: any) => void;
  userProfile: any;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string, name: string) => void;
  refreshUser: () => void;
};
// Create the context
const AppwriteContext = createContext<AppwriteContextType>({
  appwrite: new Appwrite(),
  userData: null,
  setUserData: () => {},
  userProfile: null,
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  login: (email: string, password: string) => {},
  logout: () => {},
  register: (email: string, password: string, name: string) => {},
  refreshUser: () => {},
});

export const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [userProfile, setUserProfile] = useState<any>();
  const appwrite = new Appwrite();

  useEffect(() => {
    try {
      appwrite.user().then((user) => {
        if (user) {
          appwrite.userProfile().then((profile) => {
            setUserProfile(profile);
          });
          setUserData(user);
          setIsLoggedIn(true);
        }
      });
    } catch (e) {
      return;
    }
  }, []);

  const refreshUser = async () => {
    const user = await account.get();
    const profile = await appwrite.userProfile();
    setUserProfile(profile);
    setUserData(user);
  };

  const login = async (email: string, password: string) => {
    const user = await appwrite.login(email, password);
    const userProfile = await appwrite.userProfile();
    setUserProfile(userProfile);
    setUserData(user);
    setIsLoggedIn(true);
  };

  const register = async (email: string, password: string, name: string) => {
    await appwrite.register(email, password, name);
    login(email, password);
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUserData(null);
    await appwrite.logout();
  };

  const defaultValue = {
    appwrite,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    login,
    logout,
    register,
    refreshUser,
    userProfile,
  };
  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

export const useAppwrite = () => useContext(AppwriteContext);

export default AppwriteContext;
