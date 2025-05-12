import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [
      {
        id: 4,
        title: "Uber Ride",
        category: "Transportation",
        amount: 18,
        date: "2025-05-05",
      },
      {
        id: 3,
        title: "Gym Membership",
        category: "Health",
        amount: 50,
        date: "2025-05-05",
      },
      {
        id: 2,
        title: "Monthly Rent",
        category: "Housing",
        amount: 1200,
        date: "2025-05-05",
      },
      {
        id: 1,
        title: "Grocery Shopping",
        category: "Food",
        amount: 45,
        date: "2025-05-05",
      },
    ],
    isViewingDetails: false,
    form: {
      id: 0,
      title: "",
      category: "",
      amount: 0,
      date: "",
    },
  },
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload;
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
    updateForm(state, action) {
      state.form = action.payload;
    },
    updateField(state, action) {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    clearForm(state) {
      state.form.title = "";
      state.form.category = "";
      state.form.amount = 0;
      state.form.date = "";
    },
  },
});

export const transactionsActions = transactionsSlice.actions;
export default transactionsSlice.reducer;
