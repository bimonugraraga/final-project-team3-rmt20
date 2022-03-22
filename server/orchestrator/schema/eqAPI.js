const { gql } = require("apollo-server");
const axios = require("axios");
const Queue = require("bull");
const { redis } = require("../config/connectRedis");

// const eqQueue = new Queue("feltEarthquakes", `redis://:${process.env.REDISPASSWORD}@${process.env.REDISENDPOINT}:${process.env.REDISPORT}`);
const sendEqNotif = new Queue("notif", `redis://:${process.env.REDISPASSWORD}@${process.env.REDISENDPOINT}:${process.env.REDISPORT}`);
// const mockNotif = new Queue("mockNotif", `redis://:${process.env.REDISPASSWORD}@${process.env.REDISENDPOINT}:${process.env.REDISPORT}`);

const typeDefs = gql`
  type earthQuake {
    date: String
    hour: String
    dateTime: String
    coordinates: String
    lintang: String
    bujur: String
    magnitude: Float
    depth: String
    area: String
    dirasakan: String
    potensi: String
    shakeMap: String
  }
  type Query {
    getEarthQuakes: [earthQuake]
    getRecentEarthquake: earthQuake
    newEarthquakeNotif: earthQuake
    mockupNotif: message
  }
`;

const baseUrl = "https://data.bmkg.go.id/DataMKG/TEWS/";

const resolvers = {
  Query: {
    getEarthQuakes: async () => {
      try {
        const resp = await axios({
          method: "GET",
          url: baseUrl + "gempadirasakan.json",
        });
        let data = resp.data?.Infogempa.gempa;
        const result = data.map((e) => {
          let obj = {
            date: e.Tanggal,
            hour: e.Jam,
            dateTime: e.DateTime,
            coordinates: e.Coordinates,
            lintang: e.Lintang,
            bujur: e.Bujur,
            magnitude: +e.Magnitude,
            depth: e.Kedalaman,
            area: e.Wilayah,
            potensi: e.Potensi,
            dirasakan: e.Dirasakan,
            shakemap: e.Shakemap,
          };
          return obj;
        });
        return result;
      } catch (error) {
        // console.log(error);
        return error.response.data;
      }
    },

    getRecentEarthquake: async () => {
      try {
        const resp = await axios({
          method: "GET",
          url: baseUrl + "autogempa.json",
        });
        const data = resp.data?.Infogempa.gempa;
        const result = {
          date: data.Tanggal,
          hour: data.Jam,
          dateTime: data.DateTime,
          coordinates: data.Coordinates,
          lintang: data.Lintang,
          bujur: data.Bujur,
          magnitude: +data.Magnitude,
          depth: data.Kedalaman,
          area: data.Wilayah,
          potensi: data.Potensi,
          dirasakan: data.Dirasakan,
          shakemap: data.Shakemap,
        };
        return result;
      } catch (error) {
        return error.response.data;
      }
    },

    newEarthquakeNotif: async () => {
      const cacheEq = await redis.get("recentEarthquake");
      const eq = JSON.parse(cacheEq);
      return eq;
    },
    mockupNotif: async () => {
      return {
        message: "Gempa baru!",
      };
    },
  },
};

// eqQueue.process(async () => {
//   const result = await resolvers.Query.getRecentEarthquake();
//   console.log(result);
//   return await resolvers.Query.getRecentEarthquake();
// });

sendEqNotif.process(async () => {
  const recentEq = await resolvers.Query.getRecentEarthquake();
  const cacheEq = await redis.get("recentEarthquake");
  const eq = JSON.parse(cacheEq);
  // console.log(recentEq, eq);
  if (recentEq.dateTime !== eq.dateTime) {
    console.log(recentEq, eq);
    await redis.set("recentEarthquake", JSON.stringify(recentEq));
    return await resolvers.Query.newEqNotif();
  }
});

// mockNotif.process(async () => {
//   return await resolvers.Query.mockupNotif();
// });

// mockNotif.add(
//   {},
//   {
//     repeat: {
//       every: 60000,
//     },
//   }
// );

sendEqNotif.add(
  {},
  {
    repeat: {
      every: 60000,
    },
  }
);

// eqQueue.add(
//   {},
//   {
//     repeat: {
//       every: 59000,
//     },
//   }
// );

module.exports = {
  typeDefs,
  resolvers,
};
