// PushTokenContext.tsx

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
interface PushTokenContextType {
  pushToken: string | null;
  refreshPushToken: () => void;
}

const PushTokenContext = createContext<PushTokenContextType>({
  pushToken: null,
  refreshPushToken: () => {},
});

export const usePushTokenContext = () => useContext(PushTokenContext);

export const PushTokenProvider = ({ children }: { children: ReactNode }) => {
  const [pushToken, setPushToken] = useState<string | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setPushToken(token);
    });

    // Handle notification events if needed
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        // Handle incoming notifications
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return null;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: Constants?.expoConfig?.extra?.eas.projectId ?? "jfjfjf",
    });

    const token = tokenData.data;

    return token;
  };

  const refreshPushToken = () => {
    registerForPushNotificationsAsync().then((token) => {
      setPushToken(token);
    });
  };

  return (
    <PushTokenContext.Provider value={{ pushToken, refreshPushToken }}>
      {children}
    </PushTokenContext.Provider>
  );
};
