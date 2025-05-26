import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
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
      createdAt: "",
    },
  },
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    newTransaction(state, action) {
      state.transactions.unshift(action.payload);
    },
    updateTransaction(state, action) {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      state.transactions.splice(index, 1);
      state.transactions.unshift(action.payload);
    },
    deleteTransaction(state, action) {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },
    handleTransactionDetailsDialog(state) {
      state.isViewingDetails = !state.isViewingDetails;
    },
    handleConfirmDeletionDialog(state, action) {
      state.deleteConfirmation.showModal = !state.deleteConfirmation.showModal;
      state.deleteConfirmation.transactionIdToDelete = action.payload;
    },
    updateForm(state, action) {
      state.form = action.payload;
    },
    updateField(state, action) {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    clearForm(state) {
      state.form.id = 0;
      state.form.title = "";
      state.form.category = 1;
      state.form.value = 0;
      state.form.createdAt = "";
    },
  },
});

export const transactionsActions = transactionsSlice.actions;
export default transactionsSlice.reducer;
