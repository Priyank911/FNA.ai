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


// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyC30OywaJlkOJVyx9WYtU1XvWnxBhcw5Og",
//   authDomain: "fnaai-1c002.firebaseapp.com",
//   projectId: "fnaai-1c002",
//   storageBucket: "fnaai-1c002.appspot.com",
//   messagingSenderId: "1076450820888",
//   appId: "1:1076450820888:web:ba426401d4f1a0d3f0546d"
// };

// const firebaseApp = initializeApp(firebaseConfig);


// const db = getFirestore(firebaseApp);

// export { db };

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC30OywaJlkOJVyx9WYtU1XvWnxBhcw5Og",
  authDomain: "fnaai-1c002.firebaseapp.com",
  projectId: "fnaai-1c002",
  storageBucket: "fnaai-1c002.appspot.com",
  messagingSenderId: "807643330273", 
  appId: "1:807643330273:web:215de034e4a2a4b3a2b632",
  measurementId: "G-Y3G3KN1CQG"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

