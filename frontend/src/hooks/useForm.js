import { useDispatch, useSelector } from "react-redux";
import { transactionsActions } from "../store/transactions";

export function useForm() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.transactions.form);

  const handleChange = (e, field) => {
    dispatch(transactionsActions.updateField({ field, value: e.target.value }));
  };

  const resetForm = () => dispatch(transactionsActions.clearForm());

  return { form, handleChange, resetForm };
}
