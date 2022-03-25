import react from 'react'
import { View,StyleSheet, Dimensions } from 'react-native'
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider,Spinner,Flex, Modal, Button, FormControl, Input, Divider} from "native-base";
import { useEffect, useState } from 'react';
import { formatDistance, subHours } from 'date-fns'
import {Feather, Ionicons} from 'react-native-vector-icons';
import { GET_ALL_WEATHERS_REPORT, GET_CURRENT_WEATHER ,GET_ONE_WEATHER_REPORT } from "../../lib/apollo/queries/weatherQueries";
import { useQuery } from '@apollo/client';
import MapView, {Callout, Geojson, Marker }  from 'react-native-maps';
import {Entypo,MaterialCommunityIcons} from 'react-native-vector-icons';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const LinearGradient = require("expo-linear-gradient").LinearGradient;

const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

export default function CardReportUser ({item}) {
  // console.log(item, 74982374982374)

  const d = new Date( item.createdAt );
  let date = d.toDateString()

  let {loading, error, data} = useQuery(GET_ONE_WEATHER_REPORT, {
    variables: {
      reportId : item.id,
    }
  })
  // console.log(loading, error, data, "<--->")

  let tempCoor = item.coordinate.split(',')
  // console.log(tempCoor, "><<<<<<<<")

  let latTemp = Number(tempCoor[0])
  let longiTemp = Number(tempCoor[1])


  const [showModal, setShowModal] = useState(false);

  return (
    <NativeBaseProvider config={config}>
    <Center>
    <Box alignItems="center">
    <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" marginBottom= "2" _dark={{
    borderColor: "coolGray.600",
    backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "#14b8a6"
    }}>
      <Stack p="4" space={3} 
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
      }}>
        <Box alignItems="center">
          <Box w="100%">
            <Flex mx="1" direction="row" justify="space-evenly" h="50">
              <View justifyContent="center" alignItems="center">
                <Text fontSize="xs" color="#fff">{item.User.email}</Text>
                <Heading size="sm" color="#fff">{date}</Heading>
                <Text fontSize="xs" color="#fff">{item.status}</Text>
              </View >
              <Divider orientation="vertical" bg="#a1a1aa" thickness="2" mx="7" />
              <View justifyContent="center" alignItems="center">
                <Heading size="md" color="#fff">{item.temperature}°C</Heading>
                <Text color="#fff">Suhu</Text>
              </View>
              <Divider orientation="vertical" bg="#a1a1aa" thickness="2" mx="7" />
              <View justifyContent="center" alignItems="center">
              <AspectRatio w="35%" ratio={16 / 9}>
                <Image
                source={{ uri: `http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png` }}
                alt="image"
                />
                </AspectRatio>
                <Text color="#fff">Kondisi</Text>
              </View>
            </Flex>
            <Divider mt="2" mb="2" bg="#a1a1aa" thickness="2" />
            <View m="2">
              <Ionicons color="#f97316" name="location"><Text fontSize="xs" color="#fff">{item.description}</Text></Ionicons>
            </View>
          </Box>
        </Box>
      </Stack>
      <Button colorScheme='orange' onPress={() => setShowModal(true)}>Detail</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content style ={styles.modal}>
          <Modal.CloseButton />
          <Modal.Header>Detail Laporan</Modal.Header>
          <Modal.Body>
          <Center >
              <Box alignItems="center" style={styles.boxlokasilain} mt="10">
                  <Box mb= "5" maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" 
                  _dark={{
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
                            latitude: latTemp,
                            longitude: longiTemp,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }}
                          >
                          <Marker 
                            coordinate={{
                              latitude: latTemp,
                              longitude:  longiTemp,
                            }}
                            pinColor="red"
                            >
                            <Callout><Text>{item.weatherDesc}</Text></Callout>
                          </Marker>
                        </MapView>
                      </AspectRatio>
                      <Center bg="#3f3f46" _dark={{
                        bg: "#3f3f46"
                        }} 
                        _text={{
                          color: "warmGray.50",
                          fontWeight: "700",
                          fontSize: "xs"
                        }} position="absolute" bottom="0" px="3" py="1.5">
                        {item.description}
                      </Center>
                    </Box>
                    <Stack p="4" space={3} 
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
                    }}>
                      <View style= {{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                        <Stack space={2}>
                          <Heading size="sm" ml="-1" color="white">
                            {item.coordinate}
                          </Heading>
                          <Text fontSize="xs" _light={{
                            color: "white"
                            }} _dark={{
                              color: "white"
                            }} fontWeight="500" ml="-0.5" mt="-1">
                            {date}
                          </Text>
                        </Stack>
                        <AspectRatio w="30%" ratio={16 / 9}>
                          <Image
                            source={{ uri: `http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png` }}
                            alt="image"
                          />
                        </AspectRatio>
                        <Text style={{fontSize: 17, fontWeight: "bold", color: "white", marginStart: 5}}>{item.temperature}°C</Text>
                      </View>
                      <Divider bg="#a1a1aa" thickness="2" />
                      <Text fontWeight="bold" color="white" marginBottom= "1.5" style= {{textAlign: "center"}}>
                           Kondisi</Text>
                      <View style= {{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                        <View style= {{flexDirection: "row", alignItems: "center"}}>
                          <Entypo name = "direction" color="white"  />
                          <Text fontWeight="400" color="white" style={{marginStart: 5}}>
                            {item.windspeed} m/s WSW
                          </Text>
                        </View>
                        <Entypo name = "air" color="white"> <Text fontWeight="400" style={{marginStart: 5, color :"white"}}>
                          {item.pressure} hPa
                        </Text></Entypo>
                      </View>
                      <View style= {{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                        <Text fontWeight="400" style={{marginStart: 5, color: "white"}}> Status: {item.status}</Text>
                        <MaterialCommunityIcons color="white" name = "air-humidifier"><Text fontWeight="400" style={{marginStart: 10, color :"white"}}>
                            {item.humidity} %</Text> </MaterialCommunityIcons>
                      </View>
                      <Divider bg="#a1a1aa" thickness="2" />
                      <Text fontWeight="bold" color="#1e293b" marginBottom= "1.5" style= {{textAlign: "center", color : "white"}}>
                        {item.description}</Text>
                      <AspectRatio w="100%" >
                          <Image
                            source={{ uri: `${item.photoUrl}` }}
                            alt="image"
                          />
                      </AspectRatio>
                    </Stack>
                  </Box>
              </Box>
              </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  </Box>
  </Center>
  </NativeBaseProvider>
  
  )
}
const styles = StyleSheet.create ({
  boxlokasilain : {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
    marginBottom: 5,
    width : windowWidth * 0.9

  },

  modal : {
    width : windowWidth* 0.9
  }
})