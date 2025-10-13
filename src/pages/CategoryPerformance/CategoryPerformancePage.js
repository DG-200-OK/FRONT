import React, { useEffect, useState } from "react";
import CommonHeader from "../../components/CommonHeader";
import ItemSidebar from "../LineChart/ItemSidebar";
import AIPerformanceChartDashboard from "../AIPerformance/AIPerformanceChartDashboard";
import "./CategoryPerformancePage.css";
import axios from "../../axiosInstance";
import { useParams } from "react-router-dom";

function CategoryPerformancePage() {
  const { category } = useParams();
  const [categoryChartData, setCategoryChartData] = useState(null);
  const [selectedDataCount, setSelectedDataCount] = useState(500);

  const handleDataCountChange = (count) => {
    setSelectedDataCount(count);
  };

  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      'Architecture': '건축',
      'Clothing': '의류',
      'Cuisine': '요리',
      'Game': '게임',
      'Tool': '도구'
    };
    return categoryNames[category] || category;
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Fetch category-specific data
        const response = await axios.get(`/api/chart/category/${category}`, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (response.data && response.data.success) {
          const responseData = response.data.responseData;

          setCategoryChartData({
            title: `${getCategoryDisplayName(category)} 카테고리 성능 분석`,
            imageUrl: "/assets/img/ai-performance.svg",
            chartdata: responseData.chartdata,
            content: `${getCategoryDisplayName(category)} 카테고리의 AI 성능을 상세히 분석해보세요! 📊\n\n이 카테고리에서 AI 모델이 문화적 적절성, 시각적 세부사항, 환각 현상 등을 얼마나 잘 처리하는지 확인할 수 있습니다. 각 지표가 낮을수록 더 정확하고 신뢰할 수 있는 성능을 의미합니다.`,
            userResponseDistribution: responseData.userResponseDistribution,
          });
        } else {
          console.error(
            "API request was not successful:",
            response.data.message
          );
          // Set mock data for development
          setMockCategoryData();
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
        // Set mock data for development
        setMockCategoryData();
      }
    };

    fetchCategoryData();
  }, [category]);

  const setMockCategoryData = () => {
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

    setCategoryChartData({
      title: `${getCategoryDisplayName(category)} 카테고리 성능 분석 (데모 버전)`,
      imageUrl: "/assets/img/ai-performance.svg",
      chartdata: mockChartData,
      content: `${getCategoryDisplayName(category)} 카테고리의 AI 성능을 상세히 분석해보세요! 📊\n\n이 카테고리에서 AI 모델이 문화적 적절성, 시각적 세부사항, 환각 현상 등을 얼마나 잘 처리하는지 확인할 수 있습니다. 각 지표가 낮을수록 더 정확하고 신뢰할 수 있는 성능을 의미합니다. (현재 데모 데이터를 표시 중입니다)`,
      userResponseDistribution: mockUserDistribution,
    });
  };

  if (!categoryChartData) {
    return (
      <div className="app">
        <CommonHeader />
        <div className="main-layout">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div>{getCategoryDisplayName(category)} 카테고리 성능 데이터를 불러오고 있어요... 🎯</div>
          </div>
        </div>
      </div>
    );
  }

  const itemForSidebar = {
    title: categoryChartData.title,
    imageUrl: categoryChartData.imageUrl,
  };

  return (
    <div className="app">
      <CommonHeader />
      <div className="main-layout">
        <ItemSidebar item={itemForSidebar} />
        <AIPerformanceChartDashboard
          chartData={categoryChartData.chartdata}
          content={categoryChartData.content}
          selectedDataCount={selectedDataCount}
          onDataCountChange={handleDataCountChange}
        />
      </div>
    </div>
  );
}

export default CategoryPerformancePage;