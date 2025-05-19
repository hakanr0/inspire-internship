import TransactionCard from "../components/TransactionCard";
import TransactionDetailsDialog from "../components/TransactionDetailsDialog";

import { useDispatch, useSelector } from "react-redux";
import { transactionsActions } from "../store/transactions";

export default function Home() {
  const { transactions, isViewingDetails } = useSelector(
    (state) => state.transactions
  );
  const dispatch = useDispatch();

  const handleUpdate = (transaction) => {
    dispatch(transactionsActions.updateTransaction(transaction));
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
      <section>
        <h1 className="fleur-de-leah mb-4 text-[2.5rem] select-none max-md:text-4xl">
          Home
        </h1>
        {transactions?.length !== 0 ? (
          <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1">
            {transactions?.map((t) => (
              <TransactionCard key={t.id} transaction={t} />
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
}
