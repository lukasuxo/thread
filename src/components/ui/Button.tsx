import React from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white hover:opacity-90";
      case "secondary":
        return "bg-white text-black hover:bg-gray-100";
      case "danger":
        return "bg-red-500 text-white hover:bg-red-600";
      case "outline":
        return "border border-gray-300 text-white hover:bg-gray-800";
      case "ghost":
        return "bg-transparent text-gray-500 hover:text-white hover:bg-gray-800";
      default:
        return "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white hover:opacity-90";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "md":
        return "px-4 py-2";
      case "lg":
        return "px-6 py-3";
      default:
        return "px-4 py-2";
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${getVariantClasses()} 
        ${getSizeClasses()} 
        ${fullWidth ? "w-full" : ""} 
        rounded-full 
        font-medium 
        transition-colors 
        flex 
        items-center 
        justify-center 
        gap-1
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;