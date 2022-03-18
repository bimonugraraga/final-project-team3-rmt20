import react from 'react'
import { View, Text} from 'react-native'
import { Button} from "native-base";

export default function Weather({navigation}) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> List Cuaca</Text>
      <Button mt="2"
        onPress={() => navigation.navigate('DetailCuaca')}
      >Detail Cuaca</Button>
    </View>
  )
}