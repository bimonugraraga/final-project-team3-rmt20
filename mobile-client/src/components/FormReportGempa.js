import { View, Text} from 'react-native'
import { Box, Heading, VStack, FormControl, Input,WarningOutlineIcon, Button, Center, NativeBaseProvider, Select, CheckIcon, TextArea, Platform, Image, Form } from "native-base";
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

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
      <Center flex={1} px="3">
        <Center w="100%">
          <Box  safeArea p="2" w="90%" maxW="290" py="8">
            <Heading textAlign="center"  size="lg" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }} fontWeight="semibold">
              Pengaduan
            </Heading>
            <Heading textAlign="center"  mt="1" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }} fontWeight="medium" size="xs">
              silahkan isi pengaduan kamu disini
            </Heading>
            <VStack space={3} mt="5">

            <FormControl w="3/4" maxW="300" isRequired isInvalid>
              <FormControl.Label>Choose service</FormControl.Label>
              <Select minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />
            }} mt="1">
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
                <Select.Item label="Cross Platform Development" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
                <Select.Item label="Backend Development" value="backend" />
              </Select>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Please make a selection!
              </FormControl.ErrorMessage>
            </FormControl>
              
              {/* <FormControl>
                <FormControl.Label>Status</FormControl.Label>
                <Select selectedValue={status} onValueChange={(itemValue, itemIndex) => setStatus(itemValue)} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} >
                </Select>
              </FormControl> */}

              <FormControl>
                <FormControl.Label>Deskripsi</FormControl.Label>
                <TextArea name="description" onChangeText={newText => setDescription(newText)} h={20} placeholder="Deskripsi" />
              </FormControl>

                <Button mt="2" w="50%" colorScheme="indigo" title="Pick an image from camera roll" onPress={pickImage}> Upload Foto</Button>
                  {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} alt="image" />}
                <Button w="50%" title="Pick an" onPress={ilanginFoto}>ilangin foto</Button>

              <Button mt="2" colorScheme="indigo" onPress={submitHandler}>
                Report
              </Button>
            </VStack>
          </Box>
        </Center>
      </Center>
  )
}