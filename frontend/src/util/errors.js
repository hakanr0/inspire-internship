export const handleTransactionErrors = (transaction) => {
  let errors = [];

  if (transaction.title.trim() === "")
    errors.push({
      type: "error",
      field: "title",
      description: "Title is required.",
    });
  if (transaction.value === "")
    errors.push({
      type: "error",
      field: "value",
      description: "Value is required.",
    });

  return errors;
};

export const handleRegisterErrors = (user) => {
  if (user.email.trim().length === 0) {
    return {
      type: "error",
      description: "Email is required",
    };
  }

  if (!user.email.includes("@")) {
    return {
      type: "error",
      description: "Email is not valid",
    };
  }

  if (user.password.trim().length === 0) {
    return {
      type: "error",
      description: "Password is required",
    };
  }

  if (user["password"] !== user["confirm-password"]) {
    return {
      type: "error",
      description: "Passwords do not match",
    };
  }

  return false;
};

export const handleLoginErrors = (user) => {
  if (user.email.trim().length === 0) {
    return "Email is required";
  }

  if (user.password.trim().length === 0) {
    return "Password is required";
  }

  return false;
};
