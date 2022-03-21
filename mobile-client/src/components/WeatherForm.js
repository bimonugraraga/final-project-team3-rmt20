import { View, Text } from "react-native";
import { Box, Divider, Modal, Icon, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Select, CheckIcon, TextArea, Platform, Image } from "native-base";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_WEATHERS_REPORT, GET_CURRENT_WEATHER, POST_WEATHER_REPORT } from "../../lib/apollo/queries/weatherQueries";
// import { cloudinary } from "../../config/connectCloudinary";
const mime = require("mime");

export default function WeatherForm({ route, navigation }) {
  const { item } = route.params;
  // console.log(item)
  // console.log(item.current.temp)

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  // console.log(status, description)

  const ilanginFoto = (e) => {
    e.preventDefault();
    setShowModal(false);
    setImage(null);
  };

  const cloudinaryUpload = (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "jwudmtq3");
    data.append("cloud_name", "ridhasidi");
    console.log(data, "data<<<<<");
    fetch(`https://api.cloudinary.com/v1_1/ridhasidi/image/upload`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data, "<<<<<<<<<");
        setPhotoUrl(data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // console.log(result);
      const uri = result.uri;
      const arr = result.uri.split("/");
      const type = mime.getType(arr[arr.length - 1]);
      const newName = new Date().toISOString().split("T")[0] + "_" + arr[arr.length - 1];
      const source = {
        uri,
        type,
        name: newName,
      };
      console.log("Image ", source);
      setImage(result.uri);
      setShowModal(true);
      cloudinaryUpload(source);
    }
  };

  let [submitHandler = () => {}, { loading, error, data }] = useMutation(POST_WEATHER_REPORT, {
    variables: {
      data: {
        status: status,
        description: description,
        photoUrl: photoUrl,
        coordinate: `${item.lat},${item.lon}`,
        temperature: item.current.temp,
        uvi: item.current.uvi,
        pressure: item.current.pressure,
        humidity: item.current.humidity,
        windspeed: item.current.wind_speed,
        weatherMain: item.current.weather[0].main,
        weatherDesc: item.current.weather[0].description,
        weatherIcon: item.current.weather[0].icon,
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoiYUBhLmNvbSIsImlhdCI6MTY0Nzc4NDg3MH0.w-4vbxAgq2acPj-bjXI7ilhdW7BSPldBVUtoSdmABP0",
      },
    },
  });

  // if (data){
  //   if (data.createWeatherReport.message === "Laporan telah berhasil dibuat") {
  //     navigation.navigate('DetailCuaca')
  //   }
  // }
  // "message": "Laporan telah berhasil dibuat"
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Center w="100%">
          <Box borderWidth={2} rounded="lg" safeArea p="2" w="90%" maxW="290" py="8">
            <Heading
              textAlign="center"
              size="lg"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
            >
              Pengaduan Cuaca
            </Heading>
            <Heading
              textAlign="center"
              mt="1"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="medium"
              size="xs"
            >
              silahkan isi pengaduan kamu disini
            </Heading>
            <VStack space={3} mt="5">
              <Divider bg="#a1a1aa" thickness="1" />

              <FormControl>
                <FormControl.Label>Status</FormControl.Label>
                <Select
                  borderWidth={1}
                  borderColor="black"
                  bg="#f8fafc"
                  selectedValue={status}
                  onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Choose Service"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                >
                  <Select.Item label="Aman" value="aman" />
                  <Select.Item label="Tidak aman" value="bahaya" />
                </Select>
              </FormControl>

              <FormControl>
                <FormControl.Label placeholder="Deskripsi">Deskripsi</FormControl.Label>
                <TextArea borderWidth={1} borderColor="black" bg="#f8fafc" h={20} placeholder="Deskripsi" name="description" onChangeText={(newText) => setDescription(newText)} />
              </FormControl>

              <View justifyContent="center" alignItems="center">
                <Button leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />} mt="2" w="50%" colorScheme="indigo" title="Pick an image from camera roll" onPress={pickImage}>
                  {" "}
                  Upload Foto
                </Button>
                {image ? (
                  <View>
                    <Text>Gambar Terpilih</Text>
                  </View>
                ) : null}
              </View>

              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                  <Modal.Header alignItems="center">Pilih gambar</Modal.Header>
                  <Modal.Body>{image && <Image source={{ uri: image }} style={{ width: 300, height: 200 }} alt="image" />}</Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button variant="ghost" colorScheme="blueGray" onPress={ilanginFoto}>
                        Cancel
                      </Button>
                      <Button
                        onPress={() => {
                          setShowModal(false);
                        }}
                      >
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
  );
}
