import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SurveypageLayout from "@/layouts/SurveypageLayout";
import axiosInstance from "@/axiosInstance";
import LazyImage from "@/components/LazyImage";
import SurveyItemSkeleton from "@/components/SurveyItemSkeleton";
import Pagination from "@/components/Pagination";
import SurveyTutorialGuide from "@/components/SurveyTutorialGuide";

const Survey = () => {
  const navigate = useNavigate();
  const surveyRefs = useRef({});

  const [surveys, setSurveys] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchSurveys = async () => {
      setIsLoading(true);
      try {
        const params = {
          page: currentPage,
          countries: selectedCountries.join(","),
        };

        if (selectedCategories.length > 0) {
          params.category = selectedCategories[0];
        }

        if (searchQuery) {
          params.search = searchQuery;
        }

        const res = await axiosInstance.get("/api/surveys", {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          withCredentials: true,
          params: params,
        });

        const responseData = res.data?.responseData;
        console.log('Survey API Response:', responseData); // 디버깅 로그
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

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/me");
        if (response.data && response.data.success) {
          setUserInfo(response.data.responseData);
          // 사용자가 응답한 적이 없으면 튜토리얼 표시
          const userData = response.data.responseData;
          const hasResponses = userData.participatedSurvey.length > 0;
          if (!hasResponses) {
            setTimeout(() => setShowTutorial(true), 1500); // 1.5초 후 표시
          }
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchSurveys();
    fetchUserInfo();
  }, [navigate, currentPage, selectedCountries, selectedCategories, searchQuery]);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  const handleStartDataEvaluation = () => {
    // 이미 survey 페이지에 있으므로 별도 액션 불필요
    setShowTutorial(false);
  };

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
          prev.includes(category) ? [] : [category]
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
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
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
            const total = Array.isArray(item.captions) ? item.captions.length : 5;
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
                      captions: Array.isArray(item.captions) ? item.captions : [],
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
      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <SurveyTutorialGuide
        isOpen={showTutorial}
        onClose={handleCloseTutorial}
        onStartDataEvaluation={handleStartDataEvaluation}
      />
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

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  width: 200px;
  margin-left: auto; // Pushes it to the right
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