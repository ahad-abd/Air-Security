import {
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
const win = Dimensions.get("window");

export default function PassengerHomeScreen() {
  return (
    <ScrollView scrollEnabled={false} nestedScrollEnabled={false}>
      <ImageBackground
        source={require("../assets/homebg2.png")}
        style={styles.container}
      ></ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: win.height,
  },
});
