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

const EmptyList = () => {
  return <ThemedView>Search friend to add</ThemedView>;
};
export default function FriendToAdd() {
  const { userToken } = useAuth();
  const theme = useColorScheme() ?? "light";
  const [friendsToAdd, setFriendsToAdd] = kaeStore(
    useShallow((state) => [state.friendsToAdd, state.setFriendsToAdd])
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
    const result = await GetFinanceCircle(
      `findkallumuser?UserName=${friendName}`,
      userToken
    );
    setSearchResult(result);
    showNotification(`Found ${friendName}`, "success");
    Keyboard.dismiss();
  };

  useEffect(() => {}, [FriendToAdd]);
  const renderItem = ({ item }: { item: AccountDetails }) => {
    return (
      <View>
        <Avatar name={item.kallumUser.userName} />
      </View>
    );
  };

  const renderSearchItem = ({ item }: { item: AccountDetails }) => {
    return (
      <TouchableOpacity
        disabled={friendsToAdd.some(
          (f: AccountDetails) =>
            f.kallumUser.userName === item.kallumUser.userName
        )}
        onPress={() => setFriendsToAdd(item)}
      >
        <View
          style={[
            styles.renderSearch,
            { backgroundColor: Colors[theme].hueTint, borderRadius: 10 },
          ]}
        >
          <Avatar name={item.kallumUser.userName} />
          <ThemedText type="subtitle">{item.kallumUser.userName}</ThemedText>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ThemedView style={[styles.container]}>
      <View style={{ height: height * 0.08, width: "100%" }}>
        <FlatList
          horizontal={true}
          data={friendsToAdd}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 20 }}
          style={{
            flexDirection: "row",
            gap: 16,
            width: width * 0.9,
            padding: 10,
            borderRadius: 10,
            height: 10,
          }}
        />
      </View>

      <KaeInput
        label="Enter name of friend"
        value={friendName}
        style={{}}
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
        {showList ? (
          <ThemedView
            style={{ width: width * 9, padding: 20, height: height * 0.5 }}
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
                  onPress={() => setShowList(false)}
                  style={{
                    backgroundColor: pink,
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
