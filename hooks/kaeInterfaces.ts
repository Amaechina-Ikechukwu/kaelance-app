export interface KallumUser {
  userName: string;
  email: string;
}

interface Sender {
  bankAccountId: string;
  accountType: string;
  createdDate: string; // ISO date string
  status: string;
  kallumUser: KallumUser;
}
interface Receiver {
  bankAccountId: string;
  accountType: string;
  createdDate: string; // ISO date string
  status: string;
  kallumUser: KallumUser;
}

export interface Transactions {
  id: number;
  transactionHistoryId: string;
  sender: Sender | null; // Type of sender is not defined in the provided JSON, so using any
  receiver: Receiver;
  transactionDescription: string;
  transactionType: string;
  currency: string;
  currencySymbol: string;
  amount: number;
  date: string; // ISO date string
}
export interface AccountDetails {
  bankAccountId: string;
  accountType: string;
  createdDate: string;
  status: string;
  kallumUser: {
    userName: string;
    email: string;
  };
}
export interface BalanceDetails {
  id: number;
  bankAccountDetails: null | any; // Type of bankAccountDetails is not defined, so using any
  currentBalance: number;
  currency: string;
  currencySymbol: string;
  lastUpdated: string; // ISO date string
  totalCommittment: number;
}

enum CircleType {}
// Add appropriate enum values

enum Status {}
// Add appropriate enum values

export interface Circle {
  circleId: string;
  name: string;
  totalAmountCommitted: number;
  friends: KallumUser[];
  fundWithdrawalApprovalCount: number;
  personalCommittmentPercentage: number;
  withdrawalChargePercentage: number;
  withdrawalLimitPercentage: number;
  creatorId: string;
  transactionHistory: Transactions[];
  circleType: CircleType;
  status: Status;
}

type CircleArray = Circle[];
