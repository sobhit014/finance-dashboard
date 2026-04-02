import { useApp } from "../context/AppContext";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function SummaryCards() {
  const { totalIncome, totalExpenses, balance } = useApp();

  const cards = [
    {
      label: "Total Balance",
      value: fmt(balance),
      icon: "⚖️",
      color: "#22c55e",
      bg: "#052e16",
      change: "+8.2% from last month",
    },
    {
      label: "Total Income",
      value: fmt(totalIncome),
      icon: "📈",
      color: "#60a5fa",
      bg: "#172554",
      change: "+11% from last month",
    },
    {
      label: "Total Expenses",
      value: fmt(totalExpenses),
      icon: "📉",
      color: "#f87171",
      bg: "#2d0a0a",
      change: "+34% from last month",
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
      {cards.map((c) => (
        <div
          key={c.label}
          style={{
            background: c.bg,
            border: `1px solid ${c.color}33`,
            borderRadius: "14px",
            padding: "20px 24px",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 500 }}>{c.label}</span>
            <span style={{ fontSize: "20px" }}>{c.icon}</span>
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: c.color, letterSpacing: "-0.5px" }}>{c.value}</div>
          <div style={{ fontSize: "11px", color: "#64748b", marginTop: "6px" }}>{c.change}</div>
        </div>
      ))}
    </div>
  );
}
