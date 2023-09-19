import { useDispatch } from "react-redux";
import { TouchableOpacity, Image } from "react-native";

import { authSignOutUser } from "../../redux/auth/authOperations";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await dispatch(authSignOutUser());
    navigation.navigate("Login");

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <TouchableOpacity style={{ marginRight: 16 }} onPress={handleLogout}>
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};
