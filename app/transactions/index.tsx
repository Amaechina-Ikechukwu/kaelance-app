import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Payment from "@/components/TransactionInterface/Payment";
import { RedirectParams } from "flutterwave-react-native/dist/PayWithFlutterwave";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import KaeInput from "@/constants/KaeInput";

export default function TransactionIndex() {
  const [accountDetails] = kaeStore(
    useShallow((state) => [state.accountDetails])
  );
  const merchantPublicKey = process.env.EXPO_PUBLIC_FLUTTERWAVE || "";

  const amount = 0; // Example amount in NGN

  const handlePaymentRedirect = (data: RedirectParams) => {
    console.log("Redirect data:", data);
    // Handle redirection logic here
  };

  return (
    <View style={styles.container}>
      <Payment
        publicKey={merchantPublicKey}
        customerEmail={accountDetails?.kallumUser.email}
        onRedirect={handlePaymentRedirect}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
