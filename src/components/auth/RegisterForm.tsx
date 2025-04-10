import React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Language } from "../../components/types";
import { getTranslation } from "../..//components/utils/translations";

interface RegisterFormProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: Record<string, string>;
  language: Language;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  switchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  errors,
  language,
  showPassword,
  setShowPassword,
  switchToLogin,
}) => {
  const t = getTranslation(language);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, rotateY: -20 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.95, rotateY: 20 }}
      className="w-full max-w-md space-y-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100 p-6 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.1, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute inset-0 bg-gradient-to-r from-pink-100/20 via-purple-100/20 to-blue-100/20 z-0"
      />

      <div className="text-center relative z-10">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] mb-2"
        >
          threads
        </motion.h1>
        <p className="text-1xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] mb-2">
          {t.registerTitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="space-y-3 text-black text-1xl font-black">
          {[
            {
              name: "username",
              placeholder: t.fullNamePlaceholder,
              icon: <User size={20} className="text-gray-500 " />,
            },
            {
              name: "email",
              placeholder: t.emailRegisterPlaceholder,
              icon: <Mail size={20} className="text-gray-500" />,
            },
            {
              name: "password",
              placeholder: t.passwordRegisterPlaceholder,
              icon: <Lock size={20} className="text-gray-500" />,
              isPassword: true,
            },
            {
              name: "confirmPassword",
              placeholder: t.confirmPasswordPlaceholder,
              icon: <Lock size={20} className="text-gray-500" />,
              isPassword: true,
            },
          ].map((field) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
              className="relative"
            >
              {field.icon && (
                <div className="absolute left-3 top-7 transform -translate-y-1/2">
                  {field.icon}
                </div>
              )}
              <input
                type={
                  field.isPassword
                    ? showPassword
                      ? "text"
                      : "password"
                    : field.name === "email"
                    ? "email"
                    : "text"
                }
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                className={`w-full p-3.5 ${field.icon ? "pl-10" : ""} border ${
                  errors[field.name]
                    ? "border-red-500 bg-red-50 text-red-900"
                    : "border-gray-300 focus:border-black"
                } rounded-xl bg-gray-100 focus:outline-none transition-all shadow-sm hover:shadow-md`}
              />
              {field.name === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-5 transform -translate-y-1/2s text-black hover:text-black"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
              {errors[field.name] && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs pl-2 mt-1s animate-pulse"
                >
                  {errors[field.name]}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white rounded-xl hover:opacity-90 transition-colors font-semibold"
        >
          {t.registerButton}
        </motion.button>

        <div className="text-center mt-4 relative z-10 ">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={switchToLogin}
            className="text-blue-500 hover:underline flex items-center justify-center gap-1 mx-auto w-fit text-1xl font-black"
          >
            {t.alreadyHaveAccount}
            <ChevronRight size={16} className="text-blue-400" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
