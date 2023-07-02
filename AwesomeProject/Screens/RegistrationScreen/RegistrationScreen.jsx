import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import isEmail from "validator/lib/isEmail";
import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

export const RegistrationScreen = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isHiddenPassword, setHiddenPassword] = useState(true);
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (state) => {
    if (state.name && isEmail(state.email) && state.password) {
      navigation.navigate("Home");
      return console.log(state);
    }
    return console.log("Please enter all fields correctly");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("./../../assets/images/bgImg.jpg")}
        resizeMode="cover"
        style={styles.backgroundImg}
      >
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-170}>
          <View style={styles.registerContainer}>
            <View style={styles.avatarContainer}>
              <Image />
              <TouchableOpacity style={styles.avatarButtons}>
                <Image
                  source={require("./../../assets/icons/add.png")}
                  style={styles.avatarIcon}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.authTitle}>Registration</Text>
            <View style={styles.formContainer}>
              <TextInput
                value={state["name"]}
                placeholder="Name"
                onChangeText={(value) => handleChange("name", value)}
                style={styles.input}
              />
              <TextInput
                keyboardType="email-address"
                value={state["email"]}
                placeholder="Email"
                onChangeText={(value) => handleChange("email", value)}
                style={styles.input}
              />
              <View>
                <TextInput
                  secureTextEntry={isHiddenPassword}
                  value={state["password"]}
                  onChangeText={(value) => handleChange("password", value)}
                  placeholder="Password"
                  maxLength={20}
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.buttonShow}
                  onPress={() => setHiddenPassword(!isHiddenPassword)}
                >
                  <Text style={styles.authLink}>Show</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => handleSubmit(state)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.authLink}>
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  registerContainer: {
    position: "relative",
    alignItems: "center",
    paddingTop: 92,
    paddingBottom: 67,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarContainer: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarButtons: { position: "absolute", bottom: 14, right: -12.5 },
  avatarIcon: { width: 24, height: 24 },
  authTitle: {
    marginBottom: 33,
    textAlign: "center",
    color: "#212121",
    fontSize: 30,
    fontWeight: 500,
    letterSpacing: 0.3,
  },
  formContainer: { gap: 16 },
  input: {
    padding: 16,
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    marginBottom: 16,
    width: 343,
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    overflow: "hidden",
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
  },
  buttonShow: { position: "absolute", bottom: 15, right: 16 },
  authLink: { color: "#1B4371", fontSize: 16 },
});
