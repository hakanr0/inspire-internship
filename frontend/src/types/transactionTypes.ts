export type Category = {
  id: number;
  name: string;
};

export type Transaction = {
  id: number;
  title: string;
  category: Category;
  value: number;
  createdAt: string;
  updatedAt: string;
};

export type DeleteConfirmationType = {
  showModal: boolean;
  transactionIdToDelete: number;
};

export type FormType = {
  id: number;
  title: string;
  category: number;
  value: number;
};

export type UpdateFieldPayload<K extends keyof FormType> = {
  field: K;
  value: FormType[K];
};

export interface TransactionState {
  transactions: Transaction[];
  categories: Category[];
  isViewingDetails: boolean;
  deleteConfirmation: DeleteConfirmationType;
  form: FormType;
}
