import { View, Text, FlatList } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import Avatar from "@/constants/Avatar";
import { AccountDetails, KallumUser } from "@/hooks/kaeInterfaces";
import { ThemedText } from "../ThemedText";
import { width } from "@/constants/StatusBarHeight";
import PillChildrenContainer from "@/constants/PillChilderenContainer";
import { Colors } from "@/constants/Colors";

export default function CircleMembers({ friends }: { friends: KallumUser[] }) {
  const renderItem = ({ item }: { item: KallumUser }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <Avatar name={item.userName} />
        <ThemedText
          type="default"
          style={{
            textAlign: "center",
            maxWidth: 100,
          }}
        >
          {item.userName}
        </ThemedText>
      </View>
    );
  };
  return (
    <PillChildrenContainer style={{ height: 120 }}>
      <ThemedText type="defaultSemiBold">Members</ThemedText>
      <FlatList
        horizontal={true}
        data={friends}
        renderItem={renderItem}
        contentContainerStyle={{
          gap: 20,
          alignItems: "center",
        }}
        style={{
          gap: 16,
          width: width * 0.9,
          padding: 10,
          borderRadius: 10,

          flexDirection: "column",
        }}
      />
    </PillChildrenContainer>
  );
}
