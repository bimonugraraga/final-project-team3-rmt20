import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from 'native-base';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

export default function LoginRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Masuk" options={{headerShown: false}}  component={Login} />
      <Stack.Screen name="Daftar" options={{headerShown: false}} component={Register} />
    </Stack.Navigator>
  );
}
