import react from 'react'
import { View, Text} from 'react-native'
import { Button} from "native-base";

export default function Gempa({navigation}) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>List Gempa</Text>
      <Button mt="2"
        onPress={() => navigation.navigate('DetailGempa')}
      >Detail Gempa</Button>
    </View>
  )
}