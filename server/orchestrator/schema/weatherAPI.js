const { gql } = require("apollo-server");

const axios = require("axios");

const typeDefs = gql`
  type weatherDetailApi {
    dt: Int
    temp: Float
    feels_like: Float
    pressure: Int
    humidity: Int
    uvi: Float
    visibility: Int
    wind_speed: Float
    weather: [weatherDetail]
  }

  type weatherDetail {
    id: Int
    main: String
    description: String
    icon: String
  }
  extend type Query {
    fetchCurrentWeather(lat: Float, lon: Float): weatherDetailApi
  }
`;

const weatherKey = process.env.OWKEY;
let baseUrl = `https://api.openweathermap.org/data/2.5/onecall?appid=${weatherKey}&lang=id&units=metric`;

const resolvers = {
  Query: {
    fetchCurrentWeather: async (_, args) => {
      try {
        const { lat, lon } = args;
        const resp = await axios({ method: "GET", url: baseUrl + `&lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily` });
        return resp.data.current;
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
