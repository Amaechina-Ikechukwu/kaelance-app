import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  useColorScheme,
} from "react-native";
import { PayWithFlutterwave } from "flutterwave-react-native";
import { useNotification } from "@/hooks/InAppNotificationProvider";
import KaeInput from "@/constants/KaeInput";
import { width } from "@/constants/StatusBarHeight";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import { BankGet } from "@/apis/Bank/BankGet";
import { useAuth } from "@/hooks/AuthContextProvider";
import { router } from "expo-router";
import AnimatedLinearGradient from "@/constants/AnimatedLinearGradient";

interface PaymentProps {
  publicKey: string; // Your Flutterwave merchant public key
  customerEmail: string | any;
  onRedirect: (data: RedirectParams) => void;
}

interface RedirectParams {
  status: "successful" | "cancelled";
  transaction_id?: string;
  tx_ref: string;
}

const Payment: React.FC<PaymentProps> = ({
  publicKey,
  customerEmail,
  onRedirect,
}) => {
  const { userToken } = useAuth();
  const [setBalanceDetails] = kaeStore(
    useShallow((state) => [state.setBalanceDetails])
  );
  const getBankDetails = async () => {
    // const result = await BankGet("accountdetails", userToken);
    const balance = await BankGet("balance", userToken);

    setBalanceDetails(balance);
  };
  const [input, setInput] = useState("1000");
  const { showNotification } = useNotification();
  const theme = useColorScheme() ?? "light";
  const generateTransactionRef = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };

  const handleOnRedirect = async (data: RedirectParams) => {
    if (parseFloat(input) < 1000) {
      showNotification("Minimum amount is #1000", "error");
      return;
    }
    onRedirect(data);
    if (data.status === "successful") {
      showNotification("Payment Successful... Redirecting...", "success");
      await getBankDetails();
      router.push("(tabs)/");
    } else {
      showNotification("Payment Cancelled", "error");
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Enter amount (#1000 or more)</ThemedText>
      <TextInput
        style={[
          styles.input,
          { width: width * 0.5, color: Colors[theme].text },
        ]}
        keyboardType="numeric"
        placeholder="1000"
        placeholderTextColor={Colors[theme].text}
        value={input}
        onChangeText={setInput}
      />
      {parseFloat(input) >= 1000 && (
        <PayWithFlutterwave
          options={{
            tx_ref: generateTransactionRef(10),
            authorization: publicKey,
            customer: {
              email: customerEmail,
            },
            amount: parseFloat(input),
            currency: "NGN",
            payment_options: "card",
          }}
          onRedirect={handleOnRedirect}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Payment;
