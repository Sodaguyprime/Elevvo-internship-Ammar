import { createContext, useContext, useState } from "react";
import mockData from "../data/MockData.json";

const NotificationsContext = createContext();

// Seed from the 3 most recent activity items
const seedNotifications = mockData.recentActivity.slice(0, 3).map((a) => ({
  id:      a.id,
  type:    a.type,
  message: a.message,
  date:    a.date,
  read:    false,
}));

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(seedNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markOneRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  // Prepend a new notification (called when a project is added, etc.)
  const addNotification = (notification) =>
    setNotifications((prev) => [{ ...notification, read: false }, ...prev]);

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markAllRead, markOneRead, addNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
