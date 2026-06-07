import Welcome from "./Welcome";
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const searchMeals = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      setMeals(res.data.meals || []);
    } catch (error) {
      console.log(error);
      setMeals([]);
    }

    setLoading(false);
  };

  const filterCategory = async (category) => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      setMeals(res.data.meals || []);
    } catch (error) {
      console.log(error);
      setMeals([]);
    }

    setLoading(false);
  };
const getMealDetails = async (id) => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    setSelectedMeal(res.data.meals[0]);
  } catch (error) {
    console.log(error);
  }
};
if (showWelcome) {
  return (
    <Welcome
      onStart={() => setShowWelcome(false)}
    />
  );
}
const toggleFavorite = (meal) => {
  const exists = favorites.find(
    (item) => item.idMeal === meal.idMeal
  );

  if (exists) {
    setFavorites(
      favorites.filter(
        (item) => item.idMeal !== meal.idMeal
      )
    );
  } else {
    setFavorites([...favorites, meal]);
  }
};
  return (
  <div className="app">

    <div className="hero-banner">
      <div className="hero-overlay">
        <h1>🍲 Recipe Tinder</h1>
        <p>Swipe. Discover. Cook.</p>
      </div>
    </div>

    <div className="search">
        <input
          type="text"
          placeholder="Search your favorite recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="search-btn" onClick={searchMeals}>
          Search
        </button>
      </div>

      <div className="filters">
        <button
          className="veg-btn"
          onClick={() => filterCategory("Vegetarian")}
        >
          🥗 Veg
        </button>

        <button
          className="chicken-btn"
          onClick={() => filterCategory("Chicken")}
        >
          🍗 Chicken
        </button>

        <button
          className="beef-btn"
          onClick={() => filterCategory("Beef")}
        >
          🥩 Beef
        </button>

        <button
          className="seafood-btn"
          onClick={() => filterCategory("Seafood")}
        >
          🐟 Seafood
        </button>

        <button
          className="dessert-btn"
          onClick={() => filterCategory("Dessert")}
        >
          🍰 Dessert
        </button>

        <button
          className="breakfast-btn"
          onClick={() => filterCategory("Breakfast")}
        >
          🥣 Breakfast
        </button>

        <button
          className="clear-btn"
          onClick={() => setMeals([])}
        >
          Clear
        </button>
      </div>

      {loading && <h3>Loading recipes...</h3>}

      {!loading && meals.length === 0 && query && (
        <h3>No recipes found.</h3>
      )}

        <div className="grid">
  {meals &&
    meals.map((meal) => (
      <div
        key={meal.idMeal}
        className="card"
        onClick={() => getMealDetails(meal.idMeal)}
      >
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />
        <div className="card-footer">
  <p>{meal.strMeal}</p>

  <button
    className="heart-btn"
    onClick={(e) => {
      e.stopPropagation();
      toggleFavorite(meal);
    }}
  >
    {favorites.find(
      (item) => item.idMeal === meal.idMeal
    )
      ? "❤️"
      : "🤍"}
  </button>
</div>
      </div>
    ))}
</div>

      {selectedMeal && (
        <div
          className="modal"
          onClick={() => setSelectedMeal(null)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedMeal.strMeal}</h2>

            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
            />

            <p>
              <strong>Category:</strong>{" "}
              {selectedMeal.strCategory || "Recipe"}
            </p>

            <p>
              <strong>Cuisine:</strong>{" "}
              {selectedMeal.strArea || "International"}
            </p>

            <h3>Instructions</h3>

            <p>
              {selectedMeal.strInstructions
                ? selectedMeal.strInstructions
                : "Recipe details not available from category search. Use the search feature to view full instructions."}
            </p>

            <button
              className="close-btn"
              onClick={() => setSelectedMeal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Recipe Tinder • Built with React & MealDB API</p>
      </footer>
    </div>
  );
}

export default App;