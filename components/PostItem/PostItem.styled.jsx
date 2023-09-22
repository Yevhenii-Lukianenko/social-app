import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  userContainer: {
    flexDirection: "row",
    marginTop: 32,
    width: 343,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#F6F6F6",
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
  postPhoto: { width: 343, height: 240, borderRadius: 8 },
  postTitle: {
    color: "#212121",
    fontSize: 16,
    fontWeight: 500,
  },
  aboutPostContainer: {
    flexDirection: "row",
    gap: 4,
  },
  commentText: {
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
