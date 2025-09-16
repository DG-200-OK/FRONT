import React from "react";
import "./Sidebar.css";

const categories = ["Architecture", "Clothing", "Cuisine", "Game", "people"];

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">카테고리</h3>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category} className="category-item">
            <input type="checkbox" id={category} name={category} />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      <button className="sidebar-submit-btn">선택하기</button>
    </aside>
  );
}

export default Sidebar;
