import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appwrite } from "../lib/appwrite";
import { Models, Account } from "appwrite";
import login from "../../app/(modals)/login";

// Define the initial context value
type AppwriteContextType = {
  appwrite: Appwrite;
  userData: any;
  setUserData: (userData: any) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string, name: string) => void;
};
// Create the context
const AppwriteContext = createContext<AppwriteContextType>({
  appwrite: new Appwrite(),
  userData: null,
  setUserData: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  login: (email: string, password: string) => {},
  logout: () => {},
  register: (email: string, password: string, name: string) => {},
});

export const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] =
    useState<Models.User<Models.Preferences> | null>(null);
  const appwrite = new Appwrite();

  useEffect(() => {
    try {
      appwrite.user().then((user) => {
        if (user) {
          setUserData(user);
          setIsLoggedIn(true);
        }
      });
    } catch (e) {
      return;
    }
  }, []);

  const login = async (email: string, password: string) => {
    const user = await appwrite.login(email, password);
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
  };
  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

export const useAppwrite = () => useContext(AppwriteContext);

export default AppwriteContext;
