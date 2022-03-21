import React, {useState,useEffect} from 'react'
import { View,TouchableOpacity,ActivityIndicator, StyleSheet,Dimensions,FlatList,ScrollView, RefreshControl, LogBox} from 'react-native'
import { Button} from "native-base";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider,Spinner } from "native-base";
import {Entypo,MaterialCommunityIcons,Feather} from 'react-native-vector-icons';
import { useQuery } from '@apollo/client';
import { GET_ALL_WEATHERS_REPORT, GET_CURRENT_WEATHER  } from "../../lib/apollo/queries/weatherQueries";
import MapView, {Callout, Geojson, Marker }  from 'react-native-maps';
import CardReportUser from '../components/CardReportUser'
import * as Location from 'expo-location';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function DetailWeather({ navigation, route }) {
  // console.log(route.params)

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
    const currentCity = citycur
    const currentDistrict = dis
    const lat = lati
    const lon = long


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // const lat = route.params.lat
  // const lon = route.params.lon
  // const currentCity = route.params.currentCity
  // const currentDistrict = route.params.currentDistrict
  
  let {loading, error, data} = useQuery(GET_CURRENT_WEATHER, {
    variables: {
      lat: lat,
      lon: lon,
    },
  });

  // console.log(loading, error, data, "<--->")

  let { loading: loading2, error: error2, data: data2 } = useQuery(GET_ALL_WEATHERS_REPORT);
  // console.log(loading2, error2, data2, "<--->")
  
  const todayDate = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true })

  if (error) {
    return (
      <Center style={{ backgroundColor: "#fef3c7" }}>
        <Text>Something When Wrong</Text>
      </Center>
    );
  }

  const renderItem = ({ item }) => <CardReportUser item={item} />;

  return (
    <ScrollView nestedScrollEnabled={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <NativeBaseProvider>
        <Center flex={1} px="3" style={{ backgroundColor: "#fef3c7" }}>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <View style={{ marginBottom: 10 }}>
              <Box alignItems="center" style={styles.boxlokasilain} mt="10">
                <Box
                  mb="5"
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
                    backgroundColor: "gray.50",
                  }}
                >
                  <Box style={{ backgroundColor: "#22d3ee" }}>
                    <AspectRatio w="100%">
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
                            longitude: data.fetchCurrentWeather.lon,
                          }}
                          pinColor="red"
                        >
                          <Callout>
                            <Text>Lokasi Saat Ini</Text>
                          </Callout>
                        </Marker>
                      </MapView>
                    </AspectRatio>
                    <Center
                      bg="#3f3f46"
                      _dark={{
                        bg: "#3f3f46",
                      }}
                      _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs",
                      }}
                      position="absolute"
                      bottom="0"
                      px="3"
                      py="1.5"
                    >
                      {data.fetchCurrentWeather.current.weather[0].description}
                    </Center>
                  </Box>
                  <Stack p="4" space={3} style={{ backgroundColor: "#e2e8f0" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                      <Stack space={2}>
                        <Heading size="md" ml="-1">
                          {currentCity}, {currentDistrict}
                        </Heading>
                        <Text
                          fontSize="xs"
                          _light={{
                            color: "violet.500",
                          }}
                          _dark={{
                            color: "violet.400",
                          }}
                          fontWeight="500"
                          ml="-0.5"
                          mt="-1"
                        >
                          {todayDate}
                        </Text>
                      </Stack>
                      <AspectRatio w="30%" ratio={16 / 9}>
                        <Image source={{ uri: `http://openweathermap.org/img/wn/${data.fetchCurrentWeather.current.weather[0].icon}@2x.png` }} alt="image" />
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
                        {/* <AspectRatio w="30%" ratio={16 / 9}>
                          <Image
                            source={{ uri: `http://openweathermap.org/img/wn/${data.fetchCurrentWeather.current.weather[0].icon}@2x.png` }}
                            alt="image"
                          />
                        </AspectRatio>
                        <Text style={{fontSize: 17, fontWeight: "bold", color: "#1e293b", marginStart: 5}}>{data.fetchCurrentWeather.current.temp}°C</Text> */}
                      </View>
                      <View style ={{alignItems: "center"}}>
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
                      <TouchableOpacity><Button style={{backgroundColor: "#22d3ee"}} mt="0"
                        onPress={() => navigation.navigate('FormCuaca', {item: data.fetchCurrentWeather})}
                      >Report Cuaca</Button></TouchableOpacity>
                    </Stack>
                  </Box>
                </Box>

                <Center flex={1} px="3" bg="#fef3c7">
                  <Box mb="2" width="100%" rounded="lg" bg="#14b8a6" justifyContent="center" alignItems="center" p="2" shadow={2}>
                    <Heading size="md" color="#fff">Laporan Pengguna</Heading>
                  </Box>
                </Center>

                {
                  loading2 ?
                  <Center flex={1} px="3">
                    <HStack space={2} justifyContent="center">
                      <Spinner accessibilityLabel="Loading posts" />
                      <Heading color="emerald.500" fontSize="md">
                        Loading
                      </Heading>
                    </HStack>
                  </Center>
                  :
                  
                  (
                  <ScrollView horizontal={true} style={{ width: "100%" }}>
                    <Center flex={1} px="2.5" bg="#ffedd5">
                      <FlatList 
                        data={data2.getWeatherReports}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        
                      />
                    </Center>
                  </ScrollView>
                  )
        }
            </View>
          )}
        </Center>
      </NativeBaseProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  boxlokasilain: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    marginBottom: 5,
    width: windowWidth * 0.9,
  },
});
