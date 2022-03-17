import react from 'react'
import { View, Text, Button} from 'react-native'

export default function Home({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Login')}
        title="Go to login"
      />
    </View>
  )
}