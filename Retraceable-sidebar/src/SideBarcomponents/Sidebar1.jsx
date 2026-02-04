import React, { useState } from 'react';
import { Home, User, Settings, LayoutGrid, LogOut } from 'lucide-react';
import './Sidebar1.css';

const Sidebar1 = () => {
  const [active, setActive] = useState('Home');

  const menuItems = [
    { name: 'Home', icon: <Home size={22} /> },
    { name: 'Dashboard', icon: <LayoutGrid size={22} /> },
    { name: 'Profile', icon: <User size={22} /> },
    { name: 'Settings', icon: <Settings size={22} /> },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <div className="logo-icon"></div>
        <span className="logo-text">Logo</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`nav-item ${active === item.name ? 'active' : ''}`}
            onClick={() => setActive(item.name)}
          >
            <span className="icon-wrapper">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </button>
        ))}
      </nav>

    </div>
  );
};

export default Sidebar1;