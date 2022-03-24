import React, { useContext } from "react";
import { View, Text, Divider, Button } from "native-base";
import { Image, Dimensions } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons, AntDesign } from "react-native-vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context";

const windowHeight = Dimensions.get('window').height;

const CustomDrawer = (props) => {
  const auth = useContext(AuthContext);
  let { navigate } = props.navigation;

  const handleLogout = (e) => {
    e.preventDefault();
    AsyncStorage.removeItem("access_token")
      .then((resp) => {
        auth.setAT(null);
        console.log(resp, ">>>>>");
        navigate("Home");
        s;
      })
      .catch((err) => {
        console.log(err, "<><><>");
      });
  };

  const logoutDrawer = () => {
    if (auth.access_token) {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 40,
            marginLeft: 20,
          }}
        >
          <AntDesign name="logout" size={25} color="#fff" />
          <Button
            size="lg"
            variant="ghost"
            colorScheme="orange"
            onPress={handleLogout}
          >
            <Text fontSize={20} ml="-2" fontWeight="bold" color="#fff">
              Logout
            </Text>
          </Button>
        </View>
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 50,
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              marginHorizontal: 15,
            }}
            source={require("../../assets/logo.png")}
          />
          <Text fontSize={40} fontWeight="bold" color="#fff">
            AlertMe
          </Text>
        </View>

        <DrawerItemList {...props} />

        <View>
          {logoutDrawer()}
          <View
            style={{
              alignItems: "center",
              marginTop: windowHeight * 0.39,
            }}
          >
            <Divider mb="2"></Divider>
            <Text color="#fff">Final Project Hactiv8 Team 3</Text>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
