import { View, Text, FlatList, useColorScheme, StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import Loading from "@/constants/Loading";
import { formatDateTime } from "@/hooks/formatdatetime";
import { ThemedText } from "@/components/ThemedText";
import { Notifications } from "@/hooks/kaeInterfaces";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/AuthContextProvider";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import { useNotification } from "@/hooks/InAppNotificationProvider";
import { GetNotifications } from "@/apis/GeneralNotifications/GetNotifications";
import { width } from "@/constants/StatusBarHeight";
import { formatMoney } from "@/hooks/FormatMoney";

export default function GeneralNotifications() {
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
      showNotification("Getting notifications", "loading");
      const notifications = await GetNotifications("", userToken);
      setGeneralNotifications(notifications);
      showNotification("Successful", "success");
    } catch (error) {
      showNotification("Failed to get notifications", "error");
    }
  };

  const theme = useColorScheme() ?? "light";
  const renderItem = ({ item }: { item: Notifications }) => {
    const [firstWord, ...remainingWords] = item.title.split(" ");
    const remainingText = remainingWords.join(" ");

    return (
      <ThemedView style={styles.notificationItem}>
        <ThemedText type="defaultSemiBold">{item.type}</ThemedText>
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
    <View style={styles.container}>
      <FlatList
        data={generalNotification}
        renderItem={renderItem}
        keyExtractor={(item) => item.typeId}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <Loading
            componentName="Notifications"
            refresh={getGeneralNotifications}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  listContentContainer: {
    gap: 20,
    width: width * 0.9,
    padding: 10,
    borderRadius: 10,
  },
  notificationItem: {
    alignItems: "flex-start",
    height: "auto",
    borderRadius: 10,
    padding: 10,
    gap: 3,
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
