import { StyleSheet, ScrollView } from "react-native";

import { Post } from "./Post";

export const PostsScreen = () => {
  const examplePost = {
    user: "Johny Makarony",
    email: "johnymakarony@gmail.com",
    avatar: require("../../assets/images/bgImg.jpg"),
    title: "good luck",
    locality: "Ukraine",
    comments: "0",
    photo: require("../../assets/images/bgImg.jpg"),
  };

  return (
    <ScrollView style={styles.container}>
      <Post post={examplePost} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
