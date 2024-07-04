import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Easing, Dimensions } from "react-native";
import { ThemedView } from "../ThemedView";
import { blue, pink } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
const { width, height } = Dimensions.get("window");
const Circle = ({
  color,
  animatedValue,
}: {
  color: string;
  animatedValue: Animated.Value;
}) => {
  return (
    <Animated.View
      style={[
        styles.circle,
        {
          backgroundColor: color,
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1], // Adjust position as needed
              }),
            },
          ],
        },
      ]}
    />
  );
};

export default function Step2() {
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation1 = Animated.timing(animatedValue1, {
      toValue: 30,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const animation2 = Animated.timing(animatedValue2, {
      toValue: -30,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    Animated.parallel([animation1, animation2]).start();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ flexDirection: "row" }}>
        <Circle color={blue} animatedValue={animatedValue1} />
        <Circle color={pink} animatedValue={animatedValue2} />
      </ThemedView>
      <ThemedView style={{ width: width * 0.7 }}>
        <ThemedText type="title" style={{ textAlign: "center" }}>
          Shared finance exprience with friends
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  circle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: 10,
  },
});
