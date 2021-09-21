// import * as firebase from 'firebase';
// import "firebase/auth";
// require('firebase/firestore')

// const firebaseConfig = {
//     apiKey: "AIzaSyCwpfb29kEmGgL4OAjphK7kuSZGkiHQIzQ",
//     authDomain: "insta-clone-tutorial.firebaseapp.com",
//     databaseURL: "https://insta-clone-tutorial.firebaseio.com",
//     projectId: "insta-clone-tutorial",
//     storageBucket: "insta-clone-tutorial.appspot.com",
//     messagingSenderId: "957078760992",
//     appId: "1:957078760992:web:34cfe5e37e14d7d1a55645"
// };
//   // Initialize Firebase

// firebase.initializeApp(firebaseConfig)

// const db = firebase.firestore()

// export default db;



import * as firebase from 'firebase'
import 'firebase/auth';
require('firebase/firestore');
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBkdv-1o7unxsO6fxH2habzBWAJ_0ltn0M",
    authDomain: "insta-clone-baeeb.firebaseapp.com",
    projectId: "insta-clone-baeeb",
    storageBucket: "insta-clone-baeeb.appspot.com",
    messagingSenderId: "995929324118",
    appId: "1:995929324118:web:343a8e5c54182723b759f7",
    measurementId: "G-DVJ5F25HB2"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;