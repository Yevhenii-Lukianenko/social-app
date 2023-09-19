import { ScrollView, RefreshControl } from "react-native";
import { styles } from "./PostsScreen.styled";

import { Post } from "../../components/PostItem/Post";
import { useSelector, useDispatch } from "react-redux";
import { selectGetPosts } from "../../redux/posts/postsSelectors";

import { useState } from "react";
import { useEffect } from "react";
import { getAllPosts } from "../../redux/posts/postsOperations";
import { View } from "react-native";

export const PostsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);
  const posts = useSelector(selectGetPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    getPosts();
  }, [dispatch]);

  const getPosts = async () => {
    await dispatch(getAllPosts());
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getPosts();
    setKey(key + 1);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
    >
      <View style={styles.postsList}>
        {posts &&
          posts.map((post) => (
            <Post post={post} withUserInfo={true} key={post.postId + key} />
          ))}
      </View>
    </ScrollView>
  );
};
