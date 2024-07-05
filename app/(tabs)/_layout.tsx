import { Tabs, router } from "expo-router";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { isLoading } from "expo-font";
import Loading from "@/constants/Loading";

export default function TabLayout() {
  const [loading, setIsLoading] = useState(false);
  const getIfUserIsNew = async () => {
    const token = await SecureStore.getItemAsync("newUser");
    setIsLoading(true);
    if (token == null) {
      router.push("/auth/onboarding");
    }
  };
  const colorScheme = useColorScheme();
  useEffect(() => {
    getIfUserIsNew();
  }, []);
  if (!isLoading) {
    return <Loading />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
