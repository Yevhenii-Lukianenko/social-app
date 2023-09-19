import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  commentItem: {
    flexDirection: "row",
    marginBottom: 24,
    columnGap: 16,
  },
  ownerCommentItem: {
    flexDirection: "row-reverse",
  },
  avatar: {
    width: 28,
    height: 28,
    backgroundColor: "#f6f6f6",
    borderRadius: 100,
    overflow: "hidden",
  },
  commentWrapper: {
    padding: 16,
    width: 299,

    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
  },
  commentText: {
    marginBottom: 8,
    fontFamily: "Roboto",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentDate: {
    fontFamily: "Roboto",
    fontSize: 10,
    textAlign: "right",
    color: "#BDBDBD",
  },
  ownerCommentDate: {
    textAlign: "left",
  },
});
