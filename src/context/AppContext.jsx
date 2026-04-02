import { createContext, useContext, useState, useMemo } from "react";
import { transactions as initialData } from "../data/transactions";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [role, setRole] = useState("admin");
  const [allTransactions, setAllTransactions] = useState(initialData);
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  // Add a new transaction (admin only)
  function addTransaction(tx) {
    const newTx = { ...tx, id: Date.now() };
    setAllTransactions(prev => [newTx, ...prev]);
  }

  // Filtered + sorted transactions
  const filteredTransactions = useMemo(() => {
    let result = [...allTransactions];

    if (filterType !== "all") result = result.filter(t => t.type === filterType);
    if (filterCategory !== "all") result = result.filter(t => t.category === filterCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "date-asc":  result.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case "date-desc": result.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case "amount-asc":  result.sort((a, b) => a.amount - b.amount); break;
      case "amount-desc": result.sort((a, b) => b.amount - a.amount); break;
    }

    return result;
  }, [allTransactions, filterType, filterCategory, searchQuery, sortBy]);

  // Summary stats from April data only (latest month)
  const aprilTxns = allTransactions.filter(t => t.date.startsWith("2024-04"));
  const totalIncome   = aprilTxns.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = aprilTxns.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Category breakdown for pie chart
  const categoryBreakdown = useMemo(() => {
    const map = {};
    allTransactions.filter(t => t.type === "expense").forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
  }, [allTransactions]);

  const categories = [...new Set(allTransactions.map(t => t.category))];

  return (
    <AppContext.Provider value={{
      role, setRole,
      allTransactions, filteredTransactions, addTransaction,
      filterType, setFilterType,
      filterCategory, setFilterCategory,
      searchQuery, setSearchQuery,
      sortBy, setSortBy,
      categories,
      totalIncome, totalExpenses, balance,
      categoryBreakdown,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
