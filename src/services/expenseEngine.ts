import { TransactionItem, CategoryItem, BudgetItem, SqlQueryLog, CurrencyConfig } from '../types/expense';
import { DEFAULT_CATEGORIES, INITIAL_TRANSACTIONS, INITIAL_BUDGETS, DEFAULT_CURRENCIES } from '../data/initialData';

const STORAGE_KEYS = {
  TRANSACTIONS: 'pet_java_transactions_v1',
  CATEGORIES: 'pet_java_categories_v1',
  BUDGETS: 'pet_java_budgets_v1',
  CURRENCY: 'pet_java_currency_v1',
  SQL_LOGS: 'pet_java_sql_logs_v1',
};

export class JavaExpenseEngine {
  private transactions: TransactionItem[] = [];
  private categories: CategoryItem[] = [];
  private budgets: BudgetItem[] = [];
  private currency: CurrencyConfig = DEFAULT_CURRENCIES[0];
  private sqlLogs: SqlQueryLog[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadState();
  }

  private loadState() {
    try {
      const storedTrans = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      this.transactions = storedTrans ? JSON.parse(storedTrans) : [...INITIAL_TRANSACTIONS];

      const storedCats = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      this.categories = storedCats ? JSON.parse(storedCats) : [...DEFAULT_CATEGORIES];

      const storedBudgets = localStorage.getItem(STORAGE_KEYS.BUDGETS);
      this.budgets = storedBudgets ? JSON.parse(storedBudgets) : [...INITIAL_BUDGETS];

      const storedCurrency = localStorage.getItem(STORAGE_KEYS.CURRENCY);
      if (storedCurrency) {
        const found = DEFAULT_CURRENCIES.find((c) => c.code === storedCurrency);
        if (found) this.currency = found;
      }

      const storedLogs = localStorage.getItem(STORAGE_KEYS.SQL_LOGS);
      this.sqlLogs = storedLogs ? JSON.parse(storedLogs) : [];

      if (this.sqlLogs.length === 0) {
        this.logSql('SELECT * FROM categories ORDER BY type, name', 'SELECT', '', this.categories.length);
        this.logSql('SELECT * FROM transactions ORDER BY date DESC, id DESC', 'SELECT', '', this.transactions.length);
      }
    } catch {
      this.transactions = [...INITIAL_TRANSACTIONS];
      this.categories = [...DEFAULT_CATEGORIES];
      this.budgets = [...INITIAL_BUDGETS];
      this.currency = DEFAULT_CURRENCIES[0];
    }
  }

  private saveState() {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(this.transactions));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(this.categories));
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(this.budgets));
    localStorage.setItem(STORAGE_KEYS.CURRENCY, this.currency.code);
    localStorage.setItem(STORAGE_KEYS.SQL_LOGS, JSON.stringify(this.sqlLogs.slice(0, 50)));
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  private logSql(query: string, type: 'INSERT' | 'UPDATE' | 'DELETE' | 'SELECT', params?: string, rowsAffected?: number) {
    const log: SqlQueryLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      query,
      type,
      params,
      rowsAffected,
    };
    this.sqlLogs.unshift(log);
    if (this.sqlLogs.length > 50) this.sqlLogs.pop();
  }

  // --- Getters ---
  public getTransactions(): TransactionItem[] {
    return [...this.transactions];
  }

  public getCategories(): CategoryItem[] {
    return [...this.categories];
  }

  public getBudgets(): BudgetItem[] {
    return [...this.budgets];
  }

  public getCurrency(): CurrencyConfig {
    return this.currency;
  }

  public getSqlLogs(): SqlQueryLog[] {
    return [...this.sqlLogs];
  }

  public setCurrency(code: string) {
    const found = DEFAULT_CURRENCIES.find((c) => c.code === code);
    if (found) {
      this.currency = found;
      this.logSql(`UPDATE settings SET value = '${code}' WHERE key = 'currency'`, 'UPDATE', code, 1);
      this.saveState();
    }
  }

  // --- Transaction Management ---
  public addTransaction(item: Omit<TransactionItem, 'id'>): TransactionItem {
    if (!item.title || item.title.trim() === '') {
      throw new Error('Transaction title cannot be empty.');
    }
    if (item.amount == null || item.amount <= 0 || isNaN(item.amount)) {
      throw new Error('Amount must be strictly greater than zero.');
    }
    if (!item.category) {
      throw new Error('Please select a valid category.');
    }

    const nextId = this.transactions.length > 0 ? Math.max(...this.transactions.map((t) => t.id)) + 1 : 1;
    const newTransaction: TransactionItem = {
      ...item,
      id: nextId,
      amount: Math.round(item.amount * 100) / 100,
    };

    this.transactions.unshift(newTransaction);

    this.logSql(
      `INSERT INTO transactions (title, amount, type, category, date, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      'INSERT',
      `[${newTransaction.title}, ${newTransaction.amount}, ${newTransaction.type}, ${newTransaction.category}, ${newTransaction.date}, ${newTransaction.paymentMethod}]`,
      1
    );

    this.saveState();
    return newTransaction;
  }

  public updateTransaction(item: TransactionItem): boolean {
    if (!item.title || item.title.trim() === '') {
      throw new Error('Transaction title cannot be empty.');
    }
    if (item.amount <= 0 || isNaN(item.amount)) {
      throw new Error('Amount must be strictly greater than zero.');
    }

    const index = this.transactions.findIndex((t) => t.id === item.id);
    if (index === -1) return false;

    this.transactions[index] = {
      ...item,
      amount: Math.round(item.amount * 100) / 100,
    };

    this.logSql(
      `UPDATE transactions SET title = ?, amount = ?, type = ?, category = ?, date = ?, payment_method = ?, notes = ? WHERE id = ?`,
      'UPDATE',
      `[${item.title}, ${item.amount}, ${item.type}, ${item.category}, ${item.date}, ${item.paymentMethod}, ${item.id}]`,
      1
    );

    this.saveState();
    return true;
  }

  public deleteTransaction(id: number): boolean {
    const countBefore = this.transactions.length;
    this.transactions = this.transactions.filter((t) => t.id !== id);
    const affected = countBefore - this.transactions.length;

    if (affected > 0) {
      this.logSql(`DELETE FROM transactions WHERE id = ?`, 'DELETE', `[${id}]`, affected);
      this.saveState();
      return true;
    }
    return false;
  }

  public addCategory(name: string, type: 'INCOME' | 'EXPENSE', icon = 'Tag', color = '#6366f1'): CategoryItem {
    const trimmed = name.trim();
    if (!trimmed) throw new Error('Category name cannot be empty');
    if (this.categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      throw new Error(`Category "${trimmed}" already exists.`);
    }

    const nextId = Math.max(...this.categories.map((c) => c.id), 0) + 1;
    const newCat: CategoryItem = {
      id: nextId,
      name: trimmed,
      type,
      icon,
      color,
      isCustom: true,
    };

    this.categories.push(newCat);
    this.logSql(`INSERT INTO categories (name, type, icon, color) VALUES (?, ?, ?, ?)`, 'INSERT', `[${trimmed}, ${type}]`, 1);
    this.saveState();
    return newCat;
  }

  public setBudget(category: string, monthlyLimit: number): BudgetItem {
    if (monthlyLimit < 0) throw new Error('Budget limit cannot be negative.');
    const currentMonth = new Date().toISOString().substring(0, 7);
    const existingIndex = this.budgets.findIndex((b) => b.category === category);

    if (existingIndex >= 0) {
      this.budgets[existingIndex].monthlyLimit = Math.round(monthlyLimit * 100) / 100;
      this.logSql(`UPDATE budgets SET monthly_limit = ? WHERE category = ?`, 'UPDATE', `[${monthlyLimit}, ${category}]`, 1);
      this.saveState();
      return this.budgets[existingIndex];
    } else {
      const nextId = Math.max(...this.budgets.map((b) => b.id), 0) + 1;
      const newBudget: BudgetItem = {
        id: nextId,
        category,
        monthYear: currentMonth,
        monthlyLimit: Math.round(monthlyLimit * 100) / 100,
      };
      this.budgets.push(newBudget);
      this.logSql(`INSERT INTO budgets (category, month_year, monthly_limit) VALUES (?, ?, ?)`, 'INSERT', `[${category}, ${currentMonth}, ${monthlyLimit}]`, 1);
      this.saveState();
      return newBudget;
    }
  }

  public deleteBudget(category: string): boolean {
    const countBefore = this.budgets.length;
    this.budgets = this.budgets.filter((b) => b.category !== category);
    const affected = countBefore - this.budgets.length;
    if (affected > 0) {
      this.logSql(`DELETE FROM budgets WHERE category = ?`, 'DELETE', `[${category}]`, affected);
      this.saveState();
      return true;
    }
    return false;
  }

  // --- Calculations as per Java OOP Service layer ---
  public calculateCurrentBalance(): number {
    return this.transactions.reduce((acc, t) => {
      // Polymorphic impact: Income is +, Expense is -
      return t.type === 'INCOME' ? acc + t.amount : acc - t.amount;
    }, 0);
  }

  public calculateTotalIncome(): number {
    return this.transactions
      .filter((t) => t.type === 'INCOME')
      .reduce((acc, t) => acc + t.amount, 0);
  }

  public calculateTotalExpenses(): number {
    return this.transactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((acc, t) => acc + t.amount, 0);
  }

  public calculateMonthlySavings(yearMonth?: string): number {
    const ym = yearMonth || new Date().toISOString().substring(0, 7);
    const monthTransactions = this.transactions.filter((t) => t.date.startsWith(ym));
    const income = monthTransactions
      .filter((t) => t.type === 'INCOME')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = monthTransactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((acc, t) => acc + t.amount, 0);
    return income - expenses;
  }

  public getBudgetsWithComputedSpending(yearMonth?: string): (BudgetItem & { currentSpending: number; utilization: number; isWarning: boolean; isExceeded: boolean })[] {
    const ym = yearMonth || new Date().toISOString().substring(0, 7);
    const monthTransactions = this.transactions.filter((t) => t.date.startsWith(ym) && t.type === 'EXPENSE');

    const spendingMap: Record<string, number> = {};
    for (const t of monthTransactions) {
      spendingMap[t.category] = (spendingMap[t.category] || 0) + t.amount;
    }

    return this.budgets.map((b) => {
      const currentSpending = spendingMap[b.category] || 0;
      const utilization = b.monthlyLimit > 0 ? (currentSpending / b.monthlyLimit) * 100 : 0;
      return {
        ...b,
        currentSpending,
        utilization,
        isWarning: utilization >= 80 && utilization <= 100,
        isExceeded: currentSpending > b.monthlyLimit,
      };
    });
  }

  public getOverallBudgetUtilization(): { totalLimit: number; totalSpent: number; percentage: number } {
    const computed = this.getBudgetsWithComputedSpending();
    const totalLimit = computed.reduce((acc, b) => acc + b.monthlyLimit, 0);
    const totalSpent = computed.reduce((acc, b) => acc + b.currentSpending, 0);
    const percentage = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;
    return { totalLimit, totalSpent, percentage };
  }

  public getCategoryBreakdown(startDate?: string, endDate?: string): { category: string; amount: number; percentage: number; color: string }[] {
    let list = this.transactions.filter((t) => t.type === 'EXPENSE');
    if (startDate) list = list.filter((t) => t.date >= startDate);
    if (endDate) list = list.filter((t) => t.date <= endDate);

    const totals: Record<string, number> = {};
    let grandTotal = 0;

    for (const t of list) {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
      grandTotal += t.amount;
    }

    const catColorMap = Object.fromEntries(this.categories.map((c) => [c.name, c.color]));

    return Object.entries(totals)
      .map(([cat, amount]) => ({
        category: cat,
        amount,
        percentage: grandTotal > 0 ? (amount / grandTotal) * 100 : 0,
        color: catColorMap[cat] || '#94a3b8',
      }))
      .sort((a, b) => b.amount - a.amount);
  }

  public getHighestSpendingCategory(): { category: string; amount: number } | null {
    const breakdown = this.getCategoryBreakdown();
    if (breakdown.length === 0) return null;
    return { category: breakdown[0].category, amount: breakdown[0].amount };
  }

  public getMonthlyTrends(lastMonths = 6): { monthYear: string; label: string; income: number; expense: number; savings: number }[] {
    const results = [];
    const date = new Date();

    for (let i = lastMonths - 1; i >= 0; i--) {
      const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
      const ym = d.toISOString().substring(0, 7);
      const monthLabel = d.toLocaleString('default', { month: 'short' });

      const mTrans = this.transactions.filter((t) => t.date.startsWith(ym));
      const income = mTrans.filter((t) => t.type === 'INCOME').reduce((a, b) => a + b.amount, 0);
      const expense = mTrans.filter((t) => t.type === 'EXPENSE').reduce((a, b) => a + b.amount, 0);

      results.push({
        monthYear: ym,
        label: monthLabel,
        income,
        expense,
        savings: income - expense,
      });
    }

    return results;
  }

  public exportToCsvString(): string {
    const headers = ['ID', 'Title', 'Type', 'Category', 'Amount', 'Date', 'Payment Method', 'Notes'];
    const rows = this.transactions.map((t) => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      t.type,
      `"${t.category.replace(/"/g, '""')}"`,
      t.amount.toFixed(2),
      t.date,
      `"${t.paymentMethod}"`,
      `"${(t.notes || '').replace(/"/g, '""')}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  public clearAllData() {
    this.transactions = [];
    this.logSql('DELETE FROM transactions', 'DELETE', '', 0);
    this.saveState();
  }

  public resetToSampleData() {
    this.transactions = [...INITIAL_TRANSACTIONS];
    this.categories = [...DEFAULT_CATEGORIES];
    this.budgets = [...INITIAL_BUDGETS];
    this.currency = DEFAULT_CURRENCIES[0];
    this.sqlLogs = [];
    this.logSql('RESTORE SAMPLE DATA IN SQLite', 'INSERT', 'Sample records re-seeded', this.transactions.length);
    this.saveState();
  }
}

export const expenseEngine = new JavaExpenseEngine();
