import React, { useState } from 'react';
import { Home, User, Settings, LayoutGrid, ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import './Sidebar1.css';

const Sidebar1 = () => {
  const [active, setActive] = useState('Home');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuItems = [
    { name: 'Home', icon: <Home size={22} /> },
    { name: 'Dashboard', icon: <LayoutGrid size={22} /> },
    { name: 'Profile', icon: <User size={22} /> },
    { name: 'Settings', icon: <Settings size={22} /> },
  ];
  return (
    <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-content">
          <div className="logo-icon"></div>
          <span className="logo-text">Logo</span>
        </div>
        <button className="arrow-button" onClick={() => {
              console.log(!isCollapsed);
              setIsCollapsed(!isCollapsed);
            }}>
          {isCollapsed ? <ArrowBigRight size={20} /> : <ArrowBigLeft size={20} />}
        </button>
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