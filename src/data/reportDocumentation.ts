export interface VivaQuestion {
  question: string;
  answer: string;
  category: 'OOP' | 'Java Core' | 'Database' | 'GUI / Architecture' | 'Architecture';
}

export interface TestCaseDoc {
  id: string;
  testScenario: string;
  inputData: string;
  expectedResult: string;
  actualResult: string;
  status: 'PASS' | 'FAIL';
  oopConceptTested: string;
}

export const PROJECT_ABSTRACT = `
The Personal Expense Tracker is a desktop financial management system engineered in Java using Object-Oriented Programming (OOP) paradigms. The primary objective is to empower individuals and students to systematically record income and expenditures, manage monthly category budgets, track spending velocity, and generate actionable financial insights.

Built on Java 17 and Swing, the system demonstrates robust architecture through encapsulation, inheritance, polymorphism, and abstraction. Monetary calculations utilize BigDecimal precision to eliminate floating-point inaccuracies. Persistence is achieved through an embedded SQLite relational database utilizing parameterized queries to ensure data integrity and prevent SQL injection. The project bridges theoretical computer science concepts with modern application engineering.
`;

export const PROBLEM_STATEMENT = `
Manual bookkeeping and unorganized financial tracking often lead to budget overruns, impulsive spending, and financial indiscipline among students and young professionals. Existing commercial software is frequently overly complex, cloud-dependent, bloated with advertisements, or lacks transparency in how calculations and thresholds are derived.

There is a distinct need for a lightweight, secure, and offline-capable personal financial accounting tool that enforces strict budget constraints (including pre-emptive 80% utilization warnings and hard overage alerts), provides instant graphical summaries, and demonstrates textbook-quality software architecture.
`;

export const PROJECT_OBJECTIVES = [
  'Design and implement a clean, desktop-native GUI using Java Swing adhering to Event Dispatch Thread (EDT) safety.',
  'Implement the 4 pillars of Object-Oriented Programming (Encapsulation, Inheritance, Polymorphism, Abstraction) across domain entities.',
  'Guarantee financial precision by utilizing Java BigDecimal with HALF_UP rounding instead of standard IEEE 754 floating-point primitives.',
  'Integrate a local, zero-configuration SQLite persistence engine with automated schema bootstrap and CRUD repositories.',
  'Provide dynamic budget governance with 80% threshold warnings and real-time calculation of Current Balance, Monthly Savings, and Budget Utilization.',
  'Implement flexible multi-parameter search, filtering, and CSV export capabilities.',
];

export const OOP_PILLARS_EXPLANATION = [
  {
    pillar: 'Encapsulation',
    description: 'Data hiding and bundling of state and behavior into self-contained units with validated mutators.',
    javaClass: 'Transaction.java & Budget.java',
    implementationDetails:
      'All member variables (title, amount, date, category) are declared with "private" access modifiers. Public getters and setters enforce strict validation rules. For example, setAmount() checks that amount != null and amount > 0, rejecting negative or zero values. Monetary amounts are stored as java.math.BigDecimal with 2 decimal places to guarantee precision.',
    snippet: `private BigDecimal amount;

public void setAmount(BigDecimal amount) throws InvalidTransactionException {
    if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
        throw new InvalidTransactionException("Amount must be strictly positive.");
    }
    this.amount = amount.setScale(2, RoundingMode.HALF_UP);
}`,
  },
  {
    pillar: 'Inheritance',
    description: 'Hierarchical relationship enabling code reuse and specialized behavior through class extension.',
    javaClass: 'Transaction (Superclass) -> Income & Expense (Subclasses)',
    implementationDetails:
      'The abstract base class Transaction defines shared fields (id, title, amount, date, paymentMethod, notes) and constructors. Concrete subclasses Income and Expense extend Transaction via "extends Transaction", inheriting common state while providing specialized classification logic and constructor chaining via super(...).',
    snippet: `public class Expense extends Transaction {
    public Expense(int id, String title, BigDecimal amount, String category,
                   LocalDate date, PaymentMethod method, String notes)
            throws InvalidTransactionException {
        super(id, title, amount, category, date, method, notes);
    }
}`,
  },
  {
    pillar: 'Polymorphism',
    description: 'Ability of distinct classes to respond to identical method invocations with subclass-specific behavior.',
    javaClass: 'calculateImpact() & getTransactionType()',
    implementationDetails:
      'Transaction declares an abstract method "public abstract BigDecimal calculateImpact()". In class Income, calculateImpact() returns the positive amount (+). In class Expense, calculateImpact() returns the negated amount (-). When TransactionService calculates current balance, it loops through List<Transaction> and polymorphically executes t.calculateImpact() without using "instanceof" or branching logic.',
    snippet: `// In Income.java:
@Override
public BigDecimal calculateImpact() { return getAmount(); }

// In Expense.java:
@Override
public BigDecimal calculateImpact() { return getAmount().negate(); }

// In TransactionService.java:
for (Transaction t : transactionRepository.findAll()) {
    balance = balance.add(t.calculateImpact()); // Dynamic dispatch!
}`,
  },
  {
    pillar: 'Abstraction',
    description: 'Hiding low-level implementation details and exposing only essential interfaces and contracts.',
    javaClass: 'TransactionRepository.java & ReportService.java',
    implementationDetails:
      'The interface TransactionRepository defines abstract contracts (save, update, deleteById, findAll, findByDateRange). TransactionService depends solely on this interface. The concrete SQLiteTransactionRepository provides the JDBC SQL implementation. This ensures loose coupling: SQLite can be replaced with MySQL or In-Memory storage without modifying a single line of business or UI code.',
    snippet: `public interface TransactionRepository {
    int save(Transaction transaction);
    boolean update(Transaction transaction);
    boolean deleteById(int id);
    List<Transaction> findAll();
}`,
  },
];

export const TEST_CASES_DATA: TestCaseDoc[] = [
  {
    id: 'TC-01',
    testScenario: 'Calculate Current Net Balance using Polymorphism',
    inputData: 'Income: ₹35,000 + ₹12,000 | Expense: ₹14,000 + ₹3,250',
    expectedResult: 'Current Balance = ₹29,750.00',
    actualResult: 'Current Balance = ₹29,750.00',
    status: 'PASS',
    oopConceptTested: 'Polymorphic calculateImpact() across List<Transaction>',
  },
  {
    id: 'TC-02',
    testScenario: 'Reject Non-Positive or Negative Transaction Amount',
    inputData: 'Amount = -500.00 or Amount = 0.00',
    expectedResult: 'Throws InvalidTransactionException: "Amount must be strictly greater than zero"',
    actualResult: 'InvalidTransactionException thrown and caught; error dialog displayed',
    status: 'PASS',
    oopConceptTested: 'Encapsulation & Custom Exception Handling',
  },
  {
    id: 'TC-03',
    testScenario: 'Trigger 80% Warning Threshold on Category Budget',
    inputData: 'Budget Limit = ₹5,000.00 | Actual Spending = ₹4,200.00 (84.0%)',
    expectedResult: 'isWarningThresholdReached() == true; amber warning badge rendered',
    actualResult: 'Warning flag triggered at 84%; progress bar turned amber',
    status: 'PASS',
    oopConceptTested: 'Encapsulation in Budget.java',
  },
  {
    id: 'TC-04',
    testScenario: 'Trigger Exceeded Budget Alert on Breached Limit',
    inputData: 'Budget Limit = ₹2,500.00 | Actual Spending = ₹2,750.00 (110.0%)',
    expectedResult: 'isExceeded() == true; red alert banner rendered',
    actualResult: 'isExceeded() returned true; alert displayed with 110% usage',
    status: 'PASS',
    oopConceptTested: 'Domain Logic in Budget.java',
  },
  {
    id: 'TC-05',
    testScenario: 'Method Overloading: Multi-Parameter Transaction Filtering',
    inputData: 'Filter by Date Range, Type=EXPENSE, Category="Food"',
    expectedResult: 'Returns only Expense transactions under Food within date window',
    actualResult: 'Filtered list correctly returned matching records',
    status: 'PASS',
    oopConceptTested: 'Compile-Time Polymorphism (Method Overloading)',
  },
  {
    id: 'TC-06',
    testScenario: 'Data Persistence Across Application Restarts',
    inputData: 'Insert Expense record, close application, reopen',
    expectedResult: 'Record retrieved from SQLite database with exact id and values',
    actualResult: 'Data persisted in expense_tracker.db and retrieved via SQLiteTransactionRepository',
    status: 'PASS',
    oopConceptTested: 'Abstraction (Repository Pattern) & Database JDBC',
  },
  {
    id: 'TC-07',
    testScenario: 'CSV Export Formatting and Escaping',
    inputData: 'List of 10 transactions with notes containing commas',
    expectedResult: 'Valid RFC 4180 CSV with quotes escaping and correct header',
    actualResult: 'CSV generated successfully with matching rows and headers',
    status: 'PASS',
    oopConceptTested: 'File I/O and Utility Pattern (CsvExporter.java)',
  },
  {
    id: 'TC-08',
    testScenario: 'Delete Transaction and Recalculate Dashboard KPIs',
    inputData: 'Delete Expense of ₹1,850.00',
    expectedResult: 'Balance increases by ₹1,850.00; Category spending decreases accordingly',
    actualResult: 'Observer pattern refreshed DashboardFrame; KPIs updated instantaneously',
    status: 'PASS',
    oopConceptTested: 'Service Layer Coordination & Event Dispatching',
  },
];

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    question: '1. Why did you use BigDecimal instead of double or float for currency calculation?',
    answer:
      'Binary floating-point types (float and double in IEEE 754) represent numbers in base-2, which cannot represent base-10 decimals like 0.1 or 0.05 exactly. In financial applications, accumulated rounding errors lead to inaccurate balances. BigDecimal provides arbitrary precision with explicit rounding modes (RoundingMode.HALF_UP).',
    category: 'Java Core',
  },
  {
    question: '2. How does your project demonstrate Polymorphism in calculating balance?',
    answer:
      'The base class Transaction defines the abstract method "calculateImpact()". Income overrides it to return the positive amount, while Expense overrides it to return the negated amount (-amount). In TransactionService, we iterate through a List<Transaction> and execute "balance.add(t.calculateImpact())". The runtime dynamically invokes the correct subclass method without any "if-else" or "instanceof" checks.',
    category: 'OOP',
  },
  {
    question: '3. What is the difference between Method Overloading and Method Overriding in your project?',
    answer:
      'Method Overriding occurs when Income and Expense provide specific implementations of calculateImpact() declared in Transaction (Runtime Polymorphism). Method Overloading occurs in TransactionService where filterTransactions(...) has multiple signatures taking different numbers and types of arguments (Compile-time Polymorphism).',
    category: 'OOP',
  },
  {
    question: '4. Why did you use an interface for TransactionRepository rather than directly writing SQLite queries in the Service layer?',
    answer:
      'This implements Abstraction and the Repository Pattern (Dependency Inversion Principle). By coding to the TransactionRepository interface, the service layer is decoupled from the storage technology. We can switch SQLite to PostgreSQL or an in-memory repository for unit testing without altering business logic.',
    category: 'Architecture',
  },
  {
    question: '5. Why is DatabaseManager implemented as a Singleton?',
    answer:
      'The Singleton pattern ensures that only one instance of the database connection manager exists throughout the application lifecycle, providing a single centralized point of control for JDBC connections and preventing connection leaks and resource contention.',
    category: 'Architecture',
  },
  {
    question: '6. What prevents SQL Injection in your database operations?',
    answer:
      'We strictly use PreparedStatement with positional parameter placeholders (?) rather than concatenating user input strings into SQL statements. The JDBC driver safely escapes and binds parameters.',
    category: 'Database',
  },
  {
    question: '7. How do you ensure thread safety in Java Swing UI rendering?',
    answer:
      'Swing components are not thread-safe. All GUI updates and component instantiations are executed on the Event Dispatch Thread (EDT) using SwingUtilities.invokeLater(...).',
    category: 'GUI / Architecture',
  },
  {
    question: '8. What is the role of custom exceptions like InvalidTransactionException?',
    answer:
      'Custom checked exceptions establish a meaningful domain error hierarchy. Instead of throwing generic IllegalArgumentException or RuntimeException, custom exceptions clearly communicate business rule violations (such as negative amounts or empty titles) and enforce explicit error handling.',
    category: 'Java Core',
  },
  {
    question: '9. How does Budget calculate the 80% warning and 100% exceeded states?',
    answer:
      'Budget calculates utilization as (currentSpending / monthlyLimit) * 100. It provides helper methods isWarningThresholdReached() (true when utilization >= 80% and < 100%) and isExceeded() (true when currentSpending > monthlyLimit).',
    category: 'OOP',
  },
  {
    question: '10. What is Constructor Chaining and how is it used in your project?',
    answer:
      'Constructor chaining refers to calling one constructor from another. In our models, subclass constructors in Income and Expense call super(id, title, amount, category, date, paymentMethod, notes) to execute superclass initialization in Transaction before setting subtype state.',
    category: 'OOP',
  },
  {
    question: '11. How does your application demonstrate Encapsulation in the Transaction model?',
    answer:
      'All transaction fields (id, title, amount, date, category, paymentMethod, notes) are declared as private. Access is mediated exclusively through public getters and validated setters. setAmount() validates that the BigDecimal is positive, setTitle() enforces non-empty constraints, and setDate() guarantees non-null dates.',
    category: 'OOP',
  },
  {
    question: '12. What Java collections did you use and why?',
    answer:
      'We utilized List and ArrayList for dynamic, ordered sequences of transactions; Map and LinkedHashMap in ReportService for associating categories with their respective aggregated expense sums while preserving deterministic iteration order; and TreeSet/TreeMap for chronologically ordered monthly trends.',
    category: 'Java Core',
  },
  {
    question: '13. How is the Observer or notification pattern implemented when transactions change?',
    answer:
      'In DashboardFrame, a centralized refreshAllPanels() method coordinates dashboard KPI recalculations, transaction table repopulation, budget progress bar updates, and analytics refreshes whenever a transaction is inserted, modified, or deleted.',
    category: 'Architecture',
  },
  {
    question: '14. What are the advantages of SQLite over file-based CSV or JSON serialization for this project?',
    answer:
      'SQLite provides ACID transaction compliance, indexing on frequently queried columns (idx_trans_date, idx_trans_category), SQL aggregate functions (SUM, GROUP BY), atomic UPSERT support for budgets, and concurrent read safety without corrupting plain text files.',
    category: 'Database',
  },
  {
    question: '15. How are database migrations and table schemas initialized in your project?',
    answer:
      'DatabaseManager.initializeDatabase() executes DDL statements with "CREATE TABLE IF NOT EXISTS" upon application startup. Foreign keys are enabled via PRAGMA foreign_keys = ON, and default categories are safely seeded with INSERT OR IGNORE.',
    category: 'Database',
  },
  {
    question: '16. Why is FlatLaf used for the Java Swing GUI?',
    answer:
      'Standard Swing Look and Feel (Metal/Nimbus) appears outdated on modern operating systems. FlatLaf provides a clean, modern, flat desktop UI with native font rendering, rounded button geometries, and consistent cross-platform aesthetics on Windows, macOS, and Linux.',
    category: 'GUI / Architecture',
  },
  {
    question: '17. How does the application handle CSV export securely?',
    answer:
      'CsvExporter implements the RFC 4180 standard. It uses try-with-resources with BufferedWriter to prevent file handle leaks, writes column headers, and sanitizes free-text fields (such as notes and titles) by escaping nested double quotes to avoid delimiter injection.',
    category: 'Java Core',
  },
  {
    question: '18. What is the difference between Checked and Unchecked Exceptions in your project?',
    answer:
      'InvalidTransactionException and BudgetExceededException extend Exception (Checked Exceptions), requiring explicit handling or throws declarations because invalid user input is recoverable. DatabaseException extends RuntimeException (Unchecked Exception) for fatal SQL infrastructure failures.',
    category: 'Java Core',
  },
  {
    question: '19. How did you structure the project packages according to separation of concerns?',
    answer:
      'The project is structured into distinct packages: model (domain entities and enums), repository (database access interfaces and SQLite implementations), service (business logic and calculations), ui (Swing views and controllers), util (database singleton, validation, CSV), and exception (domain errors).',
    category: 'Architecture',
  },
  {
    question: '20. How would you scale this application to support multiple users or cloud synchronization?',
    answer:
      'Because the service layer depends on the TransactionRepository interface rather than SQLite directly, we can create a CloudTransactionRepository that communicates with a REST API backend or PostgreSQL database with JWT authentication, without changing any service or UI code.',
    category: 'Architecture',
  },
];
