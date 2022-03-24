const { gql } = require("apollo-server");

const axios = require("axios");

const typeDefs = gql`
  type weatherReport {
    id : ID
    status: String
    description: String
    photoUrl: String
    coordinate: String
    temperature: Float
    pressure: Int
    uvi: Float
    humidity: Int
    windspeed: Float
    weatherMain: String
    weatherDesc: String
    weatherIcon: String
    User: User
    message: String
    createdAt : String
  }

  type User {
    email: String
  }

  input NewWeatherReport {
    status: String
    description: String
    photoUrl: String
    coordinate: String
    temperature: Float
    pressure: Int
    uvi: Float
    humidity: Int
    windspeed: Float
    weatherMain: String
    weatherDesc: String
    weatherIcon: String
    message: String
    access_token: String
  }

  extend type Query {
    getWeatherReports: [weatherReport]
    getOneWeatherReport(reportId: ID): weatherReport
  }

  extend type Mutation {
    createWeatherReport(data: NewWeatherReport): message
  }
`;

const baseUrl = "https://main-alertme.herokuapp.com/reports/weathers";

const resolvers = {
  Query: {
    getWeatherReports: async () => {
      console.log("WR")
      try {
        const resp = await axios({
          method: "GET",
          url: baseUrl,
        });
        return resp.data;
      } catch (error) {
        console.log(error);
      }
    },

    getOneWeatherReport: async (_, args) => {
      try {
        const { reportId } = args;
        const resp = await axios({
          method: "GET",
          url: `${baseUrl}/${reportId}`,
        });
        return resp.data;
      } catch (error) {
        return error.response.data;
      }
    },
  },

  Mutation: {
    createWeatherReport: async (_, args) => {
      const { status, description, photoUrl, coordinate, temperature, uvi, pressure, humidity, windspeed, weatherMain, weatherDesc, weatherIcon, access_token } = args.data;
      console.log(args, 34324)
      try {
        const resp = await axios({
          method: "POST",
          url: baseUrl,
          data: {
            status,
            description,
            photoUrl,
            coordinate,
            temperature,
            uvi,
            pressure,
            humidity,
            windspeed,
            weatherMain,
            weatherDesc,
            weatherIcon,
          },
          headers: {
            access_token,
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
