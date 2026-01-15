import React from "react";
import { APP_VERSION } from "../config/appConfig";
import "./adminFooter.css";

function AdminFooter() {
  return (
    <footer className="admin-footer">
      <div className="footer-left">
        <span>Version {APP_VERSION || "N/A"}</span>
      </div>

      <div className="footer-center">
        <span>Made with care ❤️</span>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg"
          alt="Sri Lanka"
          className="footer-flag"
        />
        
      </div>

      <div className="footer-right">
        <span>
          Developed by <strong>Nadeesha Shalom</strong>
        </span>
      </div>
    </footer>
  );
}

export default AdminFooter;
