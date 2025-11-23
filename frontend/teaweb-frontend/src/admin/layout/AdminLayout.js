import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../admin.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function AdminLayout({ children }) {
  const [admin, setAdmin] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [animateLogout, setAnimateLogout] = useState(false);

  const [liveTime, setLiveTime] = useState(new Date());  // FIX: live clock

  const navigate = useNavigate();

  // LIVE CLOCK - updates every 1 second
  useEffect(() => {
    const t = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const clearSession = () => {
    localStorage.removeItem("admin_logged");
    localStorage.removeItem("admin_id");
    localStorage.removeItem("admin_username");
    localStorage.removeItem("admin_role");
    localStorage.removeItem("adminUser");
  };

  const logoutNow = useCallback(() => {
    clearSession();
    setAnimateLogout(true);

    setTimeout(() => {
      navigate("/admin/login");
      window.location.reload();
    }, 800);
  }, [navigate]);

  const resetInactivityTimer = useCallback(() => {
    if (window.__LOGOUT_TIMER__) {
      clearTimeout(window.__LOGOUT_TIMER__);
    }

    window.__LOGOUT_TIMER__ = setTimeout(() => {
      clearSession();
      navigate("/admin/login");
      window.location.reload();
    }, 15 * 60 * 1000);
  }, [navigate]);

  useEffect(() => {
    const stored = localStorage.getItem("adminUser");
    if (stored) {
      setAdmin(JSON.parse(stored));
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    resetInactivityTimer();

    const events = ["mousemove", "click", "keydown"];
    events.forEach((evt) => window.addEventListener(evt, resetInactivityTimer));

    return () => {
      events.forEach((evt) =>
        window.removeEventListener(evt, resetInactivityTimer)
      );
      clearTimeout(window.__LOGOUT_TIMER__);
    };
  }, [resetInactivityTimer]);

  return (
    <div className={`admin-container ${animateLogout ? "fade-out" : ""}`}>
      {/* SIDEBAR */}
      <aside className="sidebar-modern">
        <h2 className="sidebar-title">CEYMOS LANKA</h2>

        <ul className="menu-list">
          <li>
            <Link to="/admin/dashboard">
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/admins">
              <i className="fas fa-users-cog"></i>
              <span>Admin Manager</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/tea">
              <i className="fas fa-mug-hot"></i>
              <span>Tea Product Manager</span>
            </Link>

          </li>

          <li>
            <Link to="/admin/coconut">
              <i className="fas fa-leaf"></i>
              <span>Coconut Product Manager</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/spices">
              <i className="fas fa-pepper-hot"></i>
              <span>Spices Product Manager</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/rice">
              <i className="fas fa-bowl-rice"></i>
              <span>Rice Product Manager</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/messages">
              <i className="fas fa-envelope"></i>
              <span>Messages</span>
            </Link>
          </li>

          <li className="logout-item" onClick={() => setShowLogoutPopup(true)}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </li>
        </ul>
      </aside>

      {/* MAIN AREA */}
      <div className="main-area">
        {/* TOPBAR */}
        <div className="topbar-modern">
          <div className="topbar-left">
            <i className="fas fa-user-circle profile-icon"></i>
            {admin ? (
              <span>
                {admin.firstName} {admin.lastName} – {admin.username}
              </span>
            ) : (
              <span>Admin User</span>
            )}
          </div>

          <div className="topbar-right">
            <span>Date: {liveTime.toLocaleDateString()}</span>
            <span>Time: {liveTime.toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="content-modern">{children}</div>
      </div>

      {/* LOGOUT POPUP */}
      {showLogoutPopup && (
        <div className="modal-overlay" onClick={() => setShowLogoutPopup(false)}>
          <div
            className="modal-container-small"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Confirm Logout</h2>
            <p className="modal-text">Are you sure you want to log out?</p>

            <div className="modal-actions">
              <button className="btn-primary" onClick={logoutNow}>
                Logout
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminLayout;
