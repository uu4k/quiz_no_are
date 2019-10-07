import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDNtjUlZaiyQFF9hy3_BwHhnEWdAjfOuRg",
  authDomain: "quiz-no-are.firebaseapp.com",
  databaseURL: "https://quiz-no-are.firebaseio.com",
  projectId: "quiz-no-are",
  storageBucket: "quiz-no-are.appspot.com",
  messagingSenderId: "229838912671",
  appId: "1:229838912671:web:42cb9e9942ad4b73ad36aa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
