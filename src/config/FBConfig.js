import * as firebase from 'firebase/app';

// Required for side-effects
require("firebase/database");
require("firebase/storage");
require("firebase/auth");
require("firebase/firestore");

var config = {
    apiKey: "AIzaSyAG2GNgMO9DNTf8VOGbHw5Cj9_gZq2srCE",
    authDomain: "taller-app-dos.firebaseapp.com",
    databaseURL: "https://taller-app-dos.firebaseio.com",
    projectId: "taller-app-dos",
    storageBucket: "taller-app-dos.appspot.com",
    messagingSenderId: "965076101683"
};
  
firebase.initializeApp(config);

export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth =  firebase.auth();