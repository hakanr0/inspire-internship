import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { transactionsActions } from "../store/transactions";

import type { Transaction } from "../types/transactionTypes";
import type { ResponseMessage } from "../types/messageTypes";

// CUSTOM HOOKS
import { useForm } from "../hooks/useForm";

// ERROR HANDLER
import { handleTransactionErrors } from "../util/errors";

// ICONS
import AddIcon from "@mui/icons-material/Add";
import Select from "../components/UI/Select";

export default function NewTransaction() {
  const [responseMessages, setResponseMessages] = useState<ResponseMessage[]>(
    []
  );

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const categories = useAppSelector((state) => state.transactions.categories);

  const { form, handleChange, resetForm } = useForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errors = handleTransactionErrors(form);

    if (errors.length !== 0) {
      setResponseMessages(errors);
      return;
    }

    const response = await fetch("http://localhost:8080/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: form.title,
        value: form.value,
        categoryId: form.category,
      }),
    });
    const result: Transaction = await response.json();

    dispatch(transactionsActions.newTransaction(result));
    setResponseMessages([
      {
        type: "success",
        field: "title",
        description: "Transaction created successfully.",
      },
    ]);
    resetForm();
  };

  return token ? (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h1 className="fleur-de-leah text-[2.5rem] select-none max-md:text-4xl">
        New Transaction
      </h1>
      <Input
        id="title"
        label="Title"
        value={form?.title}
        onChange={(e) => handleChange(e, "title")}
        placeholder="e.g. Uber Ride"
        isValid={
          responseMessages?.some((r) => r.field === "title")
            ? responseMessages?.find((r) => r.field === "title")?.type ===
              "success"
              ? true
              : false
            : undefined
        }
      />
      <Select
        id="category"
        label="Categories"
        options={categories}
        value={form?.category}
        onChange={(e) => handleChange(e, "category")}
      />
      <Input
        id="value"
        label="Value"
        type="number"
        value={form?.value}
        onChange={(e) => handleChange(e, "value")}
        placeholder="e.g. $18"
        isValid={
          responseMessages?.some(
            (r) => r.field === "value" && r.type === "error"
          )
            ? false
            : undefined
        }
      />
      <div>
        <Button btnAction="create">
          <AddIcon fontSize="small" /> Create
        </Button>
      </div>
      {responseMessages?.length !== 0 && (
        <div>
          {responseMessages?.map((r, index) => (
            <p
              key={index}
              className={`font-semibold ${
                r.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {r.description}
            </p>
          ))}
        </div>
      )}
    </form>
  ) : (
    <p className="text-center font-semibold text-gray-400">
      You don't have access to create a new transaction.
    </p>
  );
}
