import React, { useEffect, useState } from "react";
import CommonHeader from "../../components/CommonHeader";
import ItemSidebar from "./ItemSidebar";
import ChartDashboard from "./ChartDashboard";
import "./LineChartPage.css"; // Renamed from App.css
import { useParams } from "react-router-dom";
import axios from "../../axiosInstance"; // to fetch data

function LineChartPage() {
  const { id } = useParams();
  const [chartPageData, setChartPageData] = useState(null);
  const [selectedDataCount, setSelectedDataCount] = useState(500);

  const handleDataCountChange = (count) => {
    setSelectedDataCount(count);
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`/api/chart/${id}`, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (response.data && response.data.success) {
          setChartPageData(response.data.responseData);
        } else {
          console.error("API request was not successful:", response.data.message);
          // Set mock data on failure if needed for development
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
        // Set mock data on error if needed for development
      }
    };

    fetchChartData();
  }, [id]);

  if (!chartPageData) {
    return (
      <div className="app">
        <CommonHeader />
        <div className="main-layout">
          <div>차트 데이터를 불러오고 있어요... ⏳</div>
        </div>
      </div>
    );
  }

  const itemForSidebar = {
    title: chartPageData.title,
    imageUrl: chartPageData.imageUrl,
  };

  return (
    <div className="app">
      <CommonHeader />
      <div className="main-layout">
        <ItemSidebar item={itemForSidebar} />
        <ChartDashboard
          chartData={chartPageData.chartdata}
          content={chartPageData.content}
          selectedDataCount={selectedDataCount}
          onDataCountChange={handleDataCountChange}
        />
      </div>
    </div>
  );
}

export default LineChartPage;
