// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURI: "http://localhost:4200/",
  firebaseConfig: {
    apiKey: "AIzaSyAM0OMduMLIiBzBGyJ0QOV32lBj4wYvf10",
    authDomain: "india-covid-19.firebaseapp.com",
    databaseURL: "https://india-covid-19.firebaseio.com",
    projectId: "india-covid-19",
    storageBucket: "india-covid-19.appspot.com",
    messagingSenderId: "160953353240",
    appId: "1:160953353240:web:f89cb4ee29faf379812f6d",
    measurementId: "G-Y76YBXQDCR"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
