import { useApp } from "../context/AppContext";
import { monthlyData } from "../data/transactions";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function Insights() {
  const { categoryBreakdown, totalIncome, totalExpenses } = useApp();

  const topCategory = categoryBreakdown[0];
  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : 0;

  const thisMonth  = monthlyData[monthlyData.length - 1];
  const lastMonth  = monthlyData[monthlyData.length - 2];
  const spendDiff  = thisMonth.expenses - lastMonth.expenses;
  const spendChange = ((spendDiff / lastMonth.expenses) * 100).toFixed(1);

  const cards = [
    {
      title: "Top Spending Category",
      value: topCategory?.name || "—",
      sub: topCategory ? `${fmt(topCategory.value)} total spent` : "",
      icon: "🏆",
      color: "#fb923c",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      sub: savingsRate >= 20 ? "Great job! Above 20% target" : "Try to save more this month",
      icon: "💰",
      color: savingsRate >= 20 ? "#4ade80" : "#facc15",
    },
    {
      title: "vs Last Month",
      value: `${spendChange > 0 ? "+" : ""}${spendChange}%`,
      sub: `Expenses ${spendDiff > 0 ? "increased" : "decreased"} by ${fmt(Math.abs(spendDiff))}`,
      icon: spendDiff > 0 ? "📈" : "📉",
      color: spendDiff > 0 ? "#f87171" : "#4ade80",
    },
    {
      title: "Largest Single Expense",
      value: (() => {
        const top = [...(categoryBreakdown)].sort((a, b) => b.value - a.value)[0];
        return top ? fmt(top.value) : "—";
      })(),
      sub: "Housing & rent usually dominate",
      icon: "🏠",
      color: "#c084fc",
    },
  ];

  return (
    <div>
      <h3 style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600, marginBottom: "14px" }}>Insights</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
        {cards.map(c => (
          <div key={c.title} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", padding: "16px 20px" }}>
            <div style={{ fontSize: "22px", marginBottom: "8px" }}>{c.icon}</div>
            <div style={{ color: "#64748b", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{c.title}</div>
            <div style={{ color: c.color, fontSize: "20px", fontWeight: 700 }}>{c.value}</div>
            <div style={{ color: "#475569", fontSize: "11px", marginTop: "4px" }}>{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
