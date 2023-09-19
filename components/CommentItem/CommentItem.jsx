import { useState, useEffect } from "react";

import { View, Image, Text } from "react-native";
import { styles } from "./CommentItem.styled";

import { getInfoAboutUser } from "../../redux/auth/authOperations";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const CommentItem = ({ comment, ownerId }) => {
  const [author, setAuthor] = useState(null);
  const { authorId, comment: text, time } = comment;

  const formatedTime = format(new Date(time), "d MMMM, yyyy | HH:mm", {
    locale: enUS,
  });

  const ownerComment = ownerId === authorId;

  const fetchOwnerInfo = async () => {
    const result = await getInfoAboutUser(authorId);
    setAuthor(result.data());
  };

  useEffect(() => {
    if (!author) {
      fetchOwnerInfo();
    }
  }, [author, authorId]);

  return (
    <>
      {author && (
        <View
          style={[styles.commentItem, ownerComment && styles.ownerCommentItem]}
        >
          <Image source={{ uri: author.avatarUrl }} style={styles.avatar} />
          <View style={styles.commentWrapper}>
            <Text style={styles.commentText}>{text}</Text>
            <Text
              style={[
                styles.commentDate,
                ownerComment && styles.ownerCommentDate,
              ]}
            >
              {formatedTime}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};
