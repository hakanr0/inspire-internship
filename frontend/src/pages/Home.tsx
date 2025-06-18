import TransactionCard from "../components/TransactionCard/TransactionCard";
import TransactionDetailsDialog from "../components/TransactionDetailsDialog";
import ConfirmDeletionDialog from "../components/ConfirmDeletionDialog";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { transactionsActions } from "../store/transactions";

import type { FormType, Transaction } from "../types/transactionTypes";

import { ToastContainer, toast } from "react-toastify";

const Home: React.FC = () => {
  // const token = useAppSelector((state) => state.user.token);
  const token = localStorage.getItem("token");
  const { transactions, isViewingDetails, deleteConfirmation } = useAppSelector(
    (state) => state.transactions
  );
  const dispatch = useAppDispatch();

  const handleUpdate = async (transaction: FormType) => {
    const response = await fetch(
      `http://localhost:8080/api/expenses/${transaction.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: transaction.title,
          value: transaction.value,
          categoryId: transaction.category,
        }),
      }
    );
    const result: Transaction = await response.json();
    if (response.ok) {
      dispatch(transactionsActions.updateTransaction(result));
      toast.success("Transaction updated successfully.");
    }
  };

  const handleDelete = async () => {
    await fetch(
      `http://localhost:8080/api/expenses/${deleteConfirmation.transactionIdToDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(
      transactionsActions.deleteTransaction(
        deleteConfirmation.transactionIdToDelete
      )
    );
    toast.success("Transaction deleted successfully.");
  };

  return (
    <>
      <TransactionDetailsDialog
        isOpen={isViewingDetails}
        onClose={() =>
          dispatch(transactionsActions.handleTransactionDetailsDialog())
        }
        onUpdate={handleUpdate}
      />
      <ConfirmDeletionDialog
        isOpen={deleteConfirmation.showModal}
        onClose={() =>
          dispatch(transactionsActions.handleConfirmDeletionDialog(0))
        }
        onDelete={handleDelete}
      />
      <ToastContainer autoClose={3000} />
      <section>
        <h1 className="fleur-de-leah mb-4 text-[2.5rem] select-none max-md:text-4xl">
          Home
        </h1>
        {transactions?.length !== 0 ? (
          <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1">
            {transactions?.map((t) => (
              <TransactionCard
                key={t.id}
                id={t.id}
                title={t.title}
                categoryId={t.category.id}
                category={t.category.name}
                value={t.value}
                date={t.updatedAt}
              />
            ))}
          </div>
        ) : (
          <p className="text-center font-semibold text-gray-400">
            No transactions available at this time.
          </p>
        )}
      </section>
    </>
  );
};

export default Home;
