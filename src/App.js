import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");

  // 🛑 Cache to avoid re-fetching
  const cache = useRef({});

  // 🛑 Debounce timeout
  const debounceRef = useRef(null);

  useEffect(() => {
    // If cached → load instantly
    if (cache.current[category]) {
      setArticles(cache.current[category]);
      setLoading(false);
      return;
    }

    // Reset loader
    setLoading(true);

    // Debounce to prevent multiple requests
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchNews();
    }, 400);

    async function fetchNews() {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=93f642bbc02b433c8c9c7e9a3e30ca47`
        );
        const data = await res.json();

        cache.current[category] = data.articles || []; // save to cache
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [category]);

  const categories = [
    "general",
    "technology",
    "sports",
    "business",
    "health",
    "entertainment",
    "science",
  ];

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "30px",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#222", marginBottom: "30px" }}>
        📰 React News Dashboard
      </h1>

      {/* Category Buttons */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              margin: "5px",
              padding: "10px 15px",
              borderRadius: "8px",
              border: category === cat ? "2px solid #007bff" : "1px solid gray",
              backgroundColor: category === cat ? "#007bff" : "#fff",
              color: category === cat ? "#fff" : "#000",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.2s",
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading news...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {articles.slice(0, 10).map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {item.urlToImage && (
                <img
                  src={item.urlToImage}
                  alt="news"
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                />
              )}
              <h3 style={{ color: "#333" }}>{item.title}</h3>
              <p style={{ color: "#555" }}>
                {item.description || "No description available."}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#007bff",
                  fontWeight: "bold",
                }}
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
