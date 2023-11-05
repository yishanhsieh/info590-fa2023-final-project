import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
const apiKey = Constants.expoConfig.EXPO_PUBLIC_FIRESTORE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "guesssong-2fd90.firebaseapp.com",
  projectId: "guesssong-2fd90",
  storageBucket: "guesssong-2fd90.appspot.com",
  messagingSenderId: "75073272132",
  appId: "1:75073272132:web:5be246d5a2076c7641bf11",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
