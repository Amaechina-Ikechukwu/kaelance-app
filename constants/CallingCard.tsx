import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { blue, pink } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

export default function CallingCard({
  text,
  position = 0.8,
  propwidth = 0.65,
}: {
  text: string;
  position?: number;
  propwidth?: number;
}) {
  const translateY = useRef(new Animated.Value(0)).current;
  const styles = StyleSheet.create({
    gradient: {
      justifyContent: "center", // Center the text vertically
      alignItems: "center", // Center the text horizontally
      padding: 20,
      width: width * propwidth,
    },
    text: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 32,
      textAlign: "center",
    },
  });
  useEffect(() => {
    // Calculate the target position based on the provided position prop
    const targetPosition = height * position;

    // Define the animation
    Animated.timing(translateY, {
      toValue: targetPosition - height / 2, // Adjust to move up based on the target position
      duration: 3000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [position]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
      }}
    >
      <LinearGradient
        colors={[pink, blue]}
        style={styles.gradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </Animated.View>
  );
}
