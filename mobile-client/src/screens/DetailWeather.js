import react from 'react'
import { View, Text} from 'react-native'
import { Button} from "native-base";

export default function DetailWeather({navigation}) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Cuaca</Text>
      <Button mt="2"
        onPress={() => navigation.navigate('FormCuaca')}
      >Report Cuaca</Button>
    </View>
  )
}