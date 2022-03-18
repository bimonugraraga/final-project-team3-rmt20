import react from 'react'
import { View} from 'react-native'
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";

export default function Login({navigation}) {

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
                      <Input />
                    </FormControl>
                    <FormControl>
                      <FormControl.Label>Password</FormControl.Label>
                      <Input type="password" />
                    </FormControl>
                    <Button mt="2" colorScheme="indigo">
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