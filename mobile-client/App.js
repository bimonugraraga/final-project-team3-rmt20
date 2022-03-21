import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeBaseProvider } from "native-base";
import { SSRProvider } from '@react-aria/ssr'
import { ApolloProvider } from '@apollo/client';
import client from './lib/apollo/connection'
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import CustomDrawer from './src/components/CustomDrawer';
import Home from './src/screens/Home';
import LoginRouter from './src/navigation/LoginRouter';
import GempaRouter from './src/navigation/EarthquakeRouter';
import CuacaRouter from './src/navigation/WeatherRouter';
import registerNNPushToken from "native-notify";
import { getPushDataObject } from "native-notify";
import { registerIndieID } from "native-notify";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const Drawer = createDrawerNavigator();
export default function App() {
  let [access_token, setAT] = useState(null);
  registerNNPushToken(2333, "EeTai2ZsptKSZ6lG7Ejmqj");
  let pushDataObject = getPushDataObject();

  console.log(
    "🚀 ~ file: App.js ~ line 25 ~ App ~ pushDataObject",
    pushDataObject
  );

  const handleNotif = async () => {
    // Native Notify Indie Push Registration Code
    await registerIndieID("220334", 2333, "EeTai2ZsptKSZ6lG7Ejmqj");
    // End of Native Notify Code

    axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: "220334",
      appId: 2333,
      appToken: "EeTai2ZsptKSZ6lG7Ejmqj",
      title: "put your push notification title here as a string",
      message: "put your push notification message here as a string",
    });
  };

  useEffect(() => {
    handleNotif();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("access_token")
      .then((resp) => {
        console.log(resp, "<<<>>>");
        setAT(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [access_token]);

  const loginDrawer = () => {
    if (!access_token) {
      return (
        <Drawer.Screen
          name="LoginRouter"
          options={{
            title: "Masuk",
            drawerIcon: () => {
              return (
                <MaterialCommunityIcons name="login" size={25} color="#fff" />
              );
            },
          }}
          component={LoginRouter}
        />
      );
    }
  };
  return (
    <ApolloProvider client={client}>
      <SSRProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <Drawer.Navigator
              useLegacyImplementation={true}
              initialRouteName="Home"
              drawerContent={(props) => <CustomDrawer {...props} />}
              screenOptions={{
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#34495e",
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerTintColor: "#fff",
                drawerStyle: {
                  backgroundColor: "#34495e",
                },
                drawerActiveTintColor: "#fff",
                drawerInactiveTintColor: "#fff",
                drawerLabelStyle: {
                  marginLeft: -25,
                  fontSize: 20,
                },
              }}
            >
              <Drawer.Screen
                name="Home"
                options={{
                  title: "Beranda",
                  drawerIcon: () => {
                    return <Ionicons name="home" size={25} color="#fff" />;
                  },
                }}
                component={Home}
              />
              <Drawer.Screen
                name="GempaRouter"
                options={{
                  title: "Gempa",
                  drawerIcon: () => {
                    return (
                      <MaterialCommunityIcons
                        name="alert-octagram-outline"
                        size={25}
                        color="#fff"
                      />
                    );
                  },
                }}
                component={GempaRouter}
              />
              <Drawer.Screen
                name="CuacaRouter"
                options={{
                  title: "Cuaca",
                  drawerIcon: () => {
                    return (
                      <MaterialCommunityIcons
                        name="weather-pouring"
                        size={25}
                        color="#fff"
                      />
                    );
                  },
                }}
                component={CuacaRouter}
              />
              {/* <Drawer.Screen name="LoginRouter" options={{title: 'Masuk', drawerIcon: () => {
              return <MaterialCommunityIcons name="login" size={25} color="#fff" />
            }}}  component={LoginRouter} /> */}
              {loginDrawer()}
            </Drawer.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </SSRProvider>
    </ApolloProvider>
  );
}

