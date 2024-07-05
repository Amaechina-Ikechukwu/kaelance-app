import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextProps {
  userToken: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          setUserToken(token);
        }
      } catch (error) {
        console.error("Failed to load user token", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserToken();
  }, []);

  const signIn = async (token: string) => {
    try {
      await SecureStore.setItemAsync("userToken", token);
      setUserToken(token);
    } catch (error) {
      console.error("Failed to save user token", error);
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      setUserToken(null);
    } catch (error) {
      console.error("Failed to delete user token", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
