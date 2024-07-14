import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, Animated } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import { GetFinanceCircle } from "@/apis/FinanceCircle/GetFinacleCircle";
import { useAuth } from "@/hooks/AuthContextProvider";
import { GetCircleActivity } from "@/apis/CircleActivity/GetCircleActivity";
import Loading from "@/constants/Loading";
import { height, statusBarHeight, width } from "@/constants/StatusBarHeight";
import { ThemedView } from "@/components/ThemedView";
import { formatMoney } from "@/hooks/FormatMoney";
import { ThemedText } from "@/components/ThemedText";
import PillContainer from "@/constants/PillContainer";
import PillChildrenContainer from "@/constants/PillChilderenContainer";
import TargetSpeedometer from "@/components/FinanceCircle/TargetSpeedometer";
import CircleMembers from "@/components/FinanceCircle/CircleMembers";
import CircleActivityComponent from "@/components/FinanceCircle/CircleActivityComponent";
import LinearGradientBox from "@/constants/LinearGradientBox";
import CallingCard from "@/constants/CallingCard";
import CircleMembersActions from "@/components/FinanceCircle/CircleMembersActions";

export default function FinanceCircle() {
  return <CircleMembersActions />;
}

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight + 50,
    flex: 1,
    opacity: 0, // Initial opacity set to 0 for fade-in effect
  },
  pillContainer: {
    width: width * 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  pillCard: {
    padding: 10,
    borderRadius: 10,
    gap: 10,
    width: width * 0.4,
    flexDirection: "column-reverse",
  },
});
