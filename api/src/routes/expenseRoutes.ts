import { Router } from 'express';
import {
  deleteExpense,
  getExpenses,
  updateExpense,
  createExpense,
} from '../controllers/expenseController';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

// Route to get all expenses
router.get('/expenses', getExpenses);

// Route to create a new expense
router.post('/expenses', authMiddleware, createExpense);

// Route to update an existing expense
router.put('/expenses/:id', authMiddleware, updateExpense);

// Route to delete an expense
router.delete('/expenses/:id', authMiddleware, deleteExpense);

export default router;
