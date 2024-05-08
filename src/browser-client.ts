import { DEFAULT_REFERRAL_PARAM, ErrorMessage } from "./constants";
import { SplitGqlClient } from "./graphql/client";
import { URLSearchParams as ServerURLSearchParams } from "url";

export interface BrowserInfo {
  apiKey: string;
  config?: SplitConfig;
  referrerAddress?: string | null;
}

export interface SplitConfig {
  referralParam?: string;
  interval?: number;
}

export class SplitBrowser {
  private initializing = false;
  // @ts-ignore
  private browserInfo: BrowserInfo;
  // @ts-ignore
  private gqlClient: SplitGqlClient;

  private getReferralCode() {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(this.browserInfo.config?.referralParam ?? DEFAULT_REFERRAL_PARAM);
    } else {
      const urlParams = new ServerURLSearchParams();
      return urlParams.get(this.browserInfo.config?.referralParam ?? DEFAULT_REFERRAL_PARAM);
    }
  }

  async init(apiKey: string, config?: SplitConfig) {
    try {
      if (this.initializing) {
        return;
      }
      this.initializing = true;
      this.gqlClient = new SplitGqlClient(apiKey);

      const isValidApiKey = await this.gqlClient.checkApiKeyValid();
      if (!isValidApiKey) throw Error(ErrorMessage.MSG_INVALID_API_KEY);

      this.browserInfo = { apiKey, config };
      const referralCode = this.getReferralCode();

      if (referralCode) {
        // 추천 코드로 추천인 주소를 가져옴.
        const referrerAddress = await this.gqlClient.getUserByReferralCode(referralCode);
        this.browserInfo.referrerAddress = referrerAddress;
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.initializing = false;
    }
  }

  async addReferral(refereeAddress: string) {
    try {
      const { apiKey, referrerAddress } = this.browserInfo;
      if (!apiKey) {
        throw Error(ErrorMessage.MSG_INVALID_API_KEY);
      }
      if (!referrerAddress || !refereeAddress) {
        return;
      }
      await this.gqlClient.addReferral(referrerAddress, refereeAddress);
    } catch (error) {
      console.error(error);
    }
  }
}
