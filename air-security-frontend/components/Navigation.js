import { View, Text } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import UserLoginScreen from "../screens/UserLoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PassengerDashboard from "../screens/PassengerDashboard";
import { ActivityIndicator } from "react-native-web";
import axios from "axios";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminLoginScreen from "../screens/AdminLoginScreen";
import AdminDashboard from "../screens/AdminDashboard";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authContext = useMemo(() => ({
    signIn: async (username, password) => {
      // console.log(BASE_URL)
      let obj = { f: "", l: "", loggedIn: false };
      setIsLoading(true);
      await axios
        .post(`${BASE_URL}` + "/authenticate", { username, password })
        .then((res) => {
          let info = res.data;
          const myArray = info.split(" ");
          let token = myArray[0];

          obj.f = myArray[1];
          obj.l = myArray[2];
          obj.loggedIn = true;
          console.log(myArray);
          AsyncStorage.setItem("token", JSON.stringify(token));

          setIsLoggedIn(true);

          return obj;
        })
        .catch((e) => {
          console.log(e);
        });

      return obj;
    },
    signOut: () => {
      AsyncStorage.removeItem("token");
      setIsLoading(false);
    },
    signUp: async (obj) => {
    const ans =  await  axios
        .post(`${BASE_URL}` + "/signup", obj)
        .then((res) => {
          // let userInfo=res.data;

          console.log(res.data);
          setIsLoading(false);
          return res.data
          
        })
        .catch((e) => {
          console.log(`register error ${e}`);
          setIsLoading(false);
        });


        return ans
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <ActivityIndicator size="large"/> */}
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserLogin"
            component={UserLoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminLogin"
            component={AdminLoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PassengerDashboard"
            component={PassengerDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
