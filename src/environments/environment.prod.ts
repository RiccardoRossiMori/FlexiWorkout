import {initializeApp} from "@firebase/app";
import {getAuth} from "@firebase/auth";
import firestore = firebase.firestore;
import firebase from "firebase/compat";
import {defaultEnvironment} from "./environment.default";



//const firebaseApp = initializeApp(firebaseConfig);
//const firebaseAuth = getAuth(firebaseApp);
//const firebaseDB = firestore.Firestore;

export const environment = {
  production: true,
  ...defaultEnvironment
  // firebaseConfig: firebaseConfig,
  // firebaseApp: firebaseApp,
  // firebaseAuth: firebaseAuth,
  // firebaseDB: firebaseDB,
};
