import Button from "./UI/Button";

import { useDispatch } from "react-redux";
import { transactionsActions } from "../store/transactions";

// ICONS
import ReceiptIcon from "@mui/icons-material/Receipt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TransactionCard({ transaction }) {
  const dispatch = useDispatch();

  const handleShowTransactionDetails = () => {
    dispatch(transactionsActions.handleSelectedTransaction(transaction));
    dispatch(transactionsActions.handleTransactionDetailsDialog());
  };

  return (
    <div className="group flex flex-col justify-between gap-4 p-4 rounded-lg bg-[#def2fc] shadow-lg break-all hover:shadow-none duration-200">
      <div className="flex items-start justify-between">
        <span className="leading-none p-3 rounded-full bg-[#0C6291] text-[#def2fc] group-hover:translate-x-2 duration-200">
          <ReceiptIcon fontSize="large" />
        </span>
        <div className="flex gap-2">
          <Button btnAction="update" onClick={handleShowTransactionDetails}>
            <EditIcon fontSize="small" />
          </Button>
          <Button
            btnAction="delete"
            onClick={() =>
              dispatch(transactionsActions.deleteTransaction(transaction.id))
            }
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold">{transaction.title}</h1>
        <p className="text-sm text-gray-500">{transaction.category}</p>
      </div>
      <h1 className="text-2xl font-semibold">${transaction.amount}</h1>
      <p className="text-sm font-semibold text-gray-500">{transaction.date}</p>
    </div>
  );
}
