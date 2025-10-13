import React from "react";
import styled from "styled-components";
import BarChart from "../Chart/BarChart"; // ✅ BarChart import
import "../Chart/BarChart.css"; // ✅ 스타일 적용

// 🔹 임시 데이터 (나중에 API 연결 가능)
const sampleData = {
  labels: ["A", "B", "C"],
  human: [60, 80, 40],
  ai: [55, 75, 35],
};

const ChartPreview = ({ title, apiEndpoint }) => {
  return (
    <ChartBox>
      <ChartTitle>{title}</ChartTitle>

      {/* ✅ 실제 차트 삽입 */}
      <BarChart title={title} theme="architecture" data={sampleData} />
    </ChartBox>
  );
};

export default ChartPreview;

/* ----- 스타일 ----- */
const ChartBox = styled.div`
  flex: 1; /* ✅ 3개 균등 분배 */
  min-width: 0;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
`;

const ChartTitle = styled.h4`
  font-size: 14px;
  margin: 0 0 8px 0;
  word-break: keep-all;
  white-space: normal;
  line-height: 1.4;
`;
