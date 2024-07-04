// Loading.js
import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { blue, pink } from "./Colors";

const { width } = Dimensions.get("window");

const Loading = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: width * 0.6,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateX]);

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <Animated.View style={[styles.line, { transform: [{ translateX }] }]}>
          <LinearGradient
            colors={[pink, blue]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lineContainer: {
    width: width * 0.6,
    height: 4,
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
  },
  line: {
    width: width / 4,
    height: 4,
  },
  gradient: {
    flex: 1,
  },
});

export default Loading;
