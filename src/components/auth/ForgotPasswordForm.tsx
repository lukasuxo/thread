import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Mail, ChevronRight, X } from "lucide-react";

type SupportedLanguage = "en";

const getTranslation = (language: SupportedLanguage) => {
  const translations = {
    en: {
      resetPasswordTitle: "Reset Password",
      resetPasswordDescription: "Enter your email to reset your password.",
      resetPasswordSuccess: "Password reset link sent!",
      resetPasswordButton: "Send reset link",
      emailPlaceholder: "Enter your email",
    },
  };

  return translations[language];
};

interface ForgotPasswordFormProps {
  resetEmail: string;
  setResetEmail: (email: string) => void;
  handlePasswordReset: (e: React.FormEvent) => void;
  errors: Record<string, string>;
  passwordResetSent: boolean;
  language: string; // This stays as string in the interface
  switchToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  resetEmail,
  setResetEmail,
  handlePasswordReset,
  errors,
  passwordResetSent,
  language,
  switchToLogin,
}) => {
  // Cast language to SupportedLanguage or use "en" as fallback
  const safeLanguage: SupportedLanguage =
    (language as SupportedLanguage) || "en";
  const t = getTranslation(safeLanguage);
  const emailInputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md space-y-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100 p-6 relative"
    >
      <button
        onClick={switchToLogin}
        className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X size={24} />
      </button>

      <div className="text-center">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff49fc] via-[#DD2A7B] to-[#009dff] mb-2">
          threads
        </h1>
        <p className="text-1xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] mb-2">
          {t.resetPasswordTitle}
        </p>
        <p className="text-1xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] mb-2">
          {t.resetPasswordDescription}
        </p>
      </div>

      <form onSubmit={handlePasswordReset} className="space-y-4">
        <div className="relative text-1xl font-black">
          <Mail
            className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            ref={emailInputRef}
            type="email"
            value={resetEmail}
            onChange={(e) => {
              setResetEmail(e.target.value);
            }}
            placeholder={t.emailPlaceholder}
            className={`w-full p-3.5 pl-10 border ${
              errors.resetEmail ? "border-red-500" : "border-gray-300"
            } rounded-xl bg-gray-100 focus:outline-none focus:border-black transition-all`}
          />
          {errors.resetEmail && (
            <p className="text-red-500 text-xs pl-2 mt-1">
              {errors.resetEmail}
            </p>
          )}
        </div>

        {passwordResetSent ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-center">
            {t.resetPasswordSuccess}
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white rounded-xl hover:opacity-90 transition-colors font-semibold flex items-center justify-center"
          >
            {t.resetPasswordButton}
            <ChevronRight size={20} className="ml-2" />
          </motion.button>
        )}
      </form>
    </motion.div>
  );
};

export default ForgotPasswordForm;
