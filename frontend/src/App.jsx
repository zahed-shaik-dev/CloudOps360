import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="app">
      <aside className="app-sidebar">
        <Sidebar />
      </aside>

      <main className="app-main">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;