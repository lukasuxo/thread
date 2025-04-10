// utils/translations.ts
import { Language } from "../types";

export const translations = {
  en: {
    loginTitle: "Log in to Threads",
    emailPlaceholder: "Username, phone or email",
    passwordPlaceholder: "Password",
    loginButton: "Log in",
    forgotPassword: "Forgotten password?",
    createAccount: "Create new account",
    continueWithInstagram: "Continue with Instagram",
    registerTitle: "Sign up for Threads",
    fullNamePlaceholder: "Full Name",
    emailRegisterPlaceholder: "Email",
    passwordRegisterPlaceholder: "Create password",
    confirmPasswordPlaceholder: "Confirm Password",
    registerButton: "Sign up",
    alreadyHaveAccount: "Already have an account? Log in",
    resetPasswordTitle: "Reset Password",
    resetPasswordDescription: "Enter your email to reset your password",
    resetPasswordButton: "Send Reset Link",
    resetPasswordSuccess: "Password reset link sent to your email",
    backToLogin: "Back to Login",
  },
  ka: {
    loginTitle: "Threads-ზე შესვლა",
    emailPlaceholder: "მომხმარებელი, ტელეფონი ან ელფოსტა",
    passwordPlaceholder: "პაროლი",
    loginButton: "შესვლა",
    forgotPassword: "დაგავიწყდათ პაროლი?",
    createAccount: "შექმენით ახალი ანგარიში",
    continueWithInstagram: "გააგრძელეთ Instagram-ით",
    registerTitle: "Threads-ზე რეგისტრაცია",
    fullNamePlaceholder: "სრული სახელი",
    emailRegisterPlaceholder: "ელფოსტა",
    passwordRegisterPlaceholder: "შექმენით პაროლი",
    confirmPasswordPlaceholder: "გაიმეორეთ პაროლი",
    registerButton: "რეგისტრაცია",
    alreadyHaveAccount: "უკვე გაქვთ ანგარიში? შესვლა",
    resetPasswordTitle: "პაროლის აღდგენა",
    resetPasswordDescription: "შეიყვანეთ თქვენი ელფოსტა პაროლის აღსადგენად",
    resetPasswordButton: "გაგზავნეთ აღდგენის ბმული",
    resetPasswordSuccess: "პაროლის აღდგენის ბმული გაგზავნილია თქვენს ელფოსტაზე",
    backToLogin: "უკან დაბრუნება",
  },
};

export const getTranslation = (language: Language) => {
  return translations[language];
};
