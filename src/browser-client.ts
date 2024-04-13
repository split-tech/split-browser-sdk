import { ErrorMessage } from "./constants";
import { SplitGqlClient } from "./graphql/client";

export interface BrowserConfig {
  apiKey: string;
  referrerAddress?: string;
  refereeAddress?: string;
}

export class SplitBrowser {
  private initializing = false;
  // @ts-ignore
  private config: BrowserConfig;
  // @ts-ignore
  private gqlClient: SplitGqlClient;

  async init(apiKey: string) {
    /* Step 1. Block concurrent initialization */
    if (this.initializing) {
      return;
    }
    this.initializing = true;

    /* Step 2. Setup config and gqlClient */
    this.config = { apiKey };
    this.gqlClient = new SplitGqlClient(apiKey);

    /* Step 3. Check API Key is valid */
    const isValidApiKey = await this.gqlClient.checkApiKeyValid();

    this.initializing = false;
    if (!isValidApiKey) throw Error(ErrorMessage.MSG_INVALID_API_KEY);
  }

  async addReferral(eventId: string) {
    const { apiKey, referrerAddress, refereeAddress } = this.config;
    if (!apiKey) {
      throw Error(ErrorMessage.MSG_INVALID_API_KEY);
    }
    if (!referrerAddress || !refereeAddress) {
      throw Error(ErrorMessage.MSG_INVALID_ADDRESSES);
    }
    await this.gqlClient.addReferral(eventId, referrerAddress, refereeAddress);
  }
}
