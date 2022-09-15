import "react-native-gesture-handler";
import {
  Ionicons,
  AntDesign,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";

import WiFiScreen from "./WiFiScreen";
import BCBPScreen from "./BCBPScreen";
import ETicketScreen from "./ETicketScreen";
import SecurityStatusScreen from "./SecurityStatusScreen";
import BaggageStatusScreen from "./BaggageStatusScreen";
import FlightStatusScreen from "./FlightStatusScreen";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PassengerHomeScreen from "./PassengerHomeScreen";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { signOut } = useContext(AuthContext);
  
  let Fname, Lname;
  

  for (var key in props.descriptors) {
    if ("fname" in props.descriptors[key].options) {
      Fname = props.descriptors[key].options.fname;
      Lname = props.descriptors[key].options.lname;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#3B71F3" }}
      >
        <ImageBackground
          source={require("../assets/bgcolor1.png")}
          style={{ padding: 20, margin: 0 }}
        >
          <Image
            source={require("../assets/img.png")}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
              marginTop: 30,
              marginLeft: 0,
              borderColor: "#3B71F3",
              borderWidth: 4,
            }}
          />
          <Text
            style={{ fontSize: 18, color: "#fff", textTransform: "capitalize" }}
          >
            {Fname} {Lname}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props}></DrawerItemList>
        </View>
      </DrawerContentScrollView>
      <View
        style={{ paddingLeft: 20, borderTopWidth: 2, borderTopColor: "#ccc" }}
      >
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={20}></Ionicons>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>Share me</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            signOut();
            props.navigation.navigate("UserLogin");
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={20}></Ionicons>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>Sign out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function PassengerDashboard({ route, navigation }) {

  const { f } = route.params;
  const { l } = route.params;
  

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        // headerShown : false,
        drawerActiveBackgroundColor: "#3B71F3",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: { marginLeft: -20 },
        drawerActiveTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={PassengerHomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Get Wifi"
        component={WiFiScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="wifi" size={24} color={color} />
          ),
          fname: f,
          lname: l,
        }}
      />
      <Drawer.Screen
        name="BarCode Boarding Pass"
        component={BCBPScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="qrcode" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="E Ticket"
        component={ETicketScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Entypo name="ticket" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Security"
        component={SecurityStatusScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="security" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Baggage"
        component={BaggageStatusScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bag-carry-on"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Flight Details"
        component={FlightStatusScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="flight" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
