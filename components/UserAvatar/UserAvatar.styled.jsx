import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  avatarContainer: {
    position: "absolute",
    zIndex: 10,
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {
    flex: 1,
    objectFit: "cover",
    borderRadius: 16,
  },
  avatarButtons: { position: "absolute", bottom: 14, right: -12.5 },
  avatarIcon: { width: 24, height: 24 },
});
