export type TransactionType = 'INCOME' | 'EXPENSE';

export type PaymentMethod = 
  | 'Cash'
  | 'UPI'
  | 'Credit Card'
  | 'Debit Card'
  | 'Bank Transfer'
  | 'Cheque';

export interface TransactionItem {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // YYYY-MM-DD
  paymentMethod: PaymentMethod;
  notes: string;
  createdAt?: string;
}

export interface CategoryItem {
  id: number;
  name: string;
  type: TransactionType;
  icon: string;
  color: string;
  isCustom?: boolean;
}

export interface BudgetItem {
  id: number;
  category: string;
  monthYear: string; // YYYY-MM
  monthlyLimit: number;
  currentSpending?: number;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
}

export interface TestCaseResult {
  id: string;
  title: string;
  category: 'OOP Principles' | 'Financial Math' | 'Validation' | 'Persistence';
  description: string;
  status: 'passed' | 'failed' | 'running';
  executionTimeMs: number;
  expected: string;
  actual: string;
  codeSnippet: string;
}

export interface SqlQueryLog {
  id: string;
  timestamp: string;
  query: string;
  type: 'INSERT' | 'UPDATE' | 'DELETE' | 'SELECT';
  params?: string;
  rowsAffected?: number;
}
