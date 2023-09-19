import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 150,
    paddingTop: 22,
    paddingBottom: 22,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: 650,
  },
  userContainer: {
    alignItems: "center",
  },
  logoutBtn: { marginLeft: "auto", marginBottom: 46 },
  nickName: {
    color: "#212121",
    fontSize: 30,
    fontWeight: 500,
    letterSpacing: 0.3,
  },
});
