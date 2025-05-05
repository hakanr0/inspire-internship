import Button from "./UI/Button";
import Input from "./UI/Input";

import { useEffect, useRef, useState } from "react";

// ICONS
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { handleTransactionErrors } from "../util/errors";

export default function TransactionDetailsDialog({
  isOpen,
  details,
  onClose,
  onUpdate,
}) {
  const dialogRef = useRef();
  const formRef = useRef();
  const [responseMessages, setResponseMessages] = useState([]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const obj = Object.fromEntries(fd);
    let errors = handleTransactionErrors(obj);

    if (errors.length !== 0) {
      setResponseMessages(errors);
      return;
    }

    onUpdate({ id: details.id, ...obj });
    dialogRef.current.close();
  };

  useEffect(() => {
    if (isOpen) dialogRef.current.showModal();
    else dialogRef.current.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="w-[32rem] m-auto p-4 rounded-lg"
      onClose={() => {
        onClose();
        formRef.current.reset();
        setResponseMessages([]);
      }}
    >
      <form
        ref={formRef}
        className="flex flex-col gap-4"
        onSubmit={handleUpdate}
      >
        <div className="flex items-start justify-between">
          <h1 className="fleur-de-leah text-[2.5rem] select-none max-md:text-4xl">
            Details
          </h1>
          <Button
            btnAction="text-danger"
            type="button"
            onClick={() => dialogRef.current.close()}
          >
            <CloseIcon fontSize="large" />
          </Button>
        </div>
        <Input
          id="title"
          label="Title"
          defaultValue={details.title}
          invalid={responseMessages.some(
            (r) => r.field === "title" && r.type === "error"
          )}
        />
        <Input
          id="category"
          label="Category"
          defaultValue={details.category}
          invalid={responseMessages.some(
            (r) => r.field === "category" && r.type === "error"
          )}
        />
        <Input
          id="amount"
          label="Amount"
          type="number"
          defaultValue={details.amount}
          invalid={responseMessages.some(
            (r) => r.field === "amount" && r.type === "error"
          )}
        />
        <Input
          id="date"
          label="Date"
          type="date"
          defaultValue={details.date}
          invalid={responseMessages.some(
            (r) => r.field === "date" && r.type === "error"
          )}
        />
        <div>
          <Button btnAction="update">
            <DoneIcon fontSize="small" />
            Update
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
    </dialog>
  );
}
