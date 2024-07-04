// NotificationContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  ReactNode,
  FC,
} from "react";
import { View, Text, StyleSheet, Animated, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { blue, error, pink } from "@/constants/Colors";
const statusBarHeight = Constants.statusBarHeight;
interface Notification {
  visible: boolean;
  message: string;
  type: "loading" | "success" | "error" | "";
}

interface NotificationContextType {
  showNotification: (
    message: string,
    type: "loading" | "success" | "error"
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const InAppNotificationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification>({
    visible: false,
    message: "",
    type: "",
  });
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (notification.visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }).start(() =>
            setNotification({ visible: false, message: "", type: "" })
          );
        }, 2000);
      });
    }
  }, [notification, translateY]);

  const showNotification = (
    message: string,
    type: "loading" | "success" | "error"
  ) => {
    setNotification({ visible: true, message, type });
  };

  const getNotificationStyle = (type: "loading" | "success" | "error" | "") => {
    switch (type) {
      case "loading":
        return styles.loading;
      case "success":
        return styles.success;
      case "error":
        return styles.error;
      default:
        return {};
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {notification.visible && (
        <Animated.View
          style={[
            styles.notification,
            getNotificationStyle(notification.type),
            { transform: [{ translateY }] },
          ]}
        >
          <Text style={styles.message}>{notification.message}</Text>
        </Animated.View>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

const styles = StyleSheet.create({
  notification: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 50 + statusBarHeight,
  },
  message: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  loading: {
    backgroundColor: pink,
  },
  success: {
    backgroundColor: blue,
  },
  error: {
    backgroundColor: error,
  },
});
