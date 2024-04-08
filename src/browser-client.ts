import { apiRequest } from './api-request';

export interface BrowserConfig {
  core: {
    apiKey: string;
  };
}

export class SplitBrowser {
  private initializing = false;
  // @ts-ignore
  private config: BrowserConfig;

  async init(apiKey: string) {
    /* Step 1. Block concurrent initialization */
    if (this.initializing) {
      return;
    }
    this.initializing = true;

    /* Step 2. Check the apiKey is valid */
    this.config = { core: { apiKey } };
    const valid = await apiRequest.checkApiKeyValid(this.config.core.apiKey);

    this.initializing = false;
    if (!valid) throw Error('Invalid API Key');
  }

  sendEvent(eventId: string) {
    // TODO: need to implement this method
    console.log('Not prepared! 😝');
    console.log('EventId: ', eventId);
  }
}
