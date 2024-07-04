import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { KaeButton } from "@/constants/KaeButton";
import KaeInput from "@/constants/KaeInput";
import Loading from "@/constants/Loading";
import { useNotification } from "@/hooks/InAppNotificationProvider";
import Step1 from "@/components/Onboarding/Step1";
import Step2 from "@/components/Onboarding/Step2";
import Step3 from "@/components/Onboarding/Step3";

export default function HomeScreen() {
  const { showNotification } = useNotification();
  const handleSignIn = async () => {
    showNotification("Loading...", "loading");
    try {
      setTimeout(() => {
        showNotification("Sign in successful!", "success");
      }, 5000);
      setTimeout(() => {
        showNotification("Sign in failed!", "error");
      }, 10000);
    } catch (error) {
      showNotification("Sign in failed!", "error");
    }
  };
  return (
    <ThemedView style={{ flex: 1 }}>
      <Step3 />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
