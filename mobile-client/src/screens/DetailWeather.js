import react from 'react'
import { View,TouchableOpacity} from 'react-native'
import { Button} from "native-base";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
import {Entypo,MaterialCommunityIcons,Feather} from 'react-native-vector-icons';

export default function DetailWeather({navigation}) {

  const cuaca = {
    lat: -6.0398,
    lon: 107.2456,
    timezone: "Asia/Jakarta",
    current: {
      dt: 1647478187,
      sunrise: 1647471334,
      sunset: 1647515010,
      temp: 27.14,
      feels_like: 29.65,
      pressure: 1009,
      humidity: 76,
      dew_point: 22.54,
      uvi: 3.1,
      clouds: 100,
      visibility: 10000,
      wind_speed: 2.37,
      wind_deg: 103,
      wind_gust: 3.5,
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "awan mendung",
          icon: "http://openweathermap.org/img/wn/04d@2x.png",
        },
      ],
    },
  };

  const todayDate = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true })

  return (
   
    <NativeBaseProvider >
        <Center flex={1} px="3" style ={{backgroundColor : "#fef3c7"}}>
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
            <Image source={{
            uri: "https://developers.google.com/maps/images/landing/hero_geocoding_api_480.png"
          }} alt="image" />
          </AspectRatio>
          <Center bg="#3f3f46" _dark={{
          bg: "#3f3f46"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
            {cuaca.current.weather[0].description}
          </Center>
        </Box>
        <Stack p="4" space={3} style={{backgroundColor: "#e2e8f0"}}>
          <View style= {{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {cuaca.timezone}
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
                    source={{ uri: cuaca.current.weather[0].icon }}
                    alt="image"
                  />
                </AspectRatio>
          <Text style={{fontSize: 22.5, fontWeight: "bold", color: "#1e293b"}}>{cuaca.current.temp}°C</Text>
          </View>
          <Text fontWeight="bold" color="#1e293b" marginBottom= "1.5" style= {{textAlign: "center"}}>
              Terasa {cuaca.current.feels_like}°C. Kondisi: {cuaca.current.weather[0].description}</Text>
        <View style= {{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
          <View style= {{flexDirection: "row", alignItems: "center"}}>
          <Entypo name = "direction"  />
          <Text fontWeight="400" style={{marginStart: 5}}>
            {cuaca.current.wind_speed} m/s WSW
          </Text>
          </View>
          <Entypo name = "air"> <Text fontWeight="400" style={{marginStart: 5}}>
            {cuaca.current.pressure} hPa
          </Text></Entypo>
        </View>
        <View style= {{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
          <Text fontWeight="400" style={{marginStart: 5}}> Jarak Pandang: {(cuaca.current.visibility)/1000} Km </Text>
          <MaterialCommunityIcons name = "air-humidifier"><Text fontWeight="400" style={{marginStart: 5}}>
              {cuaca.current.humidity} %</Text> </MaterialCommunityIcons>
        </View>
        <TouchableOpacity><Button style={{backgroundColor: "#22d3ee"}} mt="0"
          onPress={() => navigation.navigate('FormCuaca')}
        >Report Cuaca</Button></TouchableOpacity>
        </Stack>
      </Box>
    </Box>;
    <Box alignItems="center" mt="2">
          <Box bg="#e2e8f0" rounded="lg">
            <Stack p="4" space={3}>
              <Button style={{backgroundColor: "#22d3ee"}} w="100%" onPress={() => navigation.navigate('FormCuaca')}>Pengaduan Pengguna</Button>
            </Stack>
          </Box>
        </Box>
      
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