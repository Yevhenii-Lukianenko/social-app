import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TouchableOpacity, Image, View, Text } from "react-native";

import { PostsScreen } from "../PostsScreen/PostsScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";

const Tabs = createBottomTabNavigator();

export const Home = () => (
  <Tabs.Navigator
    initialRouteName="Publications"
    screenOptions={mainTabsOptions}
  >
    <Tabs.Screen
      name="Publications"
      component={PostsScreen}
      options={postsOptions}
    />
    <Tabs.Screen
      name="Create post"
      component={CreatePostsScreen}
      options={createPostsOptions}
    />
    <Tabs.Screen
      name="Profile"
      component={ProfileScreen}
      options={profileOptions}
    />
  </Tabs.Navigator>
);

const mainTabsOptions = {
  headerStyle: {
    borderBottomWidth: 1,
  },
  headerTitleAlign: "center",
  tabBarStyle: { height: 60, paddingTop: 9, paddingLeft: 50, paddingRight: 50 },
  tabBarShowLabel: false,
  tabBarActiveBackgroundColor: "#FF6C00",
  tabBarItemStyle: { borderRadius: 50, height: 40 },
};

const postsOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity
      style={{ marginRight: 16 }}
      onPress={() => navigation.navigate("Login")}
    >
      <Image
        source={require("../../assets/icons/logout.png")}
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  ),

  tabBarIcon: () => (
    <Image
      source={require("../../assets/icons/grid.png")}
      style={{ width: 24, height: 24 }}
    />
  ),
});

const createPostsOptions = {
  tabBarIcon: () => <Text style={{ fontSize: 20 }}>+</Text>,
};

const profileOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity
      style={{ marginRight: 16 }}
      onPress={() => navigation.navigate("Login")}
    >
      <Image
        source={require("../../assets/icons/logout.png")}
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  ),

  tabBarIcon: () => (
    <Image
      source={require("../../assets/icons/user.png")}
      style={{ width: 40, height: 40 }}
    />
  ),
});
