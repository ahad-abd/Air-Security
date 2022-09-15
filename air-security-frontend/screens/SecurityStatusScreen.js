import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { StyleSheet, Text, View , Alert} from "react-native";
import { TextInput } from "react-native-paper";
import Timeline from "react-native-timeline-flatlist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import axios from "axios";

let data = [
  {
    // time: "09:00",
    title: "Check-In",
    description:
      "Your luggage is at the ticket counter at the airport. It is going to be ransported in the cargo hold.",
  },
  {
    // time: "09:10",
    title: "Baggage",
    description:
      "you can leave your cases and bags to be put on a plane if you have already checked in for the flight",
  },
  {
    // time: "09:15",
    title: "Security",
    description: "Your luggage is going through the security-check",
  },
  {
    // time: "09:45",
    title: "Immigration",
    description:
      "Team sport played between two teams of eleven players with a spherical ball. ",
  },
  {
    // time: "10:00",
    title: "Waiting Lounge",
    description: "Look out for the Best Gym & Fitness Centers around me :)",
  },
  {
    // time: "10:05",
    title: "Boarding Gate",
    description:
      "The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ",
  },
  {
    // time: "10:10",
    title: "Flight",
    description:
      "Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.",
  },
];

export default function SecurityStatusScreen() {
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
    console.log(item, pnr)
      axios
        .get(`${BASE_URL}` + "/getSecurityStatus/" + pnr, config)
        .then((res) => {
          let resData = res.data;
          if(res.data === "Invalid pnr"){
            Alert.alert(
              "Wrong Input!",
              "The PNR you entered is invalid",
              [{ text: "Okay" }]
            );
            return
          }
          console.log(resData);
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
    // let str = "";
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
