import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash } from "lucide-react";
import { Post } from "../../components/types";

interface PostMenuProps {
  post: Post;
  isVisible: boolean;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  menuRef: React.RefObject<HTMLDivElement>;
}

const PostMenu: React.FC<PostMenuProps> = ({
  post,
  isVisible,
  onEdit,
  onDelete,
  menuRef,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute right-0 top-8 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-10"
        >
          <button
            onClick={() => onEdit(post)}
            className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-800"
          >
            <Edit size={16} className="mr-2" />
            <span>რედაქტირება</span>
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-gray-800"
          >
            <Trash size={16} className="mr-2" />
            <span>წაშლა</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostMenu;