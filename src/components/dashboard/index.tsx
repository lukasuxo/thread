import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ThreadsDashboardProps,
  ActiveTab,
  Post as PostType,
} from "../../components/types";
import Post from "./Post";
import Sidebar from "./Sidebar";
import CreatePostModal from "./CreatePostModal";
import ProfileSection from "./ProfileSection";
import SearchBar from "./SearchBar";
import ActivityFeed from "./ActivityFeed";
import { usePosts } from "../../components/hooks/usePosts";

const threadsLogo = "";

const ThreadsDashboard: React.FC<ThreadsDashboardProps> = ({
  currentUser,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("ლუკა სუხიაშვილი");
  const [userHandle, setUserHandle] = useState<string>("@Luka Sukhiashvili");
  const [userBio, setUserBio] = useState<string>("თრიდსის მომხმარებელი");
  const [showCreatePostModal, setShowCreatePostModal] =
    useState<boolean>(false);
  const [editingProfile, setEditingProfile] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const postMenuRef = useRef<HTMLDivElement>(null);

  const {
    posts,
    selectedPost,
    showComments,
    showPostMenu,
    editingPost,
    editPostContent,
    editPostImage,
    newPostContent,
    newPostImage,
    commentContent,
    setPosts,
    setSelectedPost,
    setShowComments,
    setShowPostMenu,
    setEditingPost,
    setEditPostContent,
    setEditPostImage,
    setNewPostContent,
    setNewPostImage,
    setCommentContent,
    handleCreatePost,
    handleLike,
    handleComment,
    handleDeletePost,
    handleStartEditPost,
    handleSaveEditPost,
    handleCancelEditPost,
    handlePostImageUpload,
  } = usePosts(userName, userHandle);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.profileImage) {
        setProfileImage(currentUser.profileImage);
      }

      if (currentUser.username) {
        setUserName(currentUser.username);
        setUserHandle(`@${currentUser.username}`);
      }
    } else {
      const storedProfileImage = localStorage.getItem("profileImage");
      if (storedProfileImage) {
        setProfileImage(storedProfileImage);
      }

      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }

      const storedUserHandle = localStorage.getItem("userHandle");
      if (storedUserHandle) {
        setUserHandle(storedUserHandle);
      }
    }

    const storedUserBio = localStorage.getItem("userBio");
    if (storedUserBio) {
      setUserBio(storedUserBio);
    }

    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme) {
      setDarkMode(storedTheme === "true");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("profileImage", profileImage || "");
    localStorage.setItem("userName", userName);
    localStorage.setItem("userHandle", userHandle);
    localStorage.setItem("userBio", userBio);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [profileImage, userName, userHandle, userBio, darkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        postMenuRef.current &&
        !postMenuRef.current.contains(event.target as Node)
      ) {
        setShowPostMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  const handleImageUpload = (file: File) => {
    if (file) {
      document.body.style.cursor = "wait";
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setNewPostImage(event.target.result as string);
          document.body.style.cursor = "default";
        }
      };
      reader.onerror = () => {
        document.body.style.cursor = "default";
      };
      reader.readAsDataURL(file);
    }
  };

  const renderPost = (post: PostType) => {
    return (
      <Post
        key={post.id}
        post={post}
        profileImage={profileImage}
        onLike={handleLike}
        onComment={handleComment}
        onStartEdit={handleStartEditPost}
        onSaveEdit={handleSaveEditPost}
        onCancelEdit={handleCancelEditPost}
        onDelete={handleDeletePost}
        editingPost={editingPost}
        editPostContent={editPostContent}
        setEditPostContent={setEditPostContent}
        showPostMenu={showPostMenu}
        setShowPostMenu={setShowPostMenu}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        showComments={showComments}
        setShowComments={setShowComments}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
      />
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto"
          >
            <div className="flex justify-center border-b border-gray-800 py-3">
              <h1 className="text-white text-xl font-bold">Home</h1>
            </div>

            <div className="space-y-4">
              {posts.length > 0 ? (
                posts.map((post) => renderPost(post))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">
                    ჯერ არ გაქვთ პოსტები. შექმენით პირველი პოსტი!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        );
      case "search":
        return (
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            posts={posts}
            renderPost={renderPost}
          />
        );
      case "profile":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto"
          >
            <ProfileSection
              userName={userName}
              userHandle={userHandle}
              userBio={userBio}
              profileImage={profileImage}
              editingProfile={editingProfile}
              setEditingProfile={setEditingProfile}
              onLogout={onLogout}
            />

            <div className="space-y-4 p-4">
              {posts.length > 0 ? (
                posts.map((post) => renderPost(post))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">
                    ჯერ არ გაქვთ პოსტები. შექმენით პირველი პოსტი!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        );
      case "activity":
        return <ActivityFeed />;
      case "create":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto p-4"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700"></div>
                )}
              </div>
              <div className="flex-grow">
                <textarea
                  placeholder="ახალი პოსტი..."
                  className="w-full h-32 bg-transparent border-none outline-none text-white resize-none"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                ></textarea>

                {newPostImage && (
                  <div className="mt-2 relative">
                    <img
                      src={newPostImage}
                      alt="Post preview"
                      className="w-full max-h-60 object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
                      onClick={() => setNewPostImage(null)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-2">
                    <label className="cursor-pointer text-gray-400 hover:text-white">
                      <div
                        onClick={() => {
                          if (
                            document.createElement("input").capture !==
                            undefined
                          ) {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.capture = "environment";
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement)
                                .files?.[0];
                              if (file) handleImageUpload(file);
                            };
                            input.click();
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </div>
                    </label>
                  </div>
                  <button
                    className="px-4 py-1 bg-white text-black rounded-full text-sm font-medium disabled:opacity-50"
                    disabled={!newPostContent.trim() && !newPostImage}
                    onClick={() => {
                      handleCreatePost();
                      setActiveTab("home");
                    }}
                  >
                    პოსტი
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-800 pt-4">
              <p className="text-gray-500 text-sm">
                თქვენი პოსტი ასევე გაზიარდება თქვენს პროფილზე
              </p>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 text-center"
          >
            <p className="text-white">Coming Soon</p>
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black flex overflow-hidden"
    >
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreatePost={() => setShowCreatePostModal(true)}
        threadsLogo={threadsLogo}
      />

      <div className="flex-grow bg-black text-white ml-16 sm:ml-20">
        {renderContent()}
      </div>

      <CreatePostModal
        isOpen={showCreatePostModal}
        onClose={() => setShowCreatePostModal(false)}
        newPostContent={newPostContent}
        setNewPostContent={setNewPostContent}
        newPostImage={newPostImage}
        setNewPostImage={setNewPostImage}
        onCreatePost={handleCreatePost}
        profileImage={profileImage}
      />
    </motion.div>
  );
};

export default ThreadsDashboard;
