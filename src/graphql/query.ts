import { gql } from "graphql-request";

export const findProductByApiKeyQuery = gql`
  query FindProductByApiKey {
    findProductByApiKey {
      id
      name
    }
  }
`;

export const addReferralQuery = gql`
  mutation AddReferral($input: ReferralInput!) {
    addReferral(input: $input) {
      id
      productId
      userReferrals {
        id
        referralId
        userAddress
        userReferralType
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
