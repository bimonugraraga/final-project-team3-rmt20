import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation ($email: String, $password: String) {
    login(email: $email, password: $password) {
      access_token
      message
    }
  }
`;

export const USER_REGISTER = gql`
  mutation ($email: String, $password: String) {
    register(email: $email, password: $password) {
      message
    }
  }
`;

export const SAVE_USER_DATA = gql`
  mutation($expoToken: String, $recentCoordinates: String) {
    createUserMongo(expoToken: $expoToken, recentCoordinates: $recentCoordinates) {
      message
    }
  }
`;

