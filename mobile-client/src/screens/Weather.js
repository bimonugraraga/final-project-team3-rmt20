import react from "react";
import { View,ScrollView,TouchableOpacity,StyleSheet } from "react-native";
import { Button, Row } from "native-base";
import React from "react";
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
} from "native-base";

import {Entypo} from 'react-native-vector-icons';
import { useQuery } from '@apollo/client';
import { GET_ALL_WEATHERS_REPORT } from "../../lib/apollo/queries/weatherQueries";

export default function Weather({ navigation }) {

  let {loading, error, data} = useQuery(GET_ALL_WEATHERS_REPORT)
  console.log(loading, error, data, "<--->")

  const cuaca = {
    lat: -6.0398,
    lon: 107.2456,
    timezone: "Asia/Jakarta",
    current: {
      dt: 1647478187,
      sunrise: 1647471334,
      sunset: 1647515010,
      temp: 27.14,
      feels_like: 29.65,
      pressure: 1009,
      humidity: 76,
      dew_point: 22.54,
      uvi: 3.1,
      clouds: 100,
      visibility: 10000,
      wind_speed: 2.37,
      wind_deg: 103,
      wind_gust: 3.5,
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "awan mendung",
          icon: "http://openweathermap.org/img/wn/04d@2x.png",
        },
      ],
    },
  };

  return (
    <ScrollView>
      <View style ={{backgroundColor : "#fef3c7"}}>
    <NativeBaseProvider>
      <Text style={{textAlign : "center", marginTop: 10, marginBottom: 5, fontSize: 23, fontWeight: "bold", color: "#525252" }}>Lokasi Saat Ini</Text>
      <TouchableOpacity onPress={() => navigation.navigate("DetailCuaca")}>
      <Center px="3" style={styles.lokasisaatini} >
        <Box alignItems="center" style = {styles.boxcuacasataini}>
          <Box
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "#22d3ee",
            }}
          >
        <Box borderWidth={2} rounded="md">
          <AspectRatio w="100%" ratio={16 / 9 }>
            <Image source={{
            uri: "https://developers.google.com/maps/images/landing/hero_geocoding_api_480.png"
          }} alt="image" />
          </AspectRatio>
        </Box>

            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1" color="white">
                  {cuaca.timezone}
                </Heading>
              </Stack>
              <Box style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <AspectRatio w="30%" ratio={16 / 9}>
                  <Image
                    source={{ uri: cuaca.current.weather[0].icon }}
                    alt="image"
                  />
                </AspectRatio>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "white"}}>{cuaca.current.temp}°C</Text>
              </Box>
              <View>
                <Text fontWeight="bold" color="#f0f9ff" marginBottom= "1.5">
                  Terasa {cuaca.current.feels_like}°C. Kondisi: {cuaca.current.weather[0].description}
                </Text>
              </View>
            </Stack>
          </Box>
        </Box>
        {/* <Button mt="2" onPress={() => navigation.navigate("DetailCuaca")}>
          Detail Cuaca
        </Button> */}
      </Center>
      </TouchableOpacity>
     
      <Text style={{textAlign : "center", marginBottom: 5, fontSize: 23, fontWeight: "bold", color: "#525252" }}>Lokasi Lain</Text>
      <Center  px="3" >
      <TouchableOpacity onPress={() => navigation.navigate("DetailCuaca")}>
        <Box alignItems="center" style={styles.boxlokasilain}>
          <Box
            maxW="80"
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
              backgroundColor: "#22d3ee",
            }}
          >
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1" color="white">
                  {cuaca.timezone}
                </Heading>
              </Stack>
              <Box style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <AspectRatio w="30%" ratio={16 / 9}>
                  <Image
                    source={{ uri: cuaca.current.weather[0].icon }}
                    alt="image"
                  />
                </AspectRatio>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "white"}}>{cuaca.current.temp}°C</Text>
              </Box>
              <View>
                <Text fontWeight="bold" color="#f0f9ff" marginBottom= "1.5">
                  Terasa {cuaca.current.feels_like}°C. Kondisi: {cuaca.current.weather[0].description}
                </Text>
              </View>
            </Stack>
          </Box>
        </Box>
        </TouchableOpacity>
        
        <Box alignItems="center"  >
          <Box
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            marginBottom="5"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "#22d3ee",
            }}
          >
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1" color="white">
                  {cuaca.timezone}
                </Heading>
              </Stack>
              <Box style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <AspectRatio w="30%" ratio={16 / 9}>
                  <Image
                    source={{ uri: cuaca.current.weather[0].icon }}
                    alt="image"
                  />
                </AspectRatio>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "white"}}>{cuaca.current.temp}°C</Text>
              </Box>
              <View>
                <Text fontWeight="bold" color="#f0f9ff" marginBottom= "1.5">
                  Terasa {cuaca.current.feels_like}°C. Kondisi: {cuaca.current.weather[0].description}
                </Text>
              </View>
            </Stack>
          </Box>
        </Box>
        
        <Box alignItems="center"  >
          <Box
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            marginBottom="5"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "#22d3ee",
            }}
          >
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1" color="white">
                  {cuaca.timezone}
                </Heading>
              </Stack>
              <Box style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <AspectRatio w="30%" ratio={16 / 9}>
                  <Image
                    source={{ uri: cuaca.current.weather[0].icon }}
                    alt="image"
                  />
                </AspectRatio>
                <Text style={{fontSize: 21, fontWeight: "bold", color: "white"}}>{cuaca.current.temp}°C</Text>
              </Box>
              <View>
                <Text fontWeight="bold" color="#f0f9ff" marginBottom= "1.5">
                  Terasa {cuaca.current.feels_like}°C. Kondisi: {cuaca.current.weather[0].description}
                </Text>
              </View>
            </Stack>
          </Box>
        </Box>
      </Center>
    </NativeBaseProvider>
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

  }
})
