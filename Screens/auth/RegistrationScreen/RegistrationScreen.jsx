import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import isEmail from "validator/lib/isEmail";

import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { styles } from "./RegistrationScreen.styled";
import { UserAvatar } from "../../../components/UserAvatar/UserAvatar";

import { authSignUpUser } from "../../../redux/auth/authOperations";
import { uploadPhotoToServer } from "../../../utils/uploadPhotoToServer";
import { selectStateChange } from "../../../redux/auth/authSelectors";

export const RegistrationScreen = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [isFocused, setFocused] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [isHiddenPassword, setHiddenPassword] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // auto login
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
  // auto login

  const handleAvatar = (avatar) => {
    setAvatar(avatar);
  };

  const handleChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const handleFocus = (name, value) => {
    setFocused({ [name]: value });
  };

  const handleSubmit = async (state) => {
    if (state.name && isEmail(state.email) && state.password) {
      if (avatar) {
        const avatarUrl = await uploadPhotoToServer(avatar, "avatarsImages");
        await dispatch(
          authSignUpUser({
            ...state,
            avatarUrl,
          })
        );
      } else {
        await dispatch(authSignUpUser({ ...state }));
      }
      return;
    }
    return console.log("Please enter all fields correctly");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("../../../assets/images/bgImg.jpg")}
        resizeMode="cover"
        style={styles.backgroundImg}
      >
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-170}>
          <View style={styles.registerContainer}>
            <UserAvatar handleAvatar={handleAvatar} />

            <Text style={styles.authTitle}>Registration</Text>
            <View style={styles.formContainer}>
              <TextInput
                value={state["name"]}
                placeholder="Name"
                onChangeText={(value) => handleChange("name", value)}
                onFocus={() => handleFocus("name", true)}
                onBlur={() => handleFocus("name", false)}
                style={[styles.input, isFocused["name"] && styles.inputFocused]}
              />
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
