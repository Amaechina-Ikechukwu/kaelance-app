import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { ThemedView } from "../ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { blue, pink } from "@/constants/Colors"; // Check if these colors are correctly imported
import { ThemedText } from "../ThemedText";

const { width, height } = Dimensions.get("window");

export default function Step1() {
  const position1 = useRef(new Animated.Value(0)).current;
  const position2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define the animations
    Animated.timing(position1, {
      toValue: height / 2 - height * 0.4, // Negative value to move up
      duration: 3000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    Animated.timing(position2, {
      toValue: height / 2 - height * 0.4, // Positive value to move down
      duration: 3000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Ensure ThemedView has dimensions */}
      <Animated.View
        style={{
          transform: [{ translateY: position1 }],
        }}
      >
        <LinearGradient
          colors={[pink, blue]}
          style={[styles.gradient]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.text}>Kaelance</Text>
        </LinearGradient>
      </Animated.View>

      <Animated.View
        style={{
          transform: [{ translateY: position2 }],
        }}
      >
        <ThemedView style={[styles.textContainer]}>
          <Text style={{ color: pink, fontSize: 42 }}>Finance</Text>
          <ThemedText style={{ fontSize: 32 }}>just got</ThemedText>
          <Text style={{ color: blue, fontSize: 42 }}>social...</Text>
        </ThemedView>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
    padding: 20,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 32,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    height: 50,
  },
});
