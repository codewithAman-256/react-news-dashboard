import React, { useState, useEffect } from "react";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          `https://news-backend-dicf.onrender.com/api/news?category=${category}`
        );

        const data = await res.json();
        console.log("Fetched:", data);
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
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
      <div style={{ marginBottom: "20px" }}>
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
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading latest headlines...</p>
      ) : articles.length === 0 ? (
        <p style={{ textAlign: "center" }}>No news found.</p>
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
