import React, { useState, useEffect } from "react";
import EvaluationRow from "./EvaluationRow"; // Card -> Row로 변경
import "./MainContent.css";
import axios from "../../axiosInstance";

function MainContent() {
  const [rowList, setRowList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/chart", {
          headers: {
            page: currentPage,
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (response.data && response.data.success) {
          const items = response.data.responseData.chartList;
          const totalPageCount = response.data.responseData.totalPages;

          const transformedData = items.map((item) => ({
            id: item.surveyId,
            title: item.title,
            imageUrl: item.imageUrl,
            chartData: {
              cultural: {
                labels: ["level1", "level2", "level3", "level4"],
                human: item.chartdata.cultural.people,
                ai: item.chartdata.cultural.agent,
              },
              visual: {
                labels: ["level1", "level2", "level3", "level4"],
                human: item.chartdata.viusal.people,
                ai: item.chartdata.viusal.agent,
              },
              hallucination: {
                labels: ["level1", "level2", "level3", "level4"],
                human: item.chartdata.hallucination.people,
                ai: item.chartdata.hallucination.agent,
              },
            },
          }));
          setRowList(transformedData);
          if (totalPageCount) {
            setTotalPages(totalPageCount);
          }
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    if (totalPages > 0) {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }
  };

  return (
    <main className="main-content">
      {rowList.map((data) => (
        <EvaluationRow key={data.id} data={data} />
      ))}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            이전
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      )}
    </main>
  );
}

export default MainContent;
