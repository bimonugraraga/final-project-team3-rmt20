import {gql} from "@apollo/client"

export const GET_ALL_WEATHERS_REPORT = gql`
  query{
    getWeatherReports {
      status
      description
      photoUrl
      coordinate
      temp
      pressure
      uvi
      humidity
      windspeed
      weatherMain
      weatherDesc
      weatherIcon
      User {
        email
      }
      message
    }
  }
`

export const POST_WEATHER_REPORT = gql`
  mutation($data: NewWeatherReport){
    createWeatherReport(data: $data) {
      message
    }
  }
`

export const GET_CURRENT_WEATHER = gql `
  query FetchCurrentWeather($lat: Float, $lon: Float) {
    fetchCurrentWeather(lat: $lat, lon: $lon) {
      lat
      lon
      timezone
      current {
        dt
        temp
        feels_like
        pressure
        humidity
        uvi
        visibility
        wind_speed
        weather {
          id
          main
          description
          icon
        }
      }
    }
  }
`