import { SplitGqlClient } from './graphql/client';

export interface BrowserConfig {
  apiKey: string;
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
    if (!isValidApiKey) throw Error('SplitError: Invalid API Key 🥲');
  }
}
