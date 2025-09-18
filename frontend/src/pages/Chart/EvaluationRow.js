import React from "react";
import BarChart from "./BarChart";
import "./EvaluationRow.css";

function EvaluationRow({ data }) {
  const { imageUrl, chartData } = data;

  return (
    <div className="evaluation-row">
      <img src={imageUrl} alt="Evaluation" className="row-image" />
      <BarChart
        title="문화적 적절성"
        theme="cultural"
        data={chartData.cultural}
      />
      <BarChart
        title="시각적 세부사항"
        theme="visual"
        data={chartData.visual}
      />
      <BarChart
        title="환각"
        theme="hallucination"
        data={chartData.hallucination}
      />
    </div>
  );
}

export default EvaluationRow;
