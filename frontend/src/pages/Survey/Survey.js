import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SurveypageLayout from "@/layouts/SurveypageLayout";
import axiosInstance from "@/axiosInstance";
import LazyImage from "@/components/LazyImage";
import SurveyItemSkeleton from "@/components/SurveyItemSkeleton";

const Survey = () => {
  const navigate = useNavigate();
  const surveyRefs = useRef({});

  const [surveys, setSurveys] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageNumbersToShow = 5;

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchSurveys = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/api/surveys", {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
            page: currentPage,
          },
          withCredentials: true,
          params: {
            countries: selectedCountries.join(','),
            categories: selectedCategories.join(',')
          }
        });

        const responseData = res.data?.responseData;
        if (responseData) {
          setSurveys(responseData.surveys || []);
          setTotalPages(responseData.totalPages || 0);
        } else {
          setSurveys([]);
          setTotalPages(0);
        }
      } catch (e) {
        console.error("Failed to fetch surveys:", e);
        setSurveys([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveys();
  }, [navigate, currentPage, selectedCountries, selectedCategories]);

  const pageGroup = Math.ceil(currentPage / pageNumbersToShow);
  const startPage = (pageGroup - 1) * pageNumbersToShow + 1;
  const endPage = Math.min(startPage + pageNumbersToShow - 1, totalPages);
  const pageNumbers = totalPages > 0 ? Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  ) : [];

  return (
    <SurveypageLayout
      selectedCountries={selectedCountries}
      handleCountryChange={(country) => {
        setSelectedCountries((prev) =>
          prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
        );
        setCurrentPage(1);
      }}
      selectedCategories={selectedCategories}
      handleCategoryChange={(category) => {
        setSelectedCategories((prev) =>
          prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
        setCurrentPage(1);
      }}
    >
      <PathAndSortContainer>
        <CategoryPath>
          설문조사
          {selectedCountries.length > 0 && ` > ${selectedCountries.join(", ")}`}
          {selectedCategories.length > 0 && ` > ${selectedCategories.join(", ")}`}
        </CategoryPath>
      </PathAndSortContainer>

      <SurveyContainer>
        {isLoading ? (
          <>
            <SurveyItemSkeleton />
            <SurveyItemSkeleton />
            <SurveyItemSkeleton />
            <SurveyItemSkeleton />
          </>
        ) : (
          surveys.map((item) => {
            const total = item.captions.length || 5;
            const answered = Math.round((item.progress || 0) * total);
            const percent = Math.round((item.progress || 0) * 100);

            return (
              <SurveyItem
                key={item.surveyId} 
                ref={(el) => (surveyRefs.current[item.title] = el)}
                onClick={() =>
                  navigate(`/survey/${item.title}`, {
                    state: {
                      image_url: item.imageUrl,
                      captions: item.captions,
                      country: item.country,
                      category: item.category,
                      title: item.title,
                      Key: item.surveyId,
                      startIndex: answered,
                    },
                  })
                }
              >
                <LazyImage src={item.imageUrl} alt={item.title} />
                <SurveyContent>
                  <strong style={{ fontSize: "17px" }}>
                    {`${item.country} > ${item.category} > ${item.title}`}
                  </strong>
                  <ProgressBar value={item.progress || 0} max={1} />
                  <ProgressText>
                    {`${answered} / ${total} (${percent}%)`}
                  </ProgressText>
                </SurveyContent>
                <ContinueButton>
                  {percent >= 100 ? "완료" : "이어서 진행하기"}
                </ContinueButton>
              </SurveyItem>
            );
          })
        )}
      </SurveyContainer>
      {!isLoading && totalPages > 1 && (
        <PaginationContainer>
          <PageButtonGroup>
            <PageButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
              &lt;&lt;
            </PageButton>
            <PageButton onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              &lt;
            </PageButton>
            {pageNumbers.map(number => (
              <PageButton
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </PageButton>
            ))}
            <PageButton onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              &gt;
            </PageButton>
            <PageButton onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
              &gt;&gt;
            </PageButton>
          </PageButtonGroup>
        </PaginationContainer>
      )}
    </SurveypageLayout>
  );
};

export default Survey;

const PathAndSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CategoryPath = styled.div`
  font-size: 16px;
  color: #444;
`;

const SortControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  button {
    padding: 6px 12px;
    font-size: 14px;
    border: 1px solid #649eff;
    background-color: white;
    color: #649eff;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: #649eff;
      color: white;
    }
  }
`;

const SurveyContainer = styled.div`
  margin-top: 30px;
`;

const SurveyItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  &:hover {
    background-color: #f0f6ff;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(100, 158, 255, 0.2);
    border-color: #649eff;
  }
`;

const SurveyContent = styled.div`
  flex: 1;
`;

const ProgressText = styled.div`
  font-size: 15px;
  color: #555;
  margin: 5px 0;
`;

const ProgressBar = styled.progress`
  width: 95%;
  height: 16px;
  margin-bottom: 5px;
  &::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 8px;
  }
  &::-webkit-progress-value {
    background-color: #649eff;
    border-radius: 8px;
  }
`;

const ContinueButton = styled.button`
  padding: 8px 14px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  margin-left: auto;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #4a82d9;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const PageButtonGroup = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const PageButton = styled.button`
  width: 36px;
  padding: 8px 0px;
  border: none;
  border-left: 1px solid #ddd;
  background-color: ${props => props.active ? '#649eff' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: pointer;
  font-size: 14px;

  &:first-child {
    border-left: none;
  }

  &:hover {
    background-color: #f0f6ff;
  }

  &:disabled {
    background-color: #f9f9f9;
    color: #ccc;
    cursor: not-allowed;
  }
`;