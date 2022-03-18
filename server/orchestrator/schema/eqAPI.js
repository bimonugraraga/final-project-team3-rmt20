const { gql } = require("apollo-server");

const axios = require("axios");

const typeDefs = gql`
  type earthQuake {
    Tanggal: String
    Jam: String
    DateTime: String
    Coordinates: String
    Lintang: String
    Bujur: String
    Magnitude: Float
    Kedalaman: String
    Wilayah: String
    Dirasakan: String
    Potensi: String
    Shakemap: String
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
        return resp.data.Infogempa.gempa;
      } catch (error) {
        console.log(error);
      }
    },

    getRecentEarthquake: async () => {
      try {
        const resp = await axios({
          method: "GET",
          url: baseUrl + "autogempa.json",
        });
        return resp.data.Infogempa.gempa;
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
