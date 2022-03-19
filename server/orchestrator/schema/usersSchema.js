const { gql } = require("apollo-server");

const axios = require("axios");

const typeDefs = gql`
  type message {
    message: String
  }
  type token {
    access_token: String
  }

  type Mutation {
    register(email: String, password: String): message
    login(email: String, password: String): token
  }
`;

const baseUrl = "http://localhost:3000/users";

const resolvers = {
  Mutation: {
    register: async (_, args) => {
      try {
        const { email, password } = args;
        const resp = await axios({
          method: "POST",
          url: baseUrl + "/register",
          data: {
            email,
            password,
          },
        });
        return resp.data;
      } catch (error) {
        return error.response.data;
      }
    },

    login: async (_, args) => {
      try {
        const { email, password } = args;
        const resp = await axios({
          method: "POST",
          url: baseUrl + "/login",
          data: {
            email,
            password,
          },
        });
        return resp.data;
      } catch (error) {
        return error.response.data;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
