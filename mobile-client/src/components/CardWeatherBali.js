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

const LinearGradient = require("expo-linear-gradient").LinearGradient;

const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

export default function CardWeatherJakarta (){

  let latJakarta = -6.200000
  let lonJakarta = 106.816666

  let latBandung = -6.914744
  let lonBandung = 107.609810

  let latYogyakarta = -7.797068
  let lonYogyakarta = 110.370529

  let latYLombok = -8.650979
  let lonLombok = 116.324944

  let latBali = -8.409518
  let lonBali = 115.188919

  let {loading, error, data} = useQuery(GET_CURRENT_WEATHER, {
    variables: {
      lat : latBali,
      lon : lonBali
    }
  })

  // console.log(loading, error, data, "<--->")

  if (error) {
    return <View>
      <Text>Something When Wrong</Text>
    </View>
  }

  return (
    <NativeBaseProvider config={config}>
    <Center flex={1}  px="3" >
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
          bg={{
            linearGradient: {
              colors: ["#191645", "#43C6AC"],
              start: [0, 0],
              end: [0, 1]
            }
          }}   _text={{
            fontSize: "md",
            fontWeight: "bold",
            color: "white"
          }}
        >
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1" color="white">
                Bali
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
    </Center>
  </NativeBaseProvider>
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
    width: windowWidth * 0.9,
    // height: windowHeight* 0.3
  }
})