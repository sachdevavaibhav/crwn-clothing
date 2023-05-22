// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QuerySnapshot} from 'firebase/firestore'


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
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

// Setup firestore database
export const db = getFirestore()

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => { 
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)
  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })
  await batch.commit()
  console.log("done")
}

export const getCategoriesAndDocumnets =  async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const {title, items} = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})
  return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    }
    catch(error) {
      console.log("error creating the user", error.message)
    }
  }
  return userDocRef
}

export const createAuthUserFromEmailAndPassword = async (email, password) => {
  if ((!email) || (!password)) return
  
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInUserFromEmailAndPassword = async (email, password) => {
  if ((!email) || (!password)) return
  
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => {
  return await signOut(auth)
}

export const onAuthStateChangedListner = (callback) => {
  return onAuthStateChanged(auth, callback)
}