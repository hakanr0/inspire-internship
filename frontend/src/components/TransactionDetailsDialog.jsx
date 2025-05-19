import { Dialog } from "@mui/material";

import Button from "./UI/Button";
import Input from "./UI/Input";

import { useState } from "react";

// CUSTOM HOOKS
import { useForm } from "../hooks/useForm";

// ERROR HANDLER
import { handleTransactionErrors } from "../util/errors";

// ICONS
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

export default function TransactionDetailsDialog({
  isOpen,
  onClose,
  onUpdate,
}) {
  const [responseMessages, setResponseMessages] = useState([]);
  const { form, handleChange, resetForm } = useForm();

  const handleUpdate = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const obj = Object.fromEntries(fd);
    let errors = handleTransactionErrors(obj);

    if (errors.length !== 0) {
      setResponseMessages(errors);
      return;
    }

    onUpdate(form);
    resetForm();
    onClose();
  };

  const handleClose = () => {
    onClose();
    resetForm();
    setResponseMessages([]);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            minWidth: "24rem",
            padding: "16px",
            borderRadius: "8px",
          },
        },
      }}
    >
      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
        <div className="flex items-start justify-between">
          <h1 className="fleur-de-leah text-[2.5rem] select-none max-md:text-4xl">
            Details
          </h1>
          <Button btnAction="text-danger" type="button" onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </Button>
        </div>
        <Input
          id="title"
          label="Title"
          value={form?.title}
          onChange={(e) => handleChange(e, "title")}
          placeholder="e.g. Uber Ride"
          invalid={responseMessages?.some(
            (r) => r.field === "title" && r.type === "error"
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
          label="Date"
          type="date"
          value={form?.date}
          onChange={(e) => handleChange(e, "date")}
          invalid={responseMessages?.some(
            (r) => r.field === "date" && r.type === "error"
          )}
        />
        <div>
          <Button btnAction="update">
            <DoneIcon fontSize="small" />
            Update
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
    </Dialog>
  );
}
