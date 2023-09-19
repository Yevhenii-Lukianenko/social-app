import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoginScreen } from "../../Screens/auth/LoginScreen/LoginScreen";
import { RegistrationScreen } from "../../Screens/auth/RegistrationScreen/RegistrationScreen";
import { Home } from "../../Screens/Home/Home";
import { MapScreen } from "../../Screens/MapScreen/MapScreen";
import { CommentsScreen } from "../../Screens/CommentsScreen/CommentsScreen";

import { authStateChangeUser } from "../../redux/auth/authOperations";
import { selectStateChange } from "../../redux/auth/authSelectors";

const MainStack = createStackNavigator();

export const Main = () => {
  const isLogin = useSelector(selectStateChange);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [isLogin]);

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Registration" component={RegistrationScreen} />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={secondaryOptions}
        />
        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={secondaryOptions}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const secondaryOptions = {
  headerShown: true,
  headerStyle: { borderBottomWidth: 1 },
  headerTitleStyle: {
    color: "#212121",
    fontSize: 17,
    fontWeight: 500,
  },
  headerTitleAlign: "center",
};
