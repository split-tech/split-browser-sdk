import { gql } from 'graphql-request';

export const findProductByApiKey = gql`
  query FindProductByApiKey {
    findProductByApiKey {
      id
      name
      webLink
      twitterLink
      description
      apiKey
    }
  }
`;

export interface FindProductByApiKeyResponse {
  findProductByApiKey: {
    id: string;
    name: string;
    webLink: string;
    twitterLink: string;
    description: string;
    apiKey: string;
  };
}
