import { useState } from "react";
import { useApp } from "../context/AppContext";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const categoryColors = {
  Income: "#60a5fa", Housing: "#a78bfa", Food: "#fb923c",
  Utilities: "#facc15", Entertainment: "#f472b6", Transport: "#34d399",
  Health: "#f87171", Education: "#4ade80", Shopping: "#e879f9",
};

export default function Transactions() {
  const {
    role, filteredTransactions, addTransaction,
    filterType, setFilterType,
    filterCategory, setFilterCategory,
    searchQuery, setSearchQuery,
    sortBy, setSortBy,
    categories,
  } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ description: "", amount: "", category: "Food", type: "expense", date: "" });
  const [error, setError] = useState("");

  function handleAdd() {
    if (!form.description || !form.amount || !form.date) {
      setError("Please fill all fields.");
      return;
    }
    addTransaction({ ...form, amount: Number(form.amount) });
    setForm({ description: "", amount: "", category: "Food", type: "expense", date: "" });
    setShowForm(false);
    setError("");
  }

  const inputStyle = {
    background: "#1e293b", border: "1px solid #334155", color: "#e2e8f0",
    borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none",
  };

  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "14px", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <h3 style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600, margin: 0 }}>Transactions</h3>
        {role === "admin" && (
          <button
            onClick={() => setShowForm(v => !v)}
            style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}
          >
            + Add Transaction
          </button>
        )}
      </div>

      {/* Add form - admin only */}
      {role === "admin" && showForm && (
        <div style={{ background: "#1e293b", borderRadius: "10px", padding: "16px", marginBottom: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px" }}>
          <input style={inputStyle} placeholder="Description" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
          <input style={inputStyle} placeholder="Amount (₹)" type="number" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} />
          <input style={inputStyle} type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
          <select style={inputStyle} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select style={inputStyle} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
            {["Food","Housing","Transport","Health","Shopping","Utilities","Entertainment","Education","Income"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={handleAdd} style={{ flex: 1, background: "#22c55e", color: "#fff", border: "none", borderRadius: "8px", padding: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}>Save</button>
            <button onClick={() => setShowForm(false)} style={{ flex: 1, background: "#475569", color: "#fff", border: "none", borderRadius: "8px", padding: "8px", cursor: "pointer", fontSize: "13px" }}>Cancel</button>
          </div>
          {error && <span style={{ color: "#f87171", fontSize: "12px", gridColumn: "1/-1" }}>{error}</span>}
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
        <input
          style={{ ...inputStyle, flex: "1", minWidth: "160px" }}
          placeholder="🔍  Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <select style={inputStyle} value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select style={inputStyle} value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select style={inputStyle} value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        {filteredTransactions.length === 0 ? (
          <div style={{ textAlign: "center", color: "#475569", padding: "40px 0", fontSize: "14px" }}>No transactions found.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e293b" }}>
                {["Date", "Description", "Category", "Type", "Amount"].map(h => (
                  <th key={h} style={{ color: "#64748b", fontWeight: 500, padding: "8px 12px", textAlign: h === "Amount" ? "right" : "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(tx => (
                <tr key={tx.id} style={{ borderBottom: "1px solid #1e293b11" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1e293b44"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "10px 12px", color: "#94a3b8" }}>{new Date(tx.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</td>
                  <td style={{ padding: "10px 12px", color: "#e2e8f0", fontWeight: 500 }}>{tx.description}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ background: `${categoryColors[tx.category] || "#94a3b8"}22`, color: categoryColors[tx.category] || "#94a3b8", borderRadius: "20px", padding: "2px 10px", fontSize: "11px", fontWeight: 600 }}>
                      {tx.category}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ color: tx.type === "income" ? "#4ade80" : "#f87171", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>
                      {tx.type}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, color: tx.type === "income" ? "#4ade80" : "#f87171", fontVariantNumeric: "tabular-nums" }}>
                    {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <p style={{ color: "#475569", fontSize: "11px", margin: "12px 0 0" }}>{filteredTransactions.length} transaction(s) shown</p>
    </div>
  );
}
