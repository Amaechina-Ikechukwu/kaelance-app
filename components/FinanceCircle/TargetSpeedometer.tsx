import React, { useState, useEffect } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { blue, Colors, pink } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { width } from "@/constants/StatusBarHeight";

interface TargetSpeedometerProps {
  targetValue: number;
  currentValue: number;
}

const TargetSpeedometer: React.FC<TargetSpeedometerProps> = ({
  targetValue,
  currentValue,
}) => {
  const [progress, setProgress] = useState(0);
  const theme = useColorScheme() ?? "light";

  useEffect(() => {
    setProgress((currentValue / targetValue) * 100);
  }, [currentValue, targetValue]);

  const radius = 160;
  const strokeWidth = 20;
  const circumference = Math.PI * radius;
  const arcLength = (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <View style={{ minHeight: 220 }}>
        <Svg height="180" width="320" viewBox="0 0 320 180">
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={pink} stopOpacity="1" />
              <Stop offset="100%" stopColor={blue} stopOpacity="1" />
            </LinearGradient>
          </Defs>

          {/* Background semi-circle */}
          <Path
            d={`M 20,160 A ${radius},${radius} 0 0 1 300,160`}
            stroke={Colors[theme].hueTint}
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Progress Arc */}
          <Path
            d={`M 20,160 A ${radius},${radius} 0 0 1 300,160`}
            stroke="url(#grad)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength},${circumference}`}
            fill="none"
          />
        </Svg>
      </View>

      <View style={styles.textContainer}>
        <ThemedText style={{ fontSize: 36 }} type="subtitle">
          {progress.toFixed(2)}%
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    margin: 20,
    width: width * 0.9,
  },
  textContainer: {
    position: "absolute",
    top: "60%",
    alignItems: "center",
  },
});

export default TargetSpeedometer;
