import axios from 'axios';
import { SPLIT_SERVER_URL } from './constants';

class ApiRequest {
  private readonly apiInstance = axios.create({
    baseURL: SPLIT_SERVER_URL,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      accept: 'application/json,',
    },
  });

  async checkApiKeyValid(encodedKey: string): Promise<boolean> {
    try {
      const result = await this.apiInstance.post(
        `/product/apiKey?key=${encodedKey}`
      );
      return result.data.valid;
    } catch (error) {
      return false;
    }
  }
}

export const apiRequest = new ApiRequest();
