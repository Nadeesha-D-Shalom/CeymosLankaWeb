import React from "react";
import "./TestHero.css";

function TestHero() {
  return (
    <div className="tea-hero">
      <div className="tea-overlay"></div>

      <div className="tea-content">
        <h1 className="tea-title">Pure Ceylon Tea</h1>
        <p className="tea-subtitle">
          Experience authentic flavors, hand-picked from the heart of Sri Lanka.
        </p>

        <button className="tea-btn">Explore Collection</button>
      </div>
    </div>
  );
}

export default TestHero;
