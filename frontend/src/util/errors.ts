import type { Credentials } from "../types/userTypes";

export const handleTransactionErrors = (transaction: {
  title: string;
  value: number;
}) => {
  let errors = [];

  if (transaction.title.trim() === "")
    errors.push({
      type: "error",
      field: "title",
      description: "Title is required.",
    });
  if (typeof transaction.value === "string" && transaction.value === "")
    errors.push({
      type: "error",
      field: "value",
      description: "Value is required.",
    });
  if (transaction.value <= 0) {
    errors.push({
      type: "error",
      field: "value",
      description: "Value must be greater than zero.",
    });
  }

  return errors;
};

export const handleRegisterErrors = (user: {
  email: string;
  password: string;
  "confirm-password": string;
}) => {
  if (user.email.trim().length === 0) {
    return {
      type: "error",
      description: "Email is required.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(user.email);
  if (!isValid) {
    return {
      type: "error",
      description: "Email is not valid.",
    };
  }

  if (user.password.trim().length === 0) {
    return {
      type: "error",
      description: "Password is required.",
    };
  }

  if (user["password"] !== user["confirm-password"]) {
    return {
      type: "error",
      description: "Passwords do not match.",
    };
  }

  return false;
};

export const handleLoginErrors = (user: Credentials) => {
  if (user.email.trim().length === 0) {
    return "Email is required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(user.email);
  if (!isValid) {
    return "Email is not valid.";
  }

  if (user.password.trim().length === 0) {
    return "Password is required.";
  }

  return false;
};
