import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

export const Post = ({ post }) => {
  const navigation = useNavigation();
  const { user, email, avatar, title, locality, comments, photo } = post;

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={avatar}
          style={{ width: 60, height: 60, borderRadius: 16, marginRight: 8 }}
        />
        <View style={styles.userTextContainer}>
          <Text style={styles.userName}>{user}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      <View style={styles.postContainer}>
        <Image
          //   source={{ uri: photo }}
          source={photo}
          style={{ width: 343, height: 240, borderRadius: 8 }}
        />

        <Text style={styles.postTitle}>{title}</Text>

        <View style={styles.aboutPostContainer}>
          <TouchableOpacity
            style={styles.aboutPostContainer}
            onPress={() => navigation.navigate("Comments")}
          >
            <Image
              source={require("../../assets/icons/comment.png")}
              style={{ width: 24, height: 24 }}
            />
            <Text style={styles.commentText}>{comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.aboutPostContainer}
            onPress={() => navigation.navigate("Map")}
          >
            <Image
              source={require("../../assets/icons/mapPin.png")}
              style={{ width: 24, height: 24 }}
            />
            <Text style={styles.localityText}>{locality}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  userContainer: {
    flexDirection: "row",
    marginTop: 32,
    width: 343,
  },
  userTextContainer: { justifyContent: "center" },
  userName: {
    color: "#212121",
    fontSize: 13,
    fontWeight: 700,
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.8)",
    fontSize: 11,
    fontWeight: 400,
  },
  postContainer: { marginTop: 32, gap: 8 },
  postTitle: {
    color: "#212121",
    fontSize: 16,
    fontWeight: 500,
  },
  aboutPostContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  commentText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: 400,
  },
  localityText: {
    color: "#212121",
    textAlign: "right",
    fontSize: 16,
    fontWeight: 400,
    textDecorationLine: "underline",
  },
});
