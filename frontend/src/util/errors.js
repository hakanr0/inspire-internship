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
  if (transaction.createdAt.trim() === "")
    errors.push({
      type: "error",
      field: "createdAt",
      description: "Date is required.",
    });

  return errors;
};
