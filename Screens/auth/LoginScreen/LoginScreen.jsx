import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import isEmail from "validator/lib/isEmail";

import {
  KeyboardAvoidingView,
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { styles } from "./LoginScreen.styled";

import { authSignInUser } from "../../../redux/auth/authOperations";
import { selectStateChange } from "../../../redux/auth/authSelectors";

export const LoginScreen = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [isFocused, setFocused] = useState({
    email: false,
    password: false,
  });
  const [isHiddenPassword, setHiddenPassword] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isLogin = useSelector(selectStateChange);
  useEffect(() => {
    if (isLogin) {
      navigation.navigate("Home");

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, [isLogin]);

  const handleChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const handleFocus = (name, value) => {
    setFocused({ [name]: value });
  };

  const handleSubmit = async () => {
    if (isEmail(state.email) && state.password) {
      await dispatch(authSignInUser(state));
      return;
    }
    return console.log("The email or password is incorrect");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("../../../assets/images/bgImg.jpg")}
        resizeMode="cover"
        style={styles.backgroundImg}
      >
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-230}>
          <View style={styles.loginContainer}>
            <Text style={styles.authTitle}>Sign in</Text>
            <View style={styles.formContainer}>
              <TextInput
                keyboardType="email-address"
                value={state["email"]}
                placeholder="Email"
                onChangeText={(value) => handleChange("email", value)}
                onFocus={() => handleFocus("email", true)}
                onBlur={() => handleFocus("email", false)}
                style={[
                  styles.input,
                  isFocused["email"] && styles.inputFocused,
                ]}
              />
              <View>
                <TextInput
                  secureTextEntry={isHiddenPassword}
                  value={state["password"]}
                  placeholder="Password"
                  maxLength={20}
                  onChangeText={(value) => handleChange("password", value)}
                  onFocus={() => handleFocus("password", true)}
                  onBlur={() => handleFocus("password", false)}
                  style={[
                    styles.input,
                    isFocused["password"] && styles.inputFocused,
                  ]}
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
              onPress={() => handleSubmit()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.authLink}>
                Don't have an account? Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
