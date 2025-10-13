import React from "react";
import AIPerformanceChart from "./AIPerformanceChart";
import "../LineChart/ChartDashboard.css";

// API 데이터를 차트 형식으로 변환
const transformApiDataToChartData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((value, index) => ({
    index: index,
    value: value !== null && value !== undefined ? parseFloat(value.toFixed(4)) : 0, // null/undefined 값 처리
  }));
};

// 각 테마별 단일 색상 정의
const themeColors = {
  cultural: "#6f803c", // 진녹색
  visual: "#4f8f8c", // 진청록
  hallucination: "#d987a2", // 진분홍
};

function AIPerformanceChartDashboard({
  chartData,
  content,
  selectedDataCount,
  onDataCountChange,
}) {
  // Transform API data to chart format - 필터링은 개별 차트 컴포넌트에서 처리
  const culturalData = transformApiDataToChartData(chartData?.cultural || []);
  const visualData = transformApiDataToChartData(chartData?.visual || []);
  const hallucinationData = transformApiDataToChartData(chartData?.hallucination || []);

  return (
    <main className="chart-dashboard">
      <div className="description-box">
        {content || "AI 성능 데이터를 분석하고 있어요... 🤖✨"}
      </div>

      <AIPerformanceChart
        title="문화적 적절성"
        data={culturalData}
        color={themeColors.cultural}
        selectedDataCount={selectedDataCount}
        onDataCountChange={onDataCountChange}
      />
      <AIPerformanceChart
        title="시각적 세부사항"
        data={visualData}
        color={themeColors.visual}
        selectedDataCount={selectedDataCount}
        onDataCountChange={onDataCountChange}
      />
      <AIPerformanceChart
        title="환각"
        data={hallucinationData}
        color={themeColors.hallucination}
        selectedDataCount={selectedDataCount}
        onDataCountChange={onDataCountChange}
      />
    </main>
  );
}

export default AIPerformanceChartDashboard;