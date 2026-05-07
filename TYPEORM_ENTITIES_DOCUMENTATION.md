# TypeORM Entity Documentation

This document provides an overview of all TypeORM entities generated from the Prisma schema.

## Directory Structure

```
src/
├── common/
│   └── enums/
│       └── index.ts (All enums)
├── user/
│   └── entities/
│       └── user.entity.ts
├── staff/
│   └── entities/
│       ├── staff.entity.ts
│       ├── job-position.entity.ts
│       ├── staff-employment.entity.ts
│       ├── staff-salary.entity.ts
│       ├── staff-income.entity.ts
│       └── type-staff-income.entity.ts
├── customer/
│   └── entities/
│       ├── customer.entity.ts
│       └── customer-contact.entity.ts
├── quotation/
│   └── entities/
│       └── quotation.entity.ts
├── bill/
│   └── entities/
│       └── bill.entity.ts
├── order-po/
│   └── entities/
│       ├── order-po.entity.ts
│       ├── invoice.entity.ts
│       └── order-po-staff.entity.ts
├── statement/
│   └── entities/
│       ├── statement.entity.ts
│       └── statement-invoice.entity.ts
├── acquittance/
│   └── entities/
│       ├── acquittance.entity.ts
│       └── acquittance-invoice.entity.ts
├── product/
│   └── entities/
│       └── product.entity.ts
├── steel/
│   └── entities/
│       ├── steel-type.entity.ts
│       └── steel-stock.entity.ts
└── expense/
    └── entities/
        ├── expense.entity.ts
        └── expense-category.entity.ts
```

## Enums

Located in `src/common/enums/index.ts`:

- **Role**: SUPERADMIN, GUEST, CLERK, SUPERVISOR, ACCOUNTANT, CUTTER, DELIVERY
- **JobStatus**: PENDING, CUTTING, WEIGHING, READY, SHIPPED, COMPLETED, CANCELED
- **ShapeSteel**: SQUARE, LINE
- **CuttingMethod**: NORMAL, FB, CNC, RM
- **StockStatus**: AVAILABLE, WITHDRAWN
- **SteelStatus**: ACTIVE, INACTIVE, HOLD
- **OrderStaffRole**: SUPERVISOR, CUTTER
- **ContactType**: PHONE, EMAIL, FAX, ADDRESS

## User Management

### User Entity

- Represents system users with authentication
- Relations: OneToOne with Staff
- Columns: id, name, email, password, image, role, timestamps

### Staff Entity

- Represents employees/staff members
- Relations:
  - OneToOne: User
  - ManyToOne: JobPosition
  - OneToMany: StaffEmployment, StaffSalary, StaffIncome, Bill (delivered), Bill (sales), OrderPOStaff, Expense, Quotation
- Columns: id, userId, bankAccount, bankName, startDate, code, socialSecurity, currentSalary, taxid, positionId, hireStatus, TerminationDate, timestamps

### JobPosition Entity

- Job titles and base salaries
- Relations: OneToMany with Staff
- Columns: id, name, baseSalary, timestamps

### StaffEmployment Entity

- Employment history for staff
- Relations: ManyToOne with Staff
- Columns: id, staffId, startDate, endDate, timestamps
- Unique: staffId + endDate

### StaffSalary Entity

- Salary history records
- Relations: ManyToOne with Staff
- Columns: id, staffId, amount, effectiveDate, detail, createdAt
- Unique: staffId + effectiveDate

### StaffIncome Entity

- Additional income records
- Relations: ManyToOne with Staff and TypeStaffIncome
- Columns: id, amount, nameIncome, detail, staffId, date, typeId
- Indexes: staffId, typeId

### TypeStaffIncome Entity

- Income types/categories
- Relations: OneToMany with StaffIncome
- Columns: id, amount, name, types, onDelete

## Customer Management

### Customer Entity

- Main customer records
- Relations:
  - OneToMany: CustomerContact, Acquittance, Bill, OrderPO, Statement, Quotation
- Columns: id, name, credit (days), address, tel, taxNumber, faxNumber, email, timestamps, searchFields
- Unique: name

### CustomerContact Entity

- Multiple contact methods per customer
- Relations: ManyToOne with Customer
- Columns: id, customerId, type (enum), value, isPrimary, label
- OnDelete: CASCADE

## Sales & Documents

### Quotation Entity

- Sales quotations
- Relations: ManyToOne with Customer and Staff, OneToOne with OrderPO
- Columns: id, quotationNo, customerId, customerName, credit, salesName, salesNameId, description, vatRate, vat, subtotal, grandTotal, discount, period, deliveryDate, timestamps
- Unique: quotationNo
- Indexes: customerId

### Bill Entity

- Sales bills/invoices
- Relations: ManyToOne with Customer and Staff (multiple), OneToOne with OrderPO
- Columns: id, customerId, codeCustomer, deliveryDate, salesName, deliveredBy, description, vatRate, subtotal, grandTotal, discount, vat, dateReceive, salesNameId, deliveredById, credit, timestamps
- Unique: codeCustomer
- Indexes: customerId, salesNameId, deliveredById

### Invoice Entity

- Final invoices linked to OrderPO
- Relations: OneToOne with OrderPO, OneToMany with AcquittanceInvoice and StatementInvoice
- Columns: id, codetoinvoice (unique), invoiceNo (unique), createdAt
- Indexes: codetoinvoice, invoiceNo

## Order Management

### OrderPO Entity

- Purchase orders / sales orders
- Relations:
  - ManyToOne: Customer, Bill, Quotation
  - OneToOne: Invoice
  - OneToMany: OrderPOStaff, Product
- Columns: id, poNumber, customerId, billId, quotationId, status, total, completedAt, urlPo, codetoinvoice, timestamps
- Unique: billId, quotationId, codetoinvoice
- Indexes: status, createdAt, customerId+status, billId, customerId

### OrderPOStaff Entity

- Staff assignments to orders with roles
- Relations: ManyToOne with OrderPO and Staff
- Columns: orderPOId, staffId, role (enum), assignedAt
- Composite Primary Key: orderPOId + staffId + role
- Indexes: staffId, orderPOId+role

## Product Management

### Product Entity

- Line items in orders
- Relations: ManyToOne with OrderPO and SteelType
- Columns: id, orderPOId, steelId, wide, length, thickness, amount, detail, surface/tolerance specs, actualWeight, total, cuttingMethod, job, discount, unitPrice, isOD, isPerAmount, isServices, sequence
- Unique: orderPOId + sequence
- Indexes: orderPOId, steelId

### SteelType Entity

- Steel material specifications
- Relations: OneToMany with Product and SteelStock
- Columns: id, codeSteel, detail, amount, shape, price, density, requiresDimensions, requiresAmount, status, timestamps
- Unique: codeSteel + shape

### SteelStock Entity

- Inventory tracking for steel
- Relations: ManyToOne with SteelType
- Columns: id, width, length, thickness, quantity, status, steeltypeId, timestamps
- Unique: steeltypeId + width + length + thickness

## Financial Documents

### Statement Entity

- Customer account statements
- Relations: ManyToOne with Customer, OneToMany with StatementInvoice
- Columns: id, statementNo, customerId, timestamps
- Unique: statementNo
- Indexes: customerId+createdAt

### StatementInvoice Entity

- Invoice items in statements
- Relations: ManyToOne with Statement and Invoice
- Composite Primary Key: statementId + invoiceId
- Indexes: statementId, invoiceId

### Acquittance Entity

- Payment receipts
- Relations: ManyToOne with Customer, OneToMany with AcquittanceInvoice
- Columns: id, acquittanceNo, customerId, timestamps
- Unique: acquittanceNo
- Indexes: customerId+createdAt

### AcquittanceInvoice Entity

- Invoice items in acquittances
- Relations: ManyToOne with Acquittance and Invoice
- Composite Primary Key: acquittanceId + invoiceId
- Indexes: acquittanceId, invoiceId

## Expense Management

### Expense Entity

- Staff expense records
- Relations: ManyToOne with Staff and ExpenseCategory
- Columns: id, description, amount, expenseDate, categoryId, receiptUrl, staffId, timestamps
- OnDelete Staff: SET NULL
- Indexes: staffId

### ExpenseCategory Entity

- Expense categories
- Relations: OneToMany with Expense
- Columns: id, name, description
- Unique: name

## Key Relationships

### Hierarchical Relationships

- User → Staff → JobPosition
- User → Staff → StaffEmployment

### Financial Flow

- Customer → Quotation → OrderPO → Bill → Invoice
- Customer → OrderPO → Product → SteelType → SteelStock

### Personnel Assignment

- OrderPO → OrderPOStaff → Staff

### Financial Documents

- Invoice → AcquittanceInvoice → Acquittance → Customer
- Invoice → StatementInvoice → Statement → Customer

### Expense Tracking

- Staff → Expense → ExpenseCategory

## Index Strategies

All entities have appropriate indexes for:

- Foreign key columns
- Status/priority columns
- Date-based searches
- Composite queries (customer+status, etc.)

## Notes

1. **Soft Deletes**: Not implemented in this schema. Consider adding for audit trail if needed.
2. **Timestamps**: All entities have `createdAt` and `updatedAt` fields where applicable.
3. **OnDelete Behavior**:
   - CASCADE: For dependent records (StaffEmployment, OrderPOStaff, etc.)
   - SET NULL: For optional relationships (Staff in Expense)
4. **Unique Constraints**: Many business identifiers are marked unique (codes, emails, etc.)
5. **Enums**: All status/type fields use database enums for integrity.

## Setup Instructions

1. Ensure TypeORM is installed: `npm install typeorm`
2. Add all entities to your TypeORM configuration in `ormconfig.ts` or `app.module.ts`
3. Run migrations: `npm run typeorm migration:generate`
4. Apply migrations: `npm run typeorm migration:run`

Example DataSource configuration:

```typescript
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Staff,
    JobPosition,
    StaffEmployment,
    StaffSalary,
    StaffIncome,
    TypeStaffIncome,
    Customer,
    CustomerContact,
    Quotation,
    Bill,
    OrderPO,
    Invoice,
    OrderPOStaff,
    Statement,
    StatementInvoice,
    Acquittance,
    AcquittanceInvoice,
    Product,
    SteelType,
    SteelStock,
    Expense,
    ExpenseCategory,
  ],
  synchronize: false,
  logging: true,
});
```
