import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";

import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
// import { Alert } from "react-native-web";

// code is for UpdateSecurityCheck

const UpdateSecurityStatusScreen = () => {
  const [isCheckIn, setCheckIn] = useState(false);
  const [isBaggage, setBaggage] = useState(false);
  const [isSecurity, setSecurity] = useState(false);
  const [isImmigation, setImmigation] = useState(false);
  const [isWaitingLounge, setWaitingLounge] = useState(false);
  const [isBoardingGate, setBoardingGate] = useState(false);
  const [isFlight, setFlight] = useState(false);

  const [pnr, setPnr] = useState("");
  const [clicked, setClicked] = useState(false);

  let obj = {
    pnr: pnr,
    status: "",
  };

  const setStatus = (status) => {
    switch (status) {
      case "Check-In":
        setCheckIn(true);
        break;
      case "Baggage":
        setCheckIn(true);
        setBaggage(true);
        break;
      case "Security":
        setCheckIn(true);
        setBaggage(true);
        setSecurity(true);
        break;
      case "Immigration":
        setCheckIn(true);
        setBaggage(true);
        setSecurity(true);
        setImmigation(true);
        break;
      case "Waiting Lounge":
        setCheckIn(true);
        setBaggage(true);
        setSecurity(true);
        setImmigation(true);
        setWaitingLounge(true);
        break;
      case "Boarding Gate":
        setCheckIn(true);
        setBaggage(true);
        setSecurity(true);
        setImmigation(true);
        setWaitingLounge(true);
        setBoardingGate(true);
        break;
      case "Flight":
        setCheckIn(true);
        setBaggage(true);
        setSecurity(true);
        setImmigation(true);
        setWaitingLounge(true);
        setBoardingGate(true);
        setFlight(true);
        break;
    }
  };

  const onSubmit = async () => {
    if (pnr === "") {
      console.log("PNR cannot be empty");
    } else {
      const retrievedItem = await AsyncStorage.getItem("token");
      const item = JSON.parse(retrievedItem);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${item}`,
        },
      };

      axios
        .get(`${BASE_URL}` + "/getSecurityStatus/" + pnr, config)
        .then((res) => {
          let resData = res.data;
          if(resData === "Invalid pnr"){
            Alert.alert(
              "Wrong Input",
              "PNR entered is invalid",
              [{ text: "Okay" }]
            );
            console.log(resData);
            return 
          }
          setStatus(resData);
          setClicked(true);
          return res.data;
        })
        .catch((e) => {
          console.log(`Error : ${e}`);
        });

     
    }
  };

  const getUpdatedStatus = () => {
    let updatedStatus = "";

    if (isCheckIn) {
      updatedStatus = "Check-In";
    }
    if (isBaggage) {
      updatedStatus = "Baggage";
    }
    if (isSecurity) {
      updatedStatus = "Security";
    }
    if (isImmigation) {
      updatedStatus = "Immigration";
    }
    if (isWaitingLounge) {
      updatedStatus = "Waiting Lounge";
    }
    if (isBoardingGate) {
      updatedStatus = "Boarding Gate";
    }
    if (isFlight) {
      updatedStatus = "Flight";
    }

    obj.status = updatedStatus;
    return updatedStatus;
  };

  const makeUpdatecall = async (updatedStatus) => {
    const retrievedItem = await AsyncStorage.getItem("token");
    const item = JSON.parse(retrievedItem);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${item}`,
      },
    };
    console.log(obj);

    axios
      .post(`${BASE_URL}` + "/postSecurityStatus", obj, config)
      .then((res) => {
        let resData = res.data;

        if(res.data === "saved successfully"){
          Alert.alert(
            "Success",
            "Status updated successfully",
            [{ text: "Okay" }]
          );
        }
        console.log(resData);

        return res.data;
      })
      .catch((e) => {
        console.log(`Error : ${e}`);
      });
  };

  return (
    <View style={styles.container}>
      {/* <View style={[styles.InputContainer]}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="Enter PNR/Booking Ref"
          onChangeText={(newText) => {
            setPnr(newText);
          }}
          defaultValue={pnr}
        />
      </View> */}

      <TextInput
        style={{ marginBottom: 20, width: "90%", height: 40 }}
        label="PNR/Booking Ref."
        placeholder="Enter PNR/Booking Ref."
        mode="outlined"
        value={pnr}
        // error='true'
        activeOutlineColor="#3B71F3"
        onChangeText={(text) => setPnr(text)}
      />

      <CustomButton text="View Status" onPress={() => onSubmit()} />
      {clicked ? (
        <>
          <ScrollView
            style={{ width: "90%", alignSelf: "center", marginTop: 20 }}
            showVerticalScrollIndicator={false}
          >
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isCheckIn ? "checked" : "unchecked"}
                onPress={() => {
                  setCheckIn(!isCheckIn);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Check In</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isBaggage ? "checked" : "unchecked"}
                onPress={() => {
                  setBaggage(!isBaggage);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Baggage</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isSecurity ? "checked" : "unchecked"}
                onPress={() => {
                  setSecurity(!isSecurity);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Security</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isImmigation ? "checked" : "unchecked"}
                onPress={() => {
                  setImmigation(!isImmigation);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Immigration</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isWaitingLounge ? "checked" : "unchecked"}
                onPress={() => {
                  setWaitingLounge(!isWaitingLounge);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Waiting Lounge</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isBoardingGate ? "checked" : "unchecked"}
                onPress={() => {
                  setBoardingGate(!isBoardingGate);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Boarding Gate</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isFlight ? "checked" : "unchecked"}
                onPress={() => {
                  setFlight(!isFlight);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Flight</Text>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() => makeUpdatecall(getUpdatedStatus())}
          >
            <Text style={{ color: "#fff" }}>Update</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#F2F2F2",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    width: "90%",
    height: 60,
    borderRadius: 10,
    // justifyContent:"space-between",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    alignSelf: "center",
    height: 56,
  },
  emoji: {
    alignSelf: "right",
    marginBottom: 10,
  },
  label: {
    margin: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  Btn: {
    width: "90%",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#3B71F3",
    color: "#fff",
  },
  InputContainer: {
    marginBottom: 20,
    // flex: 1,
    // padding: 20,
    // paddingTop:65,
    backgroundColor: "white",
  },
  list: {
    flex: 1,
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
});
export default UpdateSecurityStatusScreen;
