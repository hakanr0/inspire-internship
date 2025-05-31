import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  TransactionState,
  Transaction,
  Category,
  FormType,
  UpdateFieldPayload,
} from "../types/transactionTypes";

const initialState: TransactionState = {
  transactions: [],
  categories: [],
  isViewingDetails: false,
  deleteConfirmation: {
    showModal: false,
    transactionIdToDelete: 0,
  },
  form: {
    id: 0,
    title: "",
    category: 1,
    value: 0,
  },
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload;
    },
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    newTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.unshift(action.payload);
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      state.transactions.splice(index, 1);
      state.transactions.unshift(action.payload);
    },
    deleteTransaction(state, action: PayloadAction<number>) {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },
    handleTransactionDetailsDialog(state) {
      state.isViewingDetails = !state.isViewingDetails;
    },
    handleConfirmDeletionDialog(state, action: PayloadAction<number>) {
      state.deleteConfirmation.showModal = !state.deleteConfirmation.showModal;
      state.deleteConfirmation.transactionIdToDelete = action.payload;
    },
    updateForm(state, action: PayloadAction<FormType>) {
      state.form = action.payload;
    },
    updateField<K extends keyof FormType>(
      state: { form: FormType },
      action: PayloadAction<UpdateFieldPayload<K>>
    ) {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    clearForm(state) {
      state.form.id = 0;
      state.form.title = "";
      state.form.category = 1;
      state.form.value = 0;
    },
  },
});

export const transactionsActions = transactionsSlice.actions;
export default transactionsSlice.reducer;
