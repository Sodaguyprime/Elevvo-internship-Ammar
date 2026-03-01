// App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Dashboard from "./pages/MainDashboard";
import Projects from "./pages/ProjectsPage";
import ProfileSettings from "./pages/ProfileSettings";
import { AvatarProvider } from "./context/AvatarContext";
function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AvatarProvider>

    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">

        {/* Sidebar — receives mobile state */}
        <SideBar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        {/* Right side: topbar + page content stacked vertically */}
        <div className="flex flex-col flex-1 min-w-0 w-full">
          <TopBar onMenuClick={() => setMobileOpen(true)} />

          <main className="flex-1 overflow-auto p-6 ">
            <Routes>
              <Route path="/"                 element={<Dashboard />}       />
              <Route path="/projects"         element={<Projects />}        />
              <Route path="/profile-settings" element={<ProfileSettings />} />
            </Routes>
          </main>
        </div>

      </div>
    </BrowserRouter>
    </AvatarProvider>
  );
}

export default App;