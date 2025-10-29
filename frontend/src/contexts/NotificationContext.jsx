import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

const NOTIFICATION_TIMEOUT = 5000;

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, NOTIFICATION_TIMEOUT);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div className="notifications" style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000 }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`notification ${n.type}`}
            style={{
              background: n.type === "success" ? "#4caf50" : "#f44336",
              color: "white",
              padding: "1rem",
              marginBottom: "0.5rem",
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              textTransform: "none",
              letterSpacing: "0",
            }}
            onClick={() => removeNotification(n.id)}
          >
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
