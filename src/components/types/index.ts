import { User as FirebaseUser } from "firebase/auth";

export interface User {
  id: number;
  username: string;
  email: string;
  profileImage?: string | null;
}

export interface Comment {
  id: number;
  username: string;
  content: string;
  timestamp: string;
}

export interface AuthUser {
  displayName?: string | null;
  email: string;
  photoURL?: string | null;
}

export interface Post {
  id: number;
  username: string;
  handle: string;
  timePosted: string;
  content: string;
  image: string | null;
  likes: number;
  replies: number;
  reposts: number;
  isVerified: boolean;
  comments: Comment[];
  isLiked: boolean;
  userId?: number;
  editTimestamp?: string;
}

export interface SuggestedUser {
  id: number;
  username: string;
  isFollowing: boolean;
}

export interface ThreadsDashboardProps {
  currentUser: User;
  onLogout: () => void;
}

export interface ThreadsAuthSystemProps {
  onLogin: (user: FirebaseUser) => void;
}

export type Language = "en" | "ka";
export type ActiveScreen = "login" | "register" | "forgotPassword";
export type ActiveTab = "home" | "search" | "create" | "activity" | "profile";
