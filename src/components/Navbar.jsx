import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { role, setRole } = useApp();

  return (
    <nav style={{
      background: "#0a1628",
      borderBottom: "1px solid #1e293b",
      padding: "0 24px",
      height: "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "20px" }}>💹</span>
        <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "16px", letterSpacing: "-0.3px" }}>
          FinTrack
        </span>
        <span style={{ color: "#475569", fontSize: "12px", marginLeft: "4px" }}>Dashboard</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ color: "#64748b", fontSize: "12px" }}>Role:</span>
        <div style={{ background: "#1e293b", borderRadius: "8px", display: "flex", padding: "3px" }}>
          {["viewer", "admin"].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                background: role === r ? (r === "admin" ? "#3b82f6" : "#475569") : "transparent",
                color: role === r ? "#fff" : "#64748b",
                border: "none",
                borderRadius: "6px",
                padding: "5px 14px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 0.2s",
              }}
            >
              {r === "admin" ? "🔧 Admin" : "👁 Viewer"}
            </button>
          ))}
        </div>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: role === "admin" ? "#1d4ed8" : "#374151",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", color: "#fff", fontWeight: 700,
        }}>
          {role === "admin" ? "A" : "V"}
        </div>
      </div>
    </nav>
  );
}
