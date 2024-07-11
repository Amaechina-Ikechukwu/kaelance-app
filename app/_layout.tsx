import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { InAppNotificationProvider } from "@/hooks/InAppNotificationProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/hooks/AuthContextProvider";
import { BottomSheetProvider } from "@/hooks/BottomSheetProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InAppNotificationProvider>
          <AuthProvider>
            <BottomSheetProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="auth" options={{ headerShown: false }} />
                <Stack.Screen name="circle" options={{ headerShown: false }} />
                <Stack.Screen
                  name="transactions"
                  options={{
                    headerShown: true,
                    headerTitle: "Top-Up With Flutterwave",
                    headerShadowVisible: false,
                  }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
            </BottomSheetProvider>
          </AuthProvider>
        </InAppNotificationProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
