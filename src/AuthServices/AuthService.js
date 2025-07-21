// AuthService.js

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signOut, 
  deleteUser, 
  sendEmailVerification
} from "firebase/auth";

import { getDatabase, ref, remove } from "firebase/database";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAh3SD9ftUJOMRCoQsfue5EADd7ZM7zDEg",
  authDomain: "expenselist-2f469.firebaseapp.com",
  databaseURL: "https://expenselist-2f469-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expenselist-2f469",
  storageBucket: "expenselist-2f469.firebasestorage.app",
  messagingSenderId: "342339514079",
  appId: "1:342339514079:web:ce8527b38bd0d01fc8836a"
};

// Initialize Firebase app and services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Function to signup user
const signupUser = async (email, password) => {
 try {
  const UserCredentials = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(UserCredentials.user);
  return UserCredentials;
  
 } catch (error) {
  throw error;
  
 }
};

// Function to logout user
const logoutUser = () => {
  return signOut(auth);
};

//  Function to delete user data and account
const deleteCurrentUserAndData = async (uid) => {
  try {
    // Delete user data from Realtime Database
    await remove(ref(db, `users/${uid}`));

    // Delete user from Auth
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
    } else {
      throw new Error("No user is currently logged in");
    }
  } catch (error) {
    throw error;
  }
};

// Exporting functions and auth instance
export { auth, signupUser, logoutUser, deleteCurrentUserAndData };
