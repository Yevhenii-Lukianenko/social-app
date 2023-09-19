import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./PostItem.styled";
import { getInfoAboutUser } from "../../redux/auth/authOperations";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import { updatePostLike } from "../../redux/posts/postsOperations";
import { selectUserId } from "../../redux/auth/authSelectors";
import { useDispatch, useSelector } from "react-redux";

export const Post = ({ post, withUserInfo }) => {
  const [owner, setOwner] = useState(null);
  const currentUserId = useSelector(selectUserId);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    postTitle,
    locationName,
    location,
    comments,
    likes,
    imageUrl,
    ownerId,
    postId,
  } = post;

  const isLike = likes.includes(currentUserId);

  const handleUpdateLike = async () => {
    await dispatch(updatePostLike(postId, currentUserId));
  };

  const fetchOwnerInfo = async () => {
    const result = await getInfoAboutUser(ownerId);
    setOwner(result.data());
  };

  useEffect(() => {
    if (ownerId && !owner) {
      fetchOwnerInfo();
    }
  }, [owner, ownerId]);

  return (
    <View>
      {owner && (
        <View style={styles.container}>
          {withUserInfo && (
            <View style={styles.userContainer}>
              <Image
                source={{ uri: owner.avatarUrl }}
                style={styles.userAvatar}
              />
              <View style={styles.userTextContainer}>
                <Text style={styles.userName}>{owner.nickName}</Text>
                <Text>{owner.userEmail}</Text>
              </View>
            </View>
          )}
          <View style={styles.postContainer}>
            <Image source={{ uri: imageUrl }} style={styles.postPhoto} />

            {postTitle && <Text style={styles.postTitle}>{postTitle}</Text>}

            <View style={styles.aboutPostContainer}>
              <TouchableOpacity
                style={styles.aboutPostContainer}
                onPress={() => navigation.navigate("Comments", { post })}
              >
                <Feather
                  name="message-circle"
                  size={24}
                  color={comments.length > 0 ? "#FF6C00" : "#BDBDBD"}
                />
                <Text
                  style={[
                    styles.commentText,
                    { color: comments.length > 0 ? "#FF6C00" : "#BDBDBD" },
                  ]}
                >
                  {comments.length}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.aboutPostContainer, { marginLeft: 24 }]}
                onPress={() => handleUpdateLike()}
              >
                <Feather
                  name="thumbs-up"
                  size={24}
                  color={isLike ? "#FF6C00" : "#BDBDBD"}
                />
                <Text style={{ color: isLike ? "#FF6C00" : "#BDBDBD" }}>
                  {likes.length}
                </Text>
              </TouchableOpacity>

              {locationName && (
                <TouchableOpacity
                  style={[styles.aboutPostContainer, { marginLeft: "auto" }]}
                  onPress={() => {
                    if (location.latitude) {
                      navigation.navigate("Map", { location });
                    }
                  }}
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  {locationName && (
                    <Text style={styles.localityText}>{locationName}</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
