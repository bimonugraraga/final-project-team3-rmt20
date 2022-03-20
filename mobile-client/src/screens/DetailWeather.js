import react from 'react'
import { View,TouchableOpacity,ActivityIndicator} from 'react-native'
import { Button} from "native-base";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
import {Entypo,MaterialCommunityIcons,Feather} from 'react-native-vector-icons';
import { useQuery } from '@apollo/client';
import { GET_ALL_WEATHERS_REPORT, GET_CURRENT_WEATHER  } from "../../lib/apollo/queries/weatherQueries";
import MapView, {Callout, Geojson, Marker }  from 'react-native-maps';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function DetailWeather({navigation,route}) {

  const lat = route.params.lat
  const lon = route.params.lon
  const currentCity = route.params.currentCity
  const currentDistrict = route.params.currentDistrict
  
  let {loading, error, data} = useQuery(GET_CURRENT_WEATHER, {
    variables: {
      lat : lat,
      lon : lon
    }
  })
  
  const todayDate = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true })
  let [access_token, setAT] = useState(null)
  const getAccessToken = async () => {
    try {
      const value = await AsyncStorage.getItem('access_token')
      if(value !== null) {
        console.log(value, "<----->")
        setAT(value)
      }
    } catch(e) {
      // error reading value
    }
  }
  useEffect(() => {
    getAccessToken()
  }, [])

  const pengaduanButton = () => {
    if (access_token){
      return (
        <TouchableOpacity><Button style={{backgroundColor: "#22d3ee"}} mt="0"
          onPress={() => navigation.navigate('FormCuaca')}
        >Report Cuaca</Button></TouchableOpacity>
      )
    }
  }
  if (error) {
    return <Center style ={{backgroundColor : "#fef3c7"}}>
      <Text>Something When Wrong</Text>
    </Center>
  }

  return (
    
    <NativeBaseProvider >
      <Center flex={1} px="3" style ={{backgroundColor : "#fef3c7"}}>
        {
          loading ? <ActivityIndicator size="small" color="#0000ff" /> : (
            <View>
               <Box alignItems="center" >
                  <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                  }} _web={{
                    shadow: 2,
                    borderWidth: 0
                  }} _light={{
                    backgroundColor: "gray.50"
                  }}>
                    <Box style={{backgroundColor: "#22d3ee"}}>
                      <AspectRatio w="100%" >
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
                      <Center bg="#3f3f46" _dark={{
                        bg: "#3f3f46"
                        }} _text={{
                          color: "warmGray.50",
                          fontWeight: "700",
                          fontSize: "xs"
                        }} position="absolute" bottom="0" px="3" py="1.5">
                        {data.fetchCurrentWeather.current.weather[0].description}
                      </Center>
                    </Box>
                    <Stack p="4" space={3} style={{backgroundColor: "#e2e8f0"}}>
                      <View style= {{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                        <Stack space={2}>
                          <Heading size="md" ml="-1">
                            {currentCity}, {currentDistrict}
                          </Heading>
                          <Text fontSize="xs" _light={{
                            color: "violet.500"
                            }} _dark={{
                              color: "violet.400"
                            }} fontWeight="500" ml="-0.5" mt="-1">
                            {todayDate}
                          </Text>
                        </Stack>
                        <AspectRatio w="30%" ratio={16 / 9}>
                          <Image
                            source={{ uri: `http://openweathermap.org/img/wn/${data.fetchCurrentWeather.current.weather[0].icon}@2x.png` }}
                            alt="image"
                          />
                        </AspectRatio>
                        <Text style={{fontSize: 17, fontWeight: "bold", color: "#1e293b", marginStart: 5}}>{data.fetchCurrentWeather.current.temp}°C</Text>
                      </View>
                      <Text fontWeight="bold" color="#1e293b" marginBottom= "1.5" style= {{textAlign: "center"}}>
                          Terasa {data.fetchCurrentWeather.current.feels_like}°C. Kondisi: {data.fetchCurrentWeather.current.weather[0].description}</Text>
                      <View style= {{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                        <View style= {{flexDirection: "row", alignItems: "center"}}>
                          <Entypo name = "direction"  />
                          <Text fontWeight="400" style={{marginStart: 5}}>
                            {data.fetchCurrentWeather.current.wind_speed} m/s WSW
                          </Text>
                        </View>
                        <Entypo name = "air"> <Text fontWeight="400" style={{marginStart: 5}}>
                          {data.fetchCurrentWeather.current.pressure} hPa
                        </Text></Entypo>
                      </View>
                      <View style= {{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                        <Text fontWeight="400" style={{marginStart: 5}}> Jarak Pandang: {(data.fetchCurrentWeather.current.visibility)/1000} Km </Text>
                        <MaterialCommunityIcons name = "air-humidifier"><Text fontWeight="400" style={{marginStart: 10}}>
                            {data.fetchCurrentWeather.current.humidity} %</Text> </MaterialCommunityIcons>
                      </View>
                      {/* <TouchableOpacity><Button style={{backgroundColor: "#22d3ee"}} mt="0"
                        onPress={() => navigation.navigate('FormCuaca')}
                      >Report Cuaca</Button></TouchableOpacity> */}
                      {pengaduanButton()}
                    </Stack>
                  </Box>
                </Box>
            </View>
          )
        }
      </Center>
    </NativeBaseProvider>
   

    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Detail Cuaca</Text>
    //   <Button mt="2"
    //     onPress={() => navigation.navigate('FormCuaca')}
    //   >Report Cuaca</Button>
    // </View>
  )
}