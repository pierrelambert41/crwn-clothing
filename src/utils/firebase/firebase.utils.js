import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword 
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

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
      const userDocRef = doc(db, 'users', userAuth.uid);

      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();
          
        try {
              await setDoc(userDocRef, {
                  displayName,
                  email,
                  createdAt,
                  ...additionalInformation
              });
          } catch (error) {
              console.log('error creating the user', error);
          }
      }

      return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
      if (!email || !password) return;
      return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}