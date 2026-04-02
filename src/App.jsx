import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import Charts from "./components/Charts";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";

function Dashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#060f1e", fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "24px" }}>
        <SummaryCards />
        <Charts />
        <Insights />
        <Transactions />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}
