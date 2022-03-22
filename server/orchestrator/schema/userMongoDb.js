const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type MongoUser {
    expoToken: String
    recentCoordinate: String
  }
  extend type Query {
    getAllMongoUsers: [MongoUser]
    getOneMongoUser(expoToken: String): MongoUser
  }

  extend type Mutation {
    createUserMongo(expoToken: String, recentCoordinate: String): message
  }
`;

const userMongoUrl = "http://localhost:4001/expo-tokens";
const resolvers = {
  Query: {
    getAllMongoUsers: async () => {
      try {
        const resp = await axios({
          method: "GET",
          url: userMongoUrl,
        });
        return resp.data;
      } catch (error) {
        return error.response.data;
      }
    },

    getOneMongoUser: async (_, args) => {
      try {
        const { expoToken } = args;
        const resp = await axios({
          method: "GET",
          url: userMongoUrl + `/${expoToken}`,
        });
        return resp.data;
      } catch (error) {
        return error.response.data;
      }
    },
  },

  Mutation: {
    createUserMongo: async (_, args) => {
      try {
        const { expoToken, recentCoordinate } = args;
        const resp = await axios({
          method: "POST",
          url: userMongoUrl,
          data: {
            expoToken,
            recentCoordinate,
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
