// Java Codebase Definition for the Personal Expense Tracker mini-project
export interface JavaFile {
  path: string;
  filename: string;
  package: string;
  description: string;
  content: string;
  category: 'model' | 'repository' | 'service' | 'ui' | 'util' | 'exception' | 'root' | 'resources';
}

export const JAVA_SOURCE_FILES: JavaFile[] = [
  {
    path: 'pom.xml',
    filename: 'pom.xml',
    package: 'root',
    category: 'root',
    description: 'Maven configuration with SQLite JDBC, FlatLaf modern UI, and JFreeChart dependencies',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.expensetracker</groupId>
    <artifactId>personal-expense-tracker</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>Personal Expense Tracker</name>
    <description>Engineering College Mini-Project demonstrating Java OOP Principles</description>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <sqlite.version>3.45.1.0</sqlite.version>
        <flatlaf.version>3.4.1</flatlaf.version>
        <jfreechart.version>1.5.4</jfreechart.version>
        <junit.version>5.10.2</junit.version>
    </properties>

    <dependencies>
        <!-- SQLite JDBC Driver for Local Database Persistence -->
        <dependency>
            <groupId>org.xerial</groupId>
            <artifactId>sqlite-jdbc</artifactId>
            <version>\${sqlite.version}</version>
        </dependency>

        <!-- FlatLaf for Modern, Clean Swing GUI Look and Feel -->
        <dependency>
            <groupId>com.formdev</groupId>
            <artifactId>flatlaf</artifactId>
            <version>\${flatlaf.version}</version>
        </dependency>

        <!-- JFreeChart for Interactive Financial Analytics and Charts -->
        <dependency>
            <groupId>org.jfree</groupId>
            <artifactId>jfreechart</artifactId>
            <version>\${jfreechart.version}</version>
        </dependency>

        <!-- JUnit 5 for Automated Test Cases -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>\${junit.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>\${junit.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- Compiler Plugin -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                </configuration>
            </plugin>

            <!-- Exec Plugin to Run from Command Line -->
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>exec-maven-plugin</artifactId>
                <version>3.1.0</version>
                <configuration>
                    <mainClass>com.expensetracker.Main</mainClass>
                </configuration>
            </plugin>

            <!-- Shade Plugin to Package Executable Fat JAR -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>3.5.0</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <transformers>
                                <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                    <mainClass>com.expensetracker.Main</mainClass>
                                </transformer>
                            </transformers>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    path: 'src/main/resources/schema.sql',
    filename: 'schema.sql',
    package: 'resources',
    category: 'resources',
    description: 'SQLite database schema DDL script with tables and default seed categories',
    content: `-- Personal Expense Tracker Database Schema
-- DBMS: SQLite 3

-- Table: categories
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK(type IN ('INCOME', 'EXPENSE')),
    icon TEXT,
    color TEXT
);

-- Table: transactions
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('INCOME', 'EXPENSE')),
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: budgets
CREATE TABLE IF NOT EXISTS budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL UNIQUE,
    month_year TEXT NOT NULL,
    monthly_limit DECIMAL(12, 2) NOT NULL
);

-- Table: settings
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Indexes for Fast Querying and Analytics
CREATE INDEX IF NOT EXISTS idx_trans_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_trans_category ON transactions(category);
CREATE INDEX IF NOT EXISTS idx_trans_type ON transactions(type);

-- Seed Default Categories
INSERT OR IGNORE INTO categories (name, type, icon, color) VALUES
('Salary', 'INCOME', 'briefcase', '#10b981'),
('Scholarship', 'INCOME', 'award', '#059669'),
('Business', 'INCOME', 'trending-up', '#047857'),
('Freelance', 'INCOME', 'laptop', '#14b8a6'),
('Other Income', 'INCOME', 'dollar-sign', '#0d9488'),
('Food', 'EXPENSE', 'utensils', '#ef4444'),
('Transport', 'EXPENSE', 'car', '#f97316'),
('Education', 'EXPENSE', 'book-open', '#f59e0b'),
('Shopping', 'EXPENSE', 'shopping-bag', '#ec4899'),
('Bills', 'EXPENSE', 'file-text', '#8b5cf6'),
('Entertainment', 'EXPENSE', 'film', '#6366f1'),
('Healthcare', 'EXPENSE', 'activity', '#06b6d4'),
('Rent', 'EXPENSE', 'home', '#3b82f6'),
('Other Expenses', 'EXPENSE', 'tag', '#64748b');

-- Seed Default Settings
INSERT OR IGNORE INTO settings (key, value) VALUES ('currency', 'INR');
INSERT OR IGNORE INTO settings (key, value) VALUES ('theme', 'light');
`
  },
  {
    path: 'src/main/java/com/expensetracker/Main.java',
    filename: 'Main.java',
    package: 'com.expensetracker',
    category: 'root',
    description: 'Application entry point. Initializes FlatLaf Look and Feel, verifies database, and launches UI.',
    content: `package com.expensetracker;

import com.expensetracker.repository.SQLiteBudgetRepository;
import com.expensetracker.repository.SQLiteTransactionRepository;
import com.expensetracker.service.BudgetService;
import com.expensetracker.service.ReportService;
import com.expensetracker.service.TransactionService;
import com.expensetracker.ui.DashboardFrame;
import com.expensetracker.util.DatabaseManager;
import com.formdev.flatlaf.FlatLightLaf;

import javax.swing.*;
import java.awt.*;

/**
 * Main application entry point for the Personal Expense Tracker.
 * Demonstrates:
 * - Application bootstrapping
 * - Dependency Injection (manual wiring of repositories and services)
 * - Modern Swing look and feel configuration
 * - Event Dispatch Thread (EDT) safety
 *
 * @author Engineering College Mini-Project Team
 * @version 1.0.0
 */
public class Main {

    public static void main(String[] args) {
        // Set Modern FlatLaf Look and Feel for native, clean UI rendering
        try {
            UIManager.setLookAndFeel(new FlatLightLaf());
            // Global typography and component customizations
            UIManager.put("Button.arc", 8);
            UIManager.put("Component.arc", 8);
            UIManager.put("TextComponent.arc", 8);
            UIManager.put("ProgressBar.arc", 8);
            UIManager.put("TableHeader.font", new Font("Segoe UI", Font.BOLD, 12));
        } catch (UnsupportedLookAndFeelException e) {
            System.err.println("Notice: FlatLaf not found, using system default look and feel.");
        }

        // Initialize SQLite Database schema and tables
        DatabaseManager.getInstance().initializeDatabase();

        // Launch UI on the Java Swing Event Dispatch Thread (EDT)
        SwingUtilities.invokeLater(() -> {
            try {
                // Dependency Injection: Instantiate Repositories
                SQLiteTransactionRepository transactionRepo = new SQLiteTransactionRepository();
                SQLiteBudgetRepository budgetRepo = new SQLiteBudgetRepository();

                // Instantiate Services with Repositories (Abstraction & Decoupling)
                TransactionService transactionService = new TransactionService(transactionRepo);
                BudgetService budgetService = new BudgetService(budgetRepo, transactionRepo);
                ReportService reportService = new ReportService(transactionRepo);

                // Construct and display the main application window
                DashboardFrame appFrame = new DashboardFrame(
                        transactionService,
                        budgetService,
                        reportService
                );
                appFrame.setVisible(true);

            } catch (Exception ex) {
                JOptionPane.showMessageDialog(
                        null,
                        "Fatal error launching Personal Expense Tracker:\\n" + ex.getMessage(),
                        "Initialization Error",
                        JOptionPane.ERROR_MESSAGE
                );
                ex.printStackTrace();
            }
        });
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/model/TransactionType.java',
    filename: 'TransactionType.java',
    package: 'com.expensetracker.model',
    category: 'model',
    description: 'Enum representing transaction classification (INCOME or EXPENSE) with helper methods.',
    content: `package com.expensetracker.model;

/**
 * Enumeration representing the transaction nature.
 * Demonstrates: Enums with custom fields, display labels, and helper methods.
 */
public enum TransactionType {
    INCOME("Income", "+"),
    EXPENSE("Expense", "-");

    private final String displayName;
    private final String sign;

    TransactionType(String displayName, String sign) {
        this.displayName = displayName;
        this.sign = sign;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getSign() {
        return sign;
    }

    public static TransactionType fromString(String text) {
        for (TransactionType type : TransactionType.values()) {
            if (type.name().equalsIgnoreCase(text) || type.displayName.equalsIgnoreCase(text)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown transaction type: " + text);
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/model/PaymentMethod.java',
    filename: 'PaymentMethod.java',
    package: 'com.expensetracker.model',
    category: 'model',
    description: 'Enum representing accepted modes of financial transaction with display formatting.',
    content: `package com.expensetracker.model;

/**
 * Enumeration representing accepted payment methods.
 */
public enum PaymentMethod {
    CASH("Cash"),
    UPI("UPI"),
    CREDIT_CARD("Credit Card"),
    DEBIT_CARD("Debit Card"),
    BANK_TRANSFER("Bank Transfer"),
    CHEQUE("Cheque");

    private final String displayName;

    PaymentMethod(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static PaymentMethod fromString(String text) {
        for (PaymentMethod pm : PaymentMethod.values()) {
            if (pm.name().equalsIgnoreCase(text) || pm.displayName.equalsIgnoreCase(text)) {
                return pm;
            }
        }
        return CASH; // fallback default
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/model/Category.java',
    filename: 'Category.java',
    package: 'com.expensetracker.model',
    category: 'model',
    description: 'Entity class demonstrating encapsulation for expense and income categories.',
    content: `package com.expensetracker.model;

import java.util.Objects;

/**
 * Category Model
 * Demonstrates: Encapsulation (private members, public getters/setters, validation)
 */
public class Category {
    private int id;
    private String name;
    private TransactionType type;
    private String icon;
    private String color;

    // Default constructor
    public Category() {}

    // Parameterized constructor
    public Category(int id, String name, TransactionType type, String icon, String color) {
        this.id = id;
        this.setName(name);
        this.type = Objects.requireNonNull(type, "Category type cannot be null");
        this.icon = icon != null ? icon : "tag";
        this.color = color != null ? color : "#64748b";
    }

    public Category(String name, TransactionType type) {
        this(0, name, type, "tag", "#64748b");
    }

    // Getters and Setters with Encapsulation logic
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Category name cannot be empty");
        }
        this.name = name.trim();
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String toString() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Category category)) return false;
        return Objects.equals(name, category.name) && type == category.type;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, type);
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/model/Transaction.java',
    filename: 'Transaction.java',
    package: 'com.expensetracker.model',
    category: 'model',
    description: 'Abstract base class demonstrating Encapsulation, Abstraction, and Polymorphic contract definition.',
    content: `package com.expensetracker.model;

import com.expensetracker.exception.InvalidTransactionException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Objects;

/**
 * Abstract Base Class for Financial Transactions.
 *
 * Demonstrates:
 * 1. Abstraction: Defines common attributes and the abstract method calculateImpact()
 *    that subclasses must implement according to their specific financial behavior.
 * 2. Encapsulation: All fields are private with strict validation in mutators.
 *    BigDecimal is used to guarantee precision in financial computations.
 * 3. Inheritance: Serves as the superclass for concrete Income and Expense classes.
 *
 * @author Engineering College Mini-Project Team
 */
public abstract class Transaction {

    // Private fields (Encapsulation)
    private int id;
    private String title;
    private BigDecimal amount;
    private String category;
    private LocalDate date;
    private PaymentMethod paymentMethod;
    private String notes;

    /**
     * Default constructor
     */
    public Transaction() {
        this.date = LocalDate.now();
        this.amount = BigDecimal.ZERO;
        this.paymentMethod = PaymentMethod.CASH;
    }

    /**
     * Fully parameterized constructor
     *
     * @param id             Unique database identifier
     * @param title          Short descriptive title
     * @param amount         Monetary amount (strictly positive)
     * @param category       Associated category name
     * @param date           Date of transaction
     * @param paymentMethod  Payment mode used
     * @param notes          Optional detailed remarks
     * @throws InvalidTransactionException if validation fails
     */
    public Transaction(int id, String title, BigDecimal amount, String category,
                       LocalDate date, PaymentMethod paymentMethod, String notes)
            throws InvalidTransactionException {
        this.id = id;
        setTitle(title);
        setAmount(amount);
        setCategory(category);
        setDate(date);
        this.paymentMethod = paymentMethod != null ? paymentMethod : PaymentMethod.CASH;
        this.notes = notes != null ? notes.trim() : "";
    }

    // ==========================================
    // POLYMORPHIC ABSTRACT METHODS
    // Subclasses MUST override these methods!
    // ==========================================

    /**
     * Calculates the net impact on current cash balance.
     * Income returns positive amount; Expense returns negative amount.
     *
     * @return BigDecimal signed impact value
     */
    public abstract BigDecimal calculateImpact();

    /**
     * Returns the polymorphic TransactionType enum value.
     *
     * @return TransactionType (INCOME or EXPENSE)
     */
    public abstract TransactionType getTransactionType();

    /**
     * Returns human-readable sign symbol (+ or -).
     */
    public abstract String getFormattedSign();

    // ==========================================
    // ENCAPSULATED GETTERS AND VALIDATED SETTERS
    // ==========================================

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) throws InvalidTransactionException {
        if (title == null || title.trim().isEmpty()) {
            throw new InvalidTransactionException("Transaction title cannot be blank.");
        }
        if (title.trim().length() > 100) {
            throw new InvalidTransactionException("Title cannot exceed 100 characters.");
        }
        this.title = title.trim();
    }

    public BigDecimal getAmount() {
        return amount != null ? amount.setScale(2, RoundingMode.HALF_UP) : BigDecimal.ZERO;
    }

    public void setAmount(BigDecimal amount) throws InvalidTransactionException {
        if (amount == null) {
            throw new InvalidTransactionException("Amount cannot be null.");
        }
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidTransactionException("Amount must be strictly greater than zero.");
        }
        this.amount = amount.setScale(2, RoundingMode.HALF_UP);
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) throws InvalidTransactionException {
        if (category == null || category.trim().isEmpty()) {
            throw new InvalidTransactionException("Category must be selected.");
        }
        this.category = category.trim();
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) throws InvalidTransactionException {
        if (date == null) {
            throw new InvalidTransactionException("Transaction date cannot be null.");
        }
        this.date = date;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod != null ? paymentMethod : PaymentMethod.CASH;
    }

    public String getNotes() {
        return notes != null ? notes : "";
    }

    public void setNotes(String notes) {
        this.notes = notes != null ? notes.trim() : "";
    }

    @Override
    public String toString() {
        return String.format("[%s] #%d %s - %s %.2f (%s)",
                getTransactionType(), id, title, getFormattedSign(), getAmount(), date);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Transaction that = (Transaction) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/model/Income.java',
    filename: 'Income.java',
    package: 'com.expensetracker.model',
    category: 'model',
    description: 'Concrete subclass representing income entries. Demonstrates Inheritance and Polymorphic method overriding.',
    content: `package com.expensetracker.model;

import com.expensetracker.exception.InvalidTransactionException;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Concrete Subclass representing an Income Transaction.
 *
 * Demonstrates:
 * 1. Inheritance: Extends the abstract base class Transaction.
 * 2. Polymorphism: Overrides calculateImpact() to add money to current balance.
 * 3. Constructor Chaining: Uses super(...) to invoke superclass constructors.
 */
public class Income extends Transaction {

    public Income() {
        super();
    }

    public Income(int id, String title, BigDecimal amount, String category,
                  LocalDate date, PaymentMethod paymentMethod, String notes)
            throws InvalidTransactionException {
        super(id, title, amount, category, date, paymentMethod, notes);
    }

    /**
     * Polymorphic implementation:
     * Income has a POSITIVE impact on total balance (+ amount).
     */
    @Override
    public BigDecimal calculateImpact() {
        return getAmount();
    }

    /**
     * Polymorphic implementation:
     * Returns TransactionType.INCOME
     */
    @Override
    public TransactionType getTransactionType() {
        return TransactionType.INCOME;
    }

    @Override
    public String getFormattedSign() {
        return "+";
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/model/Expense.java',
    filename: 'Expense.java',
    package: 'com.expensetracker.model',
    category: 'model',
    description: 'Concrete subclass representing expense entries. Demonstrates Inheritance and Polymorphic method overriding.',
    content: `package com.expensetracker.model;

import com.expensetracker.exception.InvalidTransactionException;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Concrete Subclass representing an Expense Transaction.
 *
 * Demonstrates:
 * 1. Inheritance: Extends the abstract base class Transaction.
 * 2. Polymorphism: Overrides calculateImpact() to negate amount (subtracts from balance).
 * 3. Constructor Chaining: Uses super(...) to initialize common attributes.
 */
public class Expense extends Transaction {

    public Expense() {
        super();
    }

    public Expense(int id, String title, BigDecimal amount, String category,
                   LocalDate date, PaymentMethod paymentMethod, String notes)
            throws InvalidTransactionException {
        super(id, title, amount, category, date, paymentMethod, notes);
    }

    /**
     * Polymorphic implementation:
     * Expense has a NEGATIVE impact on total balance (- amount).
     */
    @Override
    public BigDecimal calculateImpact() {
        return getAmount().negate();
    }

    /**
     * Polymorphic implementation:
     * Returns TransactionType.EXPENSE
     */
    @Override
    public TransactionType getTransactionType() {
        return TransactionType.EXPENSE;
    }

    @Override
    public String getFormattedSign() {
        return "-";
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/model/Budget.java',
    filename: 'Budget.java',
    package: 'com.expensetracker.model',
    category: 'model',
    description: 'Budget model encapsulating spending limit, actual spending, and threshold calculation (80% warning, 100% exceeded).',
    content: `package com.expensetracker.model;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

/**
 * Budget Model
 * Demonstrates: Encapsulation, financial calculation logic with BigDecimal.
 */
public class Budget {
    private int id;
    private String category;
    private String monthYear; // e.g. "2026-10"
    private BigDecimal monthlyLimit;
    private BigDecimal currentSpending;

    public Budget() {
        this.monthlyLimit = BigDecimal.ZERO;
        this.currentSpending = BigDecimal.ZERO;
    }

    public Budget(int id, String category, String monthYear, BigDecimal monthlyLimit) {
        this.id = id;
        this.category = Objects.requireNonNull(category, "Category cannot be null");
        this.monthYear = monthYear != null ? monthYear : "";
        this.setMonthlyLimit(monthlyLimit);
        this.currentSpending = BigDecimal.ZERO;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getMonthYear() {
        return monthYear;
    }

    public void setMonthYear(String monthYear) {
        this.monthYear = monthYear;
    }

    public BigDecimal getMonthlyLimit() {
        return monthlyLimit != null ? monthlyLimit.setScale(2, RoundingMode.HALF_UP) : BigDecimal.ZERO;
    }

    public void setMonthlyLimit(BigDecimal monthlyLimit) {
        if (monthlyLimit == null || monthlyLimit.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Budget limit must be non-negative.");
        }
        this.monthlyLimit = monthlyLimit.setScale(2, RoundingMode.HALF_UP);
    }

    public BigDecimal getCurrentSpending() {
        return currentSpending != null ? currentSpending.setScale(2, RoundingMode.HALF_UP) : BigDecimal.ZERO;
    }

    public void setCurrentSpending(BigDecimal currentSpending) {
        this.currentSpending = currentSpending != null ? currentSpending.setScale(2, RoundingMode.HALF_UP) : BigDecimal.ZERO;
    }

    /**
     * Calculates the budget utilization percentage:
     * (Actual Expenses / Budget Limit) * 100
     */
    public double getUtilizationPercentage() {
        if (monthlyLimit == null || monthlyLimit.compareTo(BigDecimal.ZERO) == 0) {
            return 0.0;
        }
        BigDecimal ratio = currentSpending.divide(monthlyLimit, 4, RoundingMode.HALF_UP);
        return ratio.multiply(BigDecimal.valueOf(100)).doubleValue();
    }

    /**
     * Calculates remaining amount before reaching the limit.
     */
    public BigDecimal getRemainingBudget() {
        return monthlyLimit.subtract(currentSpending);
    }

    /**
     * Returns true if spending has reached or exceeded 80% warning threshold.
     */
    public boolean isWarningThresholdReached() {
        return getUtilizationPercentage() >= 80.0 && !isExceeded();
    }

    /**
     * Returns true if spending has exceeded 100% of the budget.
     */
    public boolean isExceeded() {
        return currentSpending.compareTo(monthlyLimit) > 0;
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/exception/InvalidTransactionException.java',
    filename: 'InvalidTransactionException.java',
    package: 'com.expensetracker.exception',
    category: 'exception',
    description: 'Custom checked exception for invalid transaction attributes (amount, date, title).',
    content: `package com.expensetracker.exception;

/**
 * Custom Exception demonstrating custom exception hierarchy in Java.
 * Thrown whenever transaction validation rules are violated.
 */
public class InvalidTransactionException extends Exception {
    public InvalidTransactionException(String message) {
        super(message);
    }

    public InvalidTransactionException(String message, Throwable cause) {
        super(message, cause);
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/exception/BudgetExceededException.java',
    filename: 'BudgetExceededException.java',
    package: 'com.expensetracker.exception',
    category: 'exception',
    description: 'Custom checked exception thrown when an operation would breach critical spending limits.',
    content: `package com.expensetracker.exception;

/**
 * Custom Exception thrown when an expense exceeds a defined category or overall budget limit.
 */
public class BudgetExceededException extends Exception {
    private final String category;
    private final double utilizationPercentage;

    public BudgetExceededException(String message, String category, double utilizationPercentage) {
        super(message);
        this.category = category;
        this.utilizationPercentage = utilizationPercentage;
    }

    public String getCategory() {
        return category;
    }

    public double getUtilizationPercentage() {
        return utilizationPercentage;
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/exception/DatabaseException.java',
    filename: 'DatabaseException.java',
    package: 'com.expensetracker.exception',
    category: 'exception',
    description: 'Custom unchecked exception wrapping SQLite JDBC and persistence errors.',
    content: `package com.expensetracker.exception;

/**
 * Custom runtime exception wrapping database/persistence errors.
 */
public class DatabaseException extends RuntimeException {
    public DatabaseException(String message) {
        super(message);
    }

    public DatabaseException(String message, Throwable cause) {
        super(message, cause);
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/repository/TransactionRepository.java',
    filename: 'TransactionRepository.java',
    package: 'com.expensetracker.repository',
    category: 'repository',
    description: 'Repository Interface demonstrating Abstraction. Decouples business services from storage implementations.',
    content: `package com.expensetracker.repository;

import com.expensetracker.model.Transaction;
import com.expensetracker.model.TransactionType;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Transaction Repository Interface.
 *
 * Demonstrates:
 * 1. Abstraction: Defines contract for CRUD operations without binding
 *    to a specific persistence mechanism (SQLite, In-Memory, or Cloud).
 * 2. Polymorphic Return Types: Methods return List<Transaction>, handling both
 *    Income and Expense instances transparently.
 */
public interface TransactionRepository {

    /**
     * Persists a new transaction (Income or Expense).
     * @param transaction The transaction object
     * @return Generated transaction ID
     */
    int save(Transaction transaction);

    /**
     * Updates an existing transaction.
     * @param transaction The updated transaction
     * @return true if successfully updated
     */
    boolean update(Transaction transaction);

    /**
     * Deletes a transaction by ID.
     * @param id Transaction unique identifier
     * @return true if successfully deleted
     */
    boolean deleteById(int id);

    /**
     * Finds a single transaction by ID.
     */
    Optional<Transaction> findById(int id);

    /**
     * Retrieves all recorded transactions, ordered by date descending.
     */
    List<Transaction> findAll();

    /**
     * Retrieves transactions filtered by type (Income or Expense).
     */
    List<Transaction> findByType(TransactionType type);

    /**
     * Retrieves transactions within a specific date range.
     */
    List<Transaction> findByDateRange(LocalDate start, LocalDate end);

    /**
     * Retrieves transactions for a specific category.
     */
    List<Transaction> findByCategory(String category);

    /**
     * Searches transactions matching title substring.
     */
    List<Transaction> searchByTitle(String keyword);

    /**
     * Clears all transactions (for resetting application data).
     */
    void clearAll();
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/repository/SQLiteTransactionRepository.java',
    filename: 'SQLiteTransactionRepository.java',
    package: 'com.expensetracker.repository',
    category: 'repository',
    description: 'Concrete SQLite JDBC implementation of TransactionRepository with PreparedStatements and Polymorphic instantiation.',
    content: `package com.expensetracker.repository;

import com.expensetracker.exception.DatabaseException;
import com.expensetracker.exception.InvalidTransactionException;
import com.expensetracker.model.*;
import com.expensetracker.util.DatabaseManager;

import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Concrete implementation of TransactionRepository using SQLite JDBC.
 * Demonstrates:
 * - Interface implementation (Abstraction)
 * - PreparedStatements for SQL injection prevention
 * - Polymorphic instantiation of Income and Expense from database rows
 */
public class SQLiteTransactionRepository implements TransactionRepository {

    private final DatabaseManager dbManager;

    public SQLiteTransactionRepository() {
        this.dbManager = DatabaseManager.getInstance();
    }

    @Override
    public int save(Transaction transaction) {
        String sql = """
            INSERT INTO transactions (title, amount, type, category, date, payment_method, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """;

        try (Connection conn = dbManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            pstmt.setString(1, transaction.getTitle());
            pstmt.setBigDecimal(2, transaction.getAmount());
            pstmt.setString(3, transaction.getTransactionType().name());
            pstmt.setString(4, transaction.getCategory());
            pstmt.setString(5, transaction.getDate().toString());
            pstmt.setString(6, transaction.getPaymentMethod().name());
            pstmt.setString(7, transaction.getNotes());

            int affectedRows = pstmt.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        int id = generatedKeys.getInt(1);
                        transaction.setId(id);
                        return id;
                    }
                }
            }
            return 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to save transaction: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean update(Transaction transaction) {
        String sql = """
            UPDATE transactions
            SET title = ?, amount = ?, type = ?, category = ?, date = ?, payment_method = ?, notes = ?
            WHERE id = ?
        """;

        try (Connection conn = dbManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, transaction.getTitle());
            pstmt.setBigDecimal(2, transaction.getAmount());
            pstmt.setString(3, transaction.getTransactionType().name());
            pstmt.setString(4, transaction.getCategory());
            pstmt.setString(5, transaction.getDate().toString());
            pstmt.setString(6, transaction.getPaymentMethod().name());
            pstmt.setString(7, transaction.getNotes());
            pstmt.setInt(8, transaction.getId());

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to update transaction: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean deleteById(int id) {
        String sql = "DELETE FROM transactions WHERE id = ?";
        try (Connection conn = dbManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to delete transaction: " + e.getMessage(), e);
        }
    }

    @Override
    public Optional<Transaction> findById(int id) {
        String sql = "SELECT * FROM transactions WHERE id = ?";
        try (Connection conn = dbManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRowToTransaction(rs));
                }
            }
        } catch (SQLException | InvalidTransactionException e) {
            throw new DatabaseException("Failed to find transaction by id: " + e.getMessage(), e);
        }
        return Optional.empty();
    }

    @Override
    public List<Transaction> findAll() {
        String sql = "SELECT * FROM transactions ORDER BY date DESC, id DESC";
        return queryTransactionList(sql);
    }

    @Override
    public List<Transaction> findByType(TransactionType type) {
        String sql = "SELECT * FROM transactions WHERE type = ? ORDER BY date DESC, id DESC";
        return queryTransactionListWithParam(sql, type.name());
    }

    @Override
    public List<Transaction> findByDateRange(LocalDate start, LocalDate end) {
        String sql = "SELECT * FROM transactions WHERE date BETWEEN ? AND ? ORDER BY date DESC, id DESC";
        List<Transaction> list = new ArrayList<>();
        try (Connection conn = dbManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, start.toString());
            pstmt.setString(2, end.toString());
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    list.add(mapRowToTransaction(rs));
                }
            }
        } catch (Exception e) {
            throw new DatabaseException("Error filtering transactions by date range", e);
        }
        return list;
    }

    @Override
    public List<Transaction> findByCategory(String category) {
        String sql = "SELECT * FROM transactions WHERE category = ? ORDER BY date DESC, id DESC";
        return queryTransactionListWithParam(sql, category);
    }

    @Override
    public List<Transaction> searchByTitle(String keyword) {
        String sql = "SELECT * FROM transactions WHERE title LIKE ? ORDER BY date DESC, id DESC";
        return queryTransactionListWithParam(sql, "%" + keyword + "%");
    }

    @Override
    public void clearAll() {
        String sql = "DELETE FROM transactions";
        try (Connection conn = dbManager.getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
        } catch (SQLException e) {
            throw new DatabaseException("Failed to clear transactions", e);
        }
    }

    // Helper method to execute queries with a single string param
    private List<Transaction> queryTransactionListWithParam(String sql, String param) {
        List<Transaction> list = new ArrayList<>();
        try (Connection conn = dbManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, param);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    list.add(mapRowToTransaction(rs));
                }
            }
        } catch (Exception e) {
            throw new DatabaseException("Query execution failed: " + e.getMessage(), e);
        }
        return list;
    }

    private List<Transaction> queryTransactionList(String sql) {
        List<Transaction> list = new ArrayList<>();
        try (Connection conn = dbManager.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                list.add(mapRowToTransaction(rs));
            }
        } catch (Exception e) {
            throw new DatabaseException("Query execution failed: " + e.getMessage(), e);
        }
        return list;
    }

    /**
     * Factory / Mapper demonstrating Polymorphic Object Instantiation:
     * Instantiates Income or Expense based on the stored database type discriminator.
     */
    private Transaction mapRowToTransaction(ResultSet rs) throws SQLException, InvalidTransactionException {
        int id = rs.getInt("id");
        String title = rs.getString("title");
        BigDecimal amount = rs.getBigDecimal("amount");
        String typeStr = rs.getString("type");
        String category = rs.getString("category");
        LocalDate date = LocalDate.parse(rs.getString("date"));
        PaymentMethod paymentMethod = PaymentMethod.fromString(rs.getString("payment_method"));
        String notes = rs.getString("notes");

        TransactionType type = TransactionType.fromString(typeStr);

        // Polymorphism in action: instantiate specific subtype
        if (type == TransactionType.INCOME) {
            return new Income(id, title, amount, category, date, paymentMethod, notes);
        } else {
            return new Expense(id, title, amount, category, date, paymentMethod, notes);
        }
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/repository/BudgetRepository.java',
    filename: 'BudgetRepository.java',
    package: 'com.expensetracker.repository',
    category: 'repository',
    description: 'Budget Repository Interface demonstrating Abstraction for budget storage.',
    content: `package com.expensetracker.repository;

import com.expensetracker.model.Budget;

import java.util.List;
import java.util.Optional;

/**
 * Budget Repository Interface (Abstraction).
 */
public interface BudgetRepository {
    void saveOrUpdate(Budget budget);
    Optional<Budget> findByCategory(String category);
    List<Budget> findAll();
    boolean deleteByCategory(String category);
    void clearAll();
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/repository/SQLiteBudgetRepository.java',
    filename: 'SQLiteBudgetRepository.java',
    package: 'com.expensetracker.repository',
    category: 'repository',
    description: 'SQLite implementation for Budgets with UPSERT capabilities.',
    content: `package com.expensetracker.repository;

import com.expensetracker.exception.DatabaseException;
import com.expensetracker.model.Budget;
import com.expensetracker.util.DatabaseManager;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * SQLite Implementation of BudgetRepository.
 */
public class SQLiteBudgetRepository implements BudgetRepository {

    private final DatabaseManager dbManager;

    public SQLiteBudgetRepository() {
        this.dbManager = DatabaseManager.getInstance();
    }

    @Override
    public void saveOrUpdate(Budget budget) {
        String sql = """
            INSERT INTO budgets (category, month_year, monthly_limit)
            VALUES (?, ?, ?)
            ON CONFLICT(category) DO UPDATE SET
                monthly_limit = excluded.monthly_limit,
                month_year = excluded.month_year
        """;

        try (Connection conn = dbManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, budget.getCategory());
            pstmt.setString(2, budget.getMonthYear());
            pstmt.setBigDecimal(3, budget.getMonthlyLimit());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            throw new DatabaseException("Failed to persist budget: " + e.getMessage(), e);
        }
    }

    @Override
    public Optional<Budget> findByCategory(String category) {
        String sql = "SELECT * FROM budgets WHERE category = ?";
        try (Connection conn = dbManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, category);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    Budget b = new Budget(
                            rs.getInt("id"),
                            rs.getString("category"),
                            rs.getString("month_year"),
                            rs.getBigDecimal("monthly_limit")
                    );
                    return Optional.of(b);
                }
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error finding budget: " + e.getMessage(), e);
        }
        return Optional.empty();
    }

    @Override
    public List<Budget> findAll() {
        List<Budget> list = new ArrayList<>();
        String sql = "SELECT * FROM budgets ORDER BY category ASC";
        try (Connection conn = dbManager.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                Budget b = new Budget(
                        rs.getInt("id"),
                        rs.getString("category"),
                        rs.getString("month_year"),
                        rs.getBigDecimal("monthly_limit")
                );
                list.add(b);
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error retrieving budgets: " + e.getMessage(), e);
        }
        return list;
    }

    @Override
    public boolean deleteByCategory(String category) {
        String sql = "DELETE FROM budgets WHERE category = ?";
        try (Connection conn = dbManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, category);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to delete budget: " + e.getMessage(), e);
        }
    }

    @Override
    public void clearAll() {
        try (Connection conn = dbManager.getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.executeUpdate("DELETE FROM budgets");
        } catch (SQLException e) {
            throw new DatabaseException("Failed to clear budgets", e);
        }
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/service/TransactionService.java',
    filename: 'TransactionService.java',
    package: 'com.expensetracker.service',
    category: 'service',
    description: 'Service orchestrating transaction business rules, method overloading for search/filtering, and financial computations.',
    content: `package com.expensetracker.service;

import com.expensetracker.exception.InvalidTransactionException;
import com.expensetracker.model.*;
import com.expensetracker.repository.TransactionRepository;
import com.expensetracker.util.ValidationUtil;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Transaction Service.
 *
 * Demonstrates:
 * 1. Business Logic Encapsulation: Coordinates validation, calculations, and data access.
 * 2. Method Overloading: filterTransactions(...) provided in multiple signatures.
 * 3. Polymorphism in Practice: Iterates over polymorphic Transaction references and calls
 *    calculateImpact() without needing instanceof checks.
 */
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = Objects.requireNonNull(transactionRepository, "Repository cannot be null");
    }

    /**
     * Creates and records a transaction with strict business validation.
     */
    public int addTransaction(Transaction transaction) throws InvalidTransactionException {
        ValidationUtil.validateTransaction(transaction);
        return transactionRepository.save(transaction);
    }

    /**
     * Updates an existing transaction.
     */
    public boolean updateTransaction(Transaction transaction) throws InvalidTransactionException {
        ValidationUtil.validateTransaction(transaction);
        return transactionRepository.update(transaction);
    }

    /**
     * Deletes a transaction by ID.
     */
    public boolean deleteTransaction(int id) {
        return transactionRepository.deleteById(id);
    }

    /**
     * Retrieves all transactions.
     */
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // ==========================================
    // METHOD OVERLOADING DEMONSTRATION
    // Multiple filterTransactions methods with distinct signatures
    // ==========================================

    /**
     * Overload 1: Filter by date range only.
     */
    public List<Transaction> filterTransactions(LocalDate startDate, LocalDate endDate) {
        return transactionRepository.findByDateRange(startDate, endDate);
    }

    /**
     * Overload 2: Filter by date range and category.
     */
    public List<Transaction> filterTransactions(LocalDate startDate, LocalDate endDate, String category) {
        return filterTransactions(startDate, endDate).stream()
                .filter(t -> category == null || category.equalsIgnoreCase("All") || t.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    /**
     * Overload 3: Comprehensive filter by date range, category, type, and payment method.
     */
    public List<Transaction> filterTransactions(LocalDate startDate, LocalDate endDate,
                                                String category, TransactionType type,
                                                PaymentMethod paymentMethod) {
        return getAllTransactions().stream()
                .filter(t -> (startDate == null || !t.getDate().isBefore(startDate)))
                .filter(t -> (endDate == null || !t.getDate().isAfter(endDate)))
                .filter(t -> (category == null || category.equalsIgnoreCase("All") || t.getCategory().equalsIgnoreCase(category)))
                .filter(t -> (type == null || t.getTransactionType() == type))
                .filter(t -> (paymentMethod == null || t.getPaymentMethod() == paymentMethod))
                .collect(Collectors.toList());
    }

    /**
     * Searches transactions by title keyword.
     */
    public List<Transaction> searchTransactions(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllTransactions();
        }
        return transactionRepository.searchByTitle(keyword.trim());
    }

    /**
     * Calculates the Current Balance using Polymorphism.
     * Iterates over List<Transaction> and sums t.calculateImpact().
     * Current Balance = Total Income - Total Expenses.
     */
    public BigDecimal calculateCurrentBalance() {
        BigDecimal balance = BigDecimal.ZERO;
        for (Transaction t : transactionRepository.findAll()) {
            // Polymorphic call: Income adds amount, Expense subtracts amount!
            balance = balance.add(t.calculateImpact());
        }
        return balance;
    }

    /**
     * Calculates Total Income for a given list of transactions.
     */
    public BigDecimal calculateTotalIncome(List<Transaction> transactions) {
        return transactions.stream()
                .filter(t -> t.getTransactionType() == TransactionType.INCOME)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Calculates Total Expenses for a given list of transactions.
     */
    public BigDecimal calculateTotalExpenses(List<Transaction> transactions) {
        return transactions.stream()
                .filter(t -> t.getTransactionType() == TransactionType.EXPENSE)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Sorts transactions by date or amount.
     */
    public List<Transaction> sortTransactions(List<Transaction> list, String sortBy, boolean ascending) {
        List<Transaction> sorted = new ArrayList<>(list);
        Comparator<Transaction> comparator;

        if ("amount".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparing(Transaction::getAmount);
        } else {
            comparator = Comparator.comparing(Transaction::getDate);
        }

        if (!ascending) {
            comparator = comparator.reversed();
        }
        sorted.sort(comparator);
        return sorted;
    }

    public void clearAllTransactions() {
        transactionRepository.clearAll();
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/service/BudgetService.java',
    filename: 'BudgetService.java',
    package: 'com.expensetracker.service',
    category: 'service',
    description: 'Budget Service calculating utilization, threshold warnings (80% and 100%), and budget tracking.',
    content: `package com.expensetracker.service;

import com.expensetracker.model.Budget;
import com.expensetracker.model.Transaction;
import com.expensetracker.model.TransactionType;
import com.expensetracker.repository.BudgetRepository;
import com.expensetracker.repository.TransactionRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

/**
 * Budget Service.
 * Coordinates budget limits, actual spending calculation from transactions,
 * and alerts when reaching 80% or 100% threshold.
 */
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;

    public BudgetService(BudgetRepository budgetRepository, TransactionRepository transactionRepository) {
        this.budgetRepository = Objects.requireNonNull(budgetRepository);
        this.transactionRepository = Objects.requireNonNull(transactionRepository);
    }

    /**
     * Sets or updates a budget for a category for a specific month.
     */
    public void setCategoryBudget(String category, BigDecimal monthlyLimit, YearMonth yearMonth) {
        Budget budget = new Budget(0, category, yearMonth.toString(), monthlyLimit);
        budgetRepository.saveOrUpdate(budget);
    }

    /**
     * Retrieves all budgets with actual computed spending for the current month.
     */
    public List<Budget> getBudgetsWithActualSpending(YearMonth yearMonth) {
        List<Budget> budgets = budgetRepository.findAll();
        LocalDate start = yearMonth.atDay(1);
        LocalDate end = yearMonth.atEndOfMonth();

        List<Transaction> monthTransactions = transactionRepository.findByDateRange(start, end);

        // Group actual expenses by category
        Map<String, BigDecimal> categorySpending = new HashMap<>();
        for (Transaction t : monthTransactions) {
            if (t.getTransactionType() == TransactionType.EXPENSE) {
                categorySpending.merge(t.getCategory(), t.getAmount(), BigDecimal::add);
            }
        }

        for (Budget b : budgets) {
            BigDecimal actual = categorySpending.getOrDefault(b.getCategory(), BigDecimal.ZERO);
            b.setCurrentSpending(actual);
        }

        return budgets;
    }

    /**
     * Calculates overall monthly budget utilization.
     */
    public double calculateOverallMonthlyBudgetUsage(YearMonth yearMonth) {
        List<Budget> budgets = getBudgetsWithActualSpending(yearMonth);
        BigDecimal totalLimit = BigDecimal.ZERO;
        BigDecimal totalSpent = BigDecimal.ZERO;

        for (Budget b : budgets) {
            totalLimit = totalLimit.add(b.getMonthlyLimit());
            totalSpent = totalSpent.add(b.getCurrentSpending());
        }

        if (totalLimit.compareTo(BigDecimal.ZERO) == 0) {
            return 0.0;
        }

        return (totalSpent.doubleValue() / totalLimit.doubleValue()) * 100.0;
    }

    public void removeBudget(String category) {
        budgetRepository.deleteByCategory(category);
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/service/ReportService.java',
    filename: 'ReportService.java',
    package: 'com.expensetracker.service',
    category: 'service',
    description: 'Financial Analytics & Report Generator. Calculates spending trends, savings, category distributions.',
    content: `package com.expensetracker.service;

import com.expensetracker.model.Transaction;
import com.expensetracker.model.TransactionType;
import com.expensetracker.repository.TransactionRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Report and Financial Analytics Service.
 * Implements financial formulas and summary computations.
 */
public class ReportService {

    private final TransactionRepository transactionRepository;

    public ReportService(TransactionRepository transactionRepository) {
        this.transactionRepository = Objects.requireNonNull(transactionRepository);
    }

    /**
     * Calculates Monthly Savings:
     * Monthly Savings = Monthly Income - Monthly Expenses
     */
    public BigDecimal calculateMonthlySavings(YearMonth yearMonth) {
        LocalDate start = yearMonth.atDay(1);
        LocalDate end = yearMonth.atEndOfMonth();
        List<Transaction> list = transactionRepository.findByDateRange(start, end);

        BigDecimal income = BigDecimal.ZERO;
        BigDecimal expenses = BigDecimal.ZERO;

        for (Transaction t : list) {
            if (t.getTransactionType() == TransactionType.INCOME) {
                income = income.add(t.getAmount());
            } else {
                expenses = expenses.add(t.getAmount());
            }
        }

        return income.subtract(expenses);
    }

    /**
     * Computes Category-wise Expense Breakdown for a date range.
     */
    public Map<String, BigDecimal> getExpenseCategoryBreakdown(LocalDate start, LocalDate end) {
        List<Transaction> list = transactionRepository.findByDateRange(start, end);
        Map<String, BigDecimal> map = new LinkedHashMap<>();

        for (Transaction t : list) {
            if (t.getTransactionType() == TransactionType.EXPENSE) {
                map.merge(t.getCategory(), t.getAmount(), BigDecimal::add);
            }
        }
        return map;
    }

    /**
     * Finds the category with the highest spending in a given time period.
     */
    public Map.Entry<String, BigDecimal> getHighestSpendingCategory(LocalDate start, LocalDate end) {
        Map<String, BigDecimal> breakdown = getExpenseCategoryBreakdown(start, end);
        return breakdown.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .orElse(null);
    }

    /**
     * Returns monthly spending trends for the last N months.
     */
    public Map<YearMonth, BigDecimal> getMonthlyExpenseTrend(int pastMonthsCount) {
        Map<YearMonth, BigDecimal> trend = new TreeMap<>();
        YearMonth current = YearMonth.now();

        for (int i = pastMonthsCount - 1; i >= 0; i--) {
            YearMonth ym = current.minusMonths(i);
            LocalDate start = ym.atDay(1);
            LocalDate end = ym.atEndOfMonth();

            BigDecimal totalMonthExpense = transactionRepository.findByDateRange(start, end).stream()
                    .filter(t -> t.getTransactionType() == TransactionType.EXPENSE)
                    .map(Transaction::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            trend.put(ym, totalMonthExpense);
        }

        return trend;
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/util/DatabaseManager.java',
    filename: 'DatabaseManager.java',
    package: 'com.expensetracker.util',
    category: 'util',
    description: 'Singleton connection pool & schema manager for SQLite database with automatic initialization.',
    content: `package com.expensetracker.util;

import com.expensetracker.exception.DatabaseException;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Singleton Database Manager.
 * Demonstrates:
 * - Singleton Design Pattern (private constructor, getInstance())
 * - SQLite database connection management
 * - Automatic schema bootstrapping
 */
public class DatabaseManager {

    private static final String DB_URL = "jdbc:sqlite:expense_tracker.db";
    private static DatabaseManager instance;

    private DatabaseManager() {
        try {
            // Load SQLite JDBC Driver
            Class.forName("org.sqlite.JDBC");
        } catch (ClassNotFoundException e) {
            throw new DatabaseException("SQLite JDBC driver not found on classpath", e);
        }
    }

    /**
     * Thread-safe Singleton accessor
     */
    public static synchronized DatabaseManager getInstance() {
        if (instance == null) {
            instance = new DatabaseManager();
        }
        return instance;
    }

    /**
     * Opens and returns a new JDBC Connection.
     */
    public Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL);
    }

    /**
     * Initializes database schema and default records.
     */
    public void initializeDatabase() {
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {

            // Enable SQLite foreign keys
            stmt.execute("PRAGMA foreign_keys = ON;");

            // Create transactions table
            stmt.execute("""
                CREATE TABLE IF NOT EXISTS transactions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    amount DECIMAL(12, 2) NOT NULL,
                    type TEXT NOT NULL,
                    category TEXT NOT NULL,
                    date TEXT NOT NULL,
                    payment_method TEXT NOT NULL,
                    notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """);

            // Create budgets table
            stmt.execute("""
                CREATE TABLE IF NOT EXISTS budgets (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    category TEXT NOT NULL UNIQUE,
                    month_year TEXT NOT NULL,
                    monthly_limit DECIMAL(12, 2) NOT NULL
                );
            """);

            // Create categories table
            stmt.execute("""
                CREATE TABLE IF NOT EXISTS categories (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL UNIQUE,
                    type TEXT NOT NULL
                );
            """);

            // Create settings table
            stmt.execute("""
                CREATE TABLE IF NOT EXISTS settings (
                    key TEXT PRIMARY KEY,
                    value TEXT NOT NULL
                );
            """);

            System.out.println("SQLite database successfully initialized: expense_tracker.db");

        } catch (SQLException e) {
            throw new DatabaseException("Database initialization failed: " + e.getMessage(), e);
        }
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/util/ValidationUtil.java',
    filename: 'ValidationUtil.java',
    package: 'com.expensetracker.util',
    category: 'util',
    description: 'Input validation utility ensuring all financial attributes adhere to strict domain rules.',
    content: `package com.expensetracker.util;

import com.expensetracker.exception.InvalidTransactionException;
import com.expensetracker.model.Transaction;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Validation Utility Class.
 * Demonstrates: Static utility pattern, defensive programming, and domain validation.
 */
public final class ValidationUtil {

    private ValidationUtil() {
        // Prevent instantiation
    }

    public static void validateTransaction(Transaction transaction) throws InvalidTransactionException {
        if (transaction == null) {
            throw new InvalidTransactionException("Transaction object cannot be null.");
        }

        if (transaction.getTitle() == null || transaction.getTitle().trim().isEmpty()) {
            throw new InvalidTransactionException("Title is a mandatory field.");
        }

        BigDecimal amount = transaction.getAmount();
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidTransactionException("Amount must be a positive number greater than zero.");
        }

        if (transaction.getCategory() == null || transaction.getCategory().trim().isEmpty()) {
            throw new InvalidTransactionException("A valid category must be selected.");
        }

        if (transaction.getDate() == null) {
            throw new InvalidTransactionException("Transaction date cannot be empty.");
        }

        if (transaction.getDate().isAfter(LocalDate.now().plusDays(365))) {
            throw new InvalidTransactionException("Date cannot be more than 1 year in the future.");
        }
    }

    public static BigDecimal parseAmount(String text) throws InvalidTransactionException {
        if (text == null || text.trim().isEmpty()) {
            throw new InvalidTransactionException("Amount field cannot be blank.");
        }
        try {
            BigDecimal val = new BigDecimal(text.trim());
            if (val.compareTo(BigDecimal.ZERO) <= 0) {
                throw new InvalidTransactionException("Amount must be greater than zero.");
            }
            return val;
        } catch (NumberFormatException e) {
            throw new InvalidTransactionException("Invalid monetary amount format: " + text);
        }
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/util/CsvExporter.java',
    filename: 'CsvExporter.java',
    package: 'com.expensetracker.util',
    category: 'util',
    description: 'CSV File Exporter demonstrating File I/O, string formatting, and stream writing.',
    content: `package com.expensetracker.util;

import com.expensetracker.model.Transaction;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

/**
 * CSV Exporter.
 * Demonstrates: File handling, java.io streams, and report generation.
 */
public class CsvExporter {

    public static void exportTransactionsToCsv(List<Transaction> transactions, File targetFile) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(targetFile))) {
            // Write CSV Header
            writer.write("ID,Title,Type,Category,Amount,Date,Payment Method,Notes");
            writer.newLine();

            // Write Data Rows
            for (Transaction t : transactions) {
                String line = String.format("%d,\\"%s\\",%s,\\"%s\\",%.2f,%s,\\"%s\\",\\"%s\\"",
                        t.getId(),
                        escapeCsv(t.getTitle()),
                        t.getTransactionType().name(),
                        escapeCsv(t.getCategory()),
                        t.getAmount(),
                        t.getDate(),
                        t.getPaymentMethod().getDisplayName(),
                        escapeCsv(t.getNotes())
                );
                writer.write(line);
                writer.newLine();
            }
        }
    }

    private static String escapeCsv(String input) {
        if (input == null) return "";
        return input.replace("\\\"", "\\\"\\\"");
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/ui/DashboardFrame.java',
    filename: 'DashboardFrame.java',
    package: 'com.expensetracker.ui',
    category: 'ui',
    description: 'Main Swing Application Frame with sidebar navigation, card layout, and service wiring.',
    content: `package com.expensetracker.ui;

import com.expensetracker.service.BudgetService;
import com.expensetracker.service.ReportService;
import com.expensetracker.service.TransactionService;

import javax.swing.*;
import java.awt.*;

/**
 * Main Application Window (JFrame).
 * Demonstrates:
 * - Swing GUI Architecture
 * - CardLayout for smooth tab switching
 * - Sidebar Navigation Panel
 * - Observer / Refresh notification pattern across panels
 */
public class DashboardFrame extends JFrame {

    private final TransactionService transactionService;
    private final BudgetService budgetService;
    private final ReportService reportService;

    private CardLayout cardLayout;
    private JPanel contentCards;

    private DashboardPanel dashboardPanel;
    private TransactionPanel transactionPanel;
    private BudgetPanel budgetPanel;
    private ReportsPanel reportsPanel;
    private SettingsPanel settingsPanel;

    public DashboardFrame(TransactionService transactionService,
                          BudgetService budgetService,
                          ReportService reportService) {
        this.transactionService = transactionService;
        this.budgetService = budgetService;
        this.reportService = reportService;

        initComponents();
    }

    private void initComponents() {
        setTitle("Personal Expense Tracker - Java OOP Mini-Project");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1200, 780);
        setMinimumSize(new Dimension(1000, 650));
        setLocationRelativeTo(null);

        // Main Layout: BorderLayout with sidebar on WEST and cards on CENTER
        setLayout(new BorderLayout());

        // Sidebar Navigation
        JPanel sidebar = createSidebar();
        add(sidebar, BorderLayout.WEST);

        // Content Area with CardLayout
        cardLayout = new CardLayout();
        contentCards = new JPanel(cardLayout);

        // Instantiate sub-panels
        dashboardPanel = new DashboardPanel(transactionService, budgetService, reportService, this);
        transactionPanel = new TransactionPanel(transactionService, this);
        budgetPanel = new BudgetPanel(budgetService, transactionService, this);
        reportsPanel = new ReportsPanel(reportService, transactionService, this);
        settingsPanel = new SettingsPanel(transactionService, budgetService, this);

        contentCards.add(dashboardPanel, "DASHBOARD");
        contentCards.add(transactionPanel, "TRANSACTIONS");
        contentCards.add(budgetPanel, "BUDGETS");
        contentCards.add(reportsPanel, "REPORTS");
        contentCards.add(settingsPanel, "SETTINGS");

        add(contentCards, BorderLayout.CENTER);
    }

    private JPanel createSidebar() {
        JPanel sidebar = new JPanel();
        sidebar.setLayout(new BoxLayout(sidebar, BoxLayout.Y_AXIS));
        sidebar.setPreferredSize(new Dimension(220, getHeight()));
        sidebar.setBackground(new Color(248, 250, 252));
        sidebar.setBorder(BorderFactory.createMatteBorder(0, 0, 0, 1, new Color(226, 232, 240)));

        // App Brand Header
        JPanel brandPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 16, 20));
        brandPanel.setOpaque(false);
        JLabel titleLabel = new JLabel("ExpenseTracker");
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 18));
        titleLabel.setForeground(new Color(15, 23, 42));
        brandPanel.add(titleLabel);
        sidebar.add(brandPanel);

        sidebar.add(Box.createRigidArea(new Dimension(0, 15)));

        // Nav Buttons
        sidebar.add(createNavButton("Dashboard", "DASHBOARD"));
        sidebar.add(createNavButton("Transactions", "TRANSACTIONS"));
        sidebar.add(createNavButton("Budgets", "BUDGETS"));
        sidebar.add(createNavButton("Reports & Analytics", "REPORTS"));
        sidebar.add(createNavButton("Settings", "SETTINGS"));

        sidebar.add(Box.createVerticalGlue());

        // Footer info
        JLabel footerLabel = new JLabel(" Java OOP Project v1.0 ");
        footerLabel.setFont(new Font("Segoe UI", Font.PLAIN, 11));
        footerLabel.setForeground(new Color(148, 163, 184));
        sidebar.add(footerLabel);
        sidebar.add(Box.createRigidArea(new Dimension(0, 15)));

        return sidebar;
    }

    private JButton createNavButton(String text, String cardName) {
        JButton btn = new JButton(text);
        btn.setMaximumSize(new Dimension(200, 42));
        btn.setPreferredSize(new Dimension(200, 42));
        btn.setAlignmentX(Component.CENTER_ALIGNMENT);
        btn.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        btn.setFocusPainted(false);
        btn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        btn.addActionListener(e -> switchCard(cardName));
        return btn;
    }

    public void switchCard(String cardName) {
        cardLayout.show(contentCards, cardName);
        refreshAllPanels();
    }

    /**
     * Observer Pattern: Refreshes all active panels whenever transactions or budgets change.
     */
    public void refreshAllPanels() {
        if (dashboardPanel != null) dashboardPanel.refreshData();
        if (transactionPanel != null) transactionPanel.refreshData();
        if (budgetPanel != null) budgetPanel.refreshData();
        if (reportsPanel != null) reportsPanel.refreshData();
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/ui/DashboardPanel.java',
    filename: 'DashboardPanel.java',
    package: 'com.expensetracker.ui',
    category: 'ui',
    description: 'Dashboard screen displaying summary cards (Income, Expenses, Balance, Savings), recent transactions, and spending progress.',
    content: `package com.expensetracker.ui;

import com.expensetracker.model.Transaction;
import com.expensetracker.service.BudgetService;
import com.expensetracker.service.ReportService;
import com.expensetracker.service.TransactionService;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.List;

/**
 * Dashboard Panel displaying key financial KPIs, quick actions, and recent transactions.
 */
public class DashboardPanel extends JPanel {

    private final TransactionService transactionService;
    private final BudgetService budgetService;
    private final ReportService reportService;
    private final DashboardFrame parentFrame;

    private JLabel lblIncome;
    private JLabel lblExpenses;
    private JLabel lblBalance;
    private JLabel lblSavings;
    private JLabel lblBudgetUsage;
    private JPanel recentTransactionsContainer;

    public DashboardPanel(TransactionService transactionService,
                          BudgetService budgetService,
                          ReportService reportService,
                          DashboardFrame parentFrame) {
        this.transactionService = transactionService;
        this.budgetService = budgetService;
        this.reportService = reportService;
        this.parentFrame = parentFrame;

        initUI();
        refreshData();
    }

    private void initUI() {
        setLayout(new BorderLayout(16, 16));
        setBackground(new Color(241, 245, 249));
        setBorder(new EmptyBorder(24, 24, 24, 24));

        // Top Header
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setOpaque(false);
        JLabel title = new JLabel("Financial Dashboard");
        title.setFont(new Font("Segoe UI", Font.BOLD, 24));
        title.setForeground(new Color(15, 23, 42));
        headerPanel.add(title, BorderLayout.WEST);

        JButton btnQuickAdd = new JButton("+ Quick Add Transaction");
        btnQuickAdd.setBackground(new Color(16, 185, 129));
        btnQuickAdd.setForeground(Color.WHITE);
        btnQuickAdd.setFont(new Font("Segoe UI", Font.BOLD, 13));
        btnQuickAdd.addActionListener(e -> parentFrame.switchCard("TRANSACTIONS"));
        headerPanel.add(btnQuickAdd, BorderLayout.EAST);

        add(headerPanel, BorderLayout.NORTH);

        // Center Content: ScrollPane containing KPI cards and tables
        JPanel centerPanel = new JPanel();
        centerPanel.setLayout(new BoxLayout(centerPanel, BoxLayout.Y_AXIS));
        centerPanel.setOpaque(false);

        // Summary KPI Cards Grid (1 row, 4 cards)
        JPanel cardsGrid = new JPanel(new GridLayout(1, 4, 16, 16));
        cardsGrid.setOpaque(false);
        cardsGrid.setMaximumSize(new Dimension(Short.MAX_VALUE, 120));

        lblBalance = new JLabel("₹0.00");
        lblIncome = new JLabel("₹0.00");
        lblExpenses = new JLabel("₹0.00");
        lblSavings = new JLabel("₹0.00");

        cardsGrid.add(createCard("Total Balance", lblBalance, new Color(15, 23, 42), "Available net balance"));
        cardsGrid.add(createCard("Total Income", lblIncome, new Color(16, 185, 129), "Total money earned"));
        cardsGrid.add(createCard("Total Expenses", lblExpenses, new Color(239, 68, 68), "Total expenditure"));
        cardsGrid.add(createCard("Monthly Savings", lblSavings, new Color(59, 130, 246), "Current month savings"));

        centerPanel.add(cardsGrid);
        centerPanel.add(Box.createRigidArea(new Dimension(0, 24)));

        // Recent Activity Section
        JPanel recentPanel = new JPanel(new BorderLayout(0, 10));
        recentPanel.setBackground(Color.WHITE);
        recentPanel.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240)),
                new EmptyBorder(16, 16, 16, 16)
        ));

        JLabel recentHeader = new JLabel("Recent Transactions");
        recentHeader.setFont(new Font("Segoe UI", Font.BOLD, 16));
        recentPanel.add(recentHeader, BorderLayout.NORTH);

        recentTransactionsContainer = new JPanel();
        recentTransactionsContainer.setLayout(new BoxLayout(recentTransactionsContainer, BoxLayout.Y_AXIS));
        recentTransactionsContainer.setBackground(Color.WHITE);
        recentPanel.add(recentTransactionsContainer, BorderLayout.CENTER);

        centerPanel.add(recentPanel);

        add(new JScrollPane(centerPanel), BorderLayout.CENTER);
    }

    private JPanel createCard(String title, JLabel valueLabel, Color valueColor, String subtitle) {
        JPanel card = new JPanel();
        card.setLayout(new BoxLayout(card, BoxLayout.Y_AXIS));
        card.setBackground(Color.WHITE);
        card.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240)),
                new EmptyBorder(14, 16, 14, 16)
        ));

        JLabel titleLbl = new JLabel(title);
        titleLbl.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        titleLbl.setForeground(new Color(100, 116, 139));
        card.add(titleLbl);
        card.add(Box.createRigidArea(new Dimension(0, 6)));

        valueLabel.setFont(new Font("Segoe UI", Font.BOLD, 22));
        valueLabel.setForeground(valueColor);
        card.add(valueLabel);
        card.add(Box.createRigidArea(new Dimension(0, 4)));

        JLabel subLbl = new JLabel(subtitle);
        subLbl.setFont(new Font("Segoe UI", Font.PLAIN, 11));
        subLbl.setForeground(new Color(148, 163, 184));
        card.add(subLbl);

        return card;
    }

    public void refreshData() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        BigDecimal balance = transactionService.calculateCurrentBalance();
        BigDecimal income = transactionService.calculateTotalIncome(transactions);
        BigDecimal expenses = transactionService.calculateTotalExpenses(transactions);
        BigDecimal savings = reportService.calculateMonthlySavings(YearMonth.now());

        lblBalance.setText(String.format("₹%,.2f", balance));
        lblIncome.setText(String.format("₹%,.2f", income));
        lblExpenses.setText(String.format("₹%,.2f", expenses));
        lblSavings.setText(String.format("₹%,.2f", savings));

        // Update Recent transactions list
        recentTransactionsContainer.removeAll();
        int count = 0;
        for (Transaction t : transactions) {
            if (count++ >= 5) break;
            JPanel row = new JPanel(new BorderLayout());
            row.setBackground(Color.WHITE);
            row.setBorder(new EmptyBorder(8, 0, 8, 0));

            JLabel title = new JLabel(t.getTitle() + " (" + t.getCategory() + ")");
            title.setFont(new Font("Segoe UI", Font.PLAIN, 13));

            JLabel amount = new JLabel(String.format("%s ₹%,.2f", t.getFormattedSign(), t.getAmount()));
            amount.setFont(new Font("Segoe UI", Font.BOLD, 13));
            amount.setForeground(t.getFormattedSign().equals("+") ? new Color(16, 185, 129) : new Color(239, 68, 68));

            row.add(title, BorderLayout.WEST);
            row.add(amount, BorderLayout.EAST);
            recentTransactionsContainer.add(row);
            recentTransactionsContainer.add(new JSeparator());
        }

        if (transactions.isEmpty()) {
            JLabel empty = new JLabel("No transactions recorded yet. Click 'Quick Add' to create one.");
            empty.setForeground(new Color(148, 163, 184));
            recentTransactionsContainer.add(empty);
        }

        recentTransactionsContainer.revalidate();
        recentTransactionsContainer.repaint();
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/ui/TransactionPanel.java',
    filename: 'TransactionPanel.java',
    package: 'com.expensetracker.ui',
    category: 'ui',
    description: 'Transaction management panel with JTable, search filter, category filter, and modal dialogs.',
    content: `package com.expensetracker.ui;

import com.expensetracker.model.*;
import com.expensetracker.service.TransactionService;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Transaction Panel.
 * Demonstrates:
 * - JTable integration with custom table model
 * - Real-time searching and filtering
 * - Add/Edit/Delete dialog workflows with validation
 */
public class TransactionPanel extends JPanel {

    private final TransactionService transactionService;
    private final DashboardFrame parentFrame;

    private JTable table;
    private DefaultTableModel tableModel;
    private JTextField txtSearch;
    private JComboBox<String> cmbTypeFilter;
    private JComboBox<String> cmbCategoryFilter;
    private List<Transaction> currentDisplayedList;

    public TransactionPanel(TransactionService transactionService, DashboardFrame parentFrame) {
        this.transactionService = transactionService;
        this.parentFrame = parentFrame;

        initUI();
        refreshData();
    }

    private void initUI() {
        setLayout(new BorderLayout(16, 16));
        setBackground(new Color(241, 245, 249));
        setBorder(new EmptyBorder(24, 24, 24, 24));

        // Top Toolbar Panel
        JPanel topPanel = new JPanel(new BorderLayout(10, 10));
        topPanel.setOpaque(false);

        JLabel lblTitle = new JLabel("Transactions Management");
        lblTitle.setFont(new Font("Segoe UI", Font.BOLD, 22));
        topPanel.add(lblTitle, BorderLayout.WEST);

        JPanel actionBtns = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 0));
        actionBtns.setOpaque(false);

        JButton btnAddIncome = new JButton("+ Add Income");
        btnAddIncome.setBackground(new Color(16, 185, 129));
        btnAddIncome.setForeground(Color.WHITE);
        btnAddIncome.addActionListener(e -> showAddEditDialog(null, TransactionType.INCOME));

        JButton btnAddExpense = new JButton("+ Add Expense");
        btnAddExpense.setBackground(new Color(239, 68, 68));
        btnAddExpense.setForeground(Color.WHITE);
        btnAddExpense.addActionListener(e -> showAddEditDialog(null, TransactionType.EXPENSE));

        JButton btnDelete = new JButton("Delete Selected");
        btnDelete.addActionListener(e -> deleteSelectedTransaction());

        actionBtns.add(btnAddIncome);
        actionBtns.add(btnAddExpense);
        actionBtns.add(btnDelete);
        topPanel.add(actionBtns, BorderLayout.EAST);

        // Filter Bar
        JPanel filterBar = new JPanel(new FlowLayout(FlowLayout.LEFT, 12, 10));
        filterBar.setBackground(Color.WHITE);
        filterBar.setBorder(BorderFactory.createLineBorder(new Color(226, 232, 240)));

        txtSearch = new JTextField(15);
        txtSearch.putClientProperty("JTextField.placeholderText", "Search title...");
        txtSearch.addActionListener(e -> applyFilters());

        cmbTypeFilter = new JComboBox<>(new String[]{"All Types", "INCOME", "EXPENSE"});
        cmbTypeFilter.addActionListener(e -> applyFilters());

        cmbCategoryFilter = new JComboBox<>(new String[]{"All Categories", "Salary", "Food", "Transport", "Shopping", "Bills", "Rent"});
        cmbCategoryFilter.addActionListener(e -> applyFilters());

        JButton btnApply = new JButton("Filter");
        btnApply.addActionListener(e -> applyFilters());

        filterBar.add(new JLabel("Search:"));
        filterBar.add(txtSearch);
        filterBar.add(new JLabel("Type:"));
        filterBar.add(cmbTypeFilter);
        filterBar.add(new JLabel("Category:"));
        filterBar.add(cmbCategoryFilter);
        filterBar.add(btnApply);

        JPanel headerContainer = new JPanel(new BorderLayout(0, 10));
        headerContainer.setOpaque(false);
        headerContainer.add(topPanel, BorderLayout.NORTH);
        headerContainer.add(filterBar, BorderLayout.SOUTH);
        add(headerContainer, BorderLayout.NORTH);

        // Center Table
        String[] columnNames = {"ID", "Date", "Title", "Type", "Category", "Amount", "Method", "Notes"};
        tableModel = new DefaultTableModel(columnNames, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false; // read-only cells
            }
        };

        table = new JTable(tableModel);
        table.setRowHeight(32);
        table.setShowGrid(false);
        table.setIntercellSpacing(new Dimension(0, 1));
        table.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        JScrollPane scrollPane = new JScrollPane(table);
        scrollPane.setBorder(BorderFactory.createLineBorder(new Color(226, 232, 240)));
        add(scrollPane, BorderLayout.CENTER);
    }

    public void refreshData() {
        currentDisplayedList = transactionService.getAllTransactions();
        populateTable(currentDisplayedList);
    }

    private void applyFilters() {
        String keyword = txtSearch.getText().trim();
        String typeStr = (String) cmbTypeFilter.getSelectedItem();
        String catStr = (String) cmbCategoryFilter.getSelectedItem();

        TransactionType type = null;
        if ("INCOME".equals(typeStr)) type = TransactionType.INCOME;
        else if ("EXPENSE".equals(typeStr)) type = TransactionType.EXPENSE;

        String category = "All Categories".equals(catStr) ? null : catStr;

        currentDisplayedList = transactionService.filterTransactions(null, null, category, type, null);
        if (!keyword.isEmpty()) {
            currentDisplayedList.removeIf(t -> !t.getTitle().toLowerCase().contains(keyword.toLowerCase()));
        }

        populateTable(currentDisplayedList);
    }

    private void populateTable(List<Transaction> list) {
        tableModel.setRowCount(0);
        for (Transaction t : list) {
            tableModel.addRow(new Object[]{
                    t.getId(),
                    t.getDate(),
                    t.getTitle(),
                    t.getTransactionType(),
                    t.getCategory(),
                    String.format("%s ₹%,.2f", t.getFormattedSign(), t.getAmount()),
                    t.getPaymentMethod().getDisplayName(),
                    t.getNotes()
            });
        }
    }

    private void deleteSelectedTransaction() {
        int selectedRow = table.getSelectedRow();
        if (selectedRow == -1) {
            JOptionPane.showMessageDialog(this, "Please select a transaction to delete.", "Warning", JOptionPane.WARNING_MESSAGE);
            return;
        }

        int id = (int) tableModel.getValueAt(selectedRow, 0);
        int confirm = JOptionPane.showConfirmDialog(
                this,
                "Are you sure you want to delete transaction #" + id + "?",
                "Confirm Deletion",
                JOptionPane.YES_NO_OPTION,
                JOptionPane.QUESTION_MESSAGE
        );

        if (confirm == JOptionPane.YES_OPTION) {
            transactionService.deleteTransaction(id);
            parentFrame.refreshAllPanels();
        }
    }

    private void showAddEditDialog(Transaction existing, TransactionType defaultType) {
        JDialog dialog = new JDialog(parentFrame, existing == null ? "Add Transaction" : "Edit Transaction", true);
        dialog.setSize(420, 480);
        dialog.setLocationRelativeTo(this);
        dialog.setLayout(new BorderLayout());

        JPanel form = new JPanel(new GridLayout(7, 2, 10, 12));
        form.setBorder(new EmptyBorder(20, 20, 20, 20));

        JTextField txtTitle = new JTextField(existing != null ? existing.getTitle() : "");
        JTextField txtAmount = new JTextField(existing != null ? existing.getAmount().toString() : "");

        JComboBox<String> cmbCat = new JComboBox<>(new String[]{"Salary", "Scholarship", "Freelance", "Food", "Transport", "Education", "Shopping", "Bills", "Rent", "Other"});
        if (existing != null) cmbCat.setSelectedItem(existing.getCategory());

        JComboBox<PaymentMethod> cmbMethod = new JComboBox<>(PaymentMethod.values());
        if (existing != null) cmbMethod.setSelectedItem(existing.getPaymentMethod());

        JTextField txtDate = new JTextField(existing != null ? existing.getDate().toString() : LocalDate.now().toString());
        JTextField txtNotes = new JTextField(existing != null ? existing.getNotes() : "");

        form.add(new JLabel("Title:"));
        form.add(txtTitle);
        form.add(new JLabel("Amount (₹):"));
        form.add(txtAmount);
        form.add(new JLabel("Category:"));
        form.add(cmbCat);
        form.add(new JLabel("Payment Method:"));
        form.add(cmbMethod);
        form.add(new JLabel("Date (YYYY-MM-DD):"));
        form.add(txtDate);
        form.add(new JLabel("Notes:"));
        form.add(txtNotes);

        dialog.add(form, BorderLayout.CENTER);

        JButton btnSave = new JButton("Save Transaction");
        btnSave.addActionListener(e -> {
            try {
                String title = txtTitle.getText();
                BigDecimal amount = new BigDecimal(txtAmount.getText().trim());
                String cat = (String) cmbCat.getSelectedItem();
                LocalDate date = LocalDate.parse(txtDate.getText().trim());
                PaymentMethod method = (PaymentMethod) cmbMethod.getSelectedItem();
                String notes = txtNotes.getText();

                Transaction t;
                if (defaultType == TransactionType.INCOME) {
                    t = new Income(0, title, amount, cat, date, method, notes);
                } else {
                    t = new Expense(0, title, amount, cat, date, method, notes);
                }

                transactionService.addTransaction(t);
                dialog.dispose();
                parentFrame.refreshAllPanels();
                JOptionPane.showMessageDialog(this, "Transaction saved successfully!", "Success", JOptionPane.INFORMATION_MESSAGE);

            } catch (Exception ex) {
                JOptionPane.showMessageDialog(dialog, "Error: " + ex.getMessage(), "Validation Failed", JOptionPane.ERROR_MESSAGE);
            }
        });

        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        btnPanel.add(btnSave);
        dialog.add(btnPanel, BorderLayout.SOUTH);

        dialog.setVisible(true);
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/ui/BudgetPanel.java',
    filename: 'BudgetPanel.java',
    package: 'com.expensetracker.ui',
    category: 'ui',
    description: 'Budget monitoring panel with category spending progress meters, 80% threshold warnings, and limit setters.',
    content: `package com.expensetracker.ui;

import com.expensetracker.model.Budget;
import com.expensetracker.service.BudgetService;
import com.expensetracker.service.TransactionService;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.List;

/**
 * Budget Management Panel.
 * Displays category budget meters, progress bars with threshold colors:
 * - Normal: Green (< 80%)
 * - Warning: Amber (80% - 100%)
 * - Exceeded: Red (> 100%)
 */
public class BudgetPanel extends JPanel {

    private final BudgetService budgetService;
    private final TransactionService transactionService;
    private final DashboardFrame parentFrame;

    private JPanel budgetCardsContainer;

    public BudgetPanel(BudgetService budgetService, TransactionService transactionService, DashboardFrame parentFrame) {
        this.budgetService = budgetService;
        this.transactionService = transactionService;
        this.parentFrame = parentFrame;

        initUI();
        refreshData();
    }

    private void initUI() {
        setLayout(new BorderLayout(16, 16));
        setBackground(new Color(241, 245, 249));
        setBorder(new EmptyBorder(24, 24, 24, 24));

        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);

        JLabel title = new JLabel("Budget Management & Alerts");
        title.setFont(new Font("Segoe UI", Font.BOLD, 22));
        header.add(title, BorderLayout.WEST);

        JButton btnSetBudget = new JButton("+ Set Category Budget");
        btnSetBudget.setBackground(new Color(59, 130, 246));
        btnSetBudget.setForeground(Color.WHITE);
        btnSetBudget.setFont(new Font("Segoe UI", Font.BOLD, 13));
        btnSetBudget.addActionListener(e -> showSetBudgetDialog());
        header.add(btnSetBudget, BorderLayout.EAST);

        add(header, BorderLayout.NORTH);

        budgetCardsContainer = new JPanel();
        budgetCardsContainer.setLayout(new BoxLayout(budgetCardsContainer, BoxLayout.Y_AXIS));
        budgetCardsContainer.setOpaque(false);

        JScrollPane scrollPane = new JScrollPane(budgetCardsContainer);
        scrollPane.setBorder(null);
        scrollPane.setOpaque(false);
        scrollPane.getViewport().setOpaque(false);
        add(scrollPane, BorderLayout.CENTER);
    }

    public void refreshData() {
        budgetCardsContainer.removeAll();
        YearMonth currentMonth = YearMonth.now();
        List<Budget> budgets = budgetService.getBudgetsWithActualSpending(currentMonth);

        if (budgets.isEmpty()) {
            JPanel empty = new JPanel();
            empty.setOpaque(false);
            empty.add(new JLabel("No budgets configured. Click '+ Set Category Budget' to establish spending limits."));
            budgetCardsContainer.add(empty);
        } else {
            for (Budget b : budgets) {
                budgetCardsContainer.add(createBudgetCard(b));
                budgetCardsContainer.add(Box.createRigidArea(new Dimension(0, 12)));
            }
        }

        budgetCardsContainer.revalidate();
        budgetCardsContainer.repaint();
    }

    private JPanel createBudgetCard(Budget b) {
        JPanel card = new JPanel(new BorderLayout(12, 12));
        card.setBackground(Color.WHITE);
        card.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240)),
                new EmptyBorder(16, 18, 16, 18)
        ));

        // Top info: Category and Amounts
        JPanel top = new JPanel(new BorderLayout());
        top.setOpaque(false);

        JLabel catLbl = new JLabel(b.getCategory());
        catLbl.setFont(new Font("Segoe UI", Font.BOLD, 15));
        top.add(catLbl, BorderLayout.WEST);

        double pct = b.getUtilizationPercentage();
        JLabel spendLbl = new JLabel(String.format("₹%,.2f / ₹%,.2f (%.1f%%)",
                b.getCurrentSpending(), b.getMonthlyLimit(), pct));
        spendLbl.setFont(new Font("Segoe UI", Font.BOLD, 14));
        top.add(spendLbl, BorderLayout.EAST);

        card.add(top, BorderLayout.NORTH);

        // Progress Bar with color thresholds
        JProgressBar pb = new JProgressBar(0, 100);
        int intPct = Math.min((int) pct, 100);
        pb.setValue(intPct);
        pb.setPreferredSize(new Dimension(100, 12));

        if (b.isExceeded()) {
            pb.setForeground(new Color(239, 68, 68)); // Red: Exceeded!
        } else if (b.isWarningThresholdReached()) {
            pb.setForeground(new Color(245, 158, 11)); // Amber: >= 80% Warning!
        } else {
            pb.setForeground(new Color(16, 185, 129)); // Green: Healthy
        }

        card.add(pb, BorderLayout.CENTER);

        // Status alert text
        JLabel alertLbl = new JLabel();
        alertLbl.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        if (b.isExceeded()) {
            alertLbl.setText("⚠️ BUDGET EXCEEDED! Spending has breached your allocated limit.");
            alertLbl.setForeground(new Color(239, 68, 68));
        } else if (b.isWarningThresholdReached()) {
            alertLbl.setText("⚡ WARNING: You have utilized over 80% of this budget limit.");
            alertLbl.setForeground(new Color(217, 119, 6));
        } else {
            alertLbl.setText("✓ Within safe budget limits.");
            alertLbl.setForeground(new Color(16, 185, 129));
        }
        card.add(alertLbl, BorderLayout.SOUTH);

        return card;
    }

    private void showSetBudgetDialog() {
        JDialog dialog = new JDialog(parentFrame, "Set Category Budget", true);
        dialog.setSize(360, 240);
        dialog.setLocationRelativeTo(this);
        dialog.setLayout(new BorderLayout());

        JPanel form = new JPanel(new GridLayout(3, 2, 10, 12));
        form.setBorder(new EmptyBorder(20, 20, 20, 20));

        JComboBox<String> cmbCat = new JComboBox<>(new String[]{"Food", "Transport", "Education", "Shopping", "Bills", "Rent", "Entertainment", "Healthcare", "Other Expenses"});
        JTextField txtLimit = new JTextField();

        form.add(new JLabel("Category:"));
        form.add(cmbCat);
        form.add(new JLabel("Monthly Limit (₹):"));
        form.add(txtLimit);

        dialog.add(form, BorderLayout.CENTER);

        JButton btnSave = new JButton("Save Budget");
        btnSave.addActionListener(e -> {
            try {
                String cat = (String) cmbCat.getSelectedItem();
                BigDecimal limit = new BigDecimal(txtLimit.getText().trim());
                budgetService.setCategoryBudget(cat, limit, YearMonth.now());
                dialog.dispose();
                refreshData();
                JOptionPane.showMessageDialog(this, "Budget for " + cat + " saved successfully!", "Budget Updated", JOptionPane.INFORMATION_MESSAGE);
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(dialog, "Invalid limit: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        JPanel btnPnl = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        btnPnl.add(btnSave);
        dialog.add(btnPnl, BorderLayout.SOUTH);

        dialog.setVisible(true);
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/ui/ReportsPanel.java',
    filename: 'ReportsPanel.java',
    package: 'com.expensetracker.ui',
    category: 'ui',
    description: 'Reports and Analytics Panel providing period summaries, category breakdown table, and CSV export functionality.',
    content: `package com.expensetracker.ui;

import com.expensetracker.model.Transaction;
import com.expensetracker.service.ReportService;
import com.expensetracker.service.TransactionService;
import com.expensetracker.util.CsvExporter;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.io.File;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Map;

/**
 * Reports and Analytics Panel.
 * Generates:
 * - Category spending breakdown
 * - Monthly savings calculations
 * - CSV file export
 */
public class ReportsPanel extends JPanel {

    private final ReportService reportService;
    private final TransactionService transactionService;
    private final DashboardFrame parentFrame;

    private JLabel lblHighestCat;
    private JLabel lblMonthlySavings;
    private DefaultTableModel categoryTableModel;

    public ReportsPanel(ReportService reportService, TransactionService transactionService, DashboardFrame parentFrame) {
        this.reportService = reportService;
        this.transactionService = transactionService;
        this.parentFrame = parentFrame;

        initUI();
        refreshData();
    }

    private void initUI() {
        setLayout(new BorderLayout(16, 16));
        setBackground(new Color(241, 245, 249));
        setBorder(new EmptyBorder(24, 24, 24, 24));

        // Top toolbar
        JPanel topPanel = new JPanel(new BorderLayout());
        topPanel.setOpaque(false);

        JLabel title = new JLabel("Financial Analytics & Reports");
        title.setFont(new Font("Segoe UI", Font.BOLD, 22));
        topPanel.add(title, BorderLayout.WEST);

        JButton btnExportCsv = new JButton("Export Report to CSV");
        btnExportCsv.setBackground(new Color(16, 185, 129));
        btnExportCsv.setForeground(Color.WHITE);
        btnExportCsv.setFont(new Font("Segoe UI", Font.BOLD, 13));
        btnExportCsv.addActionListener(e -> exportToCsv());
        topPanel.add(btnExportCsv, BorderLayout.EAST);

        add(topPanel, BorderLayout.NORTH);

        // Center Content
        JPanel center = new JPanel(new GridLayout(1, 2, 16, 16));
        center.setOpaque(false);

        // Left: Summary Highlights
        JPanel leftSummary = new JPanel();
        leftSummary.setLayout(new BoxLayout(leftSummary, BoxLayout.Y_AXIS));
        leftSummary.setBackground(Color.WHITE);
        leftSummary.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240)),
                new EmptyBorder(20, 20, 20, 20)
        ));

        JLabel sumTitle = new JLabel("Key Analytical Insights");
        sumTitle.setFont(new Font("Segoe UI", Font.BOLD, 16));
        leftSummary.add(sumTitle);
        leftSummary.add(Box.createRigidArea(new Dimension(0, 16)));

        lblMonthlySavings = new JLabel("Current Month Net Savings: ₹0.00");
        lblMonthlySavings.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        leftSummary.add(lblMonthlySavings);
        leftSummary.add(Box.createRigidArea(new Dimension(0, 12)));

        lblHighestCat = new JLabel("Highest Spending Category: N/A");
        lblHighestCat.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        leftSummary.add(lblHighestCat);

        center.add(leftSummary);

        // Right: Category Breakdown Table
        JPanel rightTablePanel = new JPanel(new BorderLayout());
        rightTablePanel.setBackground(Color.WHITE);
        rightTablePanel.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240)),
                new EmptyBorder(16, 16, 16, 16)
        ));

        JLabel catTableTitle = new JLabel("Category-wise Spending Breakdown");
        catTableTitle.setFont(new Font("Segoe UI", Font.BOLD, 16));
        rightTablePanel.add(catTableTitle, BorderLayout.NORTH);

        categoryTableModel = new DefaultTableModel(new String[]{"Category", "Total Spent (₹)"}, 0);
        JTable catTable = new JTable(categoryTableModel);
        catTable.setRowHeight(28);
        rightTablePanel.add(new JScrollPane(catTable), BorderLayout.CENTER);

        center.add(rightTablePanel);

        add(center, BorderLayout.CENTER);
    }

    public void refreshData() {
        YearMonth ym = YearMonth.now();
        BigDecimal savings = reportService.calculateMonthlySavings(ym);
        lblMonthlySavings.setText(String.format("Current Month Net Savings: ₹%,.2f", savings));

        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();
        Map.Entry<String, BigDecimal> highest = reportService.getHighestSpendingCategory(start, end);
        if (highest != null) {
            lblHighestCat.setText(String.format("Highest Spending Category: %s (₹%,.2f)", highest.getKey(), highest.getValue()));
        } else {
            lblHighestCat.setText("Highest Spending Category: None recorded yet");
        }

        Map<String, BigDecimal> breakdown = reportService.getExpenseCategoryBreakdown(start, end);
        categoryTableModel.setRowCount(0);
        for (Map.Entry<String, BigDecimal> entry : breakdown.entrySet()) {
            categoryTableModel.addRow(new Object[]{entry.getKey(), String.format("₹%,.2f", entry.getValue())});
        }
    }

    private void exportToCsv() {
        JFileChooser chooser = new JFileChooser();
        chooser.setSelectedFile(new File("expense_tracker_export.csv"));
        int userChoice = chooser.showSaveDialog(this);

        if (userChoice == JFileChooser.APPROVE_OPTION) {
            try {
                File file = chooser.getSelectedFile();
                CsvExporter.exportTransactionsToCsv(transactionService.getAllTransactions(), file);
                JOptionPane.showMessageDialog(this, "Successfully exported transactions to " + file.getName(), "Export Complete", JOptionPane.INFORMATION_MESSAGE);
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Export failed: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }
}
`
  },
  {
    path: 'src/main/java/com/expensetracker/ui/SettingsPanel.java',
    filename: 'SettingsPanel.java',
    package: 'com.expensetracker.ui',
    category: 'ui',
    description: 'Settings panel for currency preferences, database inspection, and secure data reset confirmation.',
    content: `package com.expensetracker.ui;

import com.expensetracker.service.BudgetService;
import com.expensetracker.service.TransactionService;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;

/**
 * Settings Panel.
 * Configures currency symbols, themes, and handles secure data reset.
 */
public class SettingsPanel extends JPanel {

    private final TransactionService transactionService;
    private final BudgetService budgetService;
    private final DashboardFrame parentFrame;

    public SettingsPanel(TransactionService transactionService, BudgetService budgetService, DashboardFrame parentFrame) {
        this.transactionService = transactionService;
        this.budgetService = budgetService;
        this.parentFrame = parentFrame;

        initUI();
    }

    private void initUI() {
        setLayout(new BorderLayout(16, 16));
        setBackground(new Color(241, 245, 249));
        setBorder(new EmptyBorder(24, 24, 24, 24));

        JLabel title = new JLabel("Application Settings");
        title.setFont(new Font("Segoe UI", Font.BOLD, 22));
        add(title, BorderLayout.NORTH);

        JPanel content = new JPanel();
        content.setLayout(new BoxLayout(content, BoxLayout.Y_AXIS));
        content.setBackground(Color.WHITE);
        content.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240)),
                new EmptyBorder(20, 20, 20, 20)
        ));

        // Currency Setting
        JPanel curPnl = new JPanel(new FlowLayout(FlowLayout.LEFT));
        curPnl.setOpaque(false);
        curPnl.add(new JLabel("Primary Currency:"));
        JComboBox<String> cmbCur = new JComboBox<>(new String[]{"INR (₹) - Indian Rupee", "USD ($) - US Dollar", "EUR (€) - Euro", "GBP (£) - British Pound"});
        curPnl.add(cmbCur);
        content.add(curPnl);

        content.add(Box.createRigidArea(new Dimension(0, 20)));
        content.add(new JSeparator());
        content.add(Box.createRigidArea(new Dimension(0, 20)));

        // Danger Zone: Reset Data
        JLabel dangerTitle = new JLabel("Danger Zone");
        dangerTitle.setFont(new Font("Segoe UI", Font.BOLD, 16));
        dangerTitle.setForeground(new Color(239, 68, 68));
        content.add(dangerTitle);

        JLabel dangerDesc = new JLabel("Clearing transaction data is irreversible and removes all database records.");
        dangerDesc.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        dangerDesc.setForeground(new Color(100, 116, 139));
        content.add(dangerDesc);
        content.add(Box.createRigidArea(new Dimension(0, 12)));

        JButton btnReset = new JButton("Clear All Transactions Data");
        btnReset.setBackground(new Color(239, 68, 68));
        btnReset.setForeground(Color.WHITE);
        btnReset.addActionListener(e -> resetAllData());
        content.add(btnReset);

        add(content, BorderLayout.CENTER);
    }

    private void resetAllData() {
        int confirm = JOptionPane.showConfirmDialog(
                this,
                "Are you sure you want to delete ALL transactions?\\nThis cannot be undone.",
                "Confirm Factory Reset",
                JOptionPane.YES_NO_OPTION,
                JOptionPane.WARNING_MESSAGE
        );

        if (confirm == JOptionPane.YES_OPTION) {
            transactionService.clearAllTransactions();
            parentFrame.refreshAllPanels();
            JOptionPane.showMessageDialog(this, "All transaction records have been erased.", "Data Cleared", JOptionPane.INFORMATION_MESSAGE);
        }
    }
}
`
  },
  {
    path: 'README.md',
    filename: 'README.md',
    package: 'root',
    category: 'root',
    description: 'Comprehensive setup guide and execution steps for IntelliJ IDEA, Eclipse, VS Code, and Maven CLI.',
    content: `# Personal Expense Tracker (Java OOP Mini-Project)

A complete, production-grade desktop financial management application engineered with **Java 17**, **Java Swing**, **FlatLaf**, and **SQLite JDBC**. Built specifically to demonstrate Object-Oriented Programming (OOP) principles for engineering college project submissions and viva evaluations.

---

## 🚀 Key Features

- **Dashboard**: Live KPI cards for Total Balance, Income, Expenses, Monthly Savings, and recent transactions.
- **Transactions Management**: Add, Edit, Delete, Filter, and Search transactions with input validation.
- **Budget Tracking**: Category spending limits, interactive progress bars, and alerts when exceeding 80% and 100% thresholds.
- **Reports & Analytics**: Category-wise breakdowns, highest spending category insight, and CSV file export.
- **Local SQLite Persistence**: Persistent storage with prepared statements to prevent SQL injection.

---

## 🏛️ OOP Concepts Demonstrated

1. **Encapsulation**: Private fields, validated getters/setters, \`BigDecimal\` monetary precision.
2. **Inheritance**: Abstract base class \`Transaction\` extended by \`Income\` and \`Expense\`.
3. **Polymorphism**: Dynamic method overriding of \`calculateImpact()\` and \`getTransactionType()\`.
4. **Abstraction**: Repository interfaces (\`TransactionRepository\`) decoupling storage from UI.
5. **Exception Handling**: Custom checked exceptions (\`InvalidTransactionException\`, \`BudgetExceededException\`).
6. **Method Overloading**: Multiple \`filterTransactions\` signatures with varying parameter counts.

---

## 🛠️ Requirements & Setup

- **Java Development Kit (JDK)**: Version 17 or higher
- **Build Tool**: Apache Maven 3.8+ (or use IDE built-in Maven)

### Running in IntelliJ IDEA:
1. Open IntelliJ IDEA -> **File > Open...** -> select the project root folder (containing \`pom.xml\`).
2. Wait for Maven to sync dependencies (\`sqlite-jdbc\`, \`flatlaf\`, \`jfreechart\`).
3. Open \`src/main/java/com/expensetracker/Main.java\`.
4. Click the green **Run (Shift + F10)** button.

### Running in Eclipse:
1. Open Eclipse -> **File > Import... > Existing Maven Projects**.
2. Browse to the extracted folder and click **Finish**.
3. Right-click on \`Main.java\` -> **Run As > Java Application**.

### Running in VS Code:
1. Install **Extension Pack for Java**.
2. Open the project folder.
3. Click **Run** above \`public static void main\` in \`Main.java\`.

### Running via Maven CLI:
\`\`\`bash
mvn clean compile
mvn exec:java -Dexec.mainClass="com.expensetracker.Main"
\`\`\`
`
  }
];
