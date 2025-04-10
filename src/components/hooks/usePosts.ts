import { useState, useEffect } from "react";
import { Post, Comment } from "../types";

export const usePosts = (userName: string, userHandle: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showPostMenu, setShowPostMenu] = useState<number | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editPostContent, setEditPostContent] = useState<string>("");
  const [editPostImage, setEditPostImage] = useState<string | null>(null);
  const [newPostContent, setNewPostContent] = useState<string>("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState<string>("");

  useEffect(() => {
    const storedPosts = localStorage.getItem("userPosts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userPosts", JSON.stringify(posts));
  }, [posts]);

  const handleCreatePost = () => {
    if (!newPostContent.trim() && !newPostImage) return;

    const newPost: Post = {
      id: Date.now(),
      username: userName,
      handle: userHandle,
      timePosted: "ახლახანს",
      content: newPostContent,
      image: newPostImage,
      likes: 0,
      replies: 0,
      reposts: 0,
      isVerified: false,
      comments: [],
      isLiked: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostImage(null);
  };

  const handleLike = (postId: number) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          const newLikes = post.isLiked ? post.likes - 1 : post.likes + 1;
          return { ...post, likes: newLikes, isLiked: !post.isLiked };
        }
        return post;
      })
    );
  };

  const handleComment = (postId: number) => {
    if (!commentContent.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      username: userName,
      content: commentContent,
      timestamp: "ახლახანს",
    };

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment],
            replies: post.replies + 1,
          };
        }
        return post;
      })
    );

    setCommentContent("");
    setShowComments(false);
  };

  const handleDeletePost = (postId: number) => {
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));
    setShowPostMenu(null);
  };

  const handleStartEditPost = (post: Post) => {
    setEditingPost(post);
    setEditPostContent(post.content);
    setEditPostImage(post.image);
    setShowPostMenu(null);
  };

  const handleSaveEditPost = () => {
    if (!editingPost) return;

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === editingPost.id) {
          return {
            ...post,
            content: editPostContent.trim(),
            editTimestamp: "შესწორებულია",
          };
        }
        return post;
      })
    );

    setEditingPost(null);
    setEditPostContent("");
  };

  const handleCancelEditPost = () => {
    setEditingPost(null);
    setEditPostContent("");
    setEditPostImage(null);
  };

  const handlePostImageUpload = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setNewPostImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return {
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
    handlePostImageUpload
  };
};