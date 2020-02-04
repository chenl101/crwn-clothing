import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBcD2yVcq_G-TYItqW9Dno9VFTAFMNrOMU",
    authDomain: "crwn-db-57f9a.firebaseapp.com",
    databaseURL: "https://crwn-db-57f9a.firebaseio.com",
    projectId: "crwn-db-57f9a",
    storageBucket: "crwn-db-57f9a.appspot.com",
    messagingSenderId: "828604923471",
    appId: "1:828604923471:web:d023745c5a80cbdda1f43a",
    measurementId: "G-XK0QDG5KGJ"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // const userRef = firestore.doc('users/2131sbcjw');
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  // console.log(snapShot);
  if (!snapShot.exists) {// !!! if not exist, create user profile in database!
      const { displayName, email } = userAuth;
      const createAt = new Date();

    try {
      await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  
  return userRef;
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


