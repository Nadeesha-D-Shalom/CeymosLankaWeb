import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TeaLoader.css";

function TeaLoader() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/admin/dashboard");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="tea-loader-overlay">

      <div className="tea-leaves">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="leaf"></div>
        ))}
      </div>

      <div className="tea-loader-center">
        <div className="tea-cup">
          <div className="cup-body"></div>
          <div className="cup-handle"></div>
          <div className="steam steam1"></div>
          <div className="steam steam2"></div>
          <div className="steam steam3"></div>
        </div>

        <div className="propagate-bars">
          {[1, 2, 3, 4, 5].map((b) => (
            <div key={b} className="bar"></div>
          ))}
        </div>

        <p className="tea-loader-text">Refreshing TeaWeb...</p>
      </div>
    </div>
  );
}

export default TeaLoader;
