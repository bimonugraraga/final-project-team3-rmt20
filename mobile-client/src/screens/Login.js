import React, { useState } from 'react'
import { View} from 'react-native'
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { useMutation, useQuery } from '@apollo/client';
import { USER_LOGIN } from '../../lib/apollo/queries/userQueries';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Login({navigation}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  let [submitHandler = () => {
  }, {loading, error, data}] = useMutation(USER_LOGIN, {
    variables: {
      email: email,
      password: password
    }
  })

  console.log(loading, error, data, "<-->")
  if (data) {
    AsyncStorage.setItem('access_token', data.login.access_token)
      .then((resp) => {

        console.log(resp, ">>>>>")
      })

  }

  
  return (

    <NativeBaseProvider>
          <Center flex={1} px="3">
            <Center w="100%">
              <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading textAlign="center" size="lg" fontWeight="600" color="coolGray.800" _dark={{
                  color: "warmGray.50"
                  }}>
                    Masuk
                  </Heading>
                  <Heading textAlign="center" mt="1" _dark={{
                  color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Masuk untuk lanjutkan
                  </Heading>

                  <VStack space={3} mt="5">
                    <FormControl>
                      <FormControl.Label>Email</FormControl.Label>
                      <Input onChangeText={newText => setEmail(newText)} />
                    </FormControl>
                    <FormControl>
                      <FormControl.Label>Password</FormControl.Label>
                      <Input type="password" onChangeText={newText => setPassword(newText)} />
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={submitHandler}>
                      Masuk
                    </Button>
                    <HStack style={{flexDirection: 'row', alignItems: 'center'}} mt="6" justifyContent="center">
                      <Text fontSize="sm" color="coolGray.600" _dark={{
                      color: "warmGray.200"
                    }}>
                        Belum punya akun?
                      </Text>
                      <Button
                        variant="link"
                        onPress={() => navigation.navigate('Daftar')}
                      >Daftar</Button>
                    </HStack>
                  </VStack>
                </Box>
              </Center>
            </Center>
      </NativeBaseProvider>
  );
  //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //     <Text>Login</Text>
  //   </View>
  // )
}