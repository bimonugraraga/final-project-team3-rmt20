const { gql } = require("apollo-server");

const axios = require("axios");

const typeDefs = gql`
  type message {
    message: String
  }

  type Mutation {
    register(email: String, password: String): message
    login(email: String, password: String): message
  }
`;

const baseUrl = "http://localhost:3000";

const resolvers = {
  Mutation: {
    register: async (_, args) => {
      try {
        const { email, password } = args;
        const resp = await axios({
          method: "POST",
          url: baseUrl,
          data: {
            email,
            password,
          },
        });
        return resp.data;
      } catch (error) {
        console.log(error);
      }
    },

    login: async (_, args) => {
      try {
        const { email, password } = args;
        const resp = await axios({
          method: "POST",
          url: baseUrl,
          data: {
            email,
            password,
          },
        });
        return resp.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
