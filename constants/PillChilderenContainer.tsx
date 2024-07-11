import React from "react";
import { ViewStyle, StyleProp, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "./Colors";

interface PillChildrenContainerProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const PillChildrenContainer: React.FC<PillChildrenContainerProps> = ({
  style,
  children,
}) => {
  const theme = useColorScheme() ?? "light";
  return (
    <LinearGradient
      colors={[Colors[theme].boxLinear1, Colors[theme].boxLinear2]}
      style={[styles.gradient, style]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = {
  gradient: {
    padding: 10, // Default padding or any other default styles
    borderRadius: 10, // Default border radius or any other default styles
  },
};

export default PillChildrenContainer;
