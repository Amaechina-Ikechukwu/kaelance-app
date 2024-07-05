import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from "react-native";
import { Colors } from "./Colors";

interface PillProps {
  text: string;
  pillStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const PillContainer: React.FC<PillProps> = ({ text, pillStyle, textStyle }) => {
  const theme = useColorScheme() ?? "light";
  return (
    <View
      style={[
        styles.pill,
        { backgroundColor: Colors[theme].background },
        pillStyle,
      ]}
    >
      <Text style={[styles.text, textStyle, { color: Colors[theme].text }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#e0e0e0", // Default background color
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

export default PillContainer;
