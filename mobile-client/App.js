import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import DetailGempa from './src/screens/DetailGempa'
import Detailweather from './src/screens/DetailWeather'
import WeatherForm from './src/components/WeatherForm';
import ImagePickerExample from "./src/components/ImagePickerExample"

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Drawer.Navigator useLegacyImplementation={true} initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Gempa" component={DetailGempa} />
      <Drawer.Screen name="Weather" component={Detailweather} />
      <Drawer.Screen name = "WeatherForm" component={WeatherForm}/>
      <Drawer.Screen name = "ImagePickerExample" component={ImagePickerExample}/>
    </Drawer.Navigator>
  </NavigationContainer>
  );
}

