import { SPLIT_SERVER_URL } from '../constants';
import { GraphQLClient } from 'graphql-request';
import { findProductByApiKey, FindProductByApiKeyResponse } from './query';

export class SplitGqlClient {
  private gqlClient;

  constructor(apiKey: string) {
    this.gqlClient = new GraphQLClient(SPLIT_SERVER_URL, {
      headers: { apiKey: apiKey },
    });
  }

  async checkApiKeyValid() {
    try {
      const data = await this.gqlClient.request<FindProductByApiKeyResponse>(
        findProductByApiKey
      );
      if (!data.findProductByApiKey) {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
