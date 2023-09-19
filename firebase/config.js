// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3J2atAPxyCiZm-ZusVX-PHoRTxpeZVbk",
  authDomain: "rn-social-zhl.firebaseapp.com",
  projectId: "rn-social-zhl",
  storageBucket: "rn-social-zhl.appspot.com",
  messagingSenderId: "290213202031",
  appId: "1:290213202031:web:a33062f3f3435b4582a59a",
  measurementId: "G-4JWKPY3T7N",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
