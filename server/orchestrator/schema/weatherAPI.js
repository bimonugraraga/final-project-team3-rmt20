const { gql } = require("apollo-server");
const axios = require("axios");
const Queue = require("bull");
const { redis } = require("../config/connectRedis");

const weatherForecast = new Queue("weatherForecast", `redis://:${process.env.REDISPASSWORD}@${process.env.REDISENDPOINT}:${process.env.REDISPORT}`);

// const weatherNotif = new Queue("weatherNotif", `redis://:${process.env.REDISPASSWORD}@${process.env.REDISENDPOINT}:${process.env.REDISPORT}`);

const typeDefs = gql`
  type weatherDetailApi {
    lat: Float
    lon: Float
    timezone: String
    current: current
  }

  type current {
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

  type alerts {
    sender_name: String
    event: String
    description: String
  }

  type weatherDetail {
    id: Int
    main: String
    description: String
    icon: String
  }
  extend type Query {
    fetchCurrentWeather(lat: Float, lon: Float): weatherDetailApi
    weatherNotif(lat: Float, lon: Float): [current]
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
        return resp.data;
      } catch (error) {
        return error.response.data;
      }
    },

    weatherNotif: async (_, args) => {
      try {
        const { lat, lon } = args;
        const resp = await axios({ method: "GET", url: baseUrl + `&lat=${lat}&lon=${lon}&exclude=minutely,current,daily` });
        let data = [];
        resp.data.hourly.slice(-24).forEach((e) => {
          if (e.weather[0].main === "Rain" || e.weather[0].main === "Thunderstorm" || e.weather[0].main === "Drizzle") {
            data.push(e);
          }
        });
        // const result = {
        //   hourly: data,
        // };
        return data;
      } catch (error) {
        return error.response.data;
      }
    },
  },
};

weatherForecast.process(async () => {
  const lat = -6.1753942;
  const lon = 106.827183;
  return await resolvers.Query.weatherNotif(lat, lon);
});

weatherForecast.add(
  {},
  {
    repeat: {
      // every 6AM
      cron: `0 6 * * *`,
    },
  }
);

module.exports = {
  typeDefs,
  resolvers,
};
