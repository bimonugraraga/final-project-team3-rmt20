import react from 'react'
import { View } from 'react-native'
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Divider, Flex} from "native-base";
import { useEffect, useState } from 'react';
import { formatDistance, subHours } from 'date-fns'
import {Feather, Ionicons, FontAwesome5} from 'react-native-vector-icons';

export default function DetailGempa({navigation}) {

  const [date, setDate] = useState('')
  useEffect(() => {
    const time = formatDistance(subHours(new Date(gempa.DateTime), 3), new Date(), { addSuffix: true })
    setDate(time)
  }, [])

  const gempa = {
    Tanggal: "18 Mar 2022",
    Jam: "11:33:01 WIB",
    DateTime: "2022-03-18T04:33:01+00:00",
    Coordinates: "-9.91,120.56",
    Lintang: "9.91 LS",
    Bujur:" 120.56 BT",
    Magnitude: "4.0",
    Kedalaman: "18 km",
    Wilayah: "Pusat gempa berada di darat 35 km Timurlaut Wula-Waijelu",
    Potensi: "Gempa ini dirasakan untuk diteruskan pada masyarakat",
    Dirasakan:" II-III Waingapu",
    Shakemap: "20220318113301.mmi.jpg"
  }
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3" bg="#ffedd5">

        <Box borderWidth={2} rounded="md" borderColor="#f97316">
          <AspectRatio w="100%" ratio={4/4}>
            <Image source={{
            uri: "https://developers.google.com/maps/images/landing/hero_geocoding_api_480.png"
          }} alt="image" />
          </AspectRatio>
        </Box>

        <Box alignItems="center" mt="-4">
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
                      <Text fontSize="xs" color="#fff">{gempa.Jam}</Text>
                      <Heading size="md" color="#fff">{gempa.Tanggal}</Heading>
                      <Text fontSize="xs" color="#fff">{date}</Text>
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
                    <Ionicons  color="#fde047" name="map"><Text fontSize="xs" color="#fff"> (skala MMI) dirasakan pada Wilayah : {gempa.Dirasakan}</Text></Ionicons>
                    <FontAwesome5  color="#fde047" name="podcast"><Text fontSize="xs" color="#fff"> {gempa.Potensi}</Text></FontAwesome5>
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
    </NativeBaseProvider>
  )
}