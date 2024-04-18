import { ErrorMessage, SPLIT_SERVER_URL } from "../constants";
import { ReferralInput, Status, UserReferralType } from "./types";
import { findProductByApiKeyQuery, addReferralQuery, findUserByReferralCode } from "./query";

export class SplitGqlClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async sendGqlRequest(query: string, variables: any) {
    try {
      const response = await fetch(SPLIT_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: this.apiKey,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async checkApiKeyValid(): Promise<boolean> {
    const data = await this.sendGqlRequest(findProductByApiKeyQuery, {});
    if (!data?.findProductByApiKey) {
      return false;
    }
    return true;
  }

  async getUserByReferralCode(referralCode: string): Promise<string | null> {
    try {
      const data = await this.sendGqlRequest(findUserByReferralCode, { input: { referralCode } });
      if (!data?.findUserByReferralCode || data?.findUserByReferralCode.status !== Status.ACTIVE) {
        throw new Error(ErrorMessage.MSG_INVALID_REFERRAL_CODE);
      }
      return data.findUserByReferralCode.address;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async addReferral(referrerAddress: string, refereeAddress: string): Promise<void> {
    const referralInput: ReferralInput = {
      referrerInput: {
        userAddress: referrerAddress,
        userReferralType: UserReferralType.REFERRER,
      },
      refereeInput: {
        userAddress: refereeAddress,
        userReferralType: UserReferralType.REFEREE,
      },
    };
    const data = await this.sendGqlRequest(addReferralQuery, { input: referralInput });
    if (!data?.addReferral) {
      throw new Error(ErrorMessage.MSG_ADD_REFERRAL_DATA_FAILED);
    }
  }

  async getReferralProviderAddressByCode() {}
}
