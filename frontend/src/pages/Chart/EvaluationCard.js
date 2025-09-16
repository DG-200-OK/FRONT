import React from "react";
import BarChart from "./BarChart";
import "./EvaluationCard.css";

function EvaluationCard({ data }) {
  const { title, imageUrl, chartData } = data;

  return (
    <div className="evaluation-card">
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h4 className="card-title">{title}</h4>
        <BarChart data={chartData} />
      </div>
    </div>
  );
}

export default EvaluationCard;
