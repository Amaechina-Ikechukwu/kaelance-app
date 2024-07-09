import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function FinanceCircle() {
  const { circleid } = useLocalSearchParams();
  return (
    <View>
      <Text>FinanceCircle {circleid}</Text>
    </View>
  );
}
