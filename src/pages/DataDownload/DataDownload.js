import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SurveypageLayout from "@/layouts/DataDownloadLayout";
import JSZip from "jszip"; // ⭐ ZIP 만들기 위해 추가

const DataDownload = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // ------------------------------------------------------------------
  // ⭐ ZIP 생성 (이미지 + txt 파일)
  // ------------------------------------------------------------------
// ⭐ public/data.zip 다운로드
const handleDownloadZip = () => {
  console.log("📦 로컬 ZIP 다운로드 시작");

  const link = document.createElement("a");
  link.href = "/data.zip";   // public/data.zip 위치
  link.download = "data.zip";
  link.click();
};


  // ------------------------------------------------------------------
  // 🔹 국가 / 카테고리 선택 핸들러
  // ------------------------------------------------------------------
  const handleCountryChange = (country) => {
    setSelectedCountries((prev) => (prev.includes(country) ? [] : [country]));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? [] : [category]
    );
  };

  // ------------------------------------------------------------------
  // 🔹 조건 충족 여부 체크
  // ------------------------------------------------------------------
  const isCuisineKorea =
    selectedCategories[0] === "Cuisine" && selectedCountries[0] === "한국";

  // ------------------------------------------------------------------
  // 🔹 UI 렌더링
  // ------------------------------------------------------------------
  const renderDownloadContent = () => {
    if (!isCuisineKorea) {
      return <StatusText>다운로드할 항목을 선택해 주세요.</StatusText>;
    }

    return (
      <ItemBox>
        <ItemContent>
          <ItemTitle>Cuisine &gt; 한국</ItemTitle>
          <ItemSubText>총데이터수:10</ItemSubText>
        </ItemContent>
        <DownloadButton onClick={handleDownloadZip}>
          ZIP 다운로드
        </DownloadButton>
      </ItemBox>
    );
  };

  return (
    <SurveypageLayout
      selectedCountries={selectedCountries}
      handleCountryChange={handleCountryChange}
      selectedCategories={selectedCategories}
      handleCategoryChange={handleCategoryChange}
    >
      <Content>
        <Title>데이터 다운로드</Title>
        <DownloadSection>{renderDownloadContent()}</DownloadSection>
      </Content>
    </SurveypageLayout>
  );
};

export default DataDownload;

/* ---------------- 스타일 그대로 유지 ---------------- */

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
`;

const ItemContent = styled.div`
  flex: 1;
`;

const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const ItemSubText = styled.div`
  font-size: 13px;
  color: #777;
`;

const DownloadButton = styled.button`
  padding: 8px 16px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const StatusText = styled.p`
  text-align: center;
  padding: 20px;
  color: #777;
`;
