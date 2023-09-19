import { View, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { Feather } from "@expo/vector-icons";
import { styles } from "./UserAvatar.styled";

import { storage } from "../../firebase/config";
import { ref, deleteObject } from "firebase/storage";
import { authUpdateUserAvatar } from "../../redux/auth/authOperations";
import { selectUserAvatar } from "../../redux/auth/authSelectors";

export const UserAvatar = ({ handleAvatar }) => {
  const [avatar, setAvatar] = useState(null);
  const avatarUrl = useSelector(selectUserAvatar);

  const dispatch = useDispatch();

  useEffect(() => {
    handleAvatar(avatar);
  }, [avatar]);

  const handleSelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  const handleDeleteAvatar = async () => {
    if (avatar) {
      setAvatar(null);
    }
    if (avatarUrl) {
      const regex = /\/o\/([^%]+)%2F([^?]+)/;
      const match = avatarUrl.match(regex);

      const imageRef = ref(storage, `${match[1]}/${match[2]}`);

      await deleteObject(imageRef);

      await dispatch(authUpdateUserAvatar({ avatarUrl: "" }));
    }
  };

  return (
    <View style={styles.avatarContainer}>
      <Image
        source={{ uri: avatarUrl ? avatarUrl : avatar }}
        style={[styles.avatar, { objectFit: "cover" }]}
      />
      <TouchableOpacity
        style={styles.avatarButtons}
        onPress={avatarUrl || avatar ? handleDeleteAvatar : handleSelectImage}
      >
        {avatarUrl || avatar ? (
          <View
            style={{
              transform: "rotate(-45deg)",
            }}
          >
            <Feather
              name="plus-circle"
              size={24}
              color="#BDBDBD"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 100,
              }}
            />
          </View>
        ) : (
          <Feather name="plus-circle" size={24} color="#FF6C00" />
        )}
      </TouchableOpacity>
    </View>
  );
};
