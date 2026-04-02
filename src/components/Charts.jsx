import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { useApp } from "../context/AppContext";
import { monthlyData } from "../data/transactions";

const COLORS = ["#f87171","#fb923c","#facc15","#4ade80","#60a5fa","#c084fc","#f472b6","#34d399"];

const fmt = (v) =>
  new Intl.NumberFormat("en-IN", { notation: "compact", style: "currency", currency: "INR", maximumFractionDigits: 1 }).format(v);

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px" }}>
      <p style={{ color: "#94a3b8", margin: "0 0 6px", fontSize: "12px" }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, margin: "2px 0", fontSize: "13px", fontWeight: 600 }}>
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  );
}

export default function Charts() {
  const { categoryBreakdown } = useApp();
  const topCategories = categoryBreakdown.slice(0, 7);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>

      {/* Bar Chart - Monthly Income vs Expenses */}
      <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "14px", padding: "20px" }}>
        <h3 style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600, margin: "0 0 18px" }}>
          Monthly Overview
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyData} barCategoryGap="30%">
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" fill="#60a5fa" radius={[4, 4, 0, 0]} name="Income" />
            <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Spending by Category */}
      <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "14px", padding: "20px" }}>
        <h3 style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: 600, margin: "0 0 18px" }}>
          Spending Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={topCategories}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={75}
              innerRadius={40}
              paddingAngle={2}
            >
              {topCategories.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => fmt(v)} contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", fontSize: "12px" }} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
