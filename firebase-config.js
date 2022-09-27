import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBaihfplelF3Tqu1h3d0GWeGvOhfD7zLIs",
  authDomain: "durbar-979df.firebaseapp.com",
  projectId: "durbar-979df",
  storageBucket: "durbar-979df.appspot.com",
  messagingSenderId: "744836037059",
  appId: "1:744836037059:web:4acf4154de681d5bb4e576",
  measurementId: "G-SG31WXXYBR",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
