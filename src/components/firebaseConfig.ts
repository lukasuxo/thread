import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWEpVV5vCdkXGJCFHe0_RbWuMRD91NeAo",
  authDomain: "threads-clone-b0b95.firebaseapp.com",
  projectId: "threads-clone-b0b95",
  storageBucket: "threads-clone-b0b95.firebasestorage.app",
  messagingSenderId: "23332405839",
  appId: "1:23332405839:web:adce8ed896f3deb737e03a",
  measurementId: "G-RZMG79L659",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// let analytics;

// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }

export const registerUser = async (
  email: string,
  password: string,
  username: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: username,
      });
    }
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export default app;
