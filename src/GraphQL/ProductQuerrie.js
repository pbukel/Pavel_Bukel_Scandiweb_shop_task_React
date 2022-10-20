import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query category($categorie: String!) {
    category(input: { title: $categorie }) {
      name
      products {
        id
        name
        prices {
          currency {
            label
          }
          amount
        }
        brand
      }
    }
  }
`;
