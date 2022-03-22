const { gql } = require("apollo-server");
const axios = require("axios");
const Queue = require("bull");
const userMongoDb = require("./userMongoDb");
// const earthQuake = require("./eqAPI");
// const corn = require("./percobaan");
// const { redis } = require("../config/connectRedis");

// nama redis dengan function
// cobacoba=2menit
// weatherForecast=1s
// weatherNotif=at6AM

const weatherForecast = new Queue("weatherNotif", `redis://:${process.env.REDISPASSWORD}@${process.env.REDISENDPOINT}:${process.env.REDISPORT}`);

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

const expoUrl = "https://exp.host/--/api/v2/push/send";
let baseUrl = `https://api.openweathermap.org/data/2.5/onecall?appid=${process.env.OWKEY}&lang=id&units=metric`;

const resolvers = {
  Query: {
    fetchCurrentWeather: async (_, args) => {
      try {
        const { lat, lon } = args;
        const resp = await axios({ method: "GET", url: baseUrl + `&lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily` });
        // redis.del("weatherForecast");
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
        return data;
      } catch (error) {
        // console.log(error);
        return error.response.data;
      }
    },
  },
};

weatherForecast.process(async () => {
  // get user data
  let users = await userMongoDb.resolvers.Query.getAllMongoUsers();
  // console.log(users);
  users.forEach(async (el) => {
    const lat = el.recentCoordinates.split(",")[0];
    const lon = el.recentCoordinates.split(",")[1];
    // get weather info
    const result = await resolvers.Query.weatherNotif(+lat, +lon);
    // console.log(result, "??????????");
    if (result.length === 0) {
      el.body = "Cuaca hari ini diprediksi tidak akan hujan, cek AlertMe! untuk melihat kondisi di sekitar Anda";
    } else {
      el.body = "Hujan diprediksi akan turun pada hari ini, siapkan payung dan jas hujan Anda dan cek AlertMe! untuk melihat kondisi di sekitar Anda";
    }
  });
  console.log(users);

  let message = users.map((el) => {
    let obj = {
      to: el.expoToken,
      sound: "default",
      title: "Ramalan cuaca hari ini",
      body: users.body,
    };
    return obj;
  });
  console.log(message, "<<<<<<<<<<<");

  return axios({
    method: "POST",
    url: expoUrl,
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(message),
  });
});

weatherForecast.add(
  {},
  {
    repeat: {
      // every 6AM
      cron: `0 6 * * *`,
      // every: 120000,
    },
  }
);

module.exports = {
  typeDefs,
  resolvers,
};
