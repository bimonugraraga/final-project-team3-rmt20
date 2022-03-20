import { gql } from "@apollo/client";

export const GET_EARTHQUAKE = gql`
  query GetEarthQuakes {
    getEarthQuakes {
      date
      hour
      dateTime
      coordinates
      magnitude
      depth
      area
      dirasakan
      potensi
      shakeMap
    }
  }
`;

export const GET_RECENT_EQ = gql`
  query GetRecentEarthquake {
    getRecentEarthquake {
      date
      hour
      dateTime
      coordinates
      magnitude
      depth
      area
      dirasakan
      potensi
      shakeMap
    }
  }
`;
