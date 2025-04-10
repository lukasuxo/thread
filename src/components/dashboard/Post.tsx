import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Repeat,
  Send,
  MoreHorizontal,
  X,
} from "lucide-react";
import { Post as PostType } from "../../components/types";
import PostMenu from "../ui/PostMenu";
import Button from "../ui/Button";

interface PostProps {
  post: PostType;
  profileImage: string | null;
  onLike: (postId: number) => void;
  onComment: (postId: number) => void;
  onStartEdit: (post: PostType) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (postId: number) => void;
  editingPost: PostType | null;
  editPostContent: string;
  setEditPostContent: (content: string) => void;
  showPostMenu: number | null;
  setShowPostMenu: (postId: number | null) => void;
  selectedPost: PostType | null;
  setSelectedPost: (post: PostType | null) => void;
  showComments: boolean;
  setShowComments: (show: boolean) => void;
  commentContent: string;
  setCommentContent: (content: string) => void;
}

const Post: React.FC<PostProps> = ({
  post,
  profileImage,
  onLike,
  onComment,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  editingPost,
  editPostContent,
  setEditPostContent,
  showPostMenu,
  setShowPostMenu,
  selectedPost,
  setSelectedPost,
  showComments,
  setShowComments,
  commentContent,
  setCommentContent,
}) => {
  const postMenuRef = useRef<HTMLDivElement>(null);

  if (editingPost?.id === post.id) {
    return (
      <motion.div
        key={post.id}
        className="p-4 border-b border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex">
          <div className="mr-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-0.5">
              <div className="w-full h-full bg-black rounded-full overflow-hidden">
                {profileImage && (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-white">{post.username}</p>
                <p className="text-gray-400 text-sm">{post.handle}</p>
              </div>
              <button
                onClick={onCancelEdit}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X size={18} className="text-gray-500 hover:text-white" />
              </button>
            </div>

            <textarea
              value={editPostContent}
              onChange={(e) => setEditPostContent(e.target.value)}
              className="w-full h-32 mt-2 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white resize-none focus:outline-none focus:ring-1 focus:ring-purple-500/30"
              placeholder="რას ფიქრობთ?"
            />

            {post.image && (
              <div className="mt-3 relative rounded-xl overflow-hidden">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full max-h-96 object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-black/75 text-white text-sm px-3 py-1 rounded-full">
                    სურათის რედაქტირება არ არის შესაძლებელი
                  </span>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-4">
              <Button variant="outline" size="sm" onClick={onCancelEdit}>
                გაუქმება
              </Button>
              <Button variant="primary" size="sm" onClick={onSaveEdit}>
                შენახვა
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={post.id}
      className="p-4 border-b border-gray-800"
      whileHover={{ backgroundColor: "rgba(39, 39, 39, 0.3)" }}
    >
      <div className="flex">
        <div className="mr-3">
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
          <div className="w-0.5 h-full bg-gray-800 mx-auto mt-2"></div>
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <p className="font-semibold text-white">{post.username}</p>
              {post.isVerified && (
                <svg
                  className="w-4 h-4 ml-1 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex items-center text-gray-500">
              <span className="text-sm">
                {post.timePosted}
                {post.editTimestamp && (
                  <span className="text-gray-500 ml-1">
                    • {post.editTimestamp}
                  </span>
                )}
              </span>
              <div className="relative ml-2">
                <button
                  onClick={() =>
                    setShowPostMenu(showPostMenu === post.id ? null : post.id)
                  }
                  className="p-1 rounded-full hover:bg-gray-800"
                >
                  <MoreHorizontal size={18} />
                </button>

                <PostMenu
                  post={post}
                  isVisible={showPostMenu === post.id}
                  onEdit={onStartEdit}
                  onDelete={onDelete}
                  menuRef={postMenuRef}
                />
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm">{post.handle}</p>
          <p className="mt-2 text-white">{post.content}</p>

          {post.image && (
            <div className="mt-3 rounded-xl overflow-hidden">
              <img
                src={post.image}
                alt="Post"
                className="w-full max-h-96 object-cover"
              />
            </div>
          )}

          <div className="flex mt-3 space-x-6 text-gray-500">
            <button
              className={`flex items-center ${
                post.isLiked ? "text-red-500" : "hover:text-white"
              }`}
              onClick={() => onLike(post.id)}
            >
              <Heart size={18} fill={post.isLiked ? "currentColor" : "none"} />
              {post.likes > 0 && (
                <span className="ml-1 text-xs">{post.likes}</span>
              )}
            </button>

            <button
              className="flex items-center hover:text-white"
              onClick={() => {
                setSelectedPost(post);
                setShowComments(true);
              }}
            >
              <MessageCircle size={18} />
              {post.replies > 0 && (
                <span className="ml-1 text-xs">{post.replies}</span>
              )}
            </button>

            <button className="flex items-center hover:text-white">
              <Repeat size={18} />
              {post.reposts > 0 && (
                <span className="ml-1 text-xs">{post.reposts}</span>
              )}
            </button>
            <button className="flex items-center hover:text-white">
              <Send size={18} />
            </button>
          </div>

          {showComments && selectedPost?.id === post.id && (
            <div className="mt-4 space-y-4">
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="pl-8 border-l border-gray-800"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                      <p className="text-white text-sm font-medium">
                        {comment.username}
                      </p>
                      <span className="text-gray-500 text-xs">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-white text-sm mt-1">{comment.content}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="დაწერე კომენტარი..."
                  className="flex-grow bg-gray-800 rounded-full px-4 py-2 text-white text-sm"
                />
                <Button
                  onClick={() => onComment(post.id)}
                  disabled={!commentContent.trim()}
                  variant="secondary"
                  size="sm"
                >
                  კომენტარი
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Post;
