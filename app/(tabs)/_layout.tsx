import { Tabs, router } from "expo-router";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors, error, pink } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Loading from "@/constants/Loading";
import { useAuth } from "@/hooks/AuthContextProvider";
import { TouchableOpacity, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomSheet } from "@/hooks/BottomSheetProvider";
import CircleCreation from "@/components/FinanceCircle/CircleCreation";
import { ThemedText } from "@/components/ThemedText";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import { GetFinanceCircle } from "@/apis/FinanceCircle/GetFinacleCircle";
import { useNotification } from "@/hooks/InAppNotificationProvider";
import { GetNotifications } from "@/apis/GeneralNotifications/GetNotifications";
const CustomHeader = () => {
  const { openBottomSheet } = useBottomSheet();
  const theme = useColorScheme() ?? "light";
  const [setFinanceCircle, generalNotification, setGeneralNotifications] =
    kaeStore(
      useShallow((state) => [
        state.setFinanceCircle,
        state.generalNotification,
        state.setGeneralNotifications,
      ])
    );
  const { showNotification } = useNotification();
  const { userToken } = useAuth();
  const getFinacleCircles = async () => {
    showNotification("Getting your Circles", "loading");
    const financeCircle = await GetFinanceCircle("", userToken);
    const notifications = await GetNotifications("", userToken);

    setGeneralNotifications(notifications);
    setFinanceCircle(financeCircle);
    showNotification("Successful", "success");
  };
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => getFinacleCircles()}
      >
        <MaterialCommunityIcons
          name="refresh"
          size={30}
          color={Colors[theme].text}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => openBottomSheet(<CircleCreation />)}
      >
        <MaterialCommunityIcons
          name="shape-circle-plus"
          size={24}
          color={Colors[theme].text}
        />
        <ThemedText>New circle</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default function TabLayout() {
  const [loading, setIsLoading] = useState(false);
  const [generalNotification, setGeneralNotifications] = kaeStore(
    useShallow((state) => [
      state.generalNotification,
      state.setGeneralNotifications,
    ])
  );
  const [notificationsCount, setNotificationsCount] = useState(0);
  const { showNotification } = useNotification();
  const { userToken } = useAuth();
  const getFinacleCircles = async () => {
    const notifications = await GetNotifications("", userToken);

    setGeneralNotifications(notifications);
  };
  // const { signOut } = useAuth();
  const getIfUserIsNew = async () => {
    const token = await SecureStore.getItemAsync("newUser");
    setIsLoading(true);
    if (token == null) {
      router.push("/auth/onboarding");
    }
  };
  const colorScheme = useColorScheme();
  useEffect(() => {
    // signOut();
    getIfUserIsNew();
    getFinacleCircles();
  }, []);
  useEffect(() => {
    if (generalNotification) {
      let unseenCount = 0;
      for (const notification of generalNotification) {
        if (notification.seenNotification === false) {
          unseenCount++;
        }
      }
      setNotificationsCount(unseenCount);
    }
  }, [generalNotification]);
  if (!loading) {
    return <Loading componentName="Home" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "All",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"vector-circle-variant"} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Finance Circle",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"gamepad-circle-outline"} color={color} />
          ),
          headerRight: () => <CustomHeader />,
          headerRightContainerStyle: { marginRight: 20 },
        }}
      />
      <Tabs.Screen
        name="generalnotifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                notificationsCount > 0 ? "bell-badge-outline" : "bell-outline"
              }
              color={notificationsCount > 0 ? pink : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
