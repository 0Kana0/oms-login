import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDKXppw9y8J_Hxw8i5Ra7EaPOxojccPwgY",
  authDomain: "oms-login-e844a.firebaseapp.com",
  projectId: "oms-login-e844a",
  storageBucket: "oms-login-e844a.appspot.com",
  messagingSenderId: "805212454407",
  appId: "1:805212454407:web:e9627009bb1a04c4bab4a2"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()