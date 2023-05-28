// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {getAuth} from "@firebase/auth";
import {initializeApp} from "@firebase/app";
//import {Firestore} from "firebase";
import { Firestore } from 'firebase/firestore';
import {defaultEnvironment} from "./environment.default";

//const firebaseApp = initializeApp(firebaseConfig);
//export const firebaseAuth = getAuth(firebaseApp);
//const firebaseDB = Firestore;
export const environment = {
  production: false,
  ...defaultEnvironment,
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
