import React, { useEffect, useRef, useState } from "react";
import API_BASE from "../api";
import "./login.css";

function ResetPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [strength, setStrength] = useState("");

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const evaluateStrength = (value) => {
    if (!value) return "";
    let score = 0;
    if (value.length >= 6) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value) || /[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 1) return "weak";
    if (score === 2) return "medium";
    return "strong";
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setNewPassword(val);
    setStrength(evaluateStrength(val));
  };

  // Auto focus on step change
  useEffect(() => {
    if (step === 1 && usernameRef.current) {
      usernameRef.current.focus();
    }
    if (step === 2 && passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [step]);

  const checkUsername = async (e) => {
    if (e) e.preventDefault();

    setError("");
    setSuccess("");

    if (!username.trim()) {
      setError("Please enter username");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/check_username.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });

      const data = await res.json();

      if (data.exists) {
        setStep(2);
      } else {
        setError("Invalid username");
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (e) => {
    if (e) e.preventDefault();

    setError("");
    setSuccess("");

    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/reset_password.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, newPassword })
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Password reset successful. You can now log in.");
        setStep(3);
      } else {
        setError(data.message || "Password reset failed.");
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordKeyDown = (e) => {
    const caps = e.getModifierState && e.getModifierState("CapsLock");
    setCapsLockOn(caps);
  };

  const handlePasswordKeyUp = (e) => {
    const caps = e.getModifierState && e.getModifierState("CapsLock");
    setCapsLockOn(caps);
  };

  return (
    <div
      className="login-bg"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/login_wallpaper.jpg)`
      }}
    >
      <div className="login-overlay" />

      <div className="login-box">
        <h2 className="login-title">Reset Password</h2>

        {error && <p className="login-error">{error}</p>}
        {success && <p className="login-success">{success}</p>}

        {/* STEP 1: Enter Username */}
        {step === 1 && (
          <form onSubmit={checkUsername}>
            <input
              type="text"
              placeholder="Enter Username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={usernameRef}
            />

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading && <span className="btn-spinner" />}
              <span>{loading ? "Checking..." : "Continue"}</span>
            </button>
          </form>
        )}

        {/* STEP 2: Enter New Password */}
        {step === 2 && (
          <form onSubmit={updatePassword}>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter New Password"
                className="login-input"
                value={newPassword}
                onChange={handlePasswordChange}
                onKeyDown={handlePasswordKeyDown}
                onKeyUp={handlePasswordKeyUp}
                ref={passwordRef}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {capsLockOn && (
              <div className="caps-warning">
                Caps Lock is ON
              </div>
            )}

            {newPassword && (
              <>
                <div className="strength-label">
                  Password strength:{" "}
                  {strength === "weak"
                    ? "Weak"
                    : strength === "medium"
                    ? "Medium"
                    : "Strong"}
                </div>
                <div className="strength-meter">
                  <div
                    className={
                      "strength-bar " +
                      (strength === "weak"
                        ? "strength-weak"
                        : strength === "medium"
                        ? "strength-medium"
                        : "strength-strong")
                    }
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading && <span className="btn-spinner" />}
              <span>{loading ? "Updating..." : "Reset Password"}</span>
            </button>
          </form>
        )}

        {/* STEP 3: Done */}
        {step === 3 && (
          <button
            className="login-btn"
            onClick={() => (window.location.href = "/admin")}
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
    