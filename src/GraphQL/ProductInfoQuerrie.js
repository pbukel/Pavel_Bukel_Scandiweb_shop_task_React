import { gql } from "@apollo/client";

export const GET_SINGLE_PROD_INFO = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
        }
        amount
      }
      brand
    }
  }
`;
