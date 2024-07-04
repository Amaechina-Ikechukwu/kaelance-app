// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
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

  const signIn = async (token) => {
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

export const useAuth = () => useContext(AuthContext);
