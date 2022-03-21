import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
      setLocation(location);

      let city = await Location.reverseGeocodeAsync({latitude : location.coords.latitude, longitude :location.coords.longitude});
      setCity(city);
      // console.log(city[0].city, 3)
    })();
  }, []);

  // console.log(city[0].city, "ieieieieiie")
  //   console.log(location.coords.latitude, 1)
  //   console.log(location.coords.longitude, 2)

  
  let text = 'Waiting..';
  let lat = 0
  let lon = 0
  if (errorMsg) {
    text = errorMsg;
  } else if (location ) {
    text = JSON.stringify(location);
    // console.log(city[0].city, "ieieieieiie")
    lat = location.coords.latitude
    lon = location.coords.longitude
  }
    console.log(lat, 1)
    console.log(lon, 2)
    console.log(city)

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});