export enum UserReferralType {
  REFERRER = "REFERRER",
  REFEREE = "REFEREE",
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETE = "DELETE",
}

export interface ReferralInput {
  referrerInput: {
    userAddress: string;
    userReferralType: keyof typeof UserReferralType;
  };
  refereeInput: {
    userAddress: string;
    userReferralType: keyof typeof UserReferralType;
  };
}
