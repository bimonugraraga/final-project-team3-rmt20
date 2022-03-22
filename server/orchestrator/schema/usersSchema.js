const { gql } = require("apollo-server");

const axios = require("axios");

const typeDefs = gql`
  type message {
    message: String
  }
  type token {
    access_token: String
    message: String
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
        console.log("🚀 ~ file: usersSchema.js ~ line 27 ~ register: ~ email, password", email, password)
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
        console.log("apakah masuk sini?");
        const { email, password } = args;
        console.log("🚀 ~ file: usersSchema.js ~ line 45 ~ login: ~ email, password", email, password)
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
