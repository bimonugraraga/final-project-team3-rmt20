import {gql} from "@apollo/client"

export const GET_GEMPA = gql`
  query {
    getRecentEarthquake {
      area
      hour
      date
      dateTime
      coordinates
      lintang
      bujur
      magnitude
      depth
      dirasakan
      potensi
      shakeMap
    }
  }
`

export const GET_ALL_GEMPA = gql`
  query {
    getEarthQuakes {
      area
      date
      hour
      dateTime
      coordinates
      lintang
      bujur
      magnitude
      depth
      dirasakan
      potensi
      shakeMap
    }
  }
`