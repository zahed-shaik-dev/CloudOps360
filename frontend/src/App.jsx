import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="app">
      <aside className="app-sidebar">
        <Sidebar
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
      </aside>

      <main className="app-main">
        <Dashboard
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
      </main>
    </div>
  );
}

export default App;