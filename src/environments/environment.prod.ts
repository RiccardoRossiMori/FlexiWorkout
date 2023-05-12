import {initializeApp} from "@firebase/app";
import {getAuth} from "@firebase/auth";
import firestore = firebase.firestore;
import firebase from "firebase/compat";


const firebaseConfig = {
  apiKey: "AIzaSyClH2sZTY1ZOmXcgCK67fMfBwo7KOMEahs",
  authDomain: "flexiworkout-857d1.firebaseapp.com",
  projectId: "flexiworkout-857d1",
  storageBucket: "flexiworkout-857d1.appspot.com",
  messagingSenderId: "72382287894",
  appId: "1:72382287894:web:8aeca1f778b3438fb16537",
  measurementId: "G-3RVPWCPL4J"
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDB = firestore.Firestore;

export const environment = {
  production: true,
  firebaseConfig: firebaseConfig,
  firebaseApp: firebaseApp,
  firebaseAuth: firebaseAuth,
  firebaseDB: firebaseDB,
};
