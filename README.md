# FinTrack - Finance Dashboard UI

A clean, interactive finance dashboard built with React + Recharts for the Zorvyn Frontend Developer Intern assignment.

## Features

- **Dashboard Overview** — Summary cards for Balance, Income, and Expenses
- **Charts** — Monthly bar chart (Income vs Expenses) + Spending breakdown pie chart
- **Transactions** — Full list with search, filter by type/category, and sort
- **Insights** — Top spending category, savings rate, month-over-month comparison
- **Role-Based UI (RBAC)** — Toggle between Admin (can add transactions) and Viewer (read-only)
- **Responsive** — Works on mobile and desktop

## Tech Stack

- React 18 with Vite
- Recharts for data visualizations
- React Context API for state management
- Plain CSS-in-JS styling (no external UI library)

## Setup Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## Project Structure

```
src/
├── context/
│   └── AppContext.jsx     # Global state (role, transactions, filters)
├── components/
│   ├── Navbar.jsx          # Top nav with role switcher
│   ├── SummaryCards.jsx    # Balance / Income / Expense cards
│   ├── Charts.jsx          # Bar chart + Pie chart
│   ├── Transactions.jsx    # Table with filters + add form
│   └── Insights.jsx        # Key financial insights
├── data/
│   └── transactions.js     # Mock transaction data
├── App.jsx
├── main.jsx
└── index.css
```

## Role Behavior

| Feature              | Admin | Viewer |
|----------------------|-------|--------|
| View dashboard       | ✅    | ✅     |
| View transactions    | ✅    | ✅     |
| Add new transaction  | ✅    | ❌     |
| Filter & search      | ✅    | ✅     |

Switch roles using the toggle in the top-right of the navbar.

## Approach

State is managed via React Context API. The `AppContext` holds transactions, active filters, selected role, and derived summary values (total income, expenses, balance). All filtering and sorting is computed with `useMemo` to avoid unnecessary recalculations.

Mock data spans 3 months (Feb–Apr 2024) to make the monthly chart meaningful.
