import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUCU1DMnkt0XP8U56o56OdFDB1KrBEs0M",
  authDomain: "jointhegame-2bd1f.firebaseapp.com",
  projectId: "jointhegame-2bd1f",
  storageBucket: "jointhegame-2bd1f.appspot.com",
  messagingSenderId: "644574291432",
  appId: "1:644574291432:web:55acb11c8b1df3be06b05d"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };