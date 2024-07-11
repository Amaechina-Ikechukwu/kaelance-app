import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { KaeButton } from "@/constants/KaeButton";
import KaeInput from "@/constants/KaeInput";
import Loading from "@/constants/Loading";
import { useNotification } from "@/hooks/InAppNotificationProvider";
import Step1 from "@/components/Onboarding/Step1";
import Step2 from "@/components/Onboarding/Step2";
import Step3 from "@/components/Onboarding/Step3";
import { useEffect, useState } from "react";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import { BankGet } from "@/apis/Bank/BankGet";
import { useAuth } from "@/hooks/AuthContextProvider";
import BankDetails from "@/components/HomeInterfaces/BankDetailsInfo";
import { statusBarHeight } from "@/constants/StatusBarHeight";
import FinanceCircle from "@/components/HomeInterfaces/FinanceCircle";
import { GetFinanceCircle } from "@/apis/FinanceCircle/GetFinacleCircle";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { userToken } = useAuth();
  const [setAccountDetails, setBalanceDetails, setFinanceCircle] = kaeStore(
    useShallow((state) => [
      state.setAccountDetails,
      state.setBalanceDetails,
      state.setFinanceCircle,
    ])
  );
  const getBankDetails = async () => {
    const result = await BankGet("accountdetails", userToken);
    const balance = await BankGet("balance", userToken);
    const financeCircle = await GetFinanceCircle("", userToken);
    setAccountDetails(result);
    setBalanceDetails(balance);
    setFinanceCircle(financeCircle);
    setIsLoading(true);
  };
  useEffect(() => {
    if (userToken) {
      getBankDetails();
    }
  }, [userToken]);
  if (isLoading == false) {
    return <Loading componentName="Home" refresh={getBankDetails} />;
  }
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "flex-start",
        marginTop: statusBarHeight,
        paddingTop: 20,
        gap: 36,
      }}
    >
      <BankDetails />
      <FinanceCircle />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
