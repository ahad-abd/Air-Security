import "react-native-gesture-handler";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
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
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import ValidateBCBPScreen from "./ValidateBCBPScreen";
import UpdateBaggageStatusScreen from "./UpdateBaggageStatusScreen";
import UpdateSecurityStatusScreen from "./UpdateSecurityStatusScreen";
import { AuthContext } from "../context/AuthContext";
import AdminHomeScreen from "./AdminHomeScreen";
import ValidateFirstClassPassenger from "./ValidateFirstClassPassenger";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { signOut } = useContext(AuthContext);
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
          <Text style={{ fontSize: 18, color: "#fff" }}> Admin</Text>
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
            props.navigation.navigate("Login");
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

export default function AdminDashboard() {
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
        component={AdminHomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Validate BCBP"
        component={ValidateBCBPScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="barcode" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Update Baggage Status"
        component={UpdateBaggageStatusScreen}
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
        name="Update Security Status"
        component={UpdateSecurityStatusScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="security" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Validate First Class Passenger"
        component={ValidateFirstClassPassenger}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="barcode" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
