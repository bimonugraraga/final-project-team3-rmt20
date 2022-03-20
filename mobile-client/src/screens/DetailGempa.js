import React from 'react'
import { View } from 'react-native'
import { Box, Spinner, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Divider, Flex} from "native-base";
import { useEffect, useState } from 'react';
import { formatDistance, subHours} from 'date-fns'
import {Feather, Ionicons, FontAwesome5} from 'react-native-vector-icons';
import MapView, {Callout, Marker }  from 'react-native-maps';
import { useQuery } from '@apollo/client';
import { GET_GEMPA } from '../../lib/apollo/queries/eqQuery';
import { MaterialIcons } from 'react-native-vector-icons';

export default function DetailGempa({navigation}) {

  const { loading, error, data } = useQuery(GET_GEMPA)
  let ltd
  let lng
  if(data.getRecentEarthquake) {
    const a =  data.getRecentEarthquake?.coordinates
    const b = a.split(',')
    ltd = Number(b[0])
    lng = Number(b[1])
  }

  const [date, setDate] = useState('')
  useEffect(() => {
    const time = formatDistance(subHours(new Date(data.getRecentEarthquake.dateTime), 3), new Date(), { addSuffix: true })
    setDate(time)
  }, [])

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

      <Center flex={1} px="3" bg="#ffedd5">
        <Box borderWidth={2} rounded="md" borderColor="#f97316">
          <AspectRatio w="100%" ratio={4/4}>
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

        <Box alignItems="center" mt="2">
          <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700"
        }} _web={{
          shadow: 2,
          borderWidth: 0
        }} _light={{
          backgroundColor: "#14b8a6"
        }}>
            <Stack p="4" space={3}>
              <Box alignItems="center">
                <Box w="100%">

                  <Flex mx="1" direction="row" justify="space-evenly" h="50">
                    <View justifyContent="center" alignItems="center">
                      <Text fontSize="xs" color="#fff">{data.getRecentEarthquake.hour}</Text>
                      <Heading size="md" color="#fff">{data.getRecentEarthquake.date}</Heading>
                      <Text fontSize="xs" color="#fff">{date}</Text>
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
                    <Ionicons  color="#fde047" name="map"><Text fontSize="xs" color="#fff"> (skala MMI) dirasakan pada Wilayah : {data.getRecentEarthquake.dirasakan}</Text></Ionicons>
                    <FontAwesome5  color="#fde047" name="podcast"><Text fontSize="xs" color="#fff"> {data.getRecentEarthquake.potensi}</Text></FontAwesome5>
                  </View>
                </Box>
              </Box>
              <Button colorScheme='orange' mt="2" onPress={() => navigation.navigate('FormGempa')}>Form Pengaduan Gempa</Button>
            </Stack>
          </Box>
        </Box>

        <Box alignItems="center" mt="2">
          <Box bg="#14b8a6" rounded="lg">
            <Stack p="4" space={3}>
              <Button colorScheme='orange' w="100%" onPress={() => navigation.navigate('FormGempa')}>Pengaduan Pengguna</Button>
            </Stack>
          </Box>
        </Box>
      </Center>

      }
    </NativeBaseProvider>
  )
}