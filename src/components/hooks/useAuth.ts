import { useState, useEffect } from "react";
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  onAuthStateChange,
} from "../firebaseConfig";
import { User as FirebaseUser } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const user = await loginUser(email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      return { success: true, user };
    } catch (error) {
      const firebaseError = error as FirebaseError;
      let errorMessage = "Authentication error occurred";

      if (
        firebaseError.code === "auth/user-not-found" ||
        firebaseError.code === "auth/wrong-password"
      ) {
        errorMessage = "Incorrect password";
      } else if (firebaseError.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later";
      }

      setErrors({ password: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      setLoading(true);
      const user = await registerUser(email, password, username);
      setCurrentUser(user);
      setIsAuthenticated(true);
      return { success: true, user };
    } catch (error) {
      const firebaseError = error as FirebaseError;
      let errorMessage = "Authentication error occurred";

      if (firebaseError.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      } else if (firebaseError.code === "auth/invalid-email") {
        errorMessage = "Invalid email format";
      }

      setErrors({ email: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (email: string) => {
    try {
      setLoading(true);
      await resetPassword(email);
      return { success: true };
    } catch (error) {
      const firebaseError = error as FirebaseError;
      let errorMessage = "Authentication error occurred";

      if (firebaseError.code === "auth/user-not-found") {
        errorMessage = "No user found with this email";
      }

      setErrors({ resetEmail: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: "Logout failed" };
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    currentUser,
    isAuthenticated,
    errors,
    loading,
    handleLogin,
    handleRegister,
    handlePasswordReset,
    handleLogout,
    clearErrors,
  };
};
