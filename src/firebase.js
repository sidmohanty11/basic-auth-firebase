import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEAb7sW4MK4PxiDmv6oKnSMdIzbJhrWf4",
  authDomain: "lol2-a6bf2.firebaseapp.com",
  projectId: "lol2-a6bf2",
  storageBucket: "lol2-a6bf2.appspot.com",
  messagingSenderId: "1001171820938",
  appId: "1:1001171820938:web:77de586a6859d633dc6873",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;
