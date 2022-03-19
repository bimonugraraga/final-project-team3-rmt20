import { View, Text} from 'react-native'
import { Box, Icon, Heading, VStack, FormControl, Input,WarningOutlineIcon, Button, Center, NativeBaseProvider, Select, CheckIcon, TextArea, Platform, Image, Form } from "native-base";
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from "@expo/vector-icons"

export default function FormGempa() {

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  const ilanginFoto = (e) => {
    e.preventDefault()
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
    }
  };

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('coba ditekan nih ya');
    console.log(description);
    console.log(status);
    console.log(image);
  }
  
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

              <FormControl>
                <FormControl.Label>Status</FormControl.Label>
                <Select borderWidth={1} borderColor="black" bg="#f8fafc" selectedValue={status} onValueChange={(itemValue, itemIndex) => setStatus(itemValue)} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} >
                <Select.Item label="Aman" value="aman" />
                <Select.Item label="Bahaya" value="bahaya" />
                </Select>
              </FormControl>

              <FormControl>
                <FormControl.Label>Deskripsi</FormControl.Label>
                <TextArea borderWidth={1} borderColor="black" bg="#f8fafc" name="description" onChangeText={newText => setDescription(newText)} h={20} placeholder="Deskripsi" />
              </FormControl>

              <View justifyContent="center" alignItems="center">
                <Button  leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />}   mt="2" w="50%" colorScheme="indigo" title="Pick an image from camera roll" onPress={pickImage}> Upload Foto</Button>
                  {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} alt="image" />}

                {
                  image?
                  <Button mt="2" w="50%" title="Pick an" onPress={ilanginFoto}>ilangin foto</Button>
                  :
                  <Text></Text>
                }

              </View>

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