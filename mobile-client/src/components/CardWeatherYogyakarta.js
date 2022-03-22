import React from "react"
import {View, StyleSheet,ActivityIndicator,Dimensions} from 'react-native'
import { 
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider, 
} from "native-base"
import { useQuery } from '@apollo/client';
import { GET_ALL_WEATHERS_REPORT, GET_CURRENT_WEATHER  } from "../../lib/apollo/queries/weatherQueries";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function CardWeatherYogyakarta (){

  let latJakarta = -6.200000
  let lonJakarta = 106.816666

  let latBandung = -6.914744
  let lonBandung = 107.609810

  let latYogyakarta = -7.797068
  let lonYogyakarta = 110.370529

  let latYSurabaya = -7.250445
  let lonSurabaya = 112.768845

  let latBali = -8.409518
  let lonBali = 115.188919

  let {loading, error, data} = useQuery(GET_CURRENT_WEATHER, {
    variables: {
      lat : latYogyakarta,
      lon : lonYogyakarta
    }
  })

  // console.log(loading, error, data, "<--->")

  if (error) {
    return <View>
      <Text>Something When Wrong</Text>
    </View>
  }

  return (
    <View>
      {
        loading ? <ActivityIndicator size="small" color="#0000ff" /> : (
        <Box alignItems="center" style={styles.boxlokasilain}>
        <Box
          style = {styles.boxwidth}
          maxW="80"
          shadow={2}
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          marginBottom= "5"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "#06b6d4",
          }}
        >
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1" color="white">
                DIY Yogyakarta
              </Heading>
            </Stack>
            <Box style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <AspectRatio w="30%" ratio={16 / 9}>
                <Image
                  source={{ uri: `http://openweathermap.org/img/wn/${data.fetchCurrentWeather.current.weather[0].icon}@2x.png` }}
                  alt="image"
                />
              </AspectRatio>
              <Text style={{fontSize: 21, fontWeight: "bold", color: "white"}}>{data.fetchCurrentWeather.current.temp}°C</Text>
            </Box>
            <View>
              <Text fontWeight="bold" color="#f0f9ff" marginBottom= "1.5">
                Terasa {data.fetchCurrentWeather.current.feels_like}°C. Kondisi: {data.fetchCurrentWeather.current.weather[0].description}
              </Text>
            </View>
          </Stack>
        </Box>
        </Box>
        )}
    
    </View>
  )
}

const styles = StyleSheet.create ({
  lokasisaatini: {
    marginBottom: 10,
    // borderWidth: 2,
    // borderColor: "rgba(62, 71, 75, 0.97)",
  
  },
  boxcuacasataini: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  boxlokasilain : {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,

  },
  boxwidth : {
    width: windowWidth * 0.9
  }
})