import { useAppDispatch, useAppSelector } from "../store/hooks";
import { transactionsActions } from "../store/transactions";

import type { FormType } from "../types/transactionTypes";

export function useForm() {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.transactions.form);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof FormType
  ) => {
    dispatch(
      transactionsActions.updateField({ field, value: e.currentTarget.value })
    );
  };

  const resetForm = () => dispatch(transactionsActions.clearForm());

  return { form, handleChange, resetForm };
}
