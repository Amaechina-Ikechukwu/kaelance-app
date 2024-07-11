import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import kaeStore from "@/hooks/kaestore";
import LinearAvatar from "@/constants/LinearAvatar";
import { Colors, pink } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import LinearGradientBox from "@/constants/LinearGradientBox";
import { KaeButton } from "@/constants/KaeButton";
import PillContainer from "@/constants/PillContainer";
import { height, width } from "@/constants/StatusBarHeight";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/AuthContextProvider";
import { BankGet } from "@/apis/Bank/BankGet";
import { useNotification } from "@/hooks/InAppNotificationProvider";
import { formatMoney } from "@/hooks/FormatMoney";
export default function BankDetails() {
  const [accountDetails, balanceDetails] = kaeStore(
    useShallow((state) => [state.accountDetails, state.balanceDetails])
  );
  const theme = useColorScheme() ?? "light";
  const position1 = useRef(new Animated.Value(-20)).current;
  const position2 = useRef(new Animated.Value(0)).current;
  const { showNotification } = useNotification();
  const { userToken } = useAuth();
  const [setBalanceDetails] = kaeStore(
    useShallow((state) => [state.setBalanceDetails])
  );
  const getBankDetails = async () => {
    showNotification("Refreshing balance", "loading");
    const balance = await BankGet("balance", userToken);

    setBalanceDetails(balance);
    showNotification("Done, Balance updated", "success");
  };
  useEffect(() => {
    // Define the animations
    Animated.timing(position1, {
      toValue: height / 2 - height * 0.5, // Negative value to move up
      duration: 3000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    Animated.timing(position2, {
      toValue: height / 2 - height * 0.4, // Positive value to move down
      duration: 3000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <ThemedView style={styles.detailsContainer}>
      <ThemedView style={styles.nameContainer}>
        <LinearAvatar name={accountDetails?.kallumUser?.userName} />
      </ThemedView>
      <ThemedText type="title">
        {accountDetails?.kallumUser?.userName}
      </ThemedText>

      <ThemedView style={styles.accountContainer}>
        <ThemedText type="subtitle">{accountDetails?.bankAccountId}</ThemedText>
        <ThemedText type="default" style={{ fontSize: 8 }}>
          Tap to copy
        </ThemedText>
      </ThemedView>
      <Animated.View
        style={{
          transform: [{ translateY: position1 }],
        }}
      >
        <LinearGradientBox style={styles.gradient}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View style={styles.accountContainer}>
              <ThemedText type="subtitle" style={{ fontSize: 30 }}>
                {formatMoney(
                  balanceDetails?.currentBalance -
                    (balanceDetails.totalCommittment / 100) *
                      balanceDetails?.currentBalance
                )}
              </ThemedText>
              <ThemedText type="default">committed to Kaelance</ThemedText>
            </View>
            <TouchableOpacity onPress={getBankDetails} style={{ padding: 10 }}>
              <Ionicons name="reload" size={24} color={Colors[theme].text} />
            </TouchableOpacity>
          </View>

          <PillContainer
            text={`${balanceDetails?.totalCommittment} committemnt to your circles in total`}
          />
          <TouchableOpacity
            style={{
              width: "auto",
              alignItems: "flex-start",
              backgroundColor: Colors[theme].text,
              margin: 0,
              padding: 10,
            }}
            onPress={() => router.push("/transactions")}
          >
            <ThemedText style={{ color: Colors[theme].background }}>
              Top up account
            </ThemedText>
          </TouchableOpacity>
        </LinearGradientBox>
      </Animated.View>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  detailsContainer: {
    alignItems: "flex-start",
    gap: 10,
  },
  accountContainer: {
    alignItems: "center",
    // justifyContent: "flex-start",
    flexDirection: "row",
    width: "auto",
    padding: 0,
    gap: 5,
  },
  gradient: {
    padding: 20,
    width: width * 0.9,
    gap: 16,
    alignItems: "flex-start",
  },
});
