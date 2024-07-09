import {
  View,
  Text,
  Switch,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import KaeInput from "@/constants/KaeInput";
import { blue, Colors, pink } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { width } from "@/constants/StatusBarHeight";
import FriendToAdd from "./FriendToAdd";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import { KaeButton } from "@/constants/KaeButton";
import { useNotification } from "@/hooks/InAppNotificationProvider";
import { CreateCircle } from "@/apis/FinanceCircle/CreateCircle";
import { useAuth } from "@/hooks/AuthContextProvider";
import { AccountDetails } from "@/hooks/kaeInterfaces";
import { useBottomSheet } from "@/hooks/BottomSheetProvider";
import { router } from "expo-router";
function capitalizeEachWord(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
export default function CircleCreation() {
  const theme = useColorScheme() ?? "light";
  const { userToken } = useAuth();
  const [friendsToAdd, setClearAllFriendsToAdd, balanceDetails] = kaeStore(
    useShallow((state) => [
      state.friendsToAdd,
      state.setClearAllFriendsToAdd,
      state.balanceDetails,
    ])
  );
  const { closeBottomSheet } = useBottomSheet();
  const [loading, isLoading] = useState("Create your circle");
  const { showNotification } = useNotification();
  const [inputValues, setInputValues] = useState({
    name: "",
    friends: [],
    fundWithdrawalApprovalCount: 0,
    personalCommittmentPercentage: 0,
    withdrawalChargePercentage: 0,
    status: false,
    circleType: 0,
    creatorId: "",
    circleId: "",
  });
  const transfromFriends = () => {
    return friendsToAdd.map((friends: AccountDetails) => friends.bankAccountId);
  };
  const {
    name,
    friends = transfromFriends(),
    fundWithdrawalApprovalCount,
    personalCommittmentPercentage,
    withdrawalChargePercentage,
    status,
    circleId,
    creatorId,
    circleType,
  } = inputValues;

  const handleInputChange = (field: string, value: any) => {
    if (field === "name") {
      value = capitalizeEachWord(value);
    } else if (field === "fundWithdrawalApprovalCount") {
      if (value > 10) {
        showNotification("Members can only be 10", "error");
        value = 10;
      }
    } else if (field === "personalCommittmentPercentage") {
      if (value > 100) {
        showNotification("Charge can not be greater than 100%", "error");
        value = 10;
      }
    } else if (field === "withdrawalChargePercentage") {
      if (value > 2) {
        showNotification("Charge can not be greater than 2%", "error");
        value = 2;
      }
    } else if (value === "") {
      value = "";
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const creatCircle = async () => {
    const body = {
      name,
      friends: transfromFriends(),
      fundWithdrawalApprovalCount,
      personalCommittmentPercentage,
      withdrawalChargePercentage,
      circleId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      creatorId: "kaelance",
      circleType: 0,
      status: 0,
    };

    if (!name) {
      showNotification("Circle name cannot be empty", "error");
      return;
    }
    if (!friendsToAdd.length) {
      showNotification("At least one friend must be added", "error");
      return;
    }
    if (fundWithdrawalApprovalCount === 0) {
      showNotification(
        "Fund withdrawal approval count cannot be zero",
        "error"
      );
      return;
    }
    if (personalCommittmentPercentage === 0) {
      showNotification(
        "Personal commitment percentage cannot be zero",
        "error"
      );
      return;
    }
    if (withdrawalChargePercentage === 0) {
      showNotification("Withdrawal charge percentage cannot be zero", "error");
      return;
    }

    try {
      showNotification(
        "Creating... Please wait, you will be redirected",
        "loading"
      );
      isLoading("Creating Circle...");

      const result = await CreateCircle("", body, userToken);
      if (
        result.message ==
        "You do not have enough fund to create group. Update your amount"
      ) {
        showNotification(result.message, "error");
        isLoading("Create your circle");
        showNotification("Error creating your circle", "error");
        return;
      }
      showNotification(result.message, "success");
      setClearAllFriendsToAdd();
      closeBottomSheet();

      router.push(`circle/${result.circleId}`);
    } catch (e) {
      isLoading("Create your circle");
      showNotification("Error creating your circle", "error");
    }
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: Colors[theme].hueTint }]}
    >
      <ThemedText type="title">Create a finance circle</ThemedText>
      <KaeInput
        label="Name of circle"
        value={name}
        setValue={(text) => handleInputChange("name", text)}
      />
      <ThemedView
        style={[
          styles.friends,
          { height: FriendToAdd.length > 0 ? width * 0.5 : "auto" },
        ]}
      >
        <FriendToAdd />
      </ThemedView>

      <ThemedView
        style={[
          {
            backgroundColor: Colors[theme].background,
            width: "100%",
            padding: 20,
            gap: 14,
          },
        ]}
      >
        <ThemedView style={[styles.percentageContainer]}>
          <ThemedText
            style={{
              width: width * 0.5,
              textAlign: "left",
              fontSize: 14,
              marginBottom: 5,
            }}
          >
            Number of person to be added (10 max.)
          </ThemedText>
          <TextInput
            placeholder="10%"
            value={fundWithdrawalApprovalCount.toString()}
            onChangeText={(text) =>
              handleInputChange("fundWithdrawalApprovalCount", text)
            }
            keyboardType="numeric"
            style={[styles.numberInput, { borderColor: Colors[theme].text }]}
          />
        </ThemedView>
        <ThemedView style={[styles.percentageContainer]}>
          <ThemedText
            style={{
              width: width * 0.5,
              textAlign: "left",
              fontSize: 14,
              marginBottom: 5,
            }}
          >
            How many percent are you committing to this (%) {" \n"}
            <ThemedText style={{ color: blue }} type="subtitle">
              {balanceDetails?.currencySymbol}
              {balanceDetails?.currentBalance *
                (personalCommittmentPercentage / 100)}
            </ThemedText>
          </ThemedText>
          <TextInput
            placeholder="10%"
            value={personalCommittmentPercentage.toString()}
            keyboardType="numeric"
            onChangeText={(text) =>
              handleInputChange("personalCommittmentPercentage", text)
            }
            style={[styles.numberInput, { borderColor: Colors[theme].text }]}
          />
        </ThemedView>
        <ThemedView style={[styles.percentageContainer]}>
          <ThemedText
            style={{
              width: width * 0.5,
              textAlign: "left",
              fontSize: 14,
              marginBottom: 5,
            }}
          >
            Percentage charge for defaulters (%)
          </ThemedText>
          <TextInput
            value={withdrawalChargePercentage.toString()}
            placeholder="2%"
            keyboardType="numeric"
            onChangeText={(text) =>
              handleInputChange("withdrawalChargePercentage", text)
            }
            style={[styles.numberInput, { borderColor: Colors[theme].text }]}
          />
        </ThemedView>
      </ThemedView>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: width * 0.9,
          },
        ]}
      >
        <ThemedText>
          Do you want this circle to be private or public?
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          {status ? "Public" : "Private"}
        </ThemedText>
        <Switch
          trackColor={{ false: "#767577", true: blue }}
          thumbColor={status ? pink : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          value={status}
          onValueChange={(value) => handleInputChange("status", value)}
        />
      </View>
      <KaeButton text={loading} onPress={creatCircle} />
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1,
  },
  percentageContainer: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 5,
    borderRadius: 5,
  },
  numberInput: {
    width: width * 0.1,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    height: 50,
  },
  friends: {
    backgroundColor: pink,
    padding: 20,
    width: width,
    zIndex: 999,
  },
});
