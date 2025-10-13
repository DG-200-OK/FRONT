import React from "react";
import "./Sidebar.css";

const categories = [
  { name: "Architecture", displayName: "건축", color: "architecture" },
  { name: "Clothing", displayName: "의류", color: "clothing" },
  { name: "Cuisine", displayName: "요리", color: "cuisine" },
  { name: "Game", displayName: "게임", color: "game" },
  { name: "Tool", displayName: "도구", color: "tool" }
];

function Sidebar({ selectedCategory, handleCategoryChange }) {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">카테고리</h3>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category.name} className="category-item">
            <div className="category-filter">
              <input
                type="checkbox"
                id={category.name}
                name={category.name}
                checked={selectedCategory === category.name}
                onChange={() => handleCategoryChange(category.name)}
              />
              <label htmlFor={category.name}>
                {category.name}
              </label>
            </div>
            <button
              className="category-inline-btn"
              onClick={() => window.location.href = `/category-performance/${category.name}`}
              title={`${category.displayName} 성능 보기`}
            >
              성능
            </button>
          </div>
        ))}
      </div>
      <button
        className="ai-performance-btn"
        onClick={() => window.location.href = '/ai-performance'}
      >
        AI 통합성능 보기
      </button>
    </aside>
  );
}

export default Sidebar;
