// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb3jwDD0sKe-HQzIioXdYUFurYocKYH6w",
  authDomain: "twitter-clone-4fbe8.firebaseapp.com",
  projectId: "twitter-clone-4fbe8",
  storageBucket: "twitter-clone-4fbe8.appspot.com",
  messagingSenderId: "748157392072",
  appId: "1:748157392072:web:c6263e5dbc7179ea8541fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)