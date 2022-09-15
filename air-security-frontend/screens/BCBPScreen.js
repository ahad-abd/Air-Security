import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { generateBCBPPdf } from "../Helper/DownloadTicket";

import { StyleSheet, Text, View, Image, TouchableOpacity , Alert} from "react-native";
import { BASE_URL } from "../config";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function App() {
  const [pnr, setPnr] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [base64, setBase64] = useState("");

  const obj = {
    pnr: pnr,
  };

  async function execute(obj, base64) {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
           
            h1 {
                font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
                color: '#2f2d2d';
                text-align: default;
            }
            p {
                font-family: Arial, sans-serif;
                font-size: 14px;
                text-align: default;
                color: #2f2d2d;
            }
            body{
                height : 70vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .inner_container{
                display: flex;
            }
            .container{
                background-color: rgb(245, 245, 245);
                height : 500px;
                width: 1000px;
                border: 1px solid black;
                /* padding: 0 20px; */
            }
            .heading{
                background-color: rgb(166, 251, 253);
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .label_data{
                display: flex;
            }
            .fcd_row1{
                display: flex;
            }
            .fcd_row2{
                display: flex;
            }
            .details{
                margin:20px 25px;
            }
            .label{
                font-family:'Times New Roman', Times, sans-serif;
                text-transform:uppercase;
                font-size: large;
                font-weight: bold;
            }
            .text_data{
                margin-left: 30px;
                text-decoration: underline;
                font-size: large;
                font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            h5{
                
            }
            h4{
                
            }
            .mid_col{
                margin-left: 50px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="heading">
                <h1>Boarding Pass</h1>
            </div>
            <div class="inner_container">
                <div class="details">
                    <div class="name_from_to">
                        <div class="label_data">
                            <p class="label">Name Of The Passenger </p>
                            <p class="text_data">${obj.passengerName}</p>
                        </div>
                        <div class="label_data">
                            <p class="label">FROM </p>
                            <p class="text_data">${obj.departureLocation}</p>
                        </div>
                        <div class="label_data">
                            <p class="label">TO </p>
                            <p class="text_data">${obj.arrivalLocation}</p>
                        </div>
                        <div class="label_data">
                            <p class="label">AIRLINE </p>
                            <p class="text_data">${obj.airlineName}</p>
                        </div>
                    </div>
                    <div class="flight_class_datetime">
                        <div class="fcd_row1">
                            <div class="label_data">
                                <p class="label">FLIGHT </p>
                                <p class="text_data">${obj.flightNumber}</p>
                            </div>
                            <div class="label_data mid_col">
                                <p class="label">SEAT </p>
                                <p class="text_data">${obj.seat}</p>
                            </div>
                            <div class="label_data mid_col">
                                <p class="label">CLASS </p>
                                <p class="text_data">${obj.classType}</p>
                            </div>
                        </div>
                        <div class="fcd_row2">
                            <div class="label_data">
                                <p class="label">DATE </p>
                                <p class="text_data">${obj.date}</p>
                            </div>
                            <div class="label_data mid_col">
                                <p class="label">GATE </p>
                                <p class="text_data">G5</p>
                            </div>
                            <div class="label_data mid_col">
                                <p class="label">TIME </p>
                                <p class="text_data">${obj.time}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bcbp">
                    <img src=${base64} 
                        width="380" 
                        height="380"
                        alt="">
                </div>
            </div>
            
        </div>
    </body>
    </html>`;
    const { uri } = await Print.printToFileAsync({ html: html, width: 800 });
    Sharing.shareAsync(uri);
  }

  const handleDownloadBCBP = async (pnr) => {
    if (pnr === "") {
      console.log("PNR cannot be empty");
      Alert.alert(
        "Wrong Input",
        "PNR cannot be empty",
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

      axios
        .post(`${BASE_URL}` + "/GeneratingBarcode", obj, config)
        .then((res) => {
          let resData = res.data;
          console.log(res.data)
          if (resData.flightNumber == null && resData.qrcode == null) {
            console.log("Cannot generate BCBP");
            Alert.alert(
              "Wrong Input",
              "Cannot generate Boarding Pass for entered PNR",
              [{ text: "Okay" }]
            );
            return "";
          } else {

            setQrcode(resData.qrcode);
            console.log(resData);
            setBase64("data:image/png;base64," + resData.qrcode);
            console.log(base64)
            // generateBCBPPdf(resData,base64)

            Alert.alert(
              "Success",
              "BCBP Generated Successfully",
              [{ text: "Download" ,
              onPress : ()=> execute(resData, base64)
            }]
            );

            // execute(resData, base64);

            // const html = `<h1> Teste </h1>`;
            // const { uri } = Print.printToFileAsync({ html });
            // Sharing.shareAsync(uri);

            return res.data;
            // setIsLoading(false)
          }
        })
        .catch((e) => {
          Alert.alert(
            "Error",
            "There is some issue connecting to the server",
            [{ text: "Okay" }]
          );
          console.log(`Error : ${e}`);
          // setIsLoading(false)
        });
    }
  };

  // var base64Icon = "data:image/png;base64," + qrcode;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* <View style={[styles.inputContainer]}>
        <TextInput
          style={{ height: 40, fontSize: 18 }}
          placeholder="Ener PNR/Booking Ref"
          onChangeText={(newText) => setPnr(newText)}
          defaultValue={pnr}
        />
      </View> */}
      <TextInput
        style={styles.textInput}
        label="PNR/Booking Ref."
        placeholder="Enter PNR/Booking Ref."
        mode="outlined"
        value={pnr}
        // error='true'
        activeOutlineColor="#3B71F3"
        onChangeText={(text) => setPnr(text)}
      />
      <TouchableOpacity
        style={styles.pnrBtn}
        onPress={() => {
          handleDownloadBCBP(pnr);
        }}
      >
        <Text style={{ color: "#fff" }}>ENTER</Text>
      </TouchableOpacity>

      {/* {qrcode == "" ? null : (
        <Image style={{ width: 150, height: 150 }} source={{ uri: base64 }} />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#3B71F3",
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
    color: "#fff",
  },

  pnrBtn: {
    width: "80%",
    // borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#3B71F3",
    color: "#fff",
  },
  inputContainer: {
    backgroundColor: "white",
    width: "80%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginTop: 40,
  },
  textInput: {
    height: 40,
    // backgroundColor:'black',
    width: "90%",
  },
});
