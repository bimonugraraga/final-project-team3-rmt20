const { gql } = require("apollo-server");
const axios = require("axios");
const Queue = require("bull");
const { redis } = require("../config/connectRedis");
const userMongoDb = require("./userMongoDb");

const sendEqNotif = new Queue("notif", `redis://:${process.env.REDISPASSWORD}@${process.env.REDISENDPOINT}:${process.env.REDISPORT}`);

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
  },
};

sendEqNotif.process(async () => {
  const recentEq = await resolvers.Query.getRecentEarthquake();
  const cacheEq = await redis.get("recentEarthquake");
  const eq = JSON.parse(cacheEq);
  // console.log(recentEq, eq);
  if (recentEq.dateTime !== eq.dateTime) {
    console.log(recentEq, eq);
    await redis.set("recentEarthquake", JSON.stringify(recentEq));
    // get user data
    const users = await userMongoDb.resolvers.Query.getAllMongoUsers();
    let expoTokens = users.map((el) => {
      return el.expoToken;
    });
    // send notif
    // harusnya kirim recent earthquake
    let message = {
      to: expoTokens,
      sound: "default",
      title: "Info Gempa",
      body: `Gempa bermagnitude ${recentEq.magnitude}. ${recentEq.area}. Potensi: ${recentEq.potensi}`,
    };
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
  }
});

sendEqNotif.add(
  {},
  {
    repeat: {
      every: 60000,
    },
  }
);

module.exports = {
  typeDefs,
  resolvers,
};
