import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SurveypageLayout from "@/layouts/DataDownloadLayout";

/**
 * 데이터 다운로드 페이지 컴포넌트
 * - 국가 및 카테고리 선택에 따라 API (http://localhost:4000/data_search)를 호출하여 목록 표시
 */
const DataDownload = () => {
  // --- 상태 정의 ---
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [downloadableData, setDownloadableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- 이벤트 핸들러 ---
  const handleCountryChange = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? [] : [category]
    );
  };

  // --- 데이터 페칭 ---
  useEffect(() => {
    const fetchData = async () => {
      if (selectedCategories.length !== 1 || selectedCountries.length !== 1) {
        setDownloadableData([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      setDownloadableData([]);

      try {
        const category = selectedCategories[0];
        const nation = selectedCountries[0];

        const response = await fetch(
          `http://localhost:4000/data_search?category=${category}&nation=${nation}`,
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDownloadableData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("데이터 페칭 오류:", err);
        setError(err.message || "데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCountries, selectedCategories]);

  // --- UI 렌더링 ---
  const renderDownloadContent = () => {
    if (isLoading) return <StatusText>데이터를 불러오는 중...</StatusText>;
    if (error)
      return <StatusText style={{ color: "red" }}>오류: {error}</StatusText>;
    if (downloadableData.length > 0) {
      return downloadableData.map((data, index) => (
        <ItemBox key={data.id || index}>
          <ImageBox>
            {data.image ? (
              <img src={data.image} alt={`${data.category} 이미지`} />
            ) : (
              "이미지"
            )}
          </ImageBox>
          <ItemContent>
            <ItemTitle>
              {data.category} &gt; {data.nation}
            </ItemTitle>
            <ItemSubText>
              전체 데이터 수 :{" "}
              {data.total_data_set ? data.total_data_set.toLocaleString() : 0}
            </ItemSubText>
          </ItemContent>
          <DownloadButton
            onClick={() => alert(`${data.category} 데이터 다운로드`)}
          >
            다운로드
          </DownloadButton>
        </ItemBox>
      ));
    }
    return <StatusText>다운로드할 항목을 선택해 주세요.</StatusText>;
  };

  // --- JSX ---
  return (
    <SurveypageLayout
      selectedCountries={selectedCountries}
      handleCountryChange={handleCountryChange}
      selectedCategories={selectedCategories}
      handleCategoryChange={handleCategoryChange}
    >
      <Content>
        <Title>데이터 다운로드</Title>
        <p>선택한 카테고리와 국가에 대한 데이터를 다운로드할 수 있습니다.</p>
        <DownloadSection>{renderDownloadContent()}</DownloadSection>
      </Content>
    </SurveypageLayout>
  );
};

export default DataDownload;

/* -------------------- 스타일 -------------------- */
const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
`;

const DownloadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px 20px;
  justify-content: space-between;
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  min-width: 60px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #777;
  margin-right: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const ItemSubText = styled.span`
  font-size: 13px;
  color: #888;
`;

const DownloadButton = styled.button`
  padding: 8px 16px;
  background-color: #649eff;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-left: 15px;
  &:hover {
    background-color: #4a82d9;
  }
  &:active {
    background-color: #3a72c9;
  }
`;

const StatusText = styled.p`
  text-align: center;
  padding: 40px 20px;
  color: #888;
  font-size: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px dashed #ddd;
`;
