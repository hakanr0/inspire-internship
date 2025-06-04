import Button from "./UI/Button";

import { Dialog } from "@mui/material";

// ICONS
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const ConfirmDeletionDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            padding: "32px",
            borderRadius: "8px",
          },
        },
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <p className="p-4 rounded-full text-red-600 border border-red-600">
          <DeleteForeverIcon fontSize="large" />
        </p>
        <h1 className="text-3xl font-bold">Are you sure?</h1>
        <p className="w-96 max-sm:w-full">
          Do you really want to{" "}
          <span className="font-bold text-red-600">delete</span> this
          transaction? This action{" "}
          <span className="font-bold">cannot be undone</span>.
        </p>
        <p className="flex gap-2">
          <Button btnAction="cancel" onClick={onClose}>
            <CloseIcon fontSize="small" /> Cancel
          </Button>
          <Button
            btnAction="delete"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            <DoneIcon fontSize="small" /> Confirm
          </Button>
        </p>
      </div>
    </Dialog>
  );
};

export default ConfirmDeletionDialog;
