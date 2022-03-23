import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, FormControl, Input, Center, NativeBaseProvider, Checkbox, Text, Container, WarningOutlineIcon, Box  } from "native-base";
import { useMutation } from '@apollo/client';
import { SAVE_USER_DATA } from '../../lib/apollo/queries/userQueries';


export default function ModalForm(props) {
  // console.log(props.expoPushToken, props.coor, "<<<<<")
  const [showModal, setShowModal] = useState(true);
  const [groupValue, setGroupValue] = React.useState([""]);
  // console.log(groupValue);
  
  // const submitHandler = () => {
  //   if(groupValue.length < 4) {
  //     setShowModal(true)
  //   }
  // }

  let [submitHandler, {loading, error, data}] = useMutation(
    SAVE_USER_DATA,
    {
      variables: {
        expoToken: "ExponentPushToken[pDcgbXA0Ii0YA__0TDxF3e]",
        recentCoordinates: "-6.2412236,106.9235361"
      }
    }
  )
  console.log(loading,error, data, "<O>")
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Center>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header alignItems="center" >Form Persetujuan</Modal.Header>
              <Modal.Body>
                <Container>
                  <FormControl isInvalid>
                    <FormControl.Label _text={{
                    fontSize: "lg",
                    bold: true
                  }}>
                      Syarat dan ketentuan :
                    </FormControl.Label>
                    <Checkbox.Group mt="2" colorScheme="green" defaultValue={groupValue} accessibilityLabel="choose multiple items" onChange={values => {
                    setGroupValue(values || []);
                  }} alignItems="flex-start">
                      <Checkbox value="Notifikasi" my="1">
                        Akses Notifikasi
                      </Checkbox>
                      <Checkbox value="Lokasi" my="1">
                        Akses Lokasi 
                      </Checkbox>
                      <Checkbox value="Galeri" my="1">
                        Akses galeri 
                      </Checkbox>
                    </Checkbox.Group>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      Harus diisi jika ingin lanjut
                    </FormControl.ErrorMessage>
                  </FormControl>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button onPress={() => {setShowModal(false); submitHandler()}}>
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>
      </Center>
    </NativeBaseProvider>
  );
};
    

