import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCFsuMem9UIbFY_O4_4neHY4H8EnZ42IZg",
    authDomain: "crwn-clothing-db-a29d4.firebaseapp.com",
    projectId: "crwn-clothing-db-a29d4",
    storageBucket: "crwn-clothing-db-a29d4.appspot.com",
    messagingSenderId: "866534064898",
    appId: "1:866534064898:web:2f811c8f462f7ab21b781b"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGoogle = () => signInWithPopup(auth, provider);

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth) => {
      const userDocRef = doc(db, 'users', userAuth.uid);

      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();
          
        try {
              await setDoc(userDocRef, {
                  displayName,
                  email,
                  createdAt
              });
          } catch (error) {
              console.log('error creating the user', error);
          }
      }

      return userDocRef;
  }