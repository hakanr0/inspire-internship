import Button from "./UI/Button";

import { Dialog } from "@mui/material";

// ICONS
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

export default function ConfirmDeletionDialog({ isOpen, onClose, onDelete }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            padding: "16px",
            borderRadius: "8px",
          },
        },
      }}
    >
      <h1 className="text-lg mb-4">
        Are you sure you want to{" "}
        <span className="font-bold text-red-600">delete</span> this transaction?
        This action <span className="font-bold">cannot be undone</span>.
      </h1>
      <p className="flex items-center justify-end gap-2">
        <Button btnAction="cancel" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </Button>
        <Button
          btnAction="delete"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          <DoneIcon fontSize="small" />
        </Button>
      </p>
    </Dialog>
  );
}
