import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import DetailGempa from './src/screens/DetailGempa'
import Detailweather from './src/screens/DetailWeather'
import FormGempa from './src/components/FormReportGempa';
import Coba from './src/components/Coba'
import Form from './src/screens/Form';
import { NativeBaseProvider } from "native-base";
import {SSRProvider} from '@react-aria/ssr'

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <SSRProvider>
    <NativeBaseProvider>
    <NavigationContainer>
    <Drawer.Navigator useLegacyImplementation={true} initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Gempa" component={DetailGempa} />
      <Drawer.Screen name="Weather" component={Detailweather} />
      <Drawer.Screen name="FormGempa" component={FormGempa} />
      <Drawer.Screen name="Coba" component={Coba} />
      <Drawer.Screen name="Formbaru" component={Form} />
    </Drawer.Navigator>
  </NavigationContainer>
  </NativeBaseProvider>
  </SSRProvider>
  );
}

