import { View, StyleSheet, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import { ThemedView } from "../ThemedView";
import { Notifications } from "@/hooks/kaeInterfaces";
import { ThemedText } from "../ThemedText";
import { FlatList } from "react-native-gesture-handler";
import { height, width } from "@/constants/StatusBarHeight";
import Loading from "@/constants/Loading";
import { formatDateTime } from "@/hooks/formatdatetime";
import { Colors } from "@/constants/Colors";
import { useNotification } from "@/hooks/InAppNotificationProvider";
import { useAuth } from "@/hooks/AuthContextProvider";
import { GetNotifications } from "@/apis/GeneralNotifications/GetNotifications";
import PillChildrenContainer from "@/constants/PillChilderenContainer";
import { formatMoney } from "@/hooks/FormatMoney";

export default function TransactionsNotifications() {
  const [generalNotification, setGeneralNotifications] = kaeStore(
    useShallow((state) => [
      state.generalNotification,
      state.setGeneralNotifications,
    ])
  );
  const { showNotification } = useNotification();
  const { userToken } = useAuth();

  const getGeneralNotifications = async () => {
    try {
      showNotification("Getting your Circles", "loading");
      const notifications = await GetNotifications("", userToken);
      setGeneralNotifications(notifications);
      showNotification("Successful", "success");
    } catch (error) {
      showNotification("Failed to get notifications", "error");
    }
  };

  const theme = useColorScheme() ?? "light";
  const transactions = generalNotification.filter(
    (no) => no.type == "Transactions"
  );
  const renderItem = ({ item }: { item: Notifications }) => {
    const [firstWord, ...remainingWords] = item.title.split(" ");
    const remainingText = remainingWords.join(" ");

    return (
      <ThemedView style={styles.notificationItem}>
        <View style={styles.notificationIndicator} />
        <ThemedView style={styles.notificationContent}>
          <ThemedText style={{ width: width * 0.5 }}>
            {formatMoney(parseFloat(firstWord))} {remainingText}
          </ThemedText>
          <ThemedText style={{ color: Colors[theme].tint, opacity: 0.7 }}>
            {formatDateTime(item.dateTime).split(" ")[0]}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  };

  if (!generalNotification) {
    return (
      <Loading
        componentName="Notifications"
        refresh={getGeneralNotifications}
      />
    );
  }

  return (
    <PillChildrenContainer style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.typeId}
        contentContainerStyle={styles.listContentContainer}
        ListHeaderComponent={
          <ThemedText type="subtitle">Transactions</ThemedText>
        }
        ListEmptyComponent={
          <Loading
            componentName="Notifications"
            refresh={getGeneralNotifications}
          />
        }
      />
    </PillChildrenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: height * 0.36,
  },
  listContentContainer: {
    gap: 20,
    width: width * 0.9,
    padding: 10,
    borderRadius: 10,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 50,
    borderRadius: 10,
    padding: 10,
    gap: 8,
  },
  notificationIndicator: {
    width: 10,
    height: 10,
    // backgroundColor: item.activity.activityType == 0 ? blue : pink,
  },
  notificationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "93%",
  },
});
