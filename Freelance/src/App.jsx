// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/MainDashboard";
import Projects from "./pages/ProjectsPage";
import ProfileSettings from "./pages/ProfileSettings";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        
        {/* Sidebar lives OUTSIDE <Routes> — renders once, never remounts */}
        <SideBar />

        {/* Only this area swaps on navigation */}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/"                 element={<Dashboard />}       />
            <Route path="/projects"         element={<Projects />}        />
            <Route path="/profile-settings" element={<ProfileSettings />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;