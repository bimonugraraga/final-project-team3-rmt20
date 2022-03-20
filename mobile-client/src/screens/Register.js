import React, { useState } from "react";
import { Box, Heading, VStack, FormControl, HStack, Input, Button, Center, NativeBaseProvider, Text, Link } from "native-base";
import { useMutation, useQuery } from '@apollo/client';
import { USER_REGISTER } from "../../lib/apollo/queries/userQueries";

export default function Register( {navigation}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  let [submitHandler = () => {
  }, {loading, error, data}] = useMutation(USER_REGISTER, {
    variables: {
      email: email,
      password: password
    }
  })
  console.log(loading, error, data, "<-->")
  return (
    <NativeBaseProvider>
    <Center flex={1} px="3">
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading textAlign="center"  size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Daftar
        </Heading>
        <Heading textAlign="center"  mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Daftar Akun
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
            Daftar
          </Button>
            <HStack style={{flexDirection: 'row', alignItems: 'center'}} mt="6" justifyContent="center" >
              <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
                Sudah punya akun?
              </Text>
              <Button
              variant="link"
                onPress={() => navigation.navigate('Masuk')}
              >Masuk</Button>
            </HStack>
        </VStack>
      </Box>
    </Center>
    </Center>
  </NativeBaseProvider>
  )
}