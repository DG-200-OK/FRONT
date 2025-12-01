import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BarChart from "../Chart/BarChart";
import "../Chart/BarChart.css";

const ChartPreview = ({ kor_title, title, category }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // ⭐ cuisine만 실제 그래프 데이터 가져오기
    if (category === "cuisine") {
      fetch("http://43.200.70.251:8000/api/crawl/score")
        .then((res) => res.json())
        .then((json) => {
          const arr = json.responseData;
          if (!arr || arr.length === 0) return;

          const d = arr[0];

          if (title === "Score A") {
            setChartData({ human: [d.avg_score_a] });
          } else {
            setChartData({ human: [d.avg_score_c] });
          }
        })
        .catch((err) => console.error("❌ Fetch 실패:", err));

    } else {
      // ⭐ 다른 카테고리는 → 틀만 나오도록 0만 넣기 (막대는 안 보임)
      setChartData({ human: [0] });
    }
  }, [title, category]);

  if (!chartData) return null;

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
