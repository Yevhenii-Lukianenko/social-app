import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ImageBackground, ScrollView, View, Text } from "react-native";
import { styles } from "./ProfileScreen.styled";
import { Logout } from "../../components/Logout/Logout";
import { UserAvatar } from "../../components/UserAvatar/UserAvatar";
import { Post } from "../../components/PostItem/Post";

import { selectUserAllInfo } from "../../redux/auth/authSelectors";
import { uploadPhotoToServer } from "../../utils/uploadPhotoToServer";
import { authUpdateUserAvatar } from "../../redux/auth/authOperations";
import { selectGetPosts } from "../../redux/posts/postsSelectors";

export const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const currentUserInfo = useSelector(selectUserAllInfo);
  const allPosts = useSelector(selectGetPosts);

  useEffect(() => {
    const ownerPosts = allPosts.filter(
      (post) => post.ownerId === currentUserInfo.userId
    );
    setPosts(ownerPosts);
  }, [allPosts]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUserInfo.avatarUrl && avatar) {
      handleUpdateAvatar();
    }
  }, [avatar]);

  const handleAvatar = (avatar) => {
    setAvatar(avatar);
  };

  const handleUpdateAvatar = async () => {
    const avatarUrl = await uploadPhotoToServer(avatar, "avatarsImages");
    await dispatch(authUpdateUserAvatar({ avatarUrl }));
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bgImg.jpg")}
      resizeMode="stretch"
      style={styles.backgroundImg}
    >
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.userContainer}>
            <UserAvatar handleAvatar={handleAvatar} />
            <View style={styles.logoutBtn}>
              <Logout />
            </View>

            <Text style={styles.nickName}>{currentUserInfo.nickName}</Text>
          </View>
          <View>
            {posts &&
              posts.map((post) => <Post post={post} key={post.postId} />)}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
