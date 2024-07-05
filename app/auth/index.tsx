import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import CallingCard from "@/constants/CallingCard";
import KaeInput from "@/constants/KaeInput";
import { KaeButton } from "@/constants/KaeButton";
import { blue } from "@/constants/Colors";
import { Link, router } from "expo-router";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import { useNotification } from "@/hooks/InAppNotificationProvider";
import { AuthPost } from "@/apis/Authentication/AuthPost";
import { useAuth } from "@/hooks/AuthContextProvider";

export default function LoginScreen() {
  const [inputValues, setInputValue] = useState({
    userName: "",

    passWord: "",
  });
  const { userName, passWord } = inputValues;
  const [setActionStatus, setRetryFunction] = kaeStore(
    useShallow((state: any) => [state.setActionStatus, state.setRetryFunction])
  );

  const { showNotification } = useNotification();
  const { signIn } = useAuth();
  const handleChange = (name: string, value: any) => {
    setInputValue((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const body = { userName: userName.trim(), passWord };
  const validateInputs = () => {
    if (!userName || !passWord) {
      showNotification("All fields are required.", "error");
      return false;
    }

    return true;
  };

  const setUpAccount = async () => {
    try {
      if (validateInputs()) {
        // Proceed with signup logic
        showNotification("Siging in... please wait", "loading");
        const result = await AuthPost("login", body);
        signIn(result?.token);
        showNotification("Congratulations, Kallum is here to serve", "success");

        router.push("/(tabs)");
      }
    } catch (error) {
      setRetryFunction(setUpAccount);
      setActionStatus("failed");
      showNotification(
        "Could not set up account at the moment. \nPlease ensure your password contains a number and a character",
        "error"
      );
    }
  };
  return (
    <ThemedView style={styles.container}>
      <CallingCard text="Login" position={0.5} />
      <ThemedView style={styles.inputContainer}>
        <KaeInput
          value={inputValues.userName}
          setValue={(text) => handleChange("userName", text)}
          label="Enter username or email"
        />
        <KaeInput
          value={inputValues.passWord}
          setValue={(text) => handleChange("passWord", text)}
          label="Enter password"
          secureTextEntry
        />
      </ThemedView>
      <ThemedView>
        <KaeButton onPress={setUpAccount} text="Log in to Kaelance" />
      </ThemedView>
      <ThemedView style={styles.bottom}>
        <ThemedText>Yet to have an account on Kaelance?</ThemedText>
        <Link href={"/auth/signup"}>
          <ThemedText style={{ color: blue }}>Click to create</ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  inputContainer: {
    gap: 16,
  },
  bottom: {
    position: "absolute",
    bottom: 40,
  },
});
