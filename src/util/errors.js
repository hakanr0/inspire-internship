export const handleTransactionErrors = (transaction) => {
  let errors = [];

  if (transaction.title.trim() === "")
    errors.push({
      type: "error",
      field: "title",
      description: "Title is required.",
    });
  if (transaction.category.trim() === "")
    errors.push({
      type: "error",
      field: "category",
      description: "Category is required.",
    });
  if (transaction.amount === "")
    errors.push({
      type: "error",
      field: "amount",
      description: "Amount is required.",
    });
  if (transaction.date.trim() === "")
    errors.push({
      type: "error",
      field: "date",
      description: "Date is required.",
    });

  return errors;
};
