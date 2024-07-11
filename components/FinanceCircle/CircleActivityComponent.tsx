import { View, Text, FlatList, useColorScheme, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import Avatar from "@/constants/Avatar";
import {
  AccountDetails,
  CircleActivity,
  KallumUser,
} from "@/hooks/kaeInterfaces";
import { ThemedText } from "../ThemedText";
import { height, width } from "@/constants/StatusBarHeight";
import PillChildrenContainer from "@/constants/PillChilderenContainer";
import { blue, Colors, error, pink } from "@/constants/Colors";
import Loading from "@/constants/Loading";
import { formatDateTime } from "@/hooks/formatdatetime";
const Committment = ({
  item,
  friends,
}: {
  item: CircleActivity;
  friends: KallumUser[];
}) => {
  const friend = "kaelance";
  return (
    <ThemedView
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "auto",
        gap: 8,
      }}
    >
      <Avatar name={friend} size={40} />
      <ThemedText>{`Commited ${item.commitmentHistory.percentage}%`}</ThemedText>
    </ThemedView>
  );
};
export default function CircleActivityComponent({
  circleActivity,
  friends,
}: {
  circleActivity: CircleActivity[] | null;
  friends: KallumUser[];
}) {
  const theme = useColorScheme() ?? "light";
  const renderItem = ({ item }: { item: CircleActivity }) => {
    const friend = "kaelance";
    return (
      <ThemedView
        style={{
          flexDirection: "row",
          width: "auto",
          justifyContent: "flex-start",
          height: 50,
          borderRadius: 10,
          padding: 10,
          gap: 8,
        }}
      >
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: item.activity.activityType == 0 ? blue : pink,
          }}
        />
        <ThemedView style={[styles.render]}>
          {item.activity.activityType == 0 && (
            <Committment item={item} friends={friends} />
          )}
          <ThemedText style={{ color: Colors[theme].tint }}>
            {formatDateTime(item.activity.dateTime)}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  };
  return (
    <PillChildrenContainer style={{ height: height * 0.45 }}>
      <ThemedText type="defaultSemiBold">Commitment History</ThemedText>
      <FlatList
        data={circleActivity?.reverse()}
        renderItem={renderItem}
        contentContainerStyle={{
          gap: 20,
        }}
        style={{
          gap: 16,
          width: width * 0.9,
          padding: 10,
          borderRadius: 10,

          flexDirection: "column",
        }}
        ListEmptyComponent={<Loading />}
      />
    </PillChildrenContainer>
  );
}
const styles = StyleSheet.create({
  render: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "93%",
  },
});
