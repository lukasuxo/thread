import React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Language } from "..//types";
import { getTranslation } from "../..//components/utils/translations";

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: Record<string, string>;
  language: Language;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  switchToRegister: () => void;
  switchToForgotPassword: () => void;
  handleInstagramLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  errors,
  language,
  showPassword,
  setShowPassword,
  switchToRegister,
  switchToForgotPassword,
  handleInstagramLogin,
}) => {
  const t = getTranslation(language);

  const renderLoginInput = (
    name: string,
    type: string,
    placeholder: string,
    icon: React.ReactNode,
    passwordToggle?: boolean
  ) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.02 }}
        className="relative group"
      >
        {icon && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-3 top-4 transform -translate-y-1/2 text-black group-focus-within:text-black transition-colors"
          >
            {icon}
          </motion.div>
        )}
        <motion.input
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={name === "email" ? formData.email : formData.password}
          onChange={handleChange}
          className={`w-full p-3.5 ${icon ? "pl-10" : ""} border ${
            errors[name]
              ? "border-red-500 bg-red-50 text-red-900"
              : "border-gray-300 focus:border-black"
          } rounded-xl bg-gray-100 focus:outline-none transition-all shadow-sm hover:shadow-md`}
        />
        {passwordToggle && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-5 transform -translate-y-0 text-gray-500 hover:text-black"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </motion.button>
        )}
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-xs pl-2 mt-1 animate-pulse"
          >
            {errors[name]}
          </motion.p>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
        rotateY: -30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        rotateY: 30,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 15,
      }}
      className="
        w-full 
        max-w-md 
        space-y-6 
        relative 
        p-8 
        bg-white/80 
        backdrop-blur-2xl 
        rounded-3xl 
        shadow-2xl 
        border 
        border-white/20
        overflow-hidden
      "
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.1, 0],
          scale: [1, 1.2, 1],
          background: [
            "linear-gradient(45deg, #ff00e1, #00ffee)",
            "linear-gradient(45deg, #ff0000, #a2ff00)",
            "linear-gradient(45deg, #6a11cb, #2575fc)",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 -z-10 opacity-20"
      />

      <div className="text-center relative z-10">
        <motion.h1
          initial={{
            scale: 0.8,
            opacity: 0,
            textShadow: "0 0 10px rgba(0,0,0,0)",
          }}
          animate={{
            scale: 1,
            opacity: 1,
            textShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
          transition={{
            type: "spring",
            stiffness: 120,
          }}
          className="
            text-5xl 
            font-black 
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-[#ff4646] 
            via-[#ff00b3] 
            to-[#00a6ff] 
            mb-2
            drop-shadow-lg
          "
        >
          threads
        </motion.h1>
        <p className="text-1xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] mb-2 ">
          {t.loginTitle}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-black relative z-10 text-1xl font-black"
      >
        {renderLoginInput(
          "email",
          "email",
          t.emailPlaceholder,
          <Mail size={20} className="text-gray-400 text-1xl font-black" />
        )}
        {renderLoginInput(
          "password",
          "password",
          t.passwordPlaceholder,
          <Lock size={20} className="text-gray-400 text-1xl font-black" />,
          true
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white rounded-xl hover:opacity-90 transition-colors text-1xl font-black"
        >
          {t.loginButton}
        </motion.button>

        <div className="text-center">
          <button
            type="button"
            onClick={switchToForgotPassword}
            className="text-blue-500 hover:underline"
          >
            {t.forgotPassword}
          </button>
        </div>
      </form>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleInstagramLogin}
        type="button"
        className="w-full flex items-center justify-center border border-gray-300 py-3.5 rounded-xl transition-all duration-300 group bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white hover:opacity-90 relative z-10 text-1xl font-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="mr-2 group-hover:scale-110 transition-transform"
        >
          <path
            fill="currentColor"
            d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
          />
        </svg>
        {t.continueWithInstagram}
      </motion.button>

      <div className="text-center mt-4 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={switchToRegister}
          className="text-blue-500 hover:underline flex items-center justify-center gap-1 mx-auto w-fit  text-1xl font-black"
        >
          {t.createAccount}
          {/* Create new account */}
          <ChevronRight
            size={16}
            className="text-blue-400  text-1xl font-black"
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LoginForm;
