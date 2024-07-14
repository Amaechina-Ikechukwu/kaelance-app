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
import { blue, Colors, pink } from "@/constants/Colors";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import { useBottomSheet } from "@/hooks/BottomSheetProvider";
import CircleCreation from "../FinanceCircle/CircleCreation";
import { Circle } from "@/hooks/kaeInterfaces";
import { router } from "expo-router";

const EmptyCircle = () => {
  const theme = useColorScheme() ?? "light";
  const { openBottomSheet } = useBottomSheet();
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
        onPress={() => openBottomSheet(<CircleCreation />)}
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
  const limitedData = financeCircle && financeCircle.slice(0, 3);
  const renderItem = ({ item }: { item: Circle }) => {
    return (
      <TouchableOpacity
        onPress={() => router.push(`circle/${item.circleId}/`)}
        style={[styles.circleContainer]}
      >
        <Avatar name={item.name} />
        <ThemedText
          type="default"
          style={{
            textAlign: "center",
            color: Colors.light.background,
          }}
        >
          {item.name}
        </ThemedText>
      </TouchableOpacity>
    );
  };
  return (
    <ThemedView style={[styles.container]}>
      <ThemedText type="subtitle">Finance Circle</ThemedText>
      <ThemedView style={[styles.pinkContainer, { backgroundColor: pink }]}>
        <FlatList
          style={{ width: "100%" }}
          contentContainerStyle={{ width: "100%", gap: 18 }}
          data={limitedData}
          renderItem={renderItem}
          horizontal
          ListEmptyComponent={<EmptyCircle />}
        />
        <TouchableOpacity
          onPress={() => router.push("(tabs)/explore")}
          style={{
            backgroundColor: Colors[theme].background,
            padding: 5,
            borderRadius: 5,
          }}
        >
          <ThemedText>See All</ThemedText>
        </TouchableOpacity>
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
    alignItems: "center",
    flexDirection: "row",
  },
  circleContainer: {
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});
