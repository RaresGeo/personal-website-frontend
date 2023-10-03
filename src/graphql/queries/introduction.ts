import gql from "graphql-tag";

export const GET_INTRODUCTION = gql`
  query Introduction {
    introduction {
      data {
        attributes {
          fullName
          description
          avatar {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
