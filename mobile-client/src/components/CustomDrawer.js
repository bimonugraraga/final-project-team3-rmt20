import React from "react";
import { View, Text, Divider, Button } from "native-base";
import { DrawerContentScrollView, DrawerItemList  } from "@react-navigation/drawer";
import { Ionicons, AntDesign } from 'react-native-vector-icons';

const CustomDrawer = (props) => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 50
        }}
        >
          <Ionicons name="alert-circle-outline" size={40} color="#fff"/>
          <Text fontSize={40} fontWeight="bold" color="#fff" >AlertMe</Text>
        </View>

        <DrawerItemList {...props} />
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 40,
          marginLeft: 20
        }}
        >
          <AntDesign name="logout" size={25} color="#fff"/>
          <Button size="lg" variant="ghost" colorScheme="orange"><Text fontSize={20} ml="-2" fontWeight="bold" color="#fff">Logout</Text></Button>
        </View>

      </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawer