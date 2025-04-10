"use client";
import React, { useState, useEffect } from "react";
import ThreadsAuthSystem from "../components/auth";
import ThreadsDashboard from "../components/dashboard";
import { User } from "../components/types";

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

  const handleLogin = (user: any) => {
    const userWithId = {
      ...user,
      id: Date.now(),
      username: user.displayName || user.email?.split("@")[0] || "User",
      email: user.email,
      profileImage: user.photoURL || null,
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
