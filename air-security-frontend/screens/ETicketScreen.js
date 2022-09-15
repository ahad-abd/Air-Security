import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  TextInput
} from "react-native-paper";
import { generatePdf } from "../Helper/DownloadTicket";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export default function GenerateTicket() {


  const [text, setText] = useState("");

  const [passengerName, setPassengerName] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");

  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const [time1, setTime1] = useState(new Date());
  const [time2, setTime2] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Economy", value: "economy" },
    { label: "Business", value: "business" },
    { label: "Premium Economy", value: "premium" },
  ]);

  const obj = {
    passengerName: passengerName,
    airLineName: airlineName,
    flightNumber: flightNumber,
    departureLocation: departureLocation,
    departureTime: time1.toLocaleTimeString(),
    arrivalTime: time2.toLocaleTimeString(),
    classType: value,
    // date: date.toLocaleDateString(),
    // date2: date2.toLocaleDateString(),
    date: date,
    date2: date2,
    arrivalLocation: arrivalLocation,
  };

  const [DatePickerVisibility, setDatePickerVisibility] = useState(false);
  const [isTimePicker1Visible, setTimePicker1Visibility] = useState(false);
  const [isTimePicker2Visible, setTimePicker2Visibility] = useState(false);

 

  const showTimePicker1 = () => {
    setTimePicker1Visibility(true);
  };
  const showTimePicker2 = () => {
    setTimePicker2Visibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideTimePicker1 = () => {
    setTimePicker1Visibility(false);
  };
  const hideTimePicker2 = () => {
    setTimePicker2Visibility(false);
  };

  const handleConfirm1 = (date) => {
    const ddMMYYYY = moment(date).format("DD-MM-YYYY");
    setDate(ddMMYYYY);
    setTime1(date);
    hideDatePicker();
    hideTimePicker1();
  };
  const handleConfirm2 = (date) => {
    const ddMMYYYY = moment(date).format("DD-MM-YYYY");
    setDate2(ddMMYYYY);
    setTime2(date);
    hideDatePicker();
    hideTimePicker2();
  };

  const handleDownloadTicket = async () => {
    if (
      passengerName === "" ||
      airlineName === "" ||
      flightNumber === "" ||
      departureLocation === "" ||
      arrivalLocation === ""
    ) {
      console.log("All fields are mandatory");
      Alert.alert("Wrong Input", "All fields are mandatory", [
        { text: "Okay" },
      ]);
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
        .post(`${BASE_URL}` + "/GenerateTicketSave", obj, config)
        .then((res) => {
          let resData = res.data;
          console.log(resData);
          Alert.alert(
            "Success",
            "Ticket Generated Successfully",
            [{ text: "Download" ,
            onPress : ()=> generatePdf(resData)
          }]
          );
          // console.log(resData.eTicket, resData.pnr)
          // setVisible(true);
          // generatePdf(resData)
          return res.data;
          // setIsLoading(false)
        })
        .catch((e) => {
          console.log(`Error : ${e}`);
          // setIsLoading(false)
        });
    }
  };
    return (
      <SafeAreaView>
        {/* <View style={[styles.container]}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="Passenger Name"
          onChangeText={(newText) => setPassengerName(newText)}
          defaultValue={passengerName}
        />
      </View> */}
        <TextInput
          style={{ marginBottom: 10, width: "90%", alignSelf: "center" }}
          label="Passenger Name"
          placeholder="Passenger Name"
          mode="outlined"
          value={passengerName}
          // error='true'
          activeOutlineColor="#3B71F3"
          onChangeText={(text) => setPassengerName(text)}
        />

        {/* <View style={[styles.container]}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="Airline Name"
          onChangeText={(newText) => setAirlineName(newText)}
          defaultValue={airlineName}
        />
      </View> */}
        <TextInput
          style={{ marginBottom: 20, width: "90%", alignSelf: "center" }}
          label="Airline Name"
          placeholder="Airline Name"
          mode="outlined"
          value={airlineName}
          // error='true'
          activeOutlineColor="#3B71F3"
          onChangeText={(text) => setAirlineName(text)}
        />

        {/* <View style={[styles.container]}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="Flight Number"
          onChangeText={(newText) => setFlightNumber(newText)}
          defaultValue={flightNumber}
        />
      </View> */}

        <TextInput
          style={{ marginBottom: 20, width: "90%", alignSelf: "center" }}
          label="Flight Number"
          placeholder="Flight Number"
          mode="outlined"
          value={flightNumber}
          // error='true'
          activeOutlineColor="#3B71F3"
          onChangeText={(text) => setFlightNumber(text)}
        />

        {/* <View style={[styles.container]}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="Departure Location"
          onChangeText={(newText) => setDepartureLocation(newText)}
          defaultValue={departureLocation}
        />
      </View> */}
        <TextInput
          style={{ marginBottom: 20, width: "90%", alignSelf: "center" }}
          label="Departure Location"
          placeholder="Departure Location"
          mode="outlined"
          value={departureLocation}
          // error='true'
          activeOutlineColor="#3B71F3"
          onChangeText={(text) => setDepartureLocation(text)}
        />
        {/* 
      <View style={[styles.container]}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="Arrival Location"
          onChangeText={(newText) => setArrivalLocation(newText)}
          defaultValue={arrivalLocation}
        />
      </View> */}
        <TextInput
          style={{ marginBottom: 20, width: "90%", alignSelf: "center" }}
          label="Arrival Location"
          placeholder="Arrival Location"
          mode="outlined"
          value={arrivalLocation}
          // error='true'
          activeOutlineColor="#3B71F3"
          onChangeText={(text) => setArrivalLocation(text)}
        />
        <Text style={styles.text}>Select Class Type</Text>

        <DropDownPicker
          style={{ width: "90%", alignSelf: "center" }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />

        <Text style={styles.timeText}>
          Departure Time : {time1.toDateString()} , {time1.getHours()}:
          {time1.getMinutes()}
        </Text>

        <TouchableOpacity
          style={styles.dateBtn}
          onPress={() => {
            showTimePicker1();
          }}
        >
          <Text style={{ color: "#fff" }}>Set Departure Time</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePicker1Visible}
          mode="datetime"
          onConfirm={handleConfirm1}
          onCancel={hideTimePicker1}
        />

        <Text style={styles.timeText}>
          Arrival Time : {time2.toDateString()} , {time2.getHours()}:
          {time2.getMinutes()}
        </Text>

        <TouchableOpacity
          style={styles.dateBtn}
          onPress={() => {
            showTimePicker2();
          }}
        >
          <Text style={{ color: "#fff" }}>Set Arrival Time</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePicker2Visible}
          mode="datetime"
          onConfirm={handleConfirm2}
          onCancel={hideTimePicker2}
        />

        <TouchableOpacity
          style={styles.subBtn}
          onPress={() => {
            handleDownloadTicket();
          }}
        >
          <Text style={{ color: "#fff" }}>SUBMIT</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  // }
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
    marginStart: 20,
  },
  link: {
    color: "#FDB075",
  },
  btn: {},
  btnContainer: {
    width: "100%",

    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#3B71F3",
  },
  container: {
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
    marginTop: 20,
    backgroundColor: "#3B71F3",
    color: "#fff",
    alignSelf: "center",
    borderRadius: 5,
  },
  dateBtn: {
    width: "50%",
    borderRadius: 5,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#3B71F3",
    color: "#fff",
    alignSelf: "center",
  },
  timeText: {
    marginLeft: 10,
    fontSize: 18,
    color: "black",
    // marginVertical: 10,
    marginTop: 10,
    alignSelf: "center",
  },
});
