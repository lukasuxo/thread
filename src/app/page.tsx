"use client";
import React, { useState, useEffect } from "react";
import ThreadsAuthSystem from "../components/auth";
import ThreadsDashboard from "../components/dashboard";
import { User } from "../components/types";
import { User as FirebaseUser } from "firebase/auth";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (user: FirebaseUser) => {
    // Extract email carefully from the FirebaseUser object
    const email = user.email || "";
    
    // Create the User object with required fields
    const userWithId: User = {
      id: Date.now(),
      username: user.displayName || email.split("@")[0] || "User",
      email: email, // email is required and can't be null in your User type
      profileImage: user.photoURL
    };
    
    setCurrentUser(userWithId);
    setIsAuthenticated(true);
    localStorage.setItem("currentUser", JSON.stringify(userWithId));
    console.log("User logged in:", userWithId);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  return (
    <div className="min-h-screen">
      {isAuthenticated && currentUser ? (
        <ThreadsDashboard currentUser={currentUser} onLogout={handleLogout} />
      ) : (
        <ThreadsAuthSystem onLogin={handleLogin} />
      )}
    </div>
  );
}