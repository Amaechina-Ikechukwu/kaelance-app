import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { blue, pink } from "./Colors";

interface AvatarProps {
  name: string | undefined;
  size?: number;
}

const LinearAvatar: React.FC<AvatarProps> = ({ name, size = 50 }) => {
  const firstLetter = name.charAt(0).toUpperCase() || "K";

  return (
    <LinearGradient
      colors={[blue, pink]}
      style={[
        styles.gradient,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <View
        style={[
          styles.avatar,
          { width: size - 4, height: size - 4, borderRadius: (size - 4) / 2 },
        ]}
      >
        <Text style={[styles.text, { fontSize: size / 2 }]}>{firstLetter}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default LinearAvatar;
