import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Colors } from 'react-native-paper';

export default function AdminLoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [isLoading, setIsLoading] = useState(false);
  
  const obj = {
    username: email,
    password: password,
    role: role,
  };

  const handleLogin = async (username, password) => {
    if (username.length == 0 || password.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Username or password field cannot be empty",
        [{ text: "Okay" }]
      );
      return;
    }
    // const s = await signIn(username,password)
    setIsLoading(true)
    await axios
      .post(`${BASE_URL}` + "/authenticate", obj)
      .then((res) => {
        let info = res.data;
        if(info == "Invalid Credentials"){

          console.log(info)
          setIsLoading(false)
          Alert.alert(
            "Invalid Credentials",
            "Email or password provided is incorrect",
            [{ text: "Okay" }]
          );

          return
        }else{
        const myArray = info.split(" ");
        let token = myArray[0];

        console.log(myArray);
        AsyncStorage.setItem("token", JSON.stringify(token));
        navigation.navigate("AdminDashboard");
        setIsLoading(false)
        }
        // setIsLoggedIn(true)

        // return obj;
      })
      .catch((e) => {
        console.log(e);
      });

    // setUsername("")
    // setPassword("")
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Login to continue</Text>
      
       <TextInput
       style={{marginBottom:20,height:40, width:'90%', alignSelf:'center'}}
       label="Email"
       placeholder="Email"
       mode="outlined"
       value={email}
       // error='true'
       activeOutlineColor="#3B71F3"
      //  onEndEditing={(e) => {
      //    handleValidUser(e.nativeEvent.text);
      //  }}
       onChangeText={(text) => setEmail(text)}
     />

      <TextInput
       style={{marginBottom:20,height:40, width:'90%', alignSelf:'center'}}
       label="Password"
       placeholder="Password"
       mode="outlined"
       value={password}
       secureTextEntry={true}
       // error='true'
       activeOutlineColor="#3B71F3"
      //  onEndEditing={(e) => {
      //    handleValidUser(e.nativeEvent.text);
      //  }}
       onChangeText={(text) => setPassword(text)}
     />

      <TouchableOpacity
        style={styles.subBtn}
        onPress={() => {
          handleLogin(email, password);
        }}
      >
        <Text style={{ color: "#fff" }}>SUBMIT</Text>
      </TouchableOpacity>
      <ActivityIndicator animating={isLoading} color={Colors.blue500} style={{marginTop:50}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  inputContainer: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 10,
  },
  subBtn: {
    width: "90%",
    // borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 90,
    backgroundColor: "#3B71F3",
    color: "#fff",
    alignSelf:'center'
  },
  errMsg: {
    color: "red",
    textAlign: "left",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
});
