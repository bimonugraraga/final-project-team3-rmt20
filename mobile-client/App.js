import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeBaseProvider } from "native-base";
import { SSRProvider } from '@react-aria/ssr'
import Home from './src/screens/Home';
import LoginRouter from './src/navigation/LoginRouter';
import GempaRouter from './src/navigation/EarthquakeRouter';
import CuacaRouter from './src/navigation/WeatherRouter';
import CobaMap from './src/screens/CobaMap';

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <SSRProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Drawer.Navigator useLegacyImplementation={true} initialRouteName="Home"
          screenOptions={{
            headerTitleAlign: 'center',
          }}
          >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Map" component={CobaMap} />
            <Drawer.Screen name="LoginRouter" options={{title: 'Masuk'}}  component={LoginRouter} />
            <Drawer.Screen name="GempaRouter" options={{title: 'Gempa'}} component={GempaRouter}/>
            <Drawer.Screen name="CuacaRouter" options={{title: 'Cuaca'}}  component={CuacaRouter}/>
          </Drawer.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SSRProvider>
  );
}

