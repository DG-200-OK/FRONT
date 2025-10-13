import React, { useState, useEffect } from "react";
import EvaluationRow from "./EvaluationRow"; // Card -> Row로 변경
import "./MainContent.css";
import axios from "../../axiosInstance";
import Pagination from "../../components/Pagination";

function MainContent({ selectedCategory, searchQuery }) {
  const [rowList, setRowList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setCurrentPage(1); // Reset page when category or search changes
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestParams = {};

        if (searchQuery) {
          requestParams.search = searchQuery;
        }

        const headers = {
            page: currentPage,
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
        };

        if (selectedCategory) {
            headers.category = selectedCategory;
        }

        const response = await axios.get("/api/chart", {
          headers: headers,
          withCredentials: true,
          params: requestParams,
        });
        if (response.data && response.data.success) {
          const items = response.data.responseData;
          const totalPageCount = response.data.totalPage;

          const transformedData = items.map((item) => ({
            id: item.captionId,
            title: item.title,
            imageUrl: item.imageUrl,
            imageLabel: item.title, // Use title as imageLabel
            content: item.content, // Pass content to EvaluationRow
            chartData: {
              cultural: {
                labels: ["1", "2", "3", "4", "5"],
                human: item.chartdata?.cultural?.people || [],
                ai: item.chartdata?.cultural?.agent || [],
              },
              visual: {
                labels: ["1", "2", "3", "4", "5"],
                human: item.chartdata?.visual?.people || [],
                ai: item.chartdata?.visual?.agent || [],
              },
              hallucination: {
                labels: ["1", "2", "3", "4", "5"],
                human: item.chartdata?.hallucination?.people || [],
                ai: item.chartdata?.hallucination?.agent || [],
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
  }, [currentPage, selectedCategory, searchQuery]);

  return (
    <main className="main-content">
      {rowList.map((data) => (
        <EvaluationRow key={data.id} data={data} />
      ))}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </main>
  );
}

export default MainContent;
