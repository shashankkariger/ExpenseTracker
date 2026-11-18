import { CategoryItem, TransactionItem, BudgetItem, CurrencyConfig } from '../types/expense';

export const DEFAULT_CURRENCIES: CurrencyConfig[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (₹)' },
  { code: 'USD', symbol: '$', name: 'US Dollar ($)' },
  { code: 'EUR', symbol: '€', name: 'Euro (€)' },
  { code: 'GBP', symbol: '£', name: 'British Pound (£)' },
];

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  // Income Categories
  { id: 1, name: 'Salary', type: 'INCOME', icon: 'Briefcase', color: '#10b981' },
  { id: 2, name: 'Scholarship', type: 'INCOME', icon: 'GraduationCap', color: '#059669' },
  { id: 3, name: 'Business', type: 'INCOME', icon: 'TrendingUp', color: '#047857' },
  { id: 4, name: 'Freelance', type: 'INCOME', icon: 'Laptop', color: '#14b8a6' },
  { id: 5, name: 'Other income', type: 'INCOME', icon: 'Coins', color: '#0d9488' },

  // Expense Categories
  { id: 6, name: 'Food', type: 'EXPENSE', icon: 'Utensils', color: '#ef4444' },
  { id: 7, name: 'Transport', type: 'EXPENSE', icon: 'Car', color: '#f97316' },
  { id: 8, name: 'Education', type: 'EXPENSE', icon: 'BookOpen', color: '#f59e0b' },
  { id: 9, name: 'Shopping', type: 'EXPENSE', icon: 'ShoppingBag', color: '#ec4899' },
  { id: 10, name: 'Bills', type: 'EXPENSE', icon: 'Receipt', color: '#8b5cf6' },
  { id: 11, name: 'Entertainment', type: 'EXPENSE', icon: 'Film', color: '#6366f1' },
  { id: 12, name: 'Healthcare', type: 'EXPENSE', icon: 'HeartPulse', color: '#06b6d4' },
  { id: 13, name: 'Rent', type: 'EXPENSE', icon: 'Home', color: '#3b82f6' },
  { id: 14, name: 'Other expenses', type: 'EXPENSE', icon: 'Tag', color: '#64748b' },
];

const today = new Date();
const formatDate = (daysAgo: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: 1,
    title: 'Monthly Tech Internship Stipend',
    amount: 35000,
    type: 'INCOME',
    category: 'Salary',
    date: formatDate(12),
    paymentMethod: 'Bank Transfer',
    notes: 'Credited directly from engineering college campus placement',
  },
  {
    id: 2,
    title: 'Merit Scholarship Grant',
    amount: 12000,
    type: 'INCOME',
    category: 'Scholarship',
    date: formatDate(10),
    paymentMethod: 'Bank Transfer',
    notes: 'Semester academic excellence award',
  },
  {
    id: 3,
    title: 'Apartment Monthly Rent',
    amount: 14000,
    type: 'EXPENSE',
    category: 'Rent',
    date: formatDate(9),
    paymentMethod: 'UPI',
    notes: 'Shared student accommodation payment',
  },
  {
    id: 4,
    title: 'Weekly Grocery & Provisions',
    amount: 3250,
    type: 'EXPENSE',
    category: 'Food',
    date: formatDate(7),
    paymentMethod: 'UPI',
    notes: 'Fresh vegetables, milk, and pantry supplies',
  },
  {
    id: 5,
    title: 'Data Structures Reference Book',
    amount: 1150,
    type: 'EXPENSE',
    category: 'Education',
    date: formatDate(6),
    paymentMethod: 'Debit Card',
    notes: 'Textbook for university exam prep',
  },
  {
    id: 6,
    title: 'Freelance Web Design Milestone',
    amount: 8500,
    type: 'INCOME',
    category: 'Freelance',
    date: formatDate(5),
    paymentMethod: 'UPI',
    notes: 'Portfolio website revamp for client',
  },
  {
    id: 7,
    title: 'Monthly Metro & Bus Smartcard Recharge',
    amount: 1600,
    type: 'EXPENSE',
    category: 'Transport',
    date: formatDate(4),
    paymentMethod: 'UPI',
    notes: 'Daily commute to engineering college',
  },
  {
    id: 8,
    title: 'High-Speed Broadband Internet Bill',
    amount: 999,
    type: 'EXPENSE',
    category: 'Bills',
    date: formatDate(3),
    paymentMethod: 'Credit Card',
    notes: 'Fiber optics monthly plan',
  },
  {
    id: 9,
    title: 'Weekend Dining with Project Teammates',
    amount: 1850,
    type: 'EXPENSE',
    category: 'Food',
    date: formatDate(2),
    paymentMethod: 'UPI',
    notes: 'Post-hackathon team dinner celebration',
  },
  {
    id: 10,
    title: 'New Wireless Headphones',
    amount: 3499,
    type: 'EXPENSE',
    category: 'Shopping',
    date: formatDate(1),
    paymentMethod: 'Credit Card',
    notes: 'Noise cancelling gear for study sessions',
  },
];

export const INITIAL_BUDGETS: BudgetItem[] = [
  {
    id: 1,
    category: 'Food',
    monthYear: today.toISOString().substring(0, 7),
    monthlyLimit: 7500,
  },
  {
    id: 2,
    category: 'Transport',
    monthYear: today.toISOString().substring(0, 7),
    monthlyLimit: 2500,
  },
  {
    id: 3,
    category: 'Shopping',
    monthYear: today.toISOString().substring(0, 7),
    monthlyLimit: 4000,
  },
  {
    id: 4,
    category: 'Bills',
    monthYear: today.toISOString().substring(0, 7),
    monthlyLimit: 2000,
  },
  {
    id: 5,
    category: 'Education',
    monthYear: today.toISOString().substring(0, 7),
    monthlyLimit: 3000,
  },
  {
    id: 6,
    category: 'Entertainment',
    monthYear: today.toISOString().substring(0, 7),
    monthlyLimit: 2000,
  },
];
