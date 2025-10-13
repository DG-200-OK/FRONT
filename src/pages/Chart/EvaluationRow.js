import React from "react";
import BarChart from "./BarChart";
import "./EvaluationRow.css";
import { useNavigate } from "react-router-dom";
import LazyImage from "../../components/LazyImage";

function EvaluationRow({ data }) {
  const { imageUrl, imageLabel, chartData, id, content } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chart/${id}`);
  };

  return (
    <div
      className="evaluation-row-wrapper"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="evaluation-row">
        {/* 이미지를 새 카드 컴포넌트로 래핑 */}
        <div className="image-card">
          <LazyImage
            src={imageUrl}
            alt={imageLabel}
            className="row-image"
            width="118px"
            height="120px"
            borderRadius="6px"
          />
          <span className="image-label">{imageLabel}</span>
        </div>

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
      {content && (
        <div className="caption-container">
          <p className="caption-text">{content}</p>
        </div>
      )}
    </div>
  );
}

export default EvaluationRow;
