import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionsActions } from "../store/transactions";

// CUSTOM HOOKS
import { useForm } from "../hooks/useForm";

// ERROR HANDLER
import { handleTransactionErrors } from "../util/errors";

// ICONS
import AddIcon from "@mui/icons-material/Add";

export default function NewTransaction() {
  const [responseMessages, setResponseMessages] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const { form, handleChange, resetForm } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = handleTransactionErrors(form);

    if (errors.length !== 0) {
      setResponseMessages(errors);
      return;
    }

    dispatch(
      transactionsActions.newTransaction({ ...form, id: Math.random() * 10000 })
    );
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
        invalid={responseMessages?.some(
          (r) => r.field === "title" && r.type === "error"
        )}
        valid={responseMessages?.some(
          (r) => r.field === "title" && r.type === "success"
        )}
      />
      <Input
        id="category"
        label="Category"
        value={form?.category}
        onChange={(e) => handleChange(e, "category")}
        placeholder="e.g. Transportation"
        invalid={responseMessages?.some(
          (r) => r.field === "category" && r.type === "error"
        )}
      />
      <Input
        id="amount"
        label="Amount"
        type="number"
        value={form?.amount}
        onChange={(e) => handleChange(e, "amount")}
        placeholder="e.g. $18"
        invalid={responseMessages?.some(
          (r) => r.field === "amount" && r.type === "error"
        )}
      />
      <Input
        id="date"
        label="Transaction Date"
        type="date"
        value={form?.date}
        onChange={(e) => handleChange(e, "date")}
        invalid={responseMessages?.some(
          (r) => r.field === "date" && r.type === "error"
        )}
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
