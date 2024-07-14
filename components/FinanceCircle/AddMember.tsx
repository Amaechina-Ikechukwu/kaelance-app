import {
  View,
  Text,
  Keyboard,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import KaeInput from "@/constants/KaeInput";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import { AccountDetails } from "@/hooks/kaeInterfaces";
import Avatar from "@/constants/Avatar";
import BankDetails from "../HomeInterfaces/BankDetailsInfo";
import { ThemedText } from "../ThemedText";
import { GetFinanceCircle } from "@/apis/FinanceCircle/GetFinacleCircle";
import { useAuth } from "@/hooks/AuthContextProvider";
import { blue, Colors, pink } from "@/constants/Colors";
import { height, width } from "@/constants/StatusBarHeight";
import { useNotification } from "@/hooks/InAppNotificationProvider";
import { BankGet } from "@/apis/Bank/BankGet";
import { FontAwesome6 } from "@expo/vector-icons";
import { PostCircleActivity } from "@/apis/CircleActivity/PostCircleActivity";
const EmptyList = () => {
  return <ThemedView>Search friend to add</ThemedView>;
};
export default function AddMember() {
  const { userToken } = useAuth();
  const theme = useColorScheme() ?? "light";
  const [circle, setCircle, accountDetails, removeFriend] = kaeStore(
    useShallow((state) => [
      state.circle,
      state.setCircle,
      state.accountDetails,
      state.setRemoveFromFriendToAdd,
    ])
  );
  const { showNotification } = useNotification();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, isLoading] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [showList, setShowList] = useState(false);
  const handleSearch = async () => {
    if (friendName.length == 0) {
      showNotification("Please add a name", "error");
      return;
    }
    setShowList(true);
    showNotification(`Finding ${friendName}`, "loading");
    const result = await BankGet(
      `findkallumuser?UserName=${friendName}`,
      userToken
    );
    setSearchResult(result);
    showNotification(`Found ${friendName}`, "success");
    Keyboard.dismiss();
  };
  const selectItem = async (item: AccountDetails) => {
    await addMember(item);
    setSearchResult([]);
  };
  const addMember = async (item: AccountDetails) => {
    if (accountDetails?.bankAccountId == item.bankAccountId) {
      showNotification("You can not add yourself", "error");
      return;
    }
    showNotification("Adding user", "loading");
    const result = await PostCircleActivity(
      `members/${circle?.circleId}`,
      { bankId: item.bankAccountId, type: "add" },
      userToken
    );
    circle?.friends.push(item.kallumUser);
    const financeCircle = await GetFinanceCircle(
      `${circle?.circleId}`,
      userToken
    );

    setCircle(financeCircle);

    showNotification("User added", "success");
  };
  const renderSearchItem = ({ item }: { item: AccountDetails }) => {
    return (
      <TouchableOpacity onPress={() => selectItem(item)}>
        <View
          style={[
            styles.renderSearch,
            { backgroundColor: Colors[theme].hueTint, borderRadius: 10 },
          ]}
        >
          <Avatar name={item.kallumUser.userName} />
          <View>
            <ThemedText type="subtitle">{item.kallumUser.userName}</ThemedText>
            <ThemedText type="defaultSemiBold">{item.bankAccountId}</ThemedText>
            <ThemedText type="link">Tap to Add user</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ThemedView style={[styles.container]}>
      <KaeInput
        label="Enter name of friend to search"
        value={friendName}
        style={{ width: width * 0.85 }}
        setValue={(text) => setFriendName(text)}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <ThemedView
        style={{
          height: height * 0.08,
          position: "absolute",
          bottom: -width * 0.7,
          zIndex: 999,
        }}
      >
        {searchResult.length > 0 ? (
          <ThemedView
            style={{
              width: width * 9,
              padding: 20,
              height: height * 0.5,
            }}
          >
            <FlatList
              style={{ width: width * 0.9, borderRadius: 10 }}
              contentContainerStyle={{
                width: "100%",

                gap: 18,
              }}
              ListHeaderComponentStyle={{
                width: "auto",
                alignItems: "flex-end",
              }}
              ListHeaderComponent={
                <TouchableOpacity
                  onPress={() => setSearchResult([])}
                  style={{
                    backgroundColor: Colors[theme].background,
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <ThemedText>Close</ThemedText>
                </TouchableOpacity>
              }
              data={searchResult}
              renderItem={renderSearchItem}
            />
          </ThemedView>
        ) : null}
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  renderSearch: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    padding: 10,
  },
});
