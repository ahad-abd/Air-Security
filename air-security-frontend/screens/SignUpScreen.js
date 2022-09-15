import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function App({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { signUp } = useContext(AuthContext);
  const obj = {
    emailId: email,
    firstName: firstName,
    lastName: lastName,
    passWord: password,
    role : "User"
  };

  const handleSignUp = async (obj) => {
    if (
      firstName.length == 0 ||
      lastName.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      password2.length == 0
    ) {
      Alert.alert("Wrong Input!", "One or more fields cannot be empty", [
        { text: "Okay" },
      ]);
      return;
    }
    if (
      email.length < 4 ||
      password.length < 4 ||
      password2.length < 4
    ) {
      Alert.alert("Wrong Input!", "email and password should be more than 4 characters long", [
        { text: "Okay" },
      ]);
      return;
    }
    if (
      password !=  password2
    ) {
      Alert.alert("Wrong Input!", "Passwords don't match", [
        { text: "Okay" },
      ]);
      return;
    }
    const status = await signUp(obj);
    console.log(status, "status");

    if (status == "Email already Exist") {
      console.log("in if block");
      Alert.alert(
        "User exists",
        "The email provided is already registered with us, please log in",
        [{ text: "Okay" }]
      );
      return;
    }
    if (status == "User added successfully") {
      Alert.alert("Success", "User added successfully", [{ 
        text: "Login",
      onPress: ()=> navigation.navigate("UserLogin")}]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPassword2("");
      
      return;
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./app/assets/logo.png")} /> */}
      {/* <Spinner visible={isLoading} /> */}

      <StatusBar style="auto" />
      <Text style={styles.title}>Create an account </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="First Name"
          placeholderTextColor="#003f5c"
          label="firstName"
          value={firstName}
          onChangeText={(data) => setFirstName(data)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="Last Name"
          placeholderTextColor="#003f5c"
          label="lastName"
          value={lastName}
          onChangeText={(data) => setLastName(data)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          label="email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          label="password"
          value={password}
          onChangeText={(data) => setPassword(data)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          label="password2"
          value={password2}
          onChangeText={(data) => setPassword2(data)}
        />
      </View>
      <TouchableOpacity
        style={styles.subBtn}
        onPress={() => {
          handleSignUp(obj);
        }}
      >
        <Text style={{ color: "#fff" }}>SUBMIT</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("UserLogin")}>
          <Text style={{ color: "blue" }}>Login</Text>
        </TouchableOpacity>
      </View>
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

  signupBtn: {
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
    width: "90%",
    alignSelf: "center",
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
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
});
