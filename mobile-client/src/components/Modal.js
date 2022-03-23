import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, FormControl, Input, Center, NativeBaseProvider, Checkbox, Text, Container, WarningOutlineIcon, Box, Heading  } from "native-base";
import { useMutation } from '@apollo/client';
import { SAVE_USER_DATA } from '../../lib/apollo/queries/userQueries';


export default function ModalForm(props) {

  const [showModal, setShowModal] = useState(true);

  let [submitHandler, {loading, error, data}] = useMutation(
    SAVE_USER_DATA,
    {
      variables: {
        expoToken: "ExponentPushToken[pDcgbXA0Ii0YA__0TDxF3e]",
        recentCoordinates: "-6.2412236,106.9235361"
      }
    }
  )
  
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Center>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.Header alignItems="center" ><Heading size="md">Syarat & Ketentuan</Heading></Modal.Header>
              <Modal.Body>
                <Container>
                  <FormControl isInvalid>
                    <Heading mt="2" size="md">Izinkan Aplikasi Untuk :</Heading>
                    <Heading mt="2" size="xs">1. {" "}Akses Notifikasi</Heading>
                    <Heading my="2" size="xs">2. {" "}Akses Lokasi</Heading>
                    <Heading mb="2" size="xs">3. {" "}Akses Galeri</Heading>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Menekan tombol simpan berarti anda telah setuju
                    </FormControl.ErrorMessage>
                  </FormControl>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button onPress={() => {setShowModal(false); submitHandler()}}>
                    Simpan
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
    

