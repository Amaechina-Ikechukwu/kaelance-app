import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import Avatar from "@/constants/Avatar";
import { width } from "@/constants/StatusBarHeight";
import { Colors, pink } from "@/constants/Colors";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";

const EmptyCircle = () => {
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedView
      style={[
        styles.pinkContainer,
        { backgroundColor: pink, alignItems: "center", width: "100%", gap: 14 },
      ]}
    >
      <View style={[styles.circleContainer]}>
        <Avatar name="Kaelance" />
        <ThemedText>You do not have or belong to a circle yet</ThemedText>
      </View>
      <TouchableOpacity
        style={{
          width: "70%",
          alignItems: "center",
          backgroundColor: Colors[theme].text,
          margin: 0,
          padding: 10,
        }}
      >
        <ThemedText style={{ color: Colors[theme].background }}>
          Create a finance circle now
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};
export default function FinanceCircle() {
  const theme = useColorScheme() ?? "light";
  const [financeCircle] = kaeStore(
    useShallow((state) => [state.financeCircle])
  );
  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={[styles.circleContainer]}>
        <Avatar name="Kaelance" />
        <ThemedText
          type="default"
          style={{
            maxWidth: "30%",
            textAlign: "center",
            color: Colors.light.background,
          }}
        >
          Welcome to kaelance vyuihoh uihojho ihohihi
        </ThemedText>
      </View>
    );
  };
  return (
    <ThemedView style={[styles.container]}>
      <ThemedText type="subtitle">Finance Circle</ThemedText>
      <ThemedView style={[styles.pinkContainer, { backgroundColor: pink }]}>
        <FlatList
          style={{ width: "100%" }}
          contentContainerStyle={{ width: "100%" }}
          data={financeCircle}
          renderItem={renderItem}
          horizontal
          ListEmptyComponent={<EmptyCircle />}
        />
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: "flex-start",
  },
  pinkContainer: {
    borderRadius: 10,
    height: "auto",
    width: width * 0.9,
    padding: 10,
    alignItems: "flex-start",
  },
  circleContainer: {
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});
