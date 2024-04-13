export enum UserReferralType {
  USER = "USER",
  REFERRAL_PROVIDER = "REFERRAL_PROVIDER",
}

export interface ReferralInput {
  eventId: string;
  referralProviderInput: {
    userAddress: string;
    userReferralType: keyof typeof UserReferralType;
  };
  userInput: {
    userAddress: string;
    userReferralType: keyof typeof UserReferralType;
  };
}
