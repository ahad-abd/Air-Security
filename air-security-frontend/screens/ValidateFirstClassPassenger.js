import { View, Text, StyleSheet, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import { Banner } from "react-native-paper";
import { Paragraph, Dialog, Portal, Provider } from "react-native-paper";

export default function ValidateFirstClassPassenger() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const hideDialog = () => setVisible(false);

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
    console.log(BASE_URL + "/restrictedArea/" + data);

    const retrievedItem = await AsyncStorage.getItem("token");
    const item = JSON.parse(retrievedItem);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${item}`,
      },
    };

    await axios
      .get(`${BASE_URL}` + "/restrictedArea/" + data, config)
      .then((res) => {
        let resData = res.data;
        console.log(resData);
        setScanned(true);

        if (res.data === "premium") {
          setVisible(true);
        }
        if (res.data === "economy" || res.data === "business") {
            // setVisible2(true);
            Alert.alert("Access Denied", "Passenger is not a first class passenger", [
              { text: "Okay" },
            ]);
          }
          if (res.data === "invalid Type") {
            setInvalid(true);
          }
        

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
  if (visible) {
    return (
      <Provider>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Access Allowed</Dialog.Title>
            <Dialog.Content>
              <Paragraph>The Passenger is a First Class Passenger </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              {/* <Button onPress={() => console.log("Cancel")}>Cancel</Button> */}

              {/* <Button
                onPress={() => {
                  console.log("Ok");
                  setVisible(false);
                  setScanned(true);
                  console.log(scanned);
                }}
              >
                Ok
              </Button> */}
              <Button
                title="OK"
                onPress={() => {
                  setScanned(true);
                  setVisible(false);
                }}
                color="#3B71F3"
              />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    );
  } 
  if (visible2) {
    return (
      <Provider>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Access Denied</Dialog.Title>
            <Dialog.Content>
              <Paragraph>The Passenger is not a First Class Passenger </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              {/* <Button onPress={() => console.log("Cancel")}>Cancel</Button> */}

              {/* <Button
                onPress={() => {
                  console.log("Ok");
                  setVisible(false);
                  setScanned(true);
                  console.log(scanned);
                }}
              >
                Ok
              </Button> */}
              <Button
                title="OK"
                onPress={() => {
                  setScanned(true);
                  setVisible2(false);
                }}
                color="#3B71F3"
              />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    );
  }
  if (invalid) {
    return (
      <Provider>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Access Denied</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Invalid BCBP</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              {/* <Button onPress={() => console.log("Cancel")}>Cancel</Button> */}

              {/* <Button
                onPress={() => {
                  console.log("Ok");
                  setVisible(false);
                  setScanned(true);
                  console.log(scanned);
                }}
              >
                Ok
              </Button> */}
              <Button
                title="OK"
                onPress={() => {
                  setScanned(true);
                  setInvalid(false);
                }}
                color="#3B71F3"
              />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Validate First Class Passenger</Text>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
          />
        </View>
        <Text style={styles.maintext}></Text>
        {scanned && (
          <Button
            title="Scan again ?"
            onPress={() => setScanned(false)}
            color="#3B71F3"
            style={{marginTop : 15}}
          />
        )}
      </SafeAreaView>
    );
  }

  //   return (

  // {visible ?
  //     <Provider>
  //     <Portal>
  //       <Dialog visible={visible} onDismiss={hideDialog}>
  //         <Dialog.Title>Access Allowed</Dialog.Title>
  //         <Dialog.Content>
  //           <Paragraph>The Passenger is a First Class Passenger</Paragraph>
  //         </Dialog.Content>
  //         <Dialog.Actions>
  //       <Button onPress={() => console.log('Cancel')}>Cancel</Button>
  //       <Button onPress={() => console.log('Ok')}>Ok</Button>
  //     </Dialog.Actions>
  //       </Dialog>
  //     </Portal>
  //   </Provider> :

  //     <SafeAreaView style={styles.container}>

  //     <Text style={styles.title}>Validate First Class Passenger</Text>
  //     <View style={styles.barcodebox}>
  //       <BarCodeScanner
  //         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
  //         style={{ height: 400, width: 400 }}
  //       />
  //     </View>
  //     {scanned && (
  //       <Button
  //         title={"Scan again?"}
  //         onPress={() => setScanned(false)}
  //         color="#3B71F3"
  //       />
  //     )}
  //   </SafeAreaView>}

  //   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
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
  btn : {
      marginTop : 15,
  }
});
