import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { blue, pink } from "./Colors";
import { KaeButton } from "./KaeButton";

const { width } = Dimensions.get("window");

const Loading = ({
  componentName,
  refresh,
}: {
  componentName: string;
  refresh?: () => void;
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null); // Replace with actual data fetching logic

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 7000);

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

    // Cleanup timeout on unmount
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [translateX]);

  if (loading) {
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
  }

  return (
    <View style={styles.container}>
      {data ? (
        <Text> No {componentName}</Text>
      ) : (
        <KaeButton text={`Refresh ${componentName}`} onPress={refresh} />
      )}
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
