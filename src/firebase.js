import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFyvP6Ey7oKZxOJRdGsG81uhWnEGHALW4",
    authDomain: "pickngo-a696f.firebaseapp.com",
    // databaseURL:"https://pickngo-a696f-default-rtdb.firebaseio.com/",
    projectId: "pickngo-a696f",
    storageBucket: "pickngo-a696f.appspot.com",
    messagingSenderId: "197407474333",
    appId: "1:197407474333:web:7d0d8ddc31b42652a10a74",
    measurementId: "G-TDGGP8ET9L"
  }

  const fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.firestore();