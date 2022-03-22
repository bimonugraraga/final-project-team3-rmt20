const { gql } = require("apollo-server");
const axios = require("axios");
const Queue = require("bull");

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

const expoUrl = "https://exp.host/--/api/v2/push/send";
let baseUrl = `https://api.openweathermap.org/data/2.5/onecall?appid=${process.env.OWKEY}&lang=id&units=metric`;

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
  // get user data

  // get weather info
  const result = await resolvers.Query.weatherNotif(lat, lon);
  let message = {
    to: "expoPushToken",
    sound: "default",
    title: "Ramalan cuaca hari ini",
  };
  if (result.length === 0) {
    message.body = "Cuaca hari ini diprediksi tidak akan hujan, cek AlertMe! untuk melihat kondisi di sekitar Anda";
  } else {
    message.body = "Hujan diprediksi akan turun pada hari ini, siapkan payung dan jas hujan Anda dan cek AlertMe! untuk melihat kondisi di sekitar Anda";
  }

  // send notif
  await axios({
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
    },
  }
);

module.exports = {
  typeDefs,
  resolvers,
};
