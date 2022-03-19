const { gql } = require("apollo-server");

const axios = require("axios");

const typeDefs = gql`
  type eqReport {
    id: ID
    status: String
    description: String
    photoUrl: String
    coordinate: String
    User: User
  }

  input NewEqReport {
    status: String
    description: String
    photoUrl: String
    coordinate: String
    date: String
    hour: String
    dateTime: String
    coordinates: String
    magnitude: Float
    depth: String
    area: String
    dirasakan: String
    potensi: String
    shakeMap: String
  }

  extend type Query {
    getEqReports(coordinates: String, dateTime: String): [eqReport]
  }
  extend type Mutation {
    createEqReports(data: NewEqReport): message
  }
`;

const baseUrl = "http://localhost:3000/reports/earthquakes";

const resolvers = {
  Query: {
    getEqReports: async (_, args) => {
      try {
        const { dateTime, coordinates } = args;
        const resp = await axios({
          method: "GET",
          url: baseUrl,
          params: {
            dateTime,
            coordinates,
          },
        });
        return resp.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    createEqReports: async (_, args) => {
      try {
        let { status, description, photoUrl, coordinate, date, hour, dateTime, coordinates, magnitude, depth, area, dirasakan, potensi, shakeMap } = args.data;
        const resp = await axios({
          method: "POST",
          url: baseUrl,
          data: {
            status,
            description,
            photoUrl,
            coordinate,
            date,
            hour,
            dateTime,
            coordinates,
            magnitude: +magnitude,
            depth: +depth.split(" ")[0],
            area,
            dirasakan,
            potensi,
            shakeMap,
          },
        });
        if (resp.status === 201) {
          console.log(resp.data);
          return { message: `Laporan berhasil dibuat` };
        }
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
