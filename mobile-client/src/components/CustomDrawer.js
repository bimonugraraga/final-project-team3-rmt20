import React, { useContext } from "react";
import { View, Text, Divider, Button } from "native-base";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons, AntDesign } from "react-native-vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context";

const CustomDrawer = (props) => {
  const auth = useContext(AuthContext);
  // console.log(props.navigation, "<>>>>>>>>")
  let { navigate } = props.navigation;
  let [access_token, setAT] = useState(null);

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

  const handleLogout = (e) => {
    e.preventDefault();
    AsyncStorage.removeItem("access_token")
      .then((resp) => {
        auth.setAT(null);
        console.log(resp, ">>>>>");
        navigate("Home");
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
          <Ionicons name="alert-circle-outline" size={40} color="#fff" />
          <Text fontSize={40} fontWeight="bold" color="#fff">
            AlertMe
          </Text>
        </View>

        <DrawerItemList {...props} />

        <View>
          {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 40,
            marginLeft: 20
          }}
          >
            <AntDesign name="logout" size={25} color="#fff"/>
            <Button size="lg" variant="ghost" colorScheme="orange"><Text fontSize={20} ml="-2" fontWeight="bold" color="#fff">Logout</Text></Button>
          </View> */}
          {logoutDrawer()}
          <View
            style={{
              alignItems: "center",
              marginTop: 250,
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
