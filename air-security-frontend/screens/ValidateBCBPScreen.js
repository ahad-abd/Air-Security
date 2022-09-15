import { View, Text, Button, StyleSheet , Alert} from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function WifiGenerator() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData:" + data);

    const retrievedItem = await AsyncStorage.getItem('token');
    const item = JSON.parse(retrievedItem);

    const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${item}`,
      },
    };
    console.log(text)
    axios
      .get(`${BASE_URL}` + "/validateBCBP/"+ text, config)
      .then((res) => {
        let resData = res.data;

        if(res.data === "Valid BCBP"){
          Alert.alert(
            "Success",
            "The Boarding Pass is valid ",
            [{ text: "Okay" }]
          );
        }
        if(res.data === "Not valid for today"){
          Alert.alert(
            "Expired",
            "The Boarding Pass is not valid for today ",
            [{ text: "Okay" }]
          );
        }
        if(res.data === "Invalid BCBP"){
          Alert.alert(
            "Failure",
            "The Boarding Pass is not valid",
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

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Validate BCBP</Text>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}></Text>
      {scanned && (
        <Button
          title={"Scan again?"}
          onPress={() => setScanned(false)}
          color="#3B71F3"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  barcodebox: {
    // backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "#3B71F3",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
});
