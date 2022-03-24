import React from 'react'
import { Box, Switch, Spinner, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Divider, Flex} from 'native-base';
import { View, Dimensions} from 'react-native'
import MapView, { Callout, Marker, Circle} from "react-native-maps";
import { useQuery } from '@apollo/client';
import { GET_GEMPA } from '../../lib/apollo/queries/eqQuery';
import { GET_CURRENT_WEATHER } from '../../lib/apollo/queries/weatherQueries';
import { formatDistance, subHours } from "date-fns";
import { MaterialIcons, Ionicons, FontAwesome5, Feather, Entypo, MaterialCommunityIcons } from "react-native-vector-icons";
import { useEffect, useState, useRef } from "react";
import * as Location from 'expo-location';
import ModalForm from '../components/Modal';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Home() {

  const [shouldShow, setShouldShow] = useState(false)
  const { loading, error, data } = useQuery(GET_GEMPA)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      return setExpoPushToken(token)
    })
    .catch((err) => {
      console.log(err)
    })
  
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

    
  }, []);

  let ltd
  let lng
  if(data) {
    const a =  data.getRecentEarthquake?.coordinates
    const b = a.split(',')
    ltd = Number(b[0])
    lng = Number(b[1])
  }

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

    let {loading: loading2, error: error2, data: data2} = useQuery(GET_CURRENT_WEATHER, {
      variables: {
        lat : lat,
        lon : lon
      }
    })
    let img
    if(data2) {
      img = data2.fetchCurrentWeather.current.weather[0].icon
    }

    let coor
    if(location) {
      coor = `${location.coords.latitude},${location.coords.longitude}`
    }
    console.log(coor)
    const todayDate = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true })

  if (error) {
    return (
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <MaterialIcons name="error" size={30} />
          <Text>Something Went Wrong</Text>
        </Center>
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider>
    {
      loading ? 
      <Center flex={1} px="3">
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="emerald.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Center> 
        :
      <Center flex={1} >
        <ModalForm 
        expoPushToken={expoPushToken}
        coor={coor}
        />

        <Box position="absolute">
          <AspectRatio w="100%" ratio={windowWidth / windowHeight }>
            <MapView
                  initialRegion={{
                    latitude: ltd,
                    longitude: lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Circle
                  center = {{ latitude: ltd, longitude: lng }}
                  radius = { 30000 }
                  strokeColor = "#881337"
                  fillColor =  "rgba(50, 0, 0, 0.2);"
                  strokeWidth = { 1 }
                  />
                  <Marker
                    coordinate={{
                      latitude: ltd,
                      longitude: lng,
                    }}
                    pinColor="red"
                  >
                    <Callout>
                      <Text>Pusat Gempa</Text>
                    </Callout>
                  </Marker>
              </MapView>
          </AspectRatio>
          </Box>

<View style={{marginTop: windowHeight *0.1}} >
  <Box alignItems="center" bg="#34495e" style={{ width: windowWidth * 0.95, height: windowHeight * 0.4}} rounded="xl">
    <Box mb="-4"  flexDirection="row" justifyContent="space-around" style={{ width: windowWidth * 0.95}} >
        <Heading size="xs" mt="5" color="#fff">Gempa</Heading>
        <Switch size="lg" offTrackColor="indigo.100" onTrackColor="indigo.200" onThumbColor="#f59e0b" offThumbColor="#be123c" 
        onValueChange={() => setShouldShow(!shouldShow)}
        />
        <Heading size="xs" mt="5" color="#fff">Cuaca</Heading>
    </Box>
  
{
  shouldShow ?
    <View >
      <Box alignItems="center" direction="column">
            <Box my="4" style={{width: windowWidth}}
                maxW="100%"
                overflow="hidden"
                bg="(rgba(0, 0, 0, 0.7)">
              <Stack p="2">
                <View alignItems="center">
                  <Heading fontSize="lg" color="#fff">{currentCity} ,{'  '}{currentDistrict}</Heading>
                </View>
              </Stack>
            </Box>


            <Box
            maxW="80" rounded="lg"
            style={{width: windowWidth}}
            mb="4"
            overflow="hidden"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "(rgba(0, 0, 0, 0.5)",
            }}
          >
            <Stack p="2">
              <Box alignItems="center">
                <Box w="100%" h={20}>
                  <Flex direction="column" justifyContent="space-between">
                  <View justifyContent="center" alignItems="center">
                      <AspectRatio w="20%" ratio={16 / 9}>
                          <Image
                            source={{ uri: data2 ? `http://openweathermap.org/img/wn/${img}@2x.png` : null }}
                            alt="image"
                          />
                        </AspectRatio>
                      <Heading size="md" color="#fff" >{data2?.fetchCurrentWeather.current.temp} °C</Heading>
                    </View>
                    <View justifyContent="center" alignItems="center">
                      <Text color="#fff">
                        {todayDate}
                      </Text>
                    </View>
                  </Flex>
                </Box>
              </Box>
            </Stack>
          </Box>

        <View style={{ flexDirection: 'row'}}>

          <Box
            maxW="80" rounded="lg"
            overflow="hidden"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "(rgba(0, 30, 30, 0.6)",
            }}
          >
            <Stack p="2">
              <Box alignItems="center">
                <Box w="100%">
                  <Flex direction="row" justifyContent="space-between" h="50">
                    <View justifyContent="center" alignItems="center">
                      <Entypo color="#fbbf24" name = "direction"  />
                      <Heading color="#fff" size="md">
                        {data2?.fetchCurrentWeather.current.wind_speed} m/s WSW
                      </Heading>
                      <Text color="#fff" >
                        Kecepatan Angin
                      </Text>
                    </View>
                  </Flex>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box
          mx="2"
            maxW="80" rounded="lg"
            overflow="hidden"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "(rgba(0, 30, 30, 0.6)",
            }}
          >
            <Stack p="2">
              <Box alignItems="center">
                <Box w="100%">
                  <Flex direction="row" justifyContent="space-between" h="50">
                    <View justifyContent="center" alignItems="center">
                      <Entypo color="#fbbf24" name = "air" />
                      <Heading size="md" color="#fff">
                        {data2?.fetchCurrentWeather.current.pressure} hPa
                      </Heading>
                      <Text color="#fff">
                        Tekanan Udara
                      </Text>
                    </View>
                  </Flex>
                </Box>
              </Box>
            </Stack>
          </Box>


          <Box
            maxW="80" rounded="lg"
            overflow="hidden"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "(rgba(0, 30, 30, 0.6)",
            }}
          >
            <Stack p="2" >
              <Box alignItems="center">
                <Box w="100%">
                  <Flex direction="row" justifyContent="space-between" h="50">
                    <View justifyContent="center" alignItems="center">
                    <MaterialCommunityIcons color="#fbbf24"name="air-humidifier" />
                    <Heading color="#fff" size="md">
                        {data2?.fetchCurrentWeather.current.humidity} %</Heading>
                      <Text color="#fff">Kelembaban</Text>
                    </View>
                  </Flex>
                </Box>
              </Box>
            </Stack>
          </Box>
        </View>

          



          
      </Box>
    </View>
  :
    <View>
      <Box alignItems="center" direction="column">

        <Box my="4" style={{width: windowWidth}}
            maxW="100%"
            overflow="hidden"
            bg="(rgba(0, 0, 0, 0.7)">
              <Stack p="2">
          <View alignItems="center">
            <Heading fontSize="lg" color="#fff">Gempa Terkini</Heading>
          </View>
              </Stack>
        </Box>

        <View style={{ flexDirection: 'row'}}>

          <Box
            maxW="80" rounded="lg"
            overflow="hidden"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "(rgba(0, 30, 30, 0.6)",
            }}
          >
            <Stack p="4" space={3} mt="-1">
              <Box alignItems="center">
                <Box w="100%">
                  <Flex direction="row" justifyContent="space-between" h="50">
                    <View justifyContent="center" alignItems="center">
                      <Ionicons color="#fbbf24" name="time-outline" />
                      <Heading size="md" color="#fff">
                        {data.getRecentEarthquake.date}
                      </Heading>
                      <Text fontSize="xs" color="#fff">
                        {data.getRecentEarthquake.hour}
                      </Text>
                    </View>
                    <View justifyContent="center" alignItems="center">

                    </View>
                  </Flex>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box
          mx="2"
            maxW="80" rounded="lg"
            overflow="hidden"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "(rgba(0, 30, 30, 0.6)",
            }}
          >
            <Stack p="4" space={3} mt="-1">
              <Box alignItems="center">
                <Box w="100%">
                  <Flex direction="row" justifyContent="space-between" h="50">
                    <View justifyContent="center" alignItems="center">
                      <Feather color="#dc2626" name="activity" />
                      <Heading size="md" color="#fff">
                        {data.getRecentEarthquake.magnitude}
                      </Heading>
                      <Text color="#fff">Magnitude</Text>
                    </View>
                    <View justifyContent="center" alignItems="center">

                    </View>
                  </Flex>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box
            maxW="80" rounded="lg"
            overflow="hidden"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "(rgba(0, 30, 30, 0.6)",
            }}
          >
            <Stack p="4" space={3} mt="-1">
              <Box alignItems="center">
                <Box w="100%">
                  <Flex direction="row" justifyContent="space-between" h="50">
                    <View justifyContent="center" alignItems="center">
                      <Feather color="#fbbf24" name="radio" />
                      <Heading size="md" color="#fff">
                        {data.getRecentEarthquake.depth}
                      </Heading>
                      <Text color="#fff">Kedalaman</Text>
                    </View>
                    <View justifyContent="center" alignItems="center">
                    </View>
                  </Flex>
                </Box>
              </Box>
            </Stack>
          </Box>

        </View>

        <Box
        mt="4"
        style={{width: windowWidth}}
            maxW="100%"
          overflow="hidden"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "(rgba(0, 30, 30, 0.6)",
          }}
        >
          <Stack p="3" space={3} mt="-1">
            <Box alignItems="center">
              <Box w="100%" >
                <View>
                  <Ionicons color="#f97316" name="location">
                    <Text fontSize="xs" color="#fff">
                      {" "}
                      {data.getRecentEarthquake.area}
                    </Text>
                  </Ionicons>
                </View>
                <View mt="1">
                  <Ionicons color="#fde047" name="map">
                    <Text fontSize="xs" color="#fff">
                      {" "}
                      Wilayah : {data.getRecentEarthquake.dirasakan}
                    </Text>
                  </Ionicons>
                </View>
                <View mt="1">
                <FontAwesome5 color="#fde047" name="podcast">
                    <Heading fontSize="sm" color="#fff">
                      {" "}
                      {data.getRecentEarthquake.potensi}
                    </Heading>
                  </FontAwesome5>
                </View>
              </Box>
            </Box>
          </Stack>
        </Box>

      </Box>
    </View>
}

  </Box>
</View>



      </Center>
    }
    </NativeBaseProvider>
  )
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}
