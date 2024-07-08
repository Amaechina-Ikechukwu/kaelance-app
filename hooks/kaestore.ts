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
  financeCircle: any | null;
  friendsToAdd: any | null;
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
  setFinanceCircle: (value: any) => void;
  setFriendsToAdd: (value: any) => void;
};

const kaeStore = create<State>((set) => ({
  actionStatus: null,
  isSecured: false,
  kaeLockStatus: null,
  accountDetails: null,
  transactions: null,
  balanceDetails: null,
  retryFunction: null,
  financeCircle: [],
  friendsToAdd: [],
  setActionStatus: (status) => set({ actionStatus: status }),
  setIsSecured: (value) => set({ isSecured: value }),
  setKaeLockStatus: (value) => set({ kaeLockStatus: value }),
  setRetryFunction: (fn) => set({ retryFunction: fn }),
  setAccountDetails: (value) => set({ accountDetails: value }),
  setTransactions: (value) => set({ transactions: value }),
  setBalanceDetails: (value) => set({ balanceDetails: value }),
  setFinanceCircle: (value) => set({ financeCircle: value }),
  setFriendsToAdd: (friend) =>
    set((state) => {
      const friendExists = state.friendsToAdd.some(
        (f: AccountDetails) =>
          f.kallumUser.userName === friend.kallumUser.userName
      );
      if (!friendExists) {
        return {
          friendsToAdd: [...state.friendsToAdd, friend],
        };
      }
      return state;
    }),
}));

export default kaeStore;
