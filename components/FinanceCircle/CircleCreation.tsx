import {
  View,
  Text,
  Switch,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../ThemedView";
import KaeInput from "@/constants/KaeInput";
import { blue, Colors, pink } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { width } from "@/constants/StatusBarHeight";
import FriendToAdd from "./FriendToAdd";

export default function CircleCreation() {
  const theme = useColorScheme() ?? "light";
  const [inputValues, setInputValues] = useState({
    name: "",
    friends: [],
    fundWithdrawalApprovalCount: 0,
    personalCommitmentPercentage: 0,
    withdrawalChargePercentage: 0,
    status: false,
  });

  const {
    name,
    friends,
    fundWithdrawalApprovalCount,
    personalCommitmentPercentage,
    withdrawalChargePercentage,
    status,
  } = inputValues;

  const handleInputChange = (field: string, value: any) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
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
      <ThemedView style={[styles.friends]}>
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
            placeholder="Number of person to be added (10 max.)"
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
            How many percent are you committing to this
          </ThemedText>
          <TextInput
            placeholder="How many percent are you committing to this"
            value={personalCommitmentPercentage.toString()}
            keyboardType="numeric"
            onChangeText={(text) =>
              handleInputChange("personalCommitmentPercentage", text)
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
            Percentage charge for defaulters
          </ThemedText>
          <TextInput
            value={withdrawalChargePercentage.toString()}
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
    height: width * 0.5,
  },
});
