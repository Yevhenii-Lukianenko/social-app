import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState({
    name: "",
    locality: "",
  });
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

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
        console.log("latitude:", location.coords.latitude);
        console.log("longitude:", location.coords.longitude);

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

  const sendPost = () => {
    if (photo) {
      navigation.navigate("Publications", { photo });
      console.log(photo);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/icons/arrow.png")}
              style={[
                styles.icons,
                {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                },
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Posts</Text>
        </View>
      </View>

      <View style={styles.photoContainer}>
        {!photo ? (
          <Camera style={styles.photoContent} ref={setCamera}>
            <TouchableOpacity style={styles.cameraIcon} onPress={takePhoto}>
              <Image
                source={require("../../assets/icons/camera.png")}
                style={styles.icons}
              />
            </TouchableOpacity>
          </Camera>
        ) : (
          <Image
            source={{ uri: photo }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
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
          value={state["name"]}
          onChangeText={(value) => handleChange("name", value)}
          style={[
            styles.textInput,
            { borderColor: "#E8E8E8", borderBottomWidth: 1 },
          ]}
        ></TextInput>

        <View style={styles.locationInput}>
          <Image
            source={require("../../assets/icons/mapPin.png")}
            style={styles.icons}
          />
          <TextInput
            placeholder="Locality..."
            value={state["locality"]}
            onChangeText={(value) => handleChange("locality", value)}
            style={styles.textInput}
          ></TextInput>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.publishButton, photo ? styles.activeButton : null]}
        onPress={sendPost}
      >
        <Text style={[styles.btnText, photo ? styles.activeBtnText : null]}>
          Опублікувати
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setPhoto("")} style={styles.btnTrash}>
        <Image
          source={require("../../assets/icons/trash.png")}
          style={styles.icons}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  header: {
    paddingTop: 54,
    paddingBottom: 11,
    flexDirection: "row",
    alignItems: "flex-end",
    width: 343,
  },
  headerTitle: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#212121",
    fontSize: 17,
    fontWeight: 500,
  },
  photoContainer: {
    marginTop: 122,
    width: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  photoContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  cameraIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  underPhotoButton: {
    marginTop: 8,
    width: 343,
  },
  underPhotoButtonText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
  },
  textInput: {
    width: 343,
    height: 50,
  },
  icons: { width: 24, height: 24 },
  locationInput: {
    marginTop: 16,
    height: 50,
    width: 343,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  publishButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    width: 343,
    height: 50,
    backgroundColor: "#E8E8E8",
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: "#FF6C00",
  },
  btnText: {
    color: "#BDBDBD",
  },
  activeBtnText: {
    color: "#fff",
  },
  btnTrash: {
    marginTop: "auto",
    marginBottom: 34,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    backgroundColor: "#f6f6f6",
    borderRadius: 20,
  },
});
