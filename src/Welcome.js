import React from "react";

function Welcome({ onStart }) {
  return (
    <div className="welcome">
      <div className="welcome-card">
        <h1>🍲 Recipe Tinder</h1>

        <h2>Discover recipes made for you.</h2>

        <p>
          From quick snacks to restaurant-style meals.
          find inspiration for every craving.
        </p>

        <button onClick={onStart}>
          Explore Now →
        </button>
      </div>
    </div>
  );
}

export default Welcome;