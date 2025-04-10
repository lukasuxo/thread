/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Camera, X } from "lucide-react";
import NextImage from "next/image";

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  currentImage?: string | null;
  onRemoveImage?: () => void;
  showMenu?: boolean;
  setShowMenu?: (show: boolean) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelected,
  currentImage,
  onRemoveImage,
  showMenu = false,
  setShowMenu,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    if (setShowMenu) {
      setShowMenu(!showMenu);
    } else {
      if (imageInputRef.current) {
        imageInputRef.current.accept = "image/*";
        imageInputRef.current.click();
      }
    }
  };

  const openCameraForImage = () => {
    if (imageInputRef.current) {
      imageInputRef.current.accept = "image/*";
      imageInputRef.current.capture = "user";
      imageInputRef.current.click();
    }
    if (setShowMenu) setShowMenu(false);
  };

  const openGalleryForImage = () => {
    if (imageInputRef.current) {
      imageInputRef.current.accept = "image/*";
      imageInputRef.current.removeAttribute("capture");
      imageInputRef.current.click();
    }
    if (setShowMenu) setShowMenu(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      document.body.style.cursor = "wait";
      onImageSelected(file);
      setTimeout(() => {
        document.body.style.cursor = "default";
      }, 500);
    }
  };

  return (
    <div className="relative">
      <label className="cursor-pointer text-gray-400 hover:text-white inline-flex">
        <ImageIcon size={20} onClick={handleImageUploadClick} />
        <input
          ref={imageInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      <AnimatePresence>
        {showMenu && setShowMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-10 left-0 bg-gray-800 rounded-lg shadow-lg p-2 w-48 z-10"
          >
            <button
              onClick={openCameraForImage}
              className="flex items-center w-full p-2 text-white hover:bg-gray-700 rounded-lg"
            >
              <Camera size={18} className="mr-2" />
              <span>Take a photo</span>
            </button>
            <button
              onClick={openGalleryForImage}
              className="flex items-center w-full p-2 text-white hover:bg-gray-700 rounded-lg"
            >
              <ImageIcon size={18} className="mr-2" />
              <span>Choose from gallery</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {currentImage && (
        <div className="mt-2 relative">
          {currentImage.startsWith("blob:") ||
          currentImage.startsWith("data:") ? (
            // Fallback to <img> if it's a local blob or data URL
            <img
              src={currentImage}
              alt="Image preview"
              className="w-full max-h-60 object-cover rounded-lg"
            />
          ) : (
            <NextImage
              src={currentImage}
              alt="Image preview"
              width={500}
              height={300}
              className="rounded-lg object-cover w-full max-h-60"
            />
          )}
          {onRemoveImage && (
            <button
              onClick={onRemoveImage}
              className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
            >
              <X size={16} className="text-white" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
