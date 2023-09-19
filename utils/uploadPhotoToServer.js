import { nanoid } from "nanoid/non-secure";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadPhotoToServer = async (photo, storagePage) => {
  const response = await fetch(photo);
  const file = await response.blob();

  const uniquePostId = nanoid();

  const imageRef = ref(storage, `${storagePage}/${uniquePostId}`);
  await uploadBytes(imageRef, file);
  const imageUrl = await getDownloadURL(imageRef);

  return imageUrl;
};
