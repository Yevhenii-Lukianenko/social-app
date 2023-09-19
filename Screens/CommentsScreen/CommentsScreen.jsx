import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid/non-secure";

import {
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  TextInput,
  Keyboard,
  FlatList,
} from "react-native";
import { styles } from "./CommentsScreen.styled";
import { CommentItem } from "../../components/CommentItem/CommentItem";
import { Feather } from "@expo/vector-icons";

import { addPostComment } from "../../redux/posts/postsOperations";
import { selectUserId } from "../../redux/auth/authSelectors";

export const CommentsScreen = ({ route }) => {
  const [allComments, setAllComments] = useState(null);
  const [commentText, setCommentText] = useState("");
  const { imageUrl, comments, ownerId, postId } = route.params.post;
  const authorId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    setAllComments(comments);
  }, [comments]);

  const createComment = async () => {
    if (commentText) {
      const newComment = {
        time: new Date().toISOString(),
        comment: commentText,
        authorId: authorId,
        commentId: nanoid(),
      };
      dispatch(addPostComment({ newComment, postId }));
      setAllComments((prevComments) => [...prevComments, newComment]);
      setCommentText("");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        keyboardVerticalOffset={-150}
        style={styles.container}
      >
        <Image style={styles.postImage} source={{ uri: imageUrl }} />
        <View style={{ flex: 1 }}>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <CommentItem comment={item} ownerId={ownerId} />
            )}
            keyExtractor={(item) => item.commentId.toString()}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Коментувати..."
              placeholderTextColor="#bdbdbd"
              autoComplete="off"
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.sendBtn}
              onPress={createComment}
            >
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
