import { gql } from "graphql-request";

export const findProductByApiKeyQuery = gql`
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

export const addReferralQuery = gql`
  mutation AddReferral($input: ReferralInput!) {
    addReferral(input: $input) {
      id
      eventId
      userReferrals {
        id
        referralId
        userAddress
        userReferralType
        updated
        claimed
        createdAt
        updatedAt
      }
    }
  }
`;

export const findUserByReferralCode = gql`
  query FindUserByReferralCode($input: UserInput!) {
    findUserByReferralCode(input: $input) {
      id
      address
      status
    }
  }
`;
