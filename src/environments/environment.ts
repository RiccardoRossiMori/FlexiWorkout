// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {getAuth} from "@firebase/auth";
import {initializeApp} from "@firebase/app";
//import {Firestore} from "firebase";
import { Firestore } from 'firebase/firestore';

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
export const firebaseAuth = getAuth(firebaseApp);
const firebaseDB = Firestore;
export const environment = {
  production: false,
  firebaseConfig: firebaseConfig,
  firebaseApp: firebaseApp,
  firebaseAuth: firebaseAuth,
  firebaseDB: firebaseDB,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 *
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
