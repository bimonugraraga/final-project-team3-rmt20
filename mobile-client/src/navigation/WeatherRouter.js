import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Weather from '../screens/Weather';
import DetailWeather from '../screens/DetailWeather';
import WeatherForm from '../components/WeatherForm';

const Stack = createNativeStackNavigator();

export default function CuacaRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cuaca" options={{headerShown: false}}  component={Weather} />
      <Stack.Screen name="DetailCuaca" options={{headerShown: false}} component={DetailWeather} />
      <Stack.Screen name="FormCuaca" options={{headerShown: false}} component={WeatherForm} />
    </Stack.Navigator>
  );
}
