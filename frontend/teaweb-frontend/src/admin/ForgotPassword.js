import React, { useState } from "react";
import API_BASE from "../api";

function ForgotPassword({ close }) {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const requestReset = async () => {
    setMessage("");

    const res = await fetch(`${API_BASE}/request_password_reset.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    const data = await res.json();

    if (data.success) {
      setOtpSent(true);
      setMessage("OTP sent to your email.");
    } else {
      setMessage(data.message);
    }
  };

  const verifyOtp = async () => {
    const res = await fetch(`${API_BASE}/reset_password.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        otp
      })
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = `/admin/reset-password?username=${username}`;
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-container-small" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Reset Password</h2>

        {message && <p className="modal-text">{message}</p>}

        {!otpSent && (
          <>
            <input
              className="modal-input"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <button className="btn-primary" onClick={requestReset}>
              Send OTP
            </button>
          </>
        )}

        {otpSent && (
          <>
            <input
              className="modal-input"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button className="btn-primary" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        <button className="btn-cancel" onClick={close}>Cancel</button>
      </div>
    </div>
  );
}

export default ForgotPassword;
