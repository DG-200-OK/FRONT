import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BarChart from "../Chart/BarChart";
import "../Chart/BarChart.css";

const ChartPreview = ({ kor_title, title }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/crawler_score")
      .then((res) => res.json())
      .then((data) => {
        const d = data[0];
        // ✅ 각 ChartPreview가 title 에 따라 다른 값 세팅
        if (title === "Score A") {
          setChartData({ human: [d.scoreA] });
        } else if (title === "Score C") {
          setChartData({ human: [d.scoreC] });
        }
      })
      .catch((err) => console.error("❌ Fetch 실패:", err));
  }, [title]); // ✅ title별로 분리 렌더링

  if (!chartData) return <ChartBox>로딩 중...</ChartBox>;

  return (
    <ChartBox>
      <ChartTitle>{kor_title}</ChartTitle>
      <BarChart title={title} theme="architecture" data={chartData} />
    </ChartBox>
  );
};

export default ChartPreview;

/* ----- 스타일 ----- */
const ChartBox = styled.div`
  flex: 1;
  min-width: 0;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChartTitle = styled.h4`
  font-size: 14px;
  margin: 0 0 8px 0;
  word-break: keep-all;
  line-height: 1.4;
`;
