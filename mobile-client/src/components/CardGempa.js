import react from 'react'
import { View } from 'react-native'
import { Box, Heading, Text, Stack, Divider, Flex} from "native-base";
import { useEffect, useState } from 'react';
import { formatDistance, subHours } from 'date-fns'
import {Feather, Ionicons} from 'react-native-vector-icons';

export default function CardGempa({item}) {

  const [date, setDate] = useState('')
  useEffect(() => {
    const time = formatDistance(subHours(new Date(item.DateTime), 3), new Date(), { addSuffix: true })
    setDate(time)
  }, [])


  return (
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
        <Stack p="4" space={3}>
          <Box alignItems="center">
            <Box w="100%">
              <Flex mx="1" direction="row" justify="space-evenly" h="50">
                <View justifyContent="center" alignItems="center">
                  <Text fontSize="xs" color="#fff">{item.Jam}</Text>
                  <Heading size="md" color="#fff">{item.Tanggal}</Heading>
                  <Text fontSize="xs" color="#fff">{date? date : null}</Text>
                </View >
                <Divider orientation="vertical" bg="#a1a1aa" thickness="2" mx="7" />
                <View justifyContent="center" alignItems="center">
                  <Feather color="#dc2626" name="activity" />
                  <Heading size="md" color="#fff">{item.Magnitude}</Heading>
                  <Text color="#fff">Magnitude</Text>
                </View>
                <Divider orientation="vertical" bg="#a1a1aa" thickness="2" mx="7" />
                <View justifyContent="center" alignItems="center">
                  <Feather color="#fbbf24" name="radio" />
                  <Heading size="sm" color="#fff">{item.Kedalaman}</Heading>
                  <Text color="#fff">Kedalaman</Text>
                </View>
              </Flex>
              <Divider mt="2" mb="2" bg="#a1a1aa" thickness="2" />
              <View m="2">
                <Ionicons color="#f97316" name="location"><Text fontSize="xs" color="#fff"> {item.Wilayah}</Text></Ionicons>
              </View>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}