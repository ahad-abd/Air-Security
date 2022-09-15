import { View, Text, StyleSheet, Button, Alert } from "react-native";
import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import CustomButton from "../components/CustomButton";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import axios from "axios";
import moment from "moment";

export default function CheckFlightDetails() {
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [flightNumber, setFlightNumber] = useState("");
  const [pnr, setPnr] = useState("");
  const [gotStatus, setGotStatus] = useState(false);
  const [flightStatus, setFlightStatus] = useState("");

  const obj = {
    flightNumber: flightNumber,
    pnr: pnr,
    date: date,
  };

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    const ddMMYYYY = moment(date).format("DD-MM-YYYY");
    setDate(ddMMYYYY);
    setDate2(date)
    hideTimePicker();
  };

  const handleFlightStatus = async () => {

    if (pnr === "" || flightNumber === "") {
      console.log("All fields are mandatory");
      Alert.alert(
        "Wrong Input",
        "All fiels are mandatory",
        [{ text: "Okay" }]
      );
    } else {
    const retrievedItem = await AsyncStorage.getItem("token");
    const item = JSON.parse(retrievedItem);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${item}`,
      },
    };
    console.log(obj, item);
    axios
      .post(`${BASE_URL}` + "/GetFlightStatus", obj, config)
      .then((res) => {
        let resData = res.data;
        setFlightStatus(resData);
        console.log(resData);
        setGotStatus(true);
        return res.data;
      })
      .catch((e) => {
        console.log(`Error : ${e}`);
      });

    }
  };

  return (
    <SafeAreaView>
      
      {/* <Text style={styles.text}>Flight</Text>
     
      <View style={[styles.container]}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="Flight Number"
          onChangeText={(newText) => setFlightNumber(newText)}
          defaultValue={flightNumber}
        />
      </View> */}

<TextInput
          style={{ marginBottom: 20, width : '90%', alignSelf : 'center' }}
          label="Flight Number"
          placeholder="Enter Flight Number"
          mode="outlined"
          value={flightNumber}
          // error='true'
          activeOutlineColor="#3B71F3"
          onChangeText={(text) => setFlightNumber(text)}
        />
      {/* <Text style={styles.text}>PNR</Text>
      
      <View style={[styles.container]}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="PNR/Booking Ref"
          onChangeText={(newText) => setPnr(newText)}
          defaultValue={pnr}
        />
      </View> */}

<TextInput
          style={{ marginBottom: 20 , width : '90%', alignSelf : 'center'}}
          label="PNR/Booking Ref."
          placeholder="Enter PNR/Booking Ref."
          mode="outlined"
          value={pnr}
          // error='true'
          activeOutlineColor="#3B71F3"
          onChangeText={(text) => setPnr(text)}
        />
      <Text style={styles.text}>Date: {date2.toDateString()}</Text>
      <CustomButton text="Select Date" onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
      <CustomButton text="Search Flight" onPress={() => handleFlightStatus()} />

      {!gotStatus ? null : (
        <View style={[styles.status_container]}>
          <Text style={styles.text}>Status : </Text>
          <Text style={styles.text}>{flightStatus}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    color: "black",
    marginVertical: 10,
    // alignSelf : 'center'
    marginLeft : 20
  },
  link: {
    color: "#FDB075",
  },
  btn: {},
  container: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 10,
  },
  status_container: {
    marginTop: 30,
    marginLeft: 15,
  },
  status_heading: {
    fontSize: 18,
  },
  status_message: {
    marginTop: 10,
    fontSize: 14,
  },
});
