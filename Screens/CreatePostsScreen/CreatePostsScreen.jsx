import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid/non-secure";

import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "./CreatePostsScreen.styled";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { uploadPhotoToServer } from "../../utils/uploadPhotoToServer";
import { selectUserAllInfo } from "../../redux/auth/authSelectors";
import { addPost } from "../../redux/posts/postsOperations";

export const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState({
    postTitle: "",
    locationName: "",
    location: {},
  });
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const owner = useSelector(selectUserAllInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      try {
        const { uri } = await camera.takePictureAsync();
        await MediaLibrary.createAssetAsync(uri);
        const location = await Location.getCurrentPositionAsync();
        setState({
          ...state,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        });
        setPhoto(uri);
      } catch (error) {
        console.log("Error > ", error.message);
      }
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  const handleChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const sendPost = async () => {
    if (photo) {
      const imageUrl = await uploadPhotoToServer(photo, "postsImages");

      const data = {
        ...state,
        imageUrl,
        comments: [],
        likes: [],
        ownerId: owner.userId,
        ownerAvatar: owner.avatarUrl,
        ownerName: owner.nickName,
        ownerEmail: owner.userEmail,
        postId: nanoid(),
      };

      await dispatch(addPost({ data }));

      navigation.navigate("Publications", { photo });
      setState({
        postTitle: "",
        locationName: "",
        location: {},
      });
      setPhoto("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather
              name="arrow-left"
              size={24}
              color="black"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Posts</Text>
        </View>
      </View>

      <View style={styles.photoContainer}>
        {!photo ? (
          <Camera style={styles.photoContent} ref={setCamera}>
            <TouchableOpacity style={styles.cameraIcon} onPress={takePhoto}>
              <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
        ) : (
          <Image
            source={{ uri: photo }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        )}
      </View>

      {!photo && (
        <TouchableOpacity style={styles.underPhotoButton} onPress={selectImage}>
          <Text style={styles.underPhotoButtonText}>Upload a photo</Text>
        </TouchableOpacity>
      )}

      <View style={{ marginTop: 32 }}>
        <TextInput
          placeholder="Name..."
          value={state["postTitle"]}
          onChangeText={(value) => handleChange("postTitle", value)}
          style={[
            styles.textInput,
            { borderColor: "#E8E8E8", borderBottomWidth: 1 },
          ]}
        ></TextInput>

        <View style={styles.locationInput}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <TextInput
            placeholder="Locality..."
            value={state["locationName"]}
            onChangeText={(value) => handleChange("locationName", value)}
            style={styles.textInput}
          ></TextInput>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.publishButton, photo ? styles.activeButton : null]}
        onPress={sendPost}
      >
        <Text style={[styles.btnText, photo ? styles.activeBtnText : null]}>
          Publish
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setPhoto("")} style={styles.btnTrash}>
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};
