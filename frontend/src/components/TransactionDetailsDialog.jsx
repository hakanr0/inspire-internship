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
import Select from "./UI/Select";
import { useSelector } from "react-redux";

export default function TransactionDetailsDialog({
  isOpen,
  onClose,
  onUpdate,
}) {
  const [responseMessages, setResponseMessages] = useState([]);
  const { form, handleChange, resetForm } = useForm();
  const categories = useSelector((state) => state.transactions.categories);

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
          invalid={responseMessages?.some(
            (r) => r.field === "value" && r.type === "error"
          )}
        />
        <Input
          id="createdAt"
          label="Transaction Date"
          type="date"
          value={form?.createdAt}
          onChange={(e) => handleChange(e, "createdAt")}
          invalid={responseMessages?.some(
            (r) => r.field === "createdAt" && r.type === "error"
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
