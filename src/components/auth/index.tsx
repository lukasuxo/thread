import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ThreadsAuthSystemProps, Language, ActiveScreen } from "../../components/types";
import { FirebaseError } from "firebase/app";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LanguageToggle from "./LanguageToggle";
import { useAuth } from "../../components/hooks/useAuth";

const ThreadsAuthSystem: React.FC<ThreadsAuthSystemProps> = ({ onLogin }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const backgroundControls = useAnimation();

  const { errors, handleLogin, handleRegister, handlePasswordReset, clearErrors } = useAuth();

  useEffect(() => {
    const animateBackground = async () => {
      await backgroundControls.start({
        background: [
          "linear-gradient(to bottom right, #f700ffcf, #0091ffc8, #ffee00)",
          "linear-gradient(to bottom right, #ff0000, #ffff00 , #ff00fb)",
          "linear-gradient(to bottom right, #6fff00, #ff00d9d2 , #ff0000)",
        ],
        transition: { duration: 5, repeat: Infinity, repeatType: "reverse" },
      });
    };
    animateBackground();
  }, [backgroundControls]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    clearErrors();
  };

  const handleInstagramLogin = () => {
    window.location.href = "https://www.instagram.com/accounts/login/";
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLogin(formData.email, formData.password);
    if (result.success && result.user) {
      onLogin(result.user);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleRegister(
      formData.email, 
      formData.password, 
      formData.username
    );
    if (result.success && result.user) {
      onLogin(result.user);
    }
  };

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handlePasswordReset(resetEmail);
    if (result.success) {
      setPasswordResetSent(true);
      
      setTimeout(() => {
        setPasswordResetSent(false);
        setActiveScreen("login");
      }, 3000);
    }
  };

  return (
    <motion.div
      animate={backgroundControls}
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute inset-0 -z-10"
      />

      <AnimatePresence mode="wait">
        {activeScreen === "login" && (
          <LoginForm
            key="login"
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleLoginSubmit}
            errors={errors}
            language={language}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            switchToRegister={() => setActiveScreen("register")}
            switchToForgotPassword={() => setActiveScreen("forgotPassword")}
            handleInstagramLogin={handleInstagramLogin}
          />
        )}

        {activeScreen === "register" && (
          <RegisterForm
            key="register"
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleRegisterSubmit}
            errors={errors}
            language={language}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            switchToLogin={() => setActiveScreen("login")}
          />
        )}

        {activeScreen === "forgotPassword" && (
          <ForgotPasswordForm
            key="forgotPassword"
            resetEmail={resetEmail}
            setResetEmail={setResetEmail}
            handlePasswordReset={handlePasswordResetSubmit}
            errors={errors}
            passwordResetSent={passwordResetSent}
            language={language}
            switchToLogin={() => setActiveScreen("login")}
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 text-center text-s text-white">
        © 2025 Threads •{" "}
        <a href="#" className="hover:underline">
          Terms
        </a>{" "}
        •{" "}
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>{" "}
        •{" "}
        <a href="#" className="hover:underline">
          Cookies Policy
        </a>{" "}
        •{" "}
        <a href="#" className="hover:underline">
          Report a problem
        </a>
      </div>

      <div className="absolute top-4 right-4">
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>
    </motion.div>
  );
};

export default ThreadsAuthSystem;