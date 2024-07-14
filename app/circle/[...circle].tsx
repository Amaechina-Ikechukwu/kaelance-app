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

export default function FinanceCircle() {
  const { circleid } = useLocalSearchParams();
  const { userToken } = useAuth();

  const [setCircle, setCircleActivity, circle, circleActivity] = kaeStore(
    useShallow((state) => [
      state.setCircle,
      state.setCircleActivity,
      state.circle,
      state.circleActivity,
    ])
  );

  const fadeInAnim = useRef(new Animated.Value(0)).current;

  const getCircleDetails = async () => {
    const financeCircle = await GetFinanceCircle(`${circleid}`, userToken);
    const circleActivity = await GetCircleActivity(`${circleid}`, userToken);

    setCircle(financeCircle);
    setCircleActivity(circleActivity);

    // Trigger fade-in animation
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (userToken) {
      getCircleDetails();
    }
  }, [userToken]);

  if (circle == null || circleid !== circle.circleId) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Finance Circle loading",
          }}
        />
        <Loading componentName="Circle" refresh={getCircleDetails} />
      </>
    );
  }

  const {
    circleId,
    circleType,
    creatorId,
    friends,
    fundWithdrawalApprovalCount,
    name,
    personalCommittmentPercentage,
    status,
    targetAmount,
    totalAmountCommitted,
    totalCommittment,
    transactionHistory,
    withdrawalChargePercentage,
    withdrawalLimitPercentage,
  } = circle;

  const amountCommited = Math.round(targetAmount * (totalCommittment / 100));

  return (
    <Animated.View style={[styles.container, { opacity: fadeInAnim }]}>
      <Stack.Screen
        options={{
          title: " " || "Finance Circle loading",
          headerBlurEffect: "regular",
          headerTransparent: true,
          headerLargeTitle: true,
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ gap: 18, alignItems: "center" }}
      >
        <CallingCard text={name} position={0.5} propwidth={0.9} />
        {targetAmount && (
          <TargetSpeedometer
            currentValue={amountCommited}
            targetValue={targetAmount}
          />
        )}
        <ThemedText type={"title"}>{formatMoney(targetAmount)}</ThemedText>
        <PillChildrenContainer style={[styles.pillContainer]}>
          <ThemedView style={[styles.pillCard]}>
            <ThemedText>
              Total Percentage committed:{" "}
              <ThemedText>{totalCommittment}%</ThemedText>
            </ThemedText>
            <ThemedText type="subtitle">
              {formatMoney(amountCommited)}
            </ThemedText>
            <ThemedText>Added:</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.pillCard]}>
            <ThemedText>
              Total Percentage remaining:{" "}
              <ThemedText>{100 - totalCommittment}%</ThemedText>
            </ThemedText>
            <ThemedText type="subtitle">
              {formatMoney(targetAmount - amountCommited)}
            </ThemedText>
            <ThemedText>Remaining: </ThemedText>
          </ThemedView>
        </PillChildrenContainer>
        <CircleMembers friends={friends} circleId={circleId} />
        <ThemedView>
          <CircleActivityComponent
            circleActivity={circleActivity}
            friends={circle.friends}
          />
        </ThemedView>
      </ScrollView>
    </Animated.View>
  );
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
