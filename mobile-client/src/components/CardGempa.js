import React from 'react'
import { View } from 'react-native'
import { Box, Heading, Text, Stack, Divider, Flex, NativeBaseProvider, Center, Button, Pressable} from "native-base";
import { useEffect, useState } from 'react';
import { formatDistance, subHours } from 'date-fns'
import {Feather, Ionicons} from 'react-native-vector-icons';

const LinearGradient = require("expo-linear-gradient").LinearGradient;

const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};
export default function CardGempa(props) {

  const navigation = props.navigation
  const item = props.item
  const [date, setDate] = useState('')
  useEffect(() => {
    const time = formatDistance(subHours(new Date(item.dateTime), 3), new Date(), { addSuffix: true })
    setDate(time)
  }, [])

  return (
    <NativeBaseProvider config={config}>
      <Center>
        <Box alignItems="center">
          <Pressable onPress={() => navigation.navigate('DetailGempaTerakhir', {item: item})}>
              {({
              isPressed
            }) => {
              
              return <Box mb="2" maxW="80" rounded="lg" overflow="hidden" 
                      style={{
                        transform: [{
                          scale: isPressed ? 0.99 : 1
                        }]
                      }} 
                      borderColor="coolGray.200" borderWidth="1"
                      bg={{
                        linearGradient: {
                          colors: ["#191645", "#43C6AC"],
                          start: [0, 0],
                          end: [0, 1]
                        }
                      }}   
                      _text={{
                        fontSize: "md",
                        fontWeight: "bold",
                        color: "white"
                      }}>
                      <Stack p="4" space={3}>
                        <Box alignItems="center">
                          <Box w="100%">
                            <Flex mx="1" direction="row" justify="space-evenly" h="50">
                              <View justifyContent="center" alignItems="center">
                                <Text fontSize="xs" color="#fff">{item.hour}</Text>
                                <Heading size="md" color="#fff">{item.date}</Heading>
                                <Text fontSize="xs" color="#fff">{date? date : null}</Text>
                              </View >
                              <Divider orientation="vertical" bg="#a1a1aa" thickness="2" mx="7" />
                              <View justifyContent="center" alignItems="center">
                                <Feather color="#dc2626" name="activity" />
                                <Heading size="md" color="#fff">{item.magnitude}</Heading>
                                <Text color="#fff">Magnitude</Text>
                              </View>
                              <Divider orientation="vertical" bg="#a1a1aa" thickness="2" mx="7" />
                              <View justifyContent="center" alignItems="center">
                                <Feather color="#fbbf24" name="radio" />
                                <Heading size="sm" color="#fff">{item.depth}</Heading>
                                <Text color="#fff">Kedalaman</Text>
                              </View>
                            </Flex>
                            <Divider mt="2" mb="2" bg="#a1a1aa" thickness="2" />
                            <View m="2">
                              <Ionicons color="#f97316" name="location"><Text fontSize="xs" color="#fff"> {item.area}</Text></Ionicons>
                            </View>
                          </Box>
                        </Box>
                      </Stack>
                    </Box>
            }}
          </Pressable>
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}