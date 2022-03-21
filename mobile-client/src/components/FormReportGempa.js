import { View, Text, LogBox} from 'react-native'
import { Box, Modal, Divider, Icon, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Select, CheckIcon, TextArea, Platform, Image, Form } from "native-base";
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from "@expo/vector-icons"
import { useMutation } from '@apollo/client';
import * as Location from 'expo-location';
import { USER_REPORT_GEMPA } from '../../lib/apollo/queries/eqQuery';

export default function FormGempa({route, navigation}) {

  const { item } = route.params
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
      setLocation(location);

    })();
  }, []);

  let coor
  if(location) {
    coor = `${location.coords.latitude},${location.coords.longitude} `
  }
  const ilanginFoto = (e) => {
    e.preventDefault()
    setShowModal(false)
    setImage(null)
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setShowModal(true)
    }
  };

  let [submitHandler = () => {
  }, {loading, error, data}] = useMutation(USER_REPORT_GEMPA, {
    variables: {
      data : { 
        status : status, 
        description: description , 
        photoUrl: image , 
        coordinate : coor, 
        date : item.date, 
        hour : item.hour, 
        dateTime : item.dateTime, 
        coordinates : item.coordinates, 
        magnitude : item.magnitude, 
        depth : item.depth, 
        area : item.area, 
        dirasakan : item.dirasakan, 
        potensi : item.potensi, 
        shakeMap: item.shakeMap, 
        access_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhYWFAYWFhLmNvbSIsImlhdCI6MTY0Nzc3MjI4Nn0.-xa0hWjHWmuHsil0fsEIVKQSxhrNhlVdjvr2BjlRzcA"
      }
    }
  })
  
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Center w="100%">
          <Box borderWidth={2} rounded="lg" safeArea p="2" w="90%" maxW="290" py="8">
            <Heading textAlign="center"  size="lg" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }} fontWeight="semibold">
              Pengaduan Gempa
            </Heading>
            <Heading textAlign="center"  mt="1" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }} fontWeight="medium" size="xs">
              silahkan isi pengaduan kamu disini
            </Heading>
            <VStack space={3} mt="5">
            <Divider bg="#a1a1aa" thickness="1" />

              <FormControl>
                <FormControl.Label>Status</FormControl.Label>
                <Select borderWidth={1} borderColor="black" bg="#f8fafc" selectedValue={status} onValueChange={(itemValue, itemIndex) => setStatus(itemValue)} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} >
                <Select.Item label="Aman" value="safe" />
                <Select.Item label="Bahaya" value="danger" />
                </Select>
              </FormControl>

              <FormControl>
                <FormControl.Label>Deskripsi</FormControl.Label>
                <TextArea borderWidth={1} borderColor="black" bg="#f8fafc" name="Deskripsi" onChangeText={newText => setDescription(newText)} h={20} placeholder="Deskripsi" />
              </FormControl>

              <View justifyContent="center" alignItems="center">
                <Button  leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />}   mt="2" w="50%" colorScheme="indigo" title="Pick an image from camera roll" onPress={pickImage}> Upload Foto</Button>
                {
                  image ?
                  <View>
                    <Text>Gambar Terpilih</Text>
                  </View>
                  :
                  null
                }
              </View>

              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                  <Modal.Header alignItems="center">Pilih gambar</Modal.Header>
                  <Modal.Body>
                  {image && <Image source={{ uri: image }} style={{ width: 300, height: 200 }} alt="image" />}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button variant="ghost" colorScheme="blueGray" onPress={ilanginFoto}>
                        Cancel
                      </Button>
                      <Button onPress={() => {
                      setShowModal(false);
                    }}>
                        Save
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>

              <Button mt="2" colorScheme="orange" onPress={submitHandler}>
                Report
              </Button>
            </VStack>
          </Box>
        </Center>
      </Center>
      </NativeBaseProvider>
  )
}

LogBox.ignoreLogs(['NativeBase:']);