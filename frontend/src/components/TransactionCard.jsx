import Button from "./UI/Button";

import { useDispatch, useSelector } from "react-redux";
import { transactionsActions } from "../store/transactions";

// ICONS
import ReceiptIcon from "@mui/icons-material/Receipt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TransactionCard({
  id,
  title,
  categoryId,
  category,
  value,
  date,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const handleShowTransactionDetails = () => {
    dispatch(
      transactionsActions.updateForm({
        id,
        title,
        category: categoryId,
        value,
        createdAt: new Date(date).toISOString().split("T")[0],
      })
    );
    dispatch(transactionsActions.handleTransactionDetailsDialog());
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    dispatch(transactionsActions.deleteTransaction(id));
  };

  return (
    <div className="group flex flex-col justify-between gap-4 p-4 rounded-lg bg-[#def2fc] shadow-lg break-all hover:shadow-none duration-200">
      <div className="flex items-start justify-between">
        <span className="leading-none p-3 rounded-full bg-[#0C6291] text-[#def2fc] group-hover:translate-x-2 duration-200">
          <ReceiptIcon fontSize="large" />
        </span>
        {token && (
          <div className="flex gap-2">
            <Button btnAction="update" onClick={handleShowTransactionDetails}>
              <EditIcon fontSize="small" />
            </Button>
            <Button btnAction="delete" onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
            </Button>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
      <h1 className="text-2xl font-semibold">${value}</h1>
      <p className="text-sm font-semibold text-gray-500">
        {new Date(date).toLocaleString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
