import {
  View,
  Text,
  FlatList,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import Avatar from "@/constants/Avatar";
import { AccountDetails, KallumUser } from "@/hooks/kaeInterfaces";
import { ThemedText } from "../ThemedText";
import { width } from "@/constants/StatusBarHeight";
import PillChildrenContainer from "@/constants/PillChilderenContainer";
import { blue, Colors, pink } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import { GetCircleActivity } from "@/apis/CircleActivity/GetCircleActivity";
import { useAuth } from "@/hooks/AuthContextProvider";
import { PostCircleActivity } from "@/apis/CircleActivity/PostCircleActivity";
import { useNotification } from "@/hooks/InAppNotificationProvider";
import FriendToAdd from "./FriendToAdd";
import { GetFinanceCircle } from "@/apis/FinanceCircle/GetFinacleCircle";
import AddMember from "./AddMember";
export default function CircleMembersActions() {
  const [friendsToAdd, setCircle, circle, accountDetails] = kaeStore(
    useShallow((state) => [
      state.friendsToAdd,
      state.setCircle,
      state.circle,
      state.accountDetails,
    ])
  );
  const { userToken } = useAuth();
  const { showNotification } = useNotification();
  const removeMember = async (bankId: string) => {
    if (accountDetails?.bankAccountId == bankId) {
      showNotification("You can not remove yourself", "error");
      return;
    }
    showNotification("Removing user", "loading");
    await PostCircleActivity(
      `members/${circle?.circleId}`,
      { bankId, type: "remove" },
      userToken
    );
    circle?.friends.filter((f) => f.userId !== bankId);
    const financeCircle = await GetFinanceCircle(
      `${circle?.circleId}`,
      userToken
    );
    setCircle(financeCircle);

    showNotification("Removed", "success");
  };
  const theme = useColorScheme() ?? "light";
  const renderItem = ({ item }: { item: KallumUser }) => {
    return (
      <ThemedView
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",

          padding: 10,
          borderRadius: 10,
        }}
      >
        <ThemedView
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            gap: 5,
          }}
        >
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
        </ThemedView>
        <TouchableOpacity
          style={{
            alignItems: "flex-start",
            backgroundColor: pink,
            margin: 0,
            padding: 10,
            opacity: 0.8,
          }}
          onPress={() => removeMember(item.userId)}
        >
          <ThemedText style={{ color: Colors[theme].background }}>
            Remove
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  };
  return (
    <PillChildrenContainer style={{ flex: 1, gap: 20 }}>
      <ThemedView
        style={{ gap: 10, alignItems: "flex-start", padding: 20, zIndex: 999 }}
      >
        <ThemedText type="subtitle">Add new member</ThemedText>
        <TouchableOpacity>
          <AddMember />
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={circle?.friends}
        renderItem={renderItem}
        contentContainerStyle={{
          gap: 20,
          // width: width * 0.9,
        }}
      />
    </PillChildrenContainer>
  );
}
