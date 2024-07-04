import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import KaeInput from "@/constants/KaeInput";
import { KaeButton } from "@/constants/KaeButton";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { AuthPost } from "@/apis/Authentication/AuthPost";

import { router } from "expo-router";

import { useShallow } from "zustand/react/shallow";
import kaeStore from "@/hooks/kaestore";
import { useNotification } from "@/hooks/InAppNotificationProvider";
import CallingCard from "@/constants/CallingCard";

export default function Signup() {
  const [inputValues, setInputValue] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    passWord: "",
    confirmPassword: "",
  });
  const { fullName, email, phoneNumber, passWord, confirmPassword } =
    inputValues;
  const [setActionStatus] = kaeStore(
    useShallow((state: any) => [state.setActionStatus])
  );

  const { showNotification } = useNotification();

  const handleChange = (name: string, value: any) => {
    setInputValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const body = { fullName: fullName.trim(), email, phoneNumber, passWord };
  const validateInputs = () => {
    showNotification("Siging up", "loading");
    if (!fullName || !email || !phoneNumber || !passWord || !confirmPassword) {
      showNotification("All fields are required.", "error");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address.", "error");
      return false;
    }
    if (passWord !== confirmPassword) {
      showNotification("Passwords do not match.", "error");
      return false;
    }
    return true;
  };

  const setUpAccount = async () => {
    try {
      if (validateInputs()) {
        const result = await AuthPost("register", body);

        showNotification("Congratulations, Kallum is here to serve", "success");
        router.push("/(tabs)");
      }
    } catch (error) {
      console.log(error);

      showNotification(
        "Could not set up account at the moment. \n Please ensure your password contains a number and a character",
        "error"
      );
    }
  };

  return (
    <ThemedView style={{ flex: 1, height: "100%", gap: 24 }}>
      <ThemedView style={{ justifyContent: "flex-start" }}>
        <CallingCard
          text="Plan, Contribute, Purchase, Enjoy"
          position={0.5}
          propwidth={0.9}
        />
      </ThemedView>

      <ThemedView style={{ gap: 20 }}>
        <KaeInput
          label="Full Name"
          value={inputValues.fullName}
          setValue={(text) => handleChange("fullName", text)}
          keyboardType="name-phone-pad"
        />
        <KaeInput
          label="Email Address"
          value={inputValues.email}
          setValue={(text) => handleChange("email", text)}
          keyboardType="email-address"
        />
        <KaeInput
          label="Phone Number"
          value={inputValues.phoneNumber}
          setValue={(text) => handleChange("phoneNumber", text)}
          keyboardType="number-pad"
        />
        <KaeInput
          label="Password"
          value={inputValues.passWord}
          setValue={(text) => handleChange("passWord", text)}
          secureTextEntry
        />
        <KaeInput
          label="Confirm Password"
          value={inputValues.confirmPassword}
          setValue={(text) => handleChange("confirmPassword", text)}
          secureTextEntry
        />
      </ThemedView>

      <KaeButton text="Set up account on Kallum" onPress={setUpAccount} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    height: 100,
    width: 100,
  },
});
