import { ErrorMessage, SPLIT_SERVER_URL } from "../constants";
import { ReferralInput } from "./input-type";
import { findProductByApiKeyQuery, addReferralQuery } from "./query";

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

  async checkApiKeyValid() {
    // TODO: API Key를 확인하여 DB 값을 업데이트하는 mutation으로 변경
    const data = await this.sendGqlRequest(findProductByApiKeyQuery, {});
    if (!data.findProductByApiKey) {
      return false;
    }

    return true;
  }

  async addReferral(eventId: string, referrerAddress: string, refereeAddress: string) {
    const referralInput: ReferralInput = {
      eventId,
      referralProviderInput: {
        userAddress: referrerAddress,
        userReferralType: "REFERRAL_PROVIDER",
      },
      userInput: {
        userAddress: refereeAddress,
        userReferralType: "USER",
      },
    };
    const data = await this.sendGqlRequest(addReferralQuery, { input: referralInput });
    if (!data.addReferral) {
      throw new Error(ErrorMessage.MSG_ADD_REFERRAL_DATA_FAILED);
    }
  }

  async getReferralProviderAddressByCode() {}
}
