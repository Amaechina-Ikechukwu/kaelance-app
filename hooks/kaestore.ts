import { create } from "zustand";
import { AccountDetails, BalanceDetails, Transactions } from "./kaeInterfaces";

// Define the types for your state
type State = {
  actionStatus: string | null;
  isSecured: boolean;
  kaeLockStatus: {
    securePin: string;
    transactionPin: string;
  } | null;
  accountDetails: AccountDetails | null;
  transactions: Transactions | null;
  balanceDetails: BalanceDetails | null;
  setKaeLockStatus: (
    value: { securePin: string; transactionPin: string } | null
  ) => void;
  setIsSecured: (value: boolean) => void;
  setActionStatus: (status: string | null) => void;
  retryFunction: (() => void) | null;
  setRetryFunction: (fn: (() => void) | null) => void;
  setAccountDetails: (value: AccountDetails | null) => void;
  setTransactions: (value: Transactions | null) => void;
  setBalanceDetails: (value: BalanceDetails | null) => void;
};

const kaeStore = create<State>((set) => ({
  actionStatus: null,
  isSecured: false,
  kaeLockStatus: null,
  accountDetails: null,
  transactions: null,
  balanceDetails: null,
  retryFunction: null,
  setActionStatus: (status) => set({ actionStatus: status }),
  setIsSecured: (value) => set({ isSecured: value }),
  setKaeLockStatus: (value) => set({ kaeLockStatus: value }),
  setRetryFunction: (fn) => set({ retryFunction: fn }),
  setAccountDetails: (value) => set({ accountDetails: value }),
  setTransactions: (value) => set({ transactions: value }),
  setBalanceDetails: (value) => set({ balanceDetails: value }),
}));

export default kaeStore;
