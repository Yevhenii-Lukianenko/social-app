import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PostsScreen } from "../PostsScreen/PostsScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { Logout } from "../../components/Logout/Logout";
import { Feather } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  return (
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
};

const mainTabsOptions = {
  headerStyle: {
    borderBottomWidth: 1,
  },
  headerTitleStyle: {
    color: "#212121",
    fontSize: 17,
    fontWeight: 500,
  },
  headerTitleAlign: "center",
  tabBarStyle: { height: 60, paddingTop: 9, paddingLeft: 50, paddingRight: 50 },
  tabBarShowLabel: false,
  tabBarActiveBackgroundColor: "#FF6C00",
  tabBarItemStyle: { borderRadius: 50, height: 40 },
};

const postsOptions = () => ({
  headerRight: () => <Logout />,

  tabBarIcon: () => <Feather name="grid" size={24} color="black" />,
});

const createPostsOptions = {
  tabBarIcon: () => <Feather name="plus" size={24} color="black" />,
  tabBarStyle: { display: "none" },
  headerShown: false,
};

const profileOptions = () => ({
  headerShown: false,
  tabBarIcon: () => <Feather name="user" size={24} color="black" />,
});
