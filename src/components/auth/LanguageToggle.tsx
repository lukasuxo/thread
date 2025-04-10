import React from "react";
import { motion } from "framer-motion";
import { Language } from "../../components/types";

interface LanguageToggleProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language,
  setLanguage,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setLanguage(language === "en" ? "ka" : "en")}
      className="px-3 py-1 bg-white border border-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-100 transition-colors shadow-sm"
    >
      {language === "en" ? "KA" : "EN"}
    </motion.button>
  );
};

export default LanguageToggle;
