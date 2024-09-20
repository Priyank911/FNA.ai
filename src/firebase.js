// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyC30OywaJlkOJVyx9WYtU1XvWnxBhcw5Og",
//   authDomain: "fnaai-1c002.firebaseapp.com",
//   projectId: "fnaai-1c002",
//   storageBucket: "fnaai-1c002.appspot.com",
//   messagingSenderId: "1076450820888",
//   appId: "1:1076450820888:web:ba426401d4f1a0d3f0546d"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);


// const db = firebaseApp.firestore();

// export { db };


import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC30OywaJlkOJVyx9WYtU1XvWnxBhcw5Og",
  authDomain: "fnaai-1c002.firebaseapp.com",
  projectId: "fnaai-1c002",
  storageBucket: "fnaai-1c002.appspot.com",
  messagingSenderId: "1076450820888",
  appId: "1:1076450820888:web:ba426401d4f1a0d3f0546d"
};

const firebaseApp = initializeApp(firebaseConfig);


const db = getFirestore(firebaseApp);

export { db };

