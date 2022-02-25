// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"; 

const config = {
  apiKey: "AIzaSyDXuC5OmRwMPcyYIAsL_ZNlrMNQEXhtm8I",
  authDomain: "crwn-db-9ef9e.firebaseapp.com",
  projectId: "crwn-db-9ef9e",
  storageBucket: "crwn-db-9ef9e.appspot.com",
  messagingSenderId: "345345150407",
  appId: "1:345345150407:web:14e4067c703f0cf81ddde2",
  measurementId: "G-RE0MVPR68S",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

// Initialize Firebase
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
