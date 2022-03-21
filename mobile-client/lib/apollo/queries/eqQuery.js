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

export const USER_REPORT_GEMPA = gql`
  mutation($data: NewEqReport) {
    createEqReports(data: $data) {
      message
    }
  }
`

export const GET_USER_REPORT_GEMPA = gql`
  query($dateTime: String, $coordinates: String){
    getEqReports(dateTime: $dateTime, coordinates: $coordinates) {
      id
      status
      description
      photoUrl
      coordinate
      User {
        email
      }
    }
  }
`