import { StyleSheet, View, Text, TouchableOpacity , Alert} from "react-native";

import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";

// code is for UpdateBaggageCheck

const UpdateBaggageCheckScreen = () => {
  const [isCheckIn, setCheckIn] = useState(false);
  const [isBaggageDrop, setBaggageDrop] = useState(false);
  const [isSecurity, setSecurity] = useState(false);
  const [isSortation, setSortation] = useState(false);
  const [isMakeUp, setMakeUp] = useState(false);
  const [isDelivery, setDelivery] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [isInAir, setIsInAir] = useState(false);
  const [isUnLoad, setUnLoad] = useState(false);
  const [isDelivery2, setDelivery2] = useState(false);
  const [isClaim, setClaim] = useState(false);
  const [isCustoms, setCustoms] = useState(false);

  const [pnr, setPnr] = useState("");
  const [clicked, setClicked] = useState(false);

  const [checked, setChecked] = React.useState(false);

  let obj = {
    pnr: pnr,
    status: "",
  };

  const setStatus = (status) => {
    switch (status) {
      case "Check-In":
        setCheckIn(true);
        break;
      case "Baggage Drop":
        setCheckIn(true);
        setBaggageDrop(true);
        break;
      case "Security":
        setCheckIn(true);
        setBaggageDrop(true);
        setSecurity(true);
        break;
      case "Sortation":
        setCheckIn(true);
        setBaggageDrop(true);
        setSecurity(true);
        setSortation(true);
        break;
      case "Make Up":
        setCheckIn(true);
        setBaggageDrop(true);
        setSecurity(true);
        setSortation(true);
        setMakeUp(true);
        break;
      case "Delivery":
        setCheckIn(true);
        setBaggageDrop(true);
        setSecurity(true);
        setSortation(true);
        setMakeUp(true);
        setDelivery(true);
        break;
      case "Load":
        setCheckIn(true);
        setBaggageDrop(true);
        setSecurity(true);
        setSortation(true);
        setMakeUp(true);
        setDelivery(true);
        setLoad(true);
        break;
      case "In Air":
        setCheckIn(true);
        setBaggageDrop(true);
        setSecurity(true);
        setSortation(true);
        setMakeUp(true);
        setDelivery(true);
        setLoad(true);
        setIsInAir(true);
        break;
      case "Un Load":
        setCheckIn(true);
        setBaggageDrop(true);
        setSecurity(true);
        setSortation(true);
        setMakeUp(true);
        setDelivery(true);
        setLoad(true);
        setIsInAir(true);
        setUnLoad(true);
        break;
      case "Delivery2":
        setCheckIn(true);
        setBaggageDrop(true);
        setSecurity(true);
        setSortation(true);
        setMakeUp(true);
        setDelivery(true);
        setLoad(true);
        setIsInAir(true);
        setUnLoad(true);
        setDelivery2(true);
        break;
      case "Claim":
        setCheckIn(true);
        setBaggageDrop(true);
        setSecurity(true);
        setSortation(true);
        setMakeUp(true);
        setDelivery(true);
        setLoad(true);
        setIsInAir(true);
        setUnLoad(true);
        setDelivery2(true);
        setClaim(true);
        break;
      case "Customs":
        setCheckIn(true);
        setBaggageDrop(true);
        setSecurity(true);
        setSortation(true);
        setMakeUp(true);
        setDelivery(true);
        setLoad(true);
        setIsInAir(true);
        setUnLoad(true);
        setDelivery2(true);
        setClaim(true);
        setCustoms(true);
        break;
    }
  };

  const onSubmit = async () => {
    if (pnr === "") {
      console.log("PNR cannot be empty")
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
        .get(`${BASE_URL}` + "/getStatusOfBaggage/" + pnr, config)
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
    if (isBaggageDrop) {
      updatedStatus = "Baggage Drop";
    }
    if (isSecurity) {
      updatedStatus = "Security";
    }
    if (isSortation) {
      updatedStatus = "Sortation";
    }
    if (isMakeUp) {
      updatedStatus = "Make Up";
    }
    if (isDelivery) {
      updatedStatus = "Delivery";
    }
    if (isLoad) {
      updatedStatus = "Load";
    }
    if (isInAir) {
      updatedStatus = "In Air";
    }
    if (isUnLoad) {
      updatedStatus = "Un Load";
    }
    if (isDelivery2) {
      updatedStatus = "Delivery2";
    }
    if (isClaim) {
      updatedStatus = "Claim";
    }
    if (isCustoms) {
      updatedStatus = "Customs";
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
      .post(`${BASE_URL}` + "/postBaggageStatus", obj, config)
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
            style={{
              width: "90%",
              alignSelf: "center",
              marginTop: 20,
              contentContainerStyle: {
                justifyContent: "center",
                alignItems: "center",
              },
            }}
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
                status={isBaggageDrop ? "checked" : "unchecked"}
                onPress={() => {
                  setBaggageDrop(!isBaggageDrop);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Baggage Drop</Text>
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
                status={isSortation ? "checked" : "unchecked"}
                onPress={() => {
                  setSortation(!isSortation);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Sortation</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isMakeUp ? "checked" : "unchecked"}
                onPress={() => {
                  setMakeUp(!isMakeUp);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Make Up</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isDelivery ? "checked" : "unchecked"}
                onPress={() => {
                  setDelivery(!isDelivery);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Delivery</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isLoad ? "checked" : "unchecked"}
                onPress={() => {
                  setLoad(!isLoad);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Load</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isUnLoad ? "checked" : "unchecked"}
                onPress={() => {
                  setIsInAir(!isInAir);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>In Air</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isUnLoad ? "checked" : "unchecked"}
                onPress={() => {
                  setUnLoad(!isUnLoad);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Un Load</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isDelivery2 ? "checked" : "unchecked"}
                onPress={() => {
                  setDelivery2(!isDelivery2);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Delivery</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isClaim ? "checked" : "unchecked"}
                onPress={() => {
                  setClaim(!isClaim);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Claim</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={isCustoms ? "checked" : "unchecked"}
                onPress={() => {
                  setCustoms(!isCustoms);
                }}
                style={styles.checkbox}
                color="#3B71F3"
              />
              <Text style={styles.label}>Customs</Text>
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

export default UpdateBaggageCheckScreen;
