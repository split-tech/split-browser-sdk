import { SPLIT_SERVER_URL } from '../constants';
import { findProductByApiKey } from './query';

export class SplitGqlClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async checkApiKeyValid() {
    try {
      const response = await fetch(SPLIT_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apiKey: this.apiKey,
        },
        body: JSON.stringify({
          query: findProductByApiKey,
        }),
      });
      const { data } = await response.json();
      if (!data.findProductByApiKey) {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }
}
