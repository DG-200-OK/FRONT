import React, { useEffect, useState } from "react";
import CommonHeader from "../../components/CommonHeader";
import ItemSidebar from "../LineChart/ItemSidebar";
import AIPerformanceChartDashboard from "./AIPerformanceChartDashboard";
import "./AIPerformancePage.css";
import axios from "../../axiosInstance";

function AIPerformancePage() {
  const [averageChartData, setAverageChartData] = useState(null);
  const [selectedDataCount, setSelectedDataCount] = useState(500);

  const handleDataCountChange = (count) => {
    setSelectedDataCount(count);
  };

  useEffect(() => {
    const fetchAverageData = async () => {
      try {
        // Fetch all charts data to calculate average
        const response = await axios.get("/api/chart/all", {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (response.data && response.data.success) {
          const responseData = response.data.responseData;

          setAverageChartData({
            title: "AI 통합성능 분석",
            imageUrl: "/assets/img/ai-performance.svg",
            chartdata: responseData.chartdata,
            content:
              "AI 모델의 전반적인 성능을 한 눈에 확인하세요! 문화적 적절성, 시각적 세부사항, 환각 현상 등 다양한 지표의 평균값을 통해 AI의 응답 품질을 쉽게 파악할 수 있습니다. 각 지표가 낮을수록 더 정확하고 일관성 있는 AI 성능을 나타냅니다.",
            userResponseDistribution: responseData.userResponseDistribution,
          });
        } else {
          console.error(
            "API request was not successful:",
            response.data.message
          );
          // Set mock data for development
          setMockAverageData();
        }
      } catch (error) {
        console.error("Error fetching charts data:", error);
        // Set mock data for development
        setMockAverageData();
      }
    };

    fetchAverageData();
  }, []);

  const setMockAverageData = () => {
    // Mock data for development/testing matching API structure
    const mockChartData = {
      cultural: Array.from({ length: 9 }, () => Math.random() * 2),
      visual: Array.from({ length: 9 }, () => Math.random() * 1),
      hallucination: Array.from({ length: 9 }, () => Math.random() * 2),
    };

    const mockUserDistribution = {
      cultural: [0.0, 0.0, 0.0, 0.0, 0.0],
      visual: [0.0, 0.0, 0.0, 0.0, 0.0],
      hallucination: [0.0, 0.0, 0.0, 0.0, 0.0],
    };

    setAverageChartData({
      title: "AI 통합성능 분석 (데모 버전)",
      imageUrl: "/assets/img/ai-performance.svg",
      chartdata: mockChartData,
      content:
        "AI 모델의 전반적인 성능을 한 눈에 확인하세요! 📊\n\n문화적 적절성, 시각적 세부사항, 환각 현상 등 다양한 지표의 평균값을 통해 AI의 응답 품질을 쉽게 파악할 수 있습니다. 각 지표가 낮을수록 더 정확하고 일관성 있는 AI 성능을 나타냅니다. (현재 데모 데이터를 표시 중입니다)",
      userResponseDistribution: mockUserDistribution,
    });
  };

  if (!averageChartData) {
    return (
      <div className="app">
        <CommonHeader />
        <div className="main-layout">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div>AI 성능 데이터를 불러오고 있어요... ⚡</div>
          </div>
        </div>
      </div>
    );
  }

  const itemForSidebar = {
    title: averageChartData.title,
    imageUrl: averageChartData.imageUrl,
  };

  return (
    <div className="app">
      <CommonHeader />
      <div className="main-layout">
        <ItemSidebar item={itemForSidebar} />
        <AIPerformanceChartDashboard
          chartData={averageChartData.chartdata}
          content={averageChartData.content}
          selectedDataCount={selectedDataCount}
          onDataCountChange={handleDataCountChange}
        />
      </div>
    </div>
  );
}

export default AIPerformancePage;
