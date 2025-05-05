import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { transactionsActions } from "../store/transactions";

import { handleTransactionErrors } from "../util/errors";

// ICONS
import AddIcon from "@mui/icons-material/Add";

export default function NewTransaction() {
  const [responseMessages, setResponseMessages] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const obj = Object.fromEntries(fd);
    let errors = handleTransactionErrors(obj);

    if (errors.length !== 0) {
      setResponseMessages(errors);
      return;
    }

    dispatch(
      transactionsActions.newTransaction({ id: Math.random() * 10000, ...obj })
    );
    setResponseMessages([
      {
        type: "success",
        field: "title",
        description: "Transaction created successfully.",
      },
    ]);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h1 className="fleur-de-leah text-[2.5rem] select-none max-md:text-4xl">
        New Transaction
      </h1>
      <Input
        id="title"
        label="Title"
        invalid={responseMessages.some(
          (r) => r.field === "title" && r.type === "error"
        )}
        valid={responseMessages.some(
          (r) => r.field === "title" && r.type === "success"
        )}
      />
      <Input
        id="category"
        label="Category"
        invalid={responseMessages.some(
          (r) => r.field === "category" && r.type === "error"
        )}
      />
      <Input
        id="amount"
        label="Amount"
        type="number"
        invalid={responseMessages.some(
          (r) => r.field === "amount" && r.type === "error"
        )}
      />
      <Input
        id="date"
        label="Transaction Date"
        type="date"
        invalid={responseMessages.some(
          (r) => r.field === "date" && r.type === "error"
        )}
      />
      <div>
        <Button btnAction="create">
          <AddIcon fontSize="small" /> Create
        </Button>
      </div>
      {responseMessages.length !== 0 && (
        <div>
          {responseMessages.map((r, index) => (
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
  );
}
