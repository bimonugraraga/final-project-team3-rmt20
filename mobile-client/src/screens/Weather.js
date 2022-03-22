import { View,ScrollView,TouchableOpacity,StyleSheet,ActivityIndicator,Dimensions } from "react-native";
import { Button, Row } from "native-base";
import React, { useState, useEffect } from "react";
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
  Spinner,
  MaterialIcons,
  Divider
} from "native-base";

import {Entypo} from 'react-native-vector-icons';
import { useQuery } from '@apollo/client';


import AsyncStorage from '@react-native-async-storage/async-storage';

import { GET_ALL_WEATHERS_REPORT, GET_CURRENT_WEATHER  } from "../../lib/apollo/queries/weatherQueries";
import MapView, {Callout, Geojson, Marker }  from 'react-native-maps';
import * as Location from 'expo-location';
import CardWeatherJakarta from '../components/CardWeatherJakarta'
import CardWeatherBandung from '../components/CardWeatherBandung'
import CardWeatherYogyakarta from '../components/CardWeatherYogyakarta'
import CardWeatherBali from '../components/CardWeatherBali'
import CardWeatherLombok from "../components/CardWeatherLombok"

const LinearGradient = require("expo-linear-gradient").LinearGradient;

const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

export default function Weather({ navigation }) {
  
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('access_token')
    if(value !== null) {
      console.log(value, "<----->")
    }
  } catch(e) {
    // error reading value
  }
}

  useEffect(() => {
    getData()
  }, [])

  // let {loading, error, data} = useQuery(GET_ALL_WEATHERS_REPORT)
  // console.log(loading, error, data, "<--->")

  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
      setLocation(location);

      let city = await Location.reverseGeocodeAsync({latitude : location.coords.latitude, longitude :location.coords.longitude});
      setCity(city);
    })();
  }, []);

  let text = 'Waiting..';
  let lati = 0
  let long = 0
  let citycur = ''
  let dis = ''
  if (errorMsg) {
    text = errorMsg;
  } else if (location && city) {
    text = JSON.stringify(location);
    citycur = city[0].city
    dis = city[0].district
    lati = location.coords.latitude
    long = location.coords.longitude
  }
    // console.log(lati, 1)
    // console.log(long, 2)
    // console.log(city)
  const currentCity = citycur
  const currentDistrict = dis
  const lat = lati
  const lon = long
  

  let {loading, error, data} = useQuery(GET_CURRENT_WEATHER, {
    variables: {
      lat : lat,
      lon : lon
    }
  })

  // console.log(loading, error, data, "<--->")

  if (error) {
    return <View style ={{backgroundColor : "#e4e4e7"}}>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <MaterialIcons name="error" size={30} />
          <Text>Something Went Wrong</Text>
        </Center>
      </NativeBaseProvider>
    </View>
  }

  return (
    <ScrollView>
      <View style ={{backgroundColor : "#e4e4e7"}}>

      {
        loading ? <Center flex={1} px="3" style ={{backgroundColor : "#fef3c7"}}>
              <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="emerald.500" fontSize="md">
                  Loading
                </Heading>
              </HStack>
            </Center> : (
          <NativeBaseProvider config={config}>
            <Center flex={1} px="3" bg="#e4e4e7">
              <Box mb="2" mt="2" width="100%" rounded="lg" bg="#191645" justifyContent="center" alignItems="center" p="2" shadow={2}>
                <Heading size="md" color="#fff">Lokasi Saat Ini</Heading>
              </Box>
            </Center>
            {/* <TouchableOpacity onPress={() => navigation.navigate("DetailCuaca")}> */}
            <Center px="3" style={styles.lokasisaatini} >
              <Box alignItems="center" style = {styles.boxcuacasataini}>
                <Box
                  maxW="80"
                  shadow={2}
                  rounded="lg"
                  overflow="hidden"
                  borderColor="coolGray.200"
                  borderWidth="1"
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
              <Box borderWidth={2} rounded="md">
                <AspectRatio w="100%" ratio={16 / 9 }>
                <MapView
                      initialRegion={{
                        latitude: data.fetchCurrentWeather.lat,
                        longitude: data.fetchCurrentWeather.lon,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      >
                      <Marker 
                      coordinate={{
                        latitude: data.fetchCurrentWeather.lat,
                        longitude:  data.fetchCurrentWeather.lon,
                      }}
                      pinColor="red"
                      >
                        <Callout><Text>Lokasi Saat Ini</Text></Callout>
                      </Marker>
                    </MapView>
                </AspectRatio>
              </Box>

                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Heading size="md" ml="-1" color="white">
                        {currentCity}, {currentDistrict}
                      </Heading>
                    </Stack>
                   <Divider bg="#a1a1aa" thickness="2" />
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
                    <Button colorScheme='orange' mt="2" onPress={() => navigation.navigate("DetailCuaca", {
                      lat : data.fetchCurrentWeather.lat,
                      lon : data.fetchCurrentWeather.lon,
                      // item : data.fetchCurrentWeather,
                      currentCity: currentCity,
                      currentDistrict : currentDistrict
                      })}>
                      Detail Cuaca
                    </Button>
                  </Stack>
                </Box>
              </Box>
              
            </Center>
            {/* </TouchableOpacity> */}
          
            <Center flex={1} px="3" bg="#e4e4e7">
              <Box mb="5" mt="2" width="100%" rounded="lg" bg="#191645" justifyContent="center" alignItems="center" p="2" shadow={2}>
                <Heading size="md" color="#fff">Lokasi Lain</Heading>
              </Box>
            </Center>
            <Center flex={1} px="3" >
              <CardWeatherJakarta></CardWeatherJakarta>
              <CardWeatherBandung></CardWeatherBandung>
              <CardWeatherYogyakarta></CardWeatherYogyakarta>
              <CardWeatherBali></CardWeatherBali>
              <CardWeatherLombok></CardWeatherLombok>
            </Center>
          </NativeBaseProvider>
        )
      }
    </View>
    </ScrollView>
  );
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
  devider : {
    width : windowWidth*0.9 
  }
})