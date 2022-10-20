import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

//categories and all products:
// export const GET_CATEGORIES = gql`
//   query {
//     categories {
//       name
//       products {
//         id
//         name
//         prices {
//           currency {
//             label
//           }
//           amount
//         }
//         brand
//       }
//     }
//   }
// `;
