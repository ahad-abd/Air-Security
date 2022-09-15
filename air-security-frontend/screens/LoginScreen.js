import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={2000}
          source={require("../assets/icon2.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.titleHead}>Air Security</Text>
        <Text style={styles.text}>Choose your role</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("AdminLogin")}>
            <LinearGradient
              colors={["#3B71F3", "#3b95f3"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Admin</Text>
              <AntDesign name="right" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("UserLogin")}>
            <LinearGradient
              colors={["#3B71F3", "#3b95f3"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>User</Text>
              <AntDesign name="right" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;

const { height } = Dimensions.get("screen");
const heightLogo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B71F3",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  logo: {
    width: heightLogo,
    height: heightLogo,
    borderRadius: heightLogo / 2,
  },
  titleHead: {
    color: "#0b82d6",
    fontSize: 30,
    fontWeight: "bold",
    // color : 'grey',
  },
  text: {
    color: "grey",
    marginTop: 10,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
