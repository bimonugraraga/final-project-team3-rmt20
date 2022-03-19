import React from 'react'
import { View, ScrollView, FlatList} from 'react-native'
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Divider, Flex} from "native-base";
import { useEffect, useState } from 'react';
import {Feather, Ionicons} from 'react-native-vector-icons';
import CardGempa from '../components/CardGempa';
import MapView, {Callout, Geojson, Marker }  from 'react-native-maps';

export default function Gempa({navigation}) {

  const [gempa, setGempa] = useState({})
  useEffect(() => {
    fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        } else {
          return response.json()
        }
      })
      .then(data => setGempa(data.Infogempa.gempa))
      .catch(err => console.log(err))
  }, [])

  const [gempas, setGempas] = useState([])
  useEffect(() => {
    fetch('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        } else {
          return response.json()
        }
      })
      .then(data => setGempas(data.Infogempa.gempa))
      .catch(err => console.log(err))
  }, [])

  const renderItem = ({ item }) => (
    <CardGempa item={item}/>
  )

  return (
    <NativeBaseProvider>
      <ScrollView>
      <Center flex={1} px="3" bg="#ffedd5">

        <Box mb="2" mt="2" width="100%" rounded="lg" bg="primary.500" alignItems="center" p="2" shadow={2}>
          <Heading size="md" color="#fff">Gempa Terkini</Heading>
        </Box>

        <Box alignItems="center">
          <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700"
        }} _web={{
          shadow: 2,
          borderWidth: 0
        }} _light={{
          backgroundColor: "#14b8a6"
        }}>

            <Box borderWidth={2} borderColor="red.400">
            <AspectRatio w="100%" ratio={16/9}>
              <MapView
                initialRegion={{
                  latitude: -1.93,
                  longitude: 133.32,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                >
                <Marker 
                coordinate={{
                  latitude: -1.93,
                  longitude: 133.32,
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
                      <Text fontSize="xs" color="#fff">{gempa.Jam}</Text>
                      <Heading size="md" color="#fff">{gempa.Tanggal}</Heading>
                      <Text fontSize="xs" color="#fff">{gempa.DateTime}</Text>
                    </View >
                    <Divider orientation="vertical" bg="#a1a1aa" thickness="2" mx="7" />
                    <View justifyContent="center" alignItems="center">
                      <Feather color="#dc2626" name="activity" />
                      <Heading size="md" color="#fff">{gempa.Magnitude}</Heading>
                      <Text color="#fff">Magnitude</Text>
                    </View>
                    <Divider orientation="vertical" bg="#a1a1aa" thickness="2" mx="7" />
                    <View justifyContent="center" alignItems="center">
                      <Feather color="#fbbf24" name="radio" />
                      <Heading size="sm" color="#fff">{gempa.Kedalaman}</Heading>
                      <Text color="#fff">Kedalaman</Text>
                    </View>
                  </Flex>

                  <Divider mt="4" mb="2" bg="#a1a1aa" thickness="2" />
                  <View m="2">
                    <Ionicons color="#f97316" name="location"><Text fontSize="xs" color="#fff"> {gempa.Wilayah}</Text></Ionicons>
                  </View>
                  <Button colorScheme='orange' mt="2" onPress={() => navigation.navigate('DetailGempa')}>Detail Gempa</Button>
                </Box>
              </Box>
            </Stack>

          </Box>
        </Box>

        <Box mt="5" mb="2" width="100%" rounded="lg" bg="primary.500" alignItems="center" p="2" shadow={2}>
          <Heading size="md" color="#fff">Gempa Terakhir</Heading>
        </Box>


        <FlatList
          data={gempas}
          renderItem={renderItem}
          keyExtractor={(item) => item.DateTime}
        />
      </Center>
      </ScrollView>
    </NativeBaseProvider>
  )
}