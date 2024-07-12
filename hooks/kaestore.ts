import { create } from "zustand";
import {
  AccountDetails,
  BalanceDetails,
  Circle,
  CircleActivity,
  Transactions,
} from "./kaeInterfaces";

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
  financeCircle: Circle[] | null;
  friendsToAdd: any | null;
  circle: Circle | null;
  circleActivity: CircleActivity[] | null;
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
  setClearAllFriendsToAdd: () => void;
  setCircle: (value: any) => void;
  setCircleActivity: (value: any) => void;
  setRemoveFromFriendToAdd: (value: any) => void;
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
  circle: null,
  circleActivity: [],
  setActionStatus: (status) => set({ actionStatus: status }),
  setIsSecured: (value) => set({ isSecured: value }),
  setKaeLockStatus: (value) => set({ kaeLockStatus: value }),
  setRetryFunction: (fn) => set({ retryFunction: fn }),
  setAccountDetails: (value) => set({ accountDetails: value }),
  setTransactions: (value) => set({ transactions: value }),
  setBalanceDetails: (value) => set({ balanceDetails: value }),
  setFinanceCircle: (value) => set({ financeCircle: value }),
  setClearAllFriendsToAdd: () => set({ financeCircle: [] }),
  setCircle: (value) => set({ circle: value }),
  setCircleActivity: (value) => set({ circleActivity: value }),
  setRemoveFromFriendToAdd: (value) =>
    set((state) => {
      const newList = state.friendsToAdd.filter(
        (f: AccountDetails) =>
          f.kallumUser.userName !== value.kallumUser.userName
      );
      return {
        friendsToAdd: newList,
      };
    }),
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
