export interface KallumUser {
  userName: string;
  email: string;
  userId: string;
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
    userId: string;
  };
}
export interface BalanceDetails {
  id: number;
  bankAccountDetails: AccountDetails; // Type of bankAccountDetails is not defined, so using any
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
export interface CommitmentHistory {
  transactionId: string;
  percentage: number;
  dateTime: string;
}

export interface Activity {
  activityId: string;
  date: string;
  bankId: string;
  activityType: number;
  dateTime: string;
}

export interface CircleActivity {
  id: number;
  circleId: string;
  commitmentHistory: CommitmentHistory;
  activity: Activity;
  withdrawalApprovalPercentage: number;
  withdrawalAction: any;
}

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
  targetAmount: number;
  totalCommittment: number;
}
export interface Notifications {
  title: string;
  dateTime: string; // ISO 8601 date-time string
  bankId: string | null; // Can be null
  seenNotification: boolean;
  type: string;
  typeId: string;
}
type CircleArray = Circle[];
