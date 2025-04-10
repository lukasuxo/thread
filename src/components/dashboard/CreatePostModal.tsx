import React, { useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "../ui/Button";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  newPostContent: string;
  setNewPostContent: (content: string) => void;
  newPostImage: string | null;
  setNewPostImage: (image: string | null) => void;
  onCreatePost: () => void;
  profileImage: string | null;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  newPostContent,
  setNewPostContent,
  newPostImage,
  setNewPostImage,
  onCreatePost,
  profileImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleImageSelected = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      if (event.target?.result) {
        setNewPostImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageSelected(file);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg w-full max-w-md p-4 relative shadow-xl transform hover:scale-105 transition-transform duration-500"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute top-3 right-3 text-white hover:text-gray-200 cursor-pointer"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="flex items-center mb-3">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300" />
          )}
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-2 ml-3 border border-transparent rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            rows={3}
          />
        </div>

        <div
          className="relative mb-4 flex justify-center items-center"
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: "pointer" }}
        >
          {newPostImage ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-24 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={newPostImage}
                alt="Preview"
                className="object-cover w-full h-full"
              />
              <button
                onClick={() => setNewPostImage(null)}
                className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
              >
                <X size={15} />
              </button>
            </motion.div>
          ) : (
            <div className="text-center text-white p-4 border-4 border-dashed rounded-lg w-full h-24 flex justify-center items-center cursor-pointer hover:bg-opacity-60 transition duration-300">
              <span className="text-xl">+</span>
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />

        <div className="mt-4 flex justify-end">
          <Button
            onClick={() => {
              onCreatePost();
              onClose();
            }}
            disabled={!newPostContent.trim() && !newPostImage}
            variant="primary"
          >
            Post
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreatePostModal;
