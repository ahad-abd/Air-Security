import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { StyleSheet, Text, View, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import Timeline from "react-native-timeline-flatlist";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

let data = [
  {
    // time: "09:00",
    title: "Check-In",
    description:
      "Your luggage is at the ticket counter at the airport. It is going to be ransported in the cargo hold.",
  },
  {
    // time: "10:45",
    title: "Baggage Drop",
    description:
      "you can leave your cases and bags to be put on a plane if you have already checked in for the flight",
  },
  {
    // time: "12:00",
    title: "Security",
    description: "Your luggage is going through the security-check",
  },
  {
    // time: "14:00",
    title: "Sortation",
    description:
      "Your departure luggage is sorting into flight loads",
  },
  {
    // time: "16:30",
    title: "Make Up",
    description: "A nonpublic area where checked baggage for departing flights is sorted and loaded into containers or onto baggage carts.",
  },
  {
    // time: "09:00",
    title: "Delivery",
    description:
      "your article has been bagged in a dispatch bag for shippment. ",
  },
  {
    // time: "10:45",
    title: "Load",
    description:
      "Your baggage is loading into the light",
  },
  {
    // time: "16:30",
    title: "In Air",
    description: "Your baggae is in flight",
  },
  {
    // time: "12:00",
    title: "Un Load",
    description: "Your baggae reached the destination.It is in the processing of Un Load",
  },
  {
    // time: "14:00",
    title: "Delivery",
    description:
      "your article has been bagged in a dispatch bag for shippment. ",
  },
  {
    // time: "16:30",
    title: "Claim",
    description: "You can cliam your baggage after verification",
  },
  {
    // time: "16:30",
    title: "Customs",
    description: "Your baggage reached the customs.(luggage of the passengers and it refers to all dutiable good",
  },
];

export default function BaggageStatusScreen() {
  const [pnr, setPnr] = useState("");
  const [show, setShow] = useState(false);

  const onSubmit = async () => {
    if (pnr === "") {
      console.log("PNR cannot be empty");
      Alert.alert(
        "Wrong Input",
        "PNR cannot be empty",
        [{ text: "Okay" }]
      );
    } else {
      let flag = true;
      const retrievedItem = await AsyncStorage.getItem("token");
      const item = JSON.parse(retrievedItem);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${item}`,
        },
      };

      axios
        .get(`${BASE_URL}` + "/getStatusOfBaggage/" + pnr, config)
        .then((res) => {
          let resData = res.data;
          console.log(resData);
          if(res.data === "Invalid pnr"){
            Alert.alert(
              "Wrong Input!",
              "The PNR you entered is invalid",
              [{ text: "Okay" }]
            );
            return
          }
          data.forEach((element) => {
            if (resData != element.title && flag) {
              element.circleColor = "#3B71F3";
              element.lineColor = "#3B71F3";
            } else {
              if (flag) {
                element.circleColor = "#3B71F3";
              }
              flag = false;
            }
          });

          setShow(true);
          return res.data;
        })
        .catch((e) => {
          Alert.alert(
            "Error",
            "There was an issue connecting to the server",
            [{ text: "Okay" }]
          );
          console.log(`Error : ${e}`);
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerview}>
        {/* <View style={[styles.container]}>
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
          style={{ marginBottom: 20 }}
          label="PNR/Booking Ref."
          placeholder="Enter PNR/Booking Ref."
          mode="outlined"
          value={pnr}
          // error='true'
          activeOutlineColor="#3B71F3"
          onChangeText={(text) => setPnr(text)}
        />
        <CustomButton text="View Status" onPress={() => onSubmit()} />
      </View>
      {show && (
        <Timeline
          style={styles.list}
          data={data}
          circleSize={20}
          dotSize={12}
          circleColor="lightgray"
          lineColor="lightgray"
          // timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
          // timeStyle={{
          //   textAlign: "center",
          //   backgroundColor: "#3B71F3",
          //   color: "white",
          //   padding: 5,
          //   borderRadius: 13,
          // }}
          descriptionStyle={{ color: "gray" }}
          options={{
            style: { paddingTop: 5 },
          }}
          innerCircle={"dot"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: "white",
  },
  list: {
    flex: 1,
    marginTop: 15,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  innerview: {
    // flex:1,
    // display:'flex',
    // flexDirection:'column',
    // justifyContent:'center',
    // alignItems:'center'
  },
});
