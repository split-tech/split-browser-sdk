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
