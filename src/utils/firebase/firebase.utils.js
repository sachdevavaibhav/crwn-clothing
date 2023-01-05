// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZec3Ck6wJ7uHF3vQvIEw_5rkeAfCuUOA",
  authDomain: "crwn-clothing-db-c89b8.firebaseapp.com",
  projectId: "crwn-clothing-db-c89b8",
  storageBucket: "crwn-clothing-db-c89b8.appspot.com",
  messagingSenderId: "507100408279",
  appId: "1:507100408279:web:ae2ca590a8f16c6f450392"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// initialize provider
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)