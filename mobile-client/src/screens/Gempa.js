import React from 'react'
import { View, ScrollView, FlatList, LogBox} from 'react-native'
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Divider, Flex, Spinner} from "native-base";
import { useEffect, useState } from 'react';
import {Feather, Ionicons} from 'react-native-vector-icons';
import { formatDistance, subHours } from 'date-fns'
import CardGempa from '../components/CardGempa';
import MapView, {Callout, Geojson, Marker }  from 'react-native-maps';
import { useQuery } from '@apollo/client';
import { GET_GEMPA, GET_ALL_GEMPA } from '../../lib/apollo/queries/eqQuery';
import { MaterialIcons } from 'react-native-vector-icons';

const LinearGradient = require("expo-linear-gradient").LinearGradient;

const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

export default function Gempa({navigation}) {

  const { loading, error, data } = useQuery(GET_GEMPA)
  
  let ltd
  let lng
  if(data) {
    const a =  data.getRecentEarthquake.coordinates
    const b = a.split(',')
    ltd = Number(b[0])
    lng = Number(b[1])
  }
  const { loading : loading2, error: error2, data: data2 } = useQuery(GET_ALL_GEMPA)

  const [date, setDate] = useState('')
  useEffect(() => {
    if (data) {
      const time = formatDistance(subHours(new Date(data.getRecentEarthquake.dateTime), 3), new Date(), { addSuffix: true })
      setDate(time)
    }
  }, [])

  const renderItem = ({ item }) => (
    <CardGempa item={item}  navigation={navigation}/>
  )

  if (error) {
    return (
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <MaterialIcons name="error" size={30} />
          <Text>Something Went Wrong</Text>
        </Center>
      </NativeBaseProvider>
    )
  }

  return (
    <NativeBaseProvider  config={config}>

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
        
    
      <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
      <Center flex={1} px="3" bg="#e4e4e7">

        <Box mb="2" mt="2" width="100%" rounded="lg" bg="#191645" alignItems="center" p="2" shadow={2}>
          <Heading size="md" color="#fff">Gempa Terkini</Heading>
        </Box>

        <Box alignItems="center">
          <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" 
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
            <Box borderWidth={2} borderColor="red.400">
            <AspectRatio w="100%" ratio={16/9}>
              <MapView
                initialRegion={{
                  latitude: ltd,
                  longitude: lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                >
                <Marker 
                coordinate={{
                  latitude: ltd,
                  longitude: lng,
                }}
                pinColor="red"
                >
                  <Callout><Text>Pusat Gempa</Text></Callout>
                </Marker>
              </MapView>
              </AspectRatio>
            </Box>
            <Stack p="4" space={3}>
              <Box alignItems="center">
                <Box w="100%">
                  <Flex mx="1" direction="row" justify="space-evenly" h="50">
                    <View justifyContent="center" alignItems="center">
                      <Text fontSize="xs" color="#fff">{data.getRecentEarthquake.hour}</Text>
                      <Heading size="md" color="#fff">{data.getRecentEarthquake.date}</Heading>
                      <Text fontSize="xs" color="#fff">{date ? date: null}</Text>
                    </View >
                    <Divider orientation="vertical" bg="#a1a1aa" thickness="2" mx="7" />
                    <View justifyContent="center" alignItems="center">
                      <Feather color="#dc2626" name="activity" />
                      <Heading size="md" color="#fff">{data.getRecentEarthquake.magnitude}</Heading>
                      <Text color="#fff">Magnitude</Text>
                    </View>
                    <Divider orientation="vertical" bg="#a1a1aa" thickness="2" mx="7" />
                    <View justifyContent="center" alignItems="center">
                      <Feather color="#fbbf24" name="radio" />
                      <Heading size="sm" color="#fff">{data.getRecentEarthquake.depth}</Heading>
                      <Text color="#fff">Kedalaman</Text>
                    </View>
                  </Flex>
                  <Divider mt="4" mb="2" bg="#a1a1aa" thickness="2" />
                  <View m="2">
                    <Ionicons color="#f97316" name="location"><Text fontSize="xs" color="#fff"> {data.getRecentEarthquake.area}</Text></Ionicons>
                  </View>
                  <Button colorScheme='orange' mt="2" onPress={() => navigation.navigate('DetailGempa')}>Detail Gempa</Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>


        <Box mt="5" mb="2" width="100%" rounded="lg" bg="#191645" alignItems="center" p="2" shadow={2}>
          <Heading size="md" color="#fff">Gempa Terakhir</Heading>
        </Box>
        
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
          <ScrollView horizontal={true}>
            <Center flex={1} px="2.5" bg="#e4e4e7">
              <FlatList
                data={data2.getEarthQuakes}
                renderItem={renderItem}
                keyExtractor={(item) => item.dateTime}
                />
              </Center>
          </ScrollView>

        }

      </Center>
      </ScrollView>

      }
    </NativeBaseProvider>
  )
}

// LogBox.ignoreLogs(["VirtualizedLists should never be nested"])