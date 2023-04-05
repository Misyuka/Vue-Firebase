import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

let config = {
  apiKey: "AIzaSyCQXKI-P5LNz4MCHyVU1QSTvRksl0nLxqY",
  authDomain: "pklweb2022-ub.firebaseapp.com",
  databaseURL: "https://pklweb2022-ub-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pklweb2022-ub",
  storageBucket: "pklweb2022-ub.appspot.com",
  messagingSenderId: "42155322675",
  appId: "1:42155322675:web:10b5bedc71401815956246"
};



firebase.initializeApp(config);

export const storage = firebase.storage();
export default firebase.firestore();
