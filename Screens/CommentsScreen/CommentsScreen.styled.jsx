import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    padding: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  postImage: {
    marginBottom: 32,
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  inputContainer: {
    marginTop: "auto",
  },
  commentInput: {
    width: 343,
    height: 50,
    paddingLeft: 16,
    paddingRight: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  sendBtn: {
    position: "absolute",
    top: 8,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    backgroundColor: "tomato",
    borderRadius: 100,
  },
});
