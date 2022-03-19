import {gql} from "@apollo/client"

export const USER_LOGIN = gql`
  mutation($email: String, $password: String){
    login(email: $email, password: $password) {
      access_token
      message
    }
  }

`