import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    if (!username || !password) {
      setError("Username and password are required");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/login_admin.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success && data.user) {

        // Save session
        localStorage.setItem("admin_logged", "true");
        localStorage.setItem("admin_id", data.user.id);
        localStorage.setItem("admin_username", data.user.username);
        localStorage.setItem("admin_role", data.user.role);
        localStorage.setItem("adminUser", JSON.stringify(data.user));

        // SHOW FULLSCREEN TEA LOADER
        navigate("/admin/loading");

      } else {
        setError(data.message || "Incorrect username or password");
        setShake(true);
        setTimeout(() => setShake(false), 400);
      }
    } catch (err) {
      setError("Network error. Try again.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const handlePasswordKey = (e) => {
    const caps = e.getModifierState && e.getModifierState("CapsLock");
    setCapsLockOn(caps);
  };

  return (
    <div
      className="login-bg"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/login_wallpaper.jpg)` }}
    >
      <div className="login-overlay" />

      <div className={`login-box ${shake ? "shake" : ""}`}>
        <h2 className="login-title">CEYMOS Lanka Admin Login</h2>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePasswordKey}
              onKeyUp={handlePasswordKey}
              autoComplete="current-password"
            />

            <i
              className={`password-icon fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowPassword((prev) => !prev)}
            ></i>
          </div>

          {capsLockOn && <div className="caps-warning">Caps Lock is ON</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading && <span className="btn-spinner" />}
            <span>{loading ? "Logging in..." : "Login"}</span>
          </button>

          <p
            className="forgot-link"
            onClick={() => navigate("/admin/reset-password")}
          >
            Forgot Password?
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
