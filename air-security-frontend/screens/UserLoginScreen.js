import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import * as Animatable from "react-native-animatable";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";
import { ActivityIndicator, Colors } from "react-native-paper";

export default function UserLoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const { signIn } = useContext(AuthContext);

  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const handleValidUser = (val) => {
    // console.log("clicked")
    if (val.trim().length > 4) {
      setIsValidUsername(true);
    } else {
      setIsValidUsername(false);
    }
  };
  const handleValidPass = (val) => {
    // console.log("clicked")
    if (val.trim().length > 4) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
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

    setIsLoading(true);
    await axios
      .post(`${BASE_URL}` + "/authenticate", { username, password, role })
      .then((res) => {
        let info = res.data;
        if (info == "Invalid Credentials") {
          console.log(info);
          setIsLoading(false);
          Alert.alert(
        "Invalid Credentials",
        "Email or Password you entered is not correct",
        [{ text: "Okay" }]
      );
          return;
        } else {
          const myArray = info.split(" ");
          let token = myArray[0];

          console.log(myArray);
          AsyncStorage.setItem("token", JSON.stringify(token));
          navigation.navigate("PassengerDashboard", {
            f: myArray[1],
            l: myArray[2],
          });
          setIsLoading(false);
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
      {/* <View style={styles.inputContainer}>
        <TextInput
          // style={styles.TextInput}
          style={{ height: 40, fontSize: 18 }}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          label="email"
          value={username}
          // editable={!isLoading}
          onEndEditing={(e) => {
            handleValidUser(e.nativeEvent.text);
          }}
          onChangeText={(data) => setUsername(data)}
        />
      </View> */}
      <TextInput
        style={{
          marginBottom: 20,
          height: 40,
          width: "90%",
          alignSelf: "center",
        }}
        label="Email"
        placeholder="Email"
        mode="outlined"
        value={username}
        // error='true'
        activeOutlineColor="#3B71F3"
        onEndEditing={(e) => {
          handleValidUser(e.nativeEvent.text);
        }}
        onChangeText={(text) => setUsername(text)}
      />
      {isValidUsername ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <View style={{ display: "flex", justifyContent: "space-between" }}>
            <Text style={styles.errMsg}>
              Username must be atleast 4 characters long
            </Text>
          </View>
        </Animatable.View>
      )}

      {/* <View style={styles.inputContainer}>
        <TextInput
          // style={styles.TextInput}
          style={{ height: 40, fontSize: 18 }}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          label="password"
          secureTextEntry={true}
          value={password}
          // editable={!isLoading}
          required
          onChangeText={(data) => setPassword(data)}
        />
      </View> */}
      <TextInput
        style={{
          marginBottom: 20,
          height: 40,
          width: "90%",
          alignSelf: "center",
        }}
        label="Password"
        placeholder="Password"
        mode="outlined"
        value={password}
        // error='true'
        activeOutlineColor="#3B71F3"
        secureTextEntry={true}
        onEndEditing={(e) => {
          handleValidPass(e.nativeEvent.text);
        }}
        onChangeText={(text) => setPassword(text)}
      />

      {isValidPassword ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <View style={{ display: "flex", justifyContent: "space-between" }}>
            <Text style={styles.errMsg}>
              Password must be atleast 4 characters long
            </Text>
          </View>
        </Animatable.View>
      )}

      <TouchableOpacity
        style={styles.subBtn}
        onPress={() => {
          handleLogin(username, password);
        }}
      >
        <Text style={{ color: "#fff" }}>LOGIN</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={{ color: "blue" }}>Register</Text>
        </TouchableOpacity>
      </View>
      <ActivityIndicator
        animating={isLoading}
        color={Colors.blue500}
        style={{ marginTop: 50 }}
      />
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
